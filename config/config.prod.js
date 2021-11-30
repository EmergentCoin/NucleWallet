
/* eslint valid-jsdoc: "off" */

'use strict';

const Stores = require('koa2-ratelimit').Stores;
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
      host: 'wallet',
      port: '6379',
      // password: '',
      db: '0',
    }),
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    nodeUrl: [ 'http://wallet:8082/node' ],
  };

  config.logger = {
    level: 'ERROR',
    dir: path.join(appInfo.baseDir, 'logs/walet-serve'),
  };


  /**
	 * redis
	 */
  config.redis = {
    client: {
      host: 'wallet',
      port: '6379',
      password: '',
      db: '0',
    },
    // agent:true
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
