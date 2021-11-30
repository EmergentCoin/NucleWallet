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
