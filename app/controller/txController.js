// Copyright 2021 Emergent Coin Inc. All Rights Reserved.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
