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
const { NEED_LOGIN } = require('../common/responseCode');
module.exports = () => {
  return async (ctx, next) => {
    if (ctx.url === '/api/v1/user/csrf') {
      ctx.body = ctx.response.ServerResponse.createBySuccess();
      return;
    }
    const address = ctx.request.body.address || ctx.request.body.from || ctx.request.query.address;
    if (address) {
      const role = ctx.session.currentuser;
      if (ctx.url === '/api/v1/user/checkLogin') {
        if (role === address) {
          ctx.body = ctx.response.ServerResponse.createBySuccess();
        } else {
          ctx.body = ctx.response.ServerResponse.createBySuccessCode(NEED_LOGIN);
        }
        return;
      }
      ctx.validate({ address: { type: 'address' } }, { address });
      if (!role || address !== role) {
        ctx.body = ctx.response.ServerResponse.createByErrorCodeMsg(NEED_LOGIN, 'Not logged in, please login first');
        return ctx.body;
      }
    }
    await next();
  };
};
