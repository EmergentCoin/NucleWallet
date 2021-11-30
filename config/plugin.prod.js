
'use strict';

/** @type Egg.EggPlugin */
module.exports = {

  validate: {
    enable: true,
    // eslint-disable-next-line eggache/no-unexpected-plugin-keys
    convert: true,
    package: 'egg-validate',
  },

  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },

  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
