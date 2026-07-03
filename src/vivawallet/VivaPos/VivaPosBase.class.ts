import { MethodReturn } from '../../types/Methods.types';
import { VivawalletAPIInit } from '../../types/Vivawallet.types';
import { VivaAuth } from '../../vivabases/VivaAuth.class';

abstract class VivaPosBase extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  protected async getCloudTerminalAuthorization(): MethodReturn<
    string | null,
    'tokenerror'
  > {
    const token = await this.getCloudTerminalAccessToken();

    if (!token.success || !token.data?.access_token) {
      return {
        success: false,
        message: token.message,
        code: 'tokenerror',
        data: null,
      };
    }

    return {
      success: true,
      message: 'Cloud Terminal authorization generated',
      data: this.getBearerAuthorization(token.data.access_token),
    };
  }
}

export default VivaPosBase;
