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
const { Service } = require('egg');
const fs = require('fs');
const { bech32m } = require('bech32');

class TxService extends Service {
  constructor(ctx) {
    super(ctx);
    this.redis = ctx.app.redis;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * 
   *
   * @param {string} hash             
   * @param {address} from            
   * @param {address} to              
   * @param {number} amount           
   * @param {number} fee              
   * @param {json} spendBundle        
   * @param {string} withdraw         
   * @param {string} remark           
   */
  async sendSignedTx(hash, from, to, amount, spendBundle, fee, withdraw, remark) {
    
    const response = await this.ctx.curl(`${this.config.nodeUrl[0]}/push_tx`, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: JSON.parse(spendBundle),
      retry: 3,
      retryDelay: 100,
      
    });
    
    if (response && response.status === 200) {
      if (response.data.success) {
        this.ctx.helper.awards(from);
        return this.ServerResponse.createBySuccessMsgAndData('Send successfully', { hash, from, to, amount, fee, withdraw, remark });
      }
    }
    return this.ServerResponse.createByErrorMsg(response.data.error);
  }


  /**
   *  
   *
   * @param {address} address   
   */
  async getBalance(address) {
    const queryKey = 'balance:' + address;
    const balance = await this.redis.get(queryKey);
    if (balance && balance !== '') {
      return this.ServerResponse.createBySuccessMsgAndData('Get balance successfully', JSON.parse(balance));
    }

    
    address = Buffer.from(bech32m.fromWords(bech32m.decode(address).words)).toString('hex');
    const response = await this.ctx.curl(`${this.config.nodeUrl[0]}/get_coin_records_by_puzzle_hash`, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: {
        puzzle_hash: '0x' + address,
        include_spent_coins: false,
      },
      retry: 3,
      retryDelay: 100,
      
    });
    if (response && response.status === 200) {
      if (response.data.success) {
        const coins = response.data.coin_records.map(coin => {
          return coin.coin;
        });
        await this.redis.setnx(queryKey, JSON.stringify(coins));
        await this.redis.expire(queryKey, 10);
        return this.ServerResponse.createBySuccessMsgAndData('Get balance successfully', coins);
      }
    }
    return this.ServerResponse.createByErrorMsg(response.data.error);
  }


  async getLatestPriceByUSD() {
    const latestPrice = await this.redis.get('latestPrice');
    if (latestPrice) {
      const price = { latestPrice: JSON.parse(latestPrice) };
      return this.ServerResponse.createBySuccessMsgAndData('Get latest_price successfully', price);
    }
    const latestMsg = await this.ctx.curl('https://www.coinbase.com/api/v2/assets/prices/cf1f1de6-0a6e-5e15-a68c-e4678a67e60e?base=USD', {
      retry: 3,
      retryDelay: 100,
    });
    if (latestMsg) {
      const latestPrice = JSON.parse(latestMsg.data).data.prices.latest;
      await this.ctx.app.redis.set('latestPrice', JSON.stringify(latestPrice));
      return this.ServerResponse.createBySuccessMsgAndData('Get latest_price successfully', { price: latestPrice });
    }
    return this.ServerResponse.createByErrorMsg('There is no data');
  }
}


module.exports = TxService;
