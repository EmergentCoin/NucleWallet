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
