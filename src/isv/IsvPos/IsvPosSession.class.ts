import { ISVAbortSessionOptions } from '../../types/isv.types/IsvPos.types/IsvPosSession.type';
import { MethodReturn } from '../../types/Methods.types';
import { VivawalletISVInit } from '../../types/Vivawallet.types';
import { useAxios } from '../../utils/axiosInstance.ts';
import { VivaAuthISV } from '../../vivabases/VivaAuth.class';

export default class IsvPosSession extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }

  async abortSession(options: ISVAbortSessionOptions): MethodReturn<null> {
    try {
      const vivaToken = (await this.getVivaToken()).data;

      await useAxios.delete<null>(
        `${this.endpoints.isv.pos.session.abort.url.replace(
          '{sessionId}',
          options.sessionId
        )}?cashRegisterId=${options.cashRegisterId}`,
        {
          headers: {
            Authorization: 'Bearer ' + vivaToken,
          },
        }
      );

      return {
        success: true,
        message: 'Session aborted successfully',
        data: null,
      };
    } catch (e) {
      if (this.errorLogs) console.error('IsvPos.abortSession', e);
      return {
        success: false,
        message: 'Failed to abort session',
        code: 'error',
        data: null,
      };
    }
  }
}
