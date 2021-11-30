'use strict';

const Controller = require('egg').Controller;

/**
 * address test
 */

const Rule = {
  address: {
    type: 'address',
    required: true,
  },
};



/**
 * @controller
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.service = ctx.service.userService;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
	 * @summary  login
	 * @description  login req
	 * @router post /api/v1/user/login
	 * @request body address *
	 * @response 200 commonResponse
	 */
  async login() {
    const {
      address,
    } = this.ctx.request.body;
    const response = await this.service.login(address);
    if (response.isSuccess()) {
      
      this.ctx.rotateCsrfSecret();
      
      const res = await this.app.redis.scan(0, 'MATCH', `${address}*`);
      if (res && res[1].length === 1) {
        await this.app.redis.del(res[1][0]);
      }
      
      this.session.currentuser = address;
    }
    this.ctx.body = response;
  }
}

module.exports = UserController;
