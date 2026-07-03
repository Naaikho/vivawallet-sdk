import { MethodReturn } from '../../types/Methods.types';
import {
  VivaPosAbortSessionOptions,
  VivaPosRetrieveSessionByIdOptions,
  VivaPosRetrieveSessionInfoByDateOptions,
  VivaPosRetrieveSessionInfoByDateReturn,
  VivaPosSessionReturn,
} from '../../types/VivaPos.types';
import { VivawalletAPIInit } from '../../types/Vivawallet.types';
import { useAxios } from '../../utils/axiosInstance.ts';
import { withQuery } from '../../utils/functions.helpers';
import VivaPosBase from './VivaPosBase.class';

export default class VivaPosSession extends VivaPosBase {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  private normalizeSessionInfoQuery(
    options: VivaPosRetrieveSessionInfoByDateOptions
  ): Record<string, string | boolean | undefined> {
    const { aadeAutonomouslyOnly, AadeAutonomouslyOnly, date } = options;

    return {
      date,
      AadeAutonomouslyOnly: AadeAutonomouslyOnly ?? aadeAutonomouslyOnly,
    };
  }

  /** Retrieve Session by Id */
  async retrieveSessionById(
    options: VivaPosRetrieveSessionByIdOptions
  ): MethodReturn<VivaPosSessionReturn | null, 'nodatas' | 'tokenerror'> {
    try {
      const authorization = await this.getCloudTerminalAuthorization();

      if (!authorization.success || !authorization.data) {
        return {
          success: false,
          message: authorization.message,
          code: 'tokenerror',
          data: null,
        };
      }

      const response = await useAxios.get<VivaPosSessionReturn>(
        this.endpoints.cloudTerminal.session.get.url.replace(
          '{sessionId}',
          encodeURIComponent(options.sessionId)
        ),
        {
          headers: {
            Authorization: authorization.data,
          },
        }
      );

      if (!response.data) {
        if (this.errorLogs)
          console.error('VivaPosSession.retrieveSessionById', response.data);
        return {
          success: false,
          message: 'VivaWallet returned no session data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Session retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaPosSession.retrieveSessionById', e);
      return {
        success: false,
        message: 'Failed to retrieve session',
        code: 'error',
        data: null,
      };
    }
  }

  /** Retrieve Session Info by Date */
  async retrieveSessionInfoByDate(
    options: VivaPosRetrieveSessionInfoByDateOptions = {}
  ): MethodReturn<
    VivaPosRetrieveSessionInfoByDateReturn | null,
    'nodatas' | 'tokenerror'
  > {
    try {
      const authorization = await this.getCloudTerminalAuthorization();

      if (!authorization.success || !authorization.data) {
        return {
          success: false,
          message: authorization.message,
          code: 'tokenerror',
          data: null,
        };
      }

      const response =
        await useAxios.get<VivaPosRetrieveSessionInfoByDateReturn>(
          withQuery(
            this.endpoints.cloudTerminal.session.list.url,
            this.normalizeSessionInfoQuery(options)
          ),
          {
            headers: {
              Authorization: authorization.data,
            },
          }
        );

      if (!response.data) {
        if (this.errorLogs)
          console.error(
            'VivaPosSession.retrieveSessionInfoByDate',
            response.data
          );
        return {
          success: false,
          message: 'VivaWallet returned no sessions data',
          code: 'nodatas',
          data: null,
        };
      }

      return {
        success: true,
        message: 'Sessions retrieved successfully',
        data: response.data,
      };
    } catch (e) {
      if (this.errorLogs)
        console.error('VivaPosSession.retrieveSessionInfoByDate', e);
      return {
        success: false,
        message: 'Failed to retrieve sessions',
        code: 'error',
        data: null,
      };
    }
  }

  /** Abort Session */
  async abortSession(
    options: VivaPosAbortSessionOptions
  ): MethodReturn<null, 'tokenerror'> {
    try {
      const authorization = await this.getCloudTerminalAuthorization();

      if (!authorization.success || !authorization.data) {
        return {
          success: false,
          message: authorization.message,
          code: 'tokenerror',
          data: null,
        };
      }

      await useAxios.delete<null>(
        withQuery(
          this.endpoints.cloudTerminal.session.abort.url.replace(
            '{sessionId}',
            encodeURIComponent(options.sessionId)
          ),
          { cashRegisterId: options.cashRegisterId }
        ),
        {
          headers: {
            Authorization: authorization.data,
          },
        }
      );

      return {
        success: true,
        message: 'Session aborted successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs) console.error('VivaPosSession.abortSession', e);
      return {
        success: false,
        message: 'Failed to abort session',
        code: 'error',
        data: null,
      };
    }
  }
}
