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

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
  }

  async didLoad() {
  }

  async willReady() {
  }

  async didReady() {
    this.app.validator.addRule('address', (rule, value) => {
      if (rule.required && !value) {
        return 'should not be empty';
      }
      if (value && (value.indexOf('xch') !== 0 || value.length !== 62)) {
        return 'Invalid address';
      }
    });

    this.app.validator.addRule('jsonString', (rule, value) => {
      if (rule.required && !value) {
        return 'should not be empty';
      }
      try {
        JSON.parse(value);
      } catch (err) {
        return 'must be json string';
      }
    });
  }

  async serverDidReady() {
  }
}

module.exports = AppBootHook;
