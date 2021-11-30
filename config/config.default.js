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

/* eslint valid-jsdoc: "off" */

'use strict';

const { SYS_ERR } = require('../app/common/responseCode');
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + 'key';

  config.onerror = {
    html(err, ctx) {
      // html hander
      ctx.body = '<h3>Error,should use Accept:application/json to see error message.</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.response.status === 422 ?
        ctx.body = ctx.response.ServerResponse.createByErrorMsg(err.errors[0]) :
        ctx.body = ctx.response.ServerResponse.createByErrorCodeMsg(SYS_ERR, 'SYSTEM EEROR');
    },
  };

  // add your middleware config here
  config.middleware = [
    'rateLimit',
    'isLogin',
    'trim',
  ];

  
  config.isLogin = {
    ignore: [ '/api/v1/user/login' ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.session = {
    genid: ctx => {
      const { address } = ctx.request.body;
      return address + Date.now();
    },
  };

  config.httpclient = {
    request: {
      timeout: 6000,
    },
    httpAgent: {
      freeSocketTimeout: 60000,
    },
    httpsAgent: {
      freeSocketTimeout: 60000,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
