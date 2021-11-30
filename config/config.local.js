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

const Stores = require('koa2-ratelimit').Stores;
const { SSL_OP_NO_SSLv3 } = require('constants');
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

  // add your middleware config here
  // config.middleware = [];

  config.rateLimit = {
    match: [ '/api/v1/user/login' ],
    interval: { min: 30 }, // 1h window
    delayAfter: 0, // begin slowing down responses after the first request
    timeWait: 0, // slow down subsequent responses by 3 seconds per request
    max: 10, // start blocking after 5 requests
    prefixKey: 'chia/wallet', // to allow the bdd to Differentiate the endpoint
    message: 'Too many request from this IP, please try again after half an hour',
    store: new Stores.Redis({
      host: 'localhost',
      port: '6379',
      // password: '',
      db: '0',
    }),
  };


  

  config.redis = {
    client: {
      host: 'localhost',
      port: '6379',
      password: '',
      db: '0',
    },
    // agent:true
  };

  config.security = {
    // csrf: {
    //   enable: false,// swaggerdoc had be false
    // },
    
    // ignore: ctx => {
    //   if (ctx.request.url == '/admin/goods/goodsUploadImage') {
    //     return true;
    //   }
    //   return false;
    // }
  };

  /**
	 * swagger
	 */
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'wallet',
      description: 'DOC',
      version: '1.0.0',
    },
    consumes: [ 'application/json',
      'multipart/form-data',
    ], 
    produces: [ 'application/json', 'multipart/form-data' ], 
    schemes: [ 'http', 'https' ],
    routerMap: false, 
    enable: true,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    nodeUrl: [ 'http://IP:8082/node' ],
  };

  return {
    ...config,
    ...userConfig,
  };
};
