import { VivawalletISVInit } from "../../types/Vivawallet.types";
import { VivaAuthISV } from "../../vivabases/VivaAuth.class";

export default class IsvPosSession extends VivaAuthISV {
  constructor(datas: VivawalletISVInit) {
    super(datas);
  }
}