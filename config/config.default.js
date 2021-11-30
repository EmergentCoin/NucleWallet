
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
