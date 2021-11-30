

'use strict';



const sendParam = {
  hash: {
    type: 'string',
    max: 66,
    required: true,
  },
  from: {
    type: 'address',
    required: true,
  },
  to: {
    type: 'address',
    required: true,
  },
  amount: {
    type: 'int',
    min: 0,
    required: true,
  },
  fee: {
    type: 'int',
    min: 0,
    required: false,
  },
  spendBundle: {
    type: 'jsonString',
    required: true,
  },
  withdraw: {
    type: 'address',
    required: false,
  },
  remark: {
    type: 'string',
    max: 255,
    required: false,
  },
};

const Controller = require('egg').Controller;
/**
 * @controller
 */
class TxController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.TxService = ctx.service.txService;
    this.ServerResponse = ctx.response.ServerResponse;
  }
  /**
      * @summary txController
      * @description send tx
      * @router post /api/v1/tx/sendTx
      * @request body sendTx *
      * @response 200 commonResponse
      */
  async sendSignedTx() {
    this.ctx.validate(sendParam, this.ctx.request.body);
    const { hash, from, to, amount, fee, spendBundle, withdraw, remark } = this.ctx.request.body;
    this.ctx.body = await this.TxService.sendSignedTx(hash, from, to, amount, spendBundle, fee, withdraw, remark);
  }

  /**
      * @summary txController
      * @description get balance
      * @router get /api/v1/tx/getBalanceByAddress
      * @request string *address hash
      * @response 200 commonResponse
      */
  async getBalanceByAddress() {
    const { address } = this.ctx.request.query;
    this.ctx.validate({
      address: {
        type: 'address',
        required: true,
      },
    }, { address });
    this.ctx.body = await this.TxService.getBalance(address);
  }

}

module.exports = TxController;
