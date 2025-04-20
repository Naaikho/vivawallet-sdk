import { SourceCodeDatas } from '../types/VivaSource.types';
import { VivawalletAPIInit } from '../types/Vivawallet.types';
import VivaAuth from '../vivabases/VivaAuth.class';

class VivaSourceCode extends VivaAuth {
  constructor(datas: VivawalletAPIInit) {
    super(datas);
  }

  /** ------------------ SOURCE CODE ------------------ */

  /** Set the Viva Wallet payment source (needed for Transaction integrations), return `true` if setup is OK, `false` if the payment already exist or on error */
  async setVivawalletSource(data: SourceCodeDatas): Promise<boolean> {
    if (!this.merchantId || !this.apikey) throw new Error('Init not called');
    if (!this.sourceCode && !data.sourceCode)
      throw new Error('Source code is required');
    if (!data.sourceCode && this.sourceCode) data.sourceCode = this.sourceCode;
    try {
      await requests(
        this.endpoints.source.url,
        this.endpoints.source.method,
        {
          Authorization: 'Basic ' + this.getVivaBasicToken(),
        },
        data
      );
      return true;
    } catch (e: any) {
      // if the source already exist
      if (e.status === 409) return true;
    }
    return false;
  }

  /** ------------------------------------------------- */
}

export default VivaSourceCode;
