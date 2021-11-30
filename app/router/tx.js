
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const perfix = '/api/v1/tx/';
  router.post(`${perfix}sendTx`, controller.txController.sendSignedTx);
  router.get(`${perfix}getBalanceByAddress`, controller.txController.getBalanceByAddress);
};
