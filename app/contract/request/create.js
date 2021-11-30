
'use strict';

module.exports = {
  sendTx: {
    hash: { type: 'string', required: true, description: 'hash' },
    from: { type: 'string', required: true, description: 'from' },
    to: { type: 'string', required: true, description: 'to' },
    amount: { type: 'number', required: true, description: 'amount' },
    spendBundle: { type: 'string', required: true, description: 'spendBundle' },
    fee: { type: 'number', required: false, description: 'fee' },
    withdraw: { type: 'string', required: false, description: 'withdraw' },
    remark: { type: 'string', required: false, description: 'remark' },
  },
  address: {
    address: { type: 'string', required: true, description: 'address' },
  },
};
