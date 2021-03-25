/* eslint-disable no-shadow */
const fs = require('fs')
const test = require('tape')
const InputDataDecoder = require('ethereum-input-data-decoder')
const decodeInput = require('../dist/ethereum-input-to-object')

test('decoder', (t) => {
  // This test needs to be commented out until nested tuples are dealt with in
  // `ethereum-input-data-decoder`, you can point dependency to this to fix this test
  // `git@github.com:alexcampbelling/ethereum-input-data-decoder.git#fix/nested-tuple-array`

  // t.test('Checking 1inch v2 swap for bytes type', (t) => {
  //   t.plan(1)

  //   const decoder = new InputDataDecoder(`${__dirname}/data/1inch_exchange_v2_abi.json`)

  //   // This used to have trouble decoding, Eth Asset, WETH in the internals
  //   // The important part is that the data which is type 'bytes' isn't double decoded
  //   // https://etherscan.io/tx/0x3693b42398beaf1e367cfe004b6606697764bc99ab1d5c01c300b760034be46c
  //   const data = fs.readFileSync(`${__dirname}/data/1inch_exchange_v2_assetEth_withWeth.txt`)
  //   const result = decodeInput(decoder, data)

  //   const expectedSwap = fs.readFileSync(`${__dirname}/data/1inch_v2_expectedSwap.json`)

  //   // Ensure v2 swap calls are not double decoding data
  //   t.deepEquals(result, JSON.parse(expectedSwap))
  // })

  t.test('Checking 1inch v3 unoswap for bytes32[] type', (t) => {
    t.plan(1)

    const decoder = new InputDataDecoder(`${__dirname}/data/1inch_exchange_v3_abi.json`)

    // Normal unoswap tx, has a bytes32[] array we want to ensure does not double decode
    const data = fs.readFileSync(`${__dirname}/data/1inch_exchange_v3_unoswap.txt`)
    const result = decodeInput(decoder, data)

    const expectedUnoswap = {
      methodName: 'unoswap',
      params: {
        srcToken: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        amount: '55075286902',
        minReturn: '5200361379387703126290',
        '': [
          '0x80000000000000003b6d03400d4a11d5eeaac28ec3f61d100daf4d40471f1852',
          '0x00000000000000003b6d034018a797c7c70c1bf22fdee1c09062aba709cacf04'],
      },
    }
    t.deepEquals(result, expectedUnoswap)
  })


  t.test('Checking 0x_v3 for bytes[] type', (t) => {
    t.plan(1)

    const decoder = new InputDataDecoder(`${__dirname}/data/0x_v3_abi.json`)

    // batchFillOrders which has a bytes[] type, to check we are not double decoding
    const data = fs.readFileSync(`${__dirname}/data/0x_v3_batchFillOrders.txt`)
    const result = decodeInput(decoder, data)

    const expectedbatchFillOrders = {
      methodName: 'batchFillOrders',
      params: {
        orders: [{
          makerAddress: '0x75ea4d5a32370f974D40b404E4cE0E00C1554979',
          takerAddress: '0x0000000000000000000000000000000000000000',
          feeRecipientAddress: '0x1000000000000000000000000000000000000011',
          senderAddress: '0x0000000000000000000000000000000000000000',
          makerAssetAmount: '7808845788',
          takerAssetAmount: '1218396496',
          makerFee: '0',
          takerFee: '0',
          expirationTimeSeconds: '1610851745',
          salt: '935753695886941056',
          makerAssetData: '0xf47261b000000000000000000000000077d7e314f82e49a4faff5cc1d2ed0bc7a7c1b1f0',
          takerAssetData: '0xf47261b0000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          makerFeeAssetData: '0x',
          takerFeeAssetData: '0x',
        }],
        takerAssetFillAmounts: ['15602774'],
        signatures: ['0x1b54c660e791da4c5d11f5f82993040ffc11d68c81364312eca3729ebb97fcaea731b7ec5121978e80a3f88c9134687c3d1a551414b11e0d75ab8919ef15759e3d02'],
      },
    }
    t.deepEquals(result, expectedbatchFillOrders)
  })
})
