
'use strict';
module.exports = () => {
  return async (ctx, next) => {
    let params = ctx.request.body;
    Object.keys(params).forEach(param => {
      const value = params[param];
      if (typeof value === 'string') {
        ctx.request.body[param] = value.trim();
      }
    });
    params = ctx.request.query;
    Object.keys(params).forEach(param => {
      const value = params[param];
      if (typeof value === 'string') {
        ctx.request.query[param] = value.trim();
        params[param] = value.trim();
      }
    });
    await next();
  };
};
