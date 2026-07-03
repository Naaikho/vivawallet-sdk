import { describe, expect, it, vi } from 'vitest';
import { axiosResponse, mockAxios } from '../helpers/axios';
import {
  basicAuth,
  isvCredentials,
  standardCredentials,
} from '../helpers/credentials';
import { VivaAuth, VivaAuthISV } from '../../src/vivabases/VivaAuth.class';

class ExposedVivaAuth extends VivaAuth {
  bearer(token: string | null): string {
    return this.getBearerAuthorization(token);
  }

  oauthBasic(): string {
    return this.getOAuthBasicAuthorization();
  }
}

class ExposedVivaAuthISV extends VivaAuthISV {
  hasReseller(): boolean {
    return this.hasResellerCredentials();
  }
}

describe('VivaAuth', () => {
  it('initializes explicit credentials and exposes Basic/Bearer helpers', () => {
    const auth = new ExposedVivaAuth(standardCredentials);

    expect(auth.clientId).toBe('client-id');
    expect(auth.clientSecret).toBe('client-secret');
    expect(auth.sourceCode).toBe('default-source');
    expect(auth.errorLogs).toBe(false);
    expect(auth.getVivaBasicAuth()).toBe(basicAuth('merchant-id:api-key'));
    expect(auth.getVivaBasicToken()).toBe(
      Buffer.from('merchant-id:api-key').toString('base64')
    );
    expect(() => auth.getVivaResellerBasicAuth('target-merchant')).toThrow(
      'Reseller credentials not provided'
    );
    expect(auth.bearer('token')).toBe('Bearer token');
    expect(auth.oauthBasic()).toBe(basicAuth('client-id:client-secret'));
  });

  it('builds reseller basic auth only from ISV account reseller credentials and target merchant id', () => {
    const auth = new ExposedVivaAuthISV(isvCredentials);

    expect(auth.hasReseller()).toBe(true);
    expect(auth.getVivaResellerBasicAuth('target-merchant')).toBe(
      basicAuth('reseller-id:target-merchant:reseller-api-key')
    );
    expect(() => auth.getVivaResellerBasicAuth('')).toThrow(
      'Target merchant ID not provided'
    );
  });

  it('throws early when required constructor credentials are missing', () => {
    expect(
      () =>
        new VivaAuth({
          ...standardCredentials,
          clientId: '',
        })
    ).toThrow('Credentials not provided');
    expect(
      () =>
        new VivaAuth({
          ...standardCredentials,
          merchantId: '',
        })
    ).toThrow('Credentials not provided');
    expect(
      () =>
        new VivaAuthISV({
          ...isvCredentials,
          clientSecret: '',
        })
    ).toThrow('Credentials not provided');
  });

  it('fetches OAuth access tokens with client credentials', async () => {
    const axios = mockAxios();
    axios.post.mockResolvedValueOnce(axiosResponse({ access_token: 'token' }));
    const auth = new VivaAuth(standardCredentials);

    await expect(auth.getVivaAccessToken()).resolves.toEqual({
      success: true,
      message: 'Viva token fetched',
      data: 'token',
    });
    expect(axios.post).toHaveBeenCalledWith(
      'https://demo-accounts.vivapayments.com/connect/token',
      { grant_type: 'client_credentials' },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: basicAuth('client-id:client-secret'),
        },
      }
    );
  });

  it('returns token errors without logging by default', async () => {
    const axios = mockAxios();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    axios.post.mockResolvedValueOnce(axiosResponse({}));
    const auth = new VivaAuth(standardCredentials);

    await expect(auth.getVivaAccessToken()).resolves.toEqual({
      success: false,
      message: 'Failed to get Viva token',
      code: 'tokenerror',
      data: null,
    });
    expect(consoleError).not.toHaveBeenCalled();

    axios.post.mockRejectedValueOnce(new Error('network'));
    await auth.getVivaAccessToken();
    expect(consoleError).not.toHaveBeenCalled();
  });

  it('logs token errors only when logs are enabled', async () => {
    const axios = mockAxios();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    axios.post.mockRejectedValueOnce(new Error('network'));
    const auth = new VivaAuth({ ...standardCredentials, logs: true });

    await expect(auth.getVivaAccessToken()).resolves.toMatchObject({
      success: false,
      code: 'tokenerror',
    });
    expect(consoleError).toHaveBeenCalledWith(
      'VivaAuth.requestAccessToken',
      expect.any(Error)
    );
  });

  it('fetches Cloud Terminal tokens and returns full token payloads', async () => {
    const axios = mockAxios();
    axios.post.mockResolvedValueOnce(
      axiosResponse({
        access_token: 'cloud-token',
        expires_in: 3600,
        token_type: 'Bearer',
      })
    );
    const auth = new VivaAuth(standardCredentials);

    await expect(auth.getCloudTerminalAccessToken()).resolves.toMatchObject({
      success: true,
      message: 'Cloud Terminal token fetched',
      data: { access_token: 'cloud-token' },
    });
    expect(axios.post.mock.calls[0][0]).toBe(
      'https://demo-accounts.vivapayments.com/connect/token'
    );
    expect(String(axios.post.mock.calls[0][1])).toBe(
      'grant_type=client_credentials'
    );
    expect(axios.post.mock.calls[0][2]).toEqual({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: basicAuth('client-id:client-secret'),
      },
    });
  });

  it('handles Cloud Terminal token failures', async () => {
    const axios = mockAxios();
    axios.post.mockResolvedValueOnce(axiosResponse({}));
    const auth = new VivaAuth(standardCredentials);

    await expect(auth.getCloudTerminalAccessToken()).resolves.toEqual({
      success: false,
      message: 'Failed to get Cloud Terminal token',
      code: 'tokenerror',
      data: null,
    });

    axios.post.mockRejectedValueOnce(new Error('network'));
    await auth.getCloudTerminalAccessToken();

    axios.post.mockRejectedValueOnce(new Error('network'));
    const loggedAuth = new VivaAuth({ ...standardCredentials, logs: true });
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    await loggedAuth.getCloudTerminalAccessToken();
    expect(consoleError).toHaveBeenCalledWith(
      'VivaAuth.getCloudTerminalAccessToken',
      expect.any(Error)
    );
  });

  it('keeps deprecated getVivaToken compatible without Basic-token mode', async () => {
    const axios = mockAxios();
    axios.post.mockResolvedValueOnce(axiosResponse({ access_token: 'token' }));
    const auth = new VivaAuth(standardCredentials);

    await expect(auth.getVivaToken()).resolves.toMatchObject({
      success: true,
      data: 'token',
    });
    await expect(auth.getVivaToken(true)).resolves.toEqual({
      success: false,
      message: 'Merchant Basic credentials cannot request a Viva access token',
      code: 'tokenerror',
      data: null,
    });
  });

  it('returns init errors when OAuth credentials are missing on an existing instance', async () => {
    const auth = Object.create(VivaAuth.prototype) as VivaAuth;
    auth.clientId = '';
    auth.clientSecret = '';

    await expect(auth.getVivaAccessToken()).resolves.toEqual({
      success: false,
      message: 'Init not called',
      code: 'initerror',
      data: null,
    });
    await expect(auth.getCloudTerminalAccessToken()).resolves.toMatchObject({
      success: false,
      code: 'initerror',
    });
  });

  it('throws when merchant or reseller Basic credentials are unavailable', () => {
    const auth = new VivaAuthISV(isvCredentials);

    expect(() => auth.getVivaBasicAuth()).toThrow(
      'Merchant credentials not provided'
    );
    expect(() =>
      new VivaAuthISV({
        clientId: 'client',
        clientSecret: 'secret',
      }).getVivaResellerBasicAuth('target')
    ).toThrow('Reseller credentials not provided');
  });
});
