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

const { SUCCESS, ERROR } = require('./responseCode');

module.exports = class ServerResponse {
  constructor(status, msg, data) {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }

  isSuccess() {
    return this.status === SUCCESS;
  }

  getStatus() {
    return this.status;
  }

  getData() {
    return this.data;
  }

  getMsg() {
    return this.msg;
  }

  static createBySuccessCode(status) {
    return new ServerResponse(status);
  }

  static createBySuccess() {
    return new ServerResponse(SUCCESS);
  }

  static createBySuccessMsg(msg) {
    return new ServerResponse(SUCCESS, msg, null);
  }

  static createBySuccessData(data) {
    return new ServerResponse(SUCCESS, null, data);
  }

  static createBySuccessMsgAndData(msg, data) {
    return new ServerResponse(SUCCESS, msg, data);
  }

  static createByError() {
    return new ServerResponse(ERROR, 'error', null);
  }

  static createByErrorMsg(errorMsg) {
    return new ServerResponse(ERROR, errorMsg, null);
  }

  static createByErrorCodeMsg(errorCode, errorMsg) {
    return new ServerResponse(errorCode, errorMsg, null);
  }
};
