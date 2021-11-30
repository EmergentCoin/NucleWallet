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
const {
  Service,
} = require('egg');
const { LOGIN } = require('../common/redisKey');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.redis = ctx.app.redis;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }


  /**
   * @description login
   *
   * @param {string} address 
	 */
  async login(address) {
    
    return this.ServerResponse.createBySuccessMsg('Login successfully');
  }
}

module.exports = UserService;
