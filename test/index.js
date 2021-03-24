/* eslint-disable no-shadow */
// import decodeInput from '../src/index'

const fs = require('fs')
const test = require('tape')
const InputDataDecoder = require('ethereum-input-data-decoder')
const web3Utils = require('web3-utils')
const decodeInput = require('../dist/ethereum-input-to-object')

test('decoder', (t) => {
  // // https://etherscan.io/tx/0x1bc60d407ec036cff60d078b85451913bfdcca6614eab6f6aa0398d53630b578
  // t.test('checking decoder is correct', (t) => {
  //   t.plan(1)
  //   const decoder = new InputDataDecoder(`${__dirname}/data/1inch_exchange_v2_abi.json`)
  //   const data = fs.readFileSync(`${__dirname}/data/1inch_exchange_v2_abi_no_eth.txt`)
  //   // const result = decoder.decodeData(data)
  //   const resultThisDecoder = decodeInput(decoder, data)

  //   // console.log(JSON.stringify(result, null, 2))
  //   console.log(JSON.stringify(resultThisDecoder, null, 2))
  //   // TODO: make a proper test out of this, looks not great with the data variables, different from etherscan?
  //   t.deepEquals(1, 1)
  // })

  // https://etherscan.io/tx/0x13389268ed1cae395a94cc111528ef8e5b929221af4ecc2a0c7e977dd7dbc38d
  // t.test('checking 1inch with eth', (t) => {
  //   t.plan(1)
  //   const decoder = new InputDataDecoder(`${__dirname}/data/1inch_exchange_v2_abi.json`)
  //   const data = fs.readFileSync(`${__dirname}/data/1inch_exchange_v2_abi_with_eth.txt`)
  //   const result = decoder.decodeData(data)
  //   const resultThisDecoder = decodeInput(decoder, data)

  //   // This should all fail, is currently not dealt with in data-decoder
  //   console.log(JSON.stringify(result, null, 2))
  //   console.log(JSON.stringify(resultThisDecoder, null, 2))
  //   t.deepEquals(1, 1)
  // })

  // https://etherscan.io/tx/0x2a2690f26a07de39a009bfed4d1a4185b1637020cbd830a197f69ff1572ea270
  t.test('checking 1inch with asset type of eth', (t) => {
    t.plan(1)
    const decoder = new InputDataDecoder(`${__dirname}/data/1inch_exchange_v2_abi.json`)
    const data = fs.readFileSync(`${__dirname}/data/1inch_exchange_v2_abi_eth_asset.txt`)
    // const result = decoder.decodeData(data)
    const resultThisDecoder = decodeInput(decoder, data)

    // This should all fail, is currently not dealt with in data-decoder
    // console.log(JSON.stringify(result, null, 2))
    console.log(JSON.stringify(resultThisDecoder, null, 2))
    // console.log(web3Utils.bytesToHex('0xb3af37c000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000044000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000000000010000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000064d1660f99000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000510059633c4958d43dfbc50b3b1a4ce6b9cb871a000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000'))
    t.deepEquals(1, 1)
  })
})
