
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const perfix = '/api/v1/user/';
  router.post(`${perfix}login`, controller.userController.login);
  router.post(`${perfix}checkLogin`, {});
  router.options(`${perfix}csrf`, {});
};
