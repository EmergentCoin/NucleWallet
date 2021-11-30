
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.router.redirect('/', '/swagger-ui.html', 302);
};
