
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
