// Copyright 2021 Emergent Coin Inc. All Rights Reserved.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
