'use strict';

const { SYS_ERR } = require('../app/common/responseCode');
const Stores = require('koa2-ratelimit').Stores;
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

  // 'isLogin'
  config.isLogin = {
    ignore: [ '/api/v1/user/login' ],
  };

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
    
  };

  config.session = {
    genid: ctx => {
      const { address } = ctx.request.body;
      return address + Date.now();
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
    
    
    
    
    
    
    
  };

  config.logger = {
    consoleLevel: 'ERROR',
    buffer: false,
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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    nodeUrl: [ 'http://IP:8082/chianode' ],
  };

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

  return {
    ...config,
    ...userConfig,
  };
};
