# ethereum-input-to-object

Decodes an Ethereum input data hex string into a developer friendly JavaScript object.

## Aim

The goal of ethereum-input-to-object is to facilitate dead-simple conversion of a transaction input into a JavaScript native, serializable object.

## Usage

### Simple example

Pass an ABI and input to `inputToObject`

```javascript
import inputToObject from 'ethereum-input-to-object';
const erc20Abi = [{ ... }];
const input = '0xa9059cbb0000000000000000000000005a1cb5a88988ca4fef229935db834a6781e873cb0000000000000000000000000000000000000000000000000de0b6b3a7640000';
const decoded = inputToObject(erc20Abi, input);
console.log(decoded);
```

```javascript
{
  methodName: 'transfer',
  params: {
    _to: '0x5A1Cb5A88988cA4FEF229935db834A6781e873cB',
    _value: '1000000000000000000'
  }
}
```

### Unable to decode example

If the input does not match the ABI, `inputToObject` returns `null`

```javascript
import inputToObject from 'ethereum-input-to-object';
const erc20Abi = [{ ... }];
const input = '0xgarbage';
const decoded = inputToObject(erc20Abi, input);
console.log(decoded);
```

```javascript
null
```

### Complex example

`inputToObject` also supports decoding and conversion of complex, nested Solidity data structures.

```javascript
import inputToObject from 'ethereum-input-to-object';
const setProtocolRebalancingExchangeIssuanceV2Abi = [{ ... }];
const input = '0x16919b9...'; // Truncated for example
const decoded = inputToObject(erc20Abi, input);
console.log(decoded);
```

```javascript
{
  methodName: 'issueRebalancingSetWithEther',
  params: {
    _rebalancingSetAddress: '0x81c55017F7Ce6E72451cEd49FF7bAB1e3DF64d0C',
    _rebalancingSetQuantity: '2810697751873000000',
    _exchangeIssuanceParams: {
      setAddress: '0xA37dE6790861B5541b0dAa7d0C0e651F44c6f4D9',
      quantity: '16878240000000000',
      sendTokenExchangeIds: ['1'],
      sendTokens: ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
      sendTokenAmounts: ['1874799564199638103'],
      receiveTokens: ['0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359', '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'],
      receiveTokenAmounts: ['121675511211317568000', '1687824'],
    },
    _orderData: '0x000000000000000000000000...', // Truncated for example
    _keepChangeInVault: true,
  }
}
```

### Decoder param example

If you prefer, you may pass a `decoder` created using [ethereum-input-data-decoder](https://github.com/miguelmota/ethereum-input-data-decoder) instead of an ABI as the first parameter

```javascript
import InputDataDecoder from 'ethereum-input-data-decoder';
import inputToObject from 'ethereum-input-to-object';
const erc20Abi = [{ ... }];
const erc20Decoder = new InputDataDecoder(erc20Abi);
const input = '0xa9059cbb0000000000000000000000005a1cb5a88988ca4fef229935db834a6781e873cb0000000000000000000000000000000000000000000000000de0b6b3a7640000';
const decoded = inputToObject(erc20Abi, input);
console.log(decoded);
```

```javascript
{
  methodName: 'transfer',
  params: {
    _to: '0x5A1Cb5A88988cA4FEF229935db834A6781e873cB',
    _value: '1000000000000000000'
  }
}
```

### Usage in node.js

When ES6 imports are not avaliable, `require` the dependency like this

```javascript
const inputToObject = require('ethereum-input-to-object').default
```

### Supported types

| Solidity | JavaScript equivalent used
|------|--------|
| int (all variations) | String
| address | String
| string | String
| bool | Boolean
| bytes (all variations) | String (hex formatted)
| tuple | Object (with contents also converted)
| array | Array (with contents also converted)

Using a type not supported? Open an issue.

## ethereum-input-data-decoder

This library is built on the great work by Miguel on [ethereum-input-data-decoder](https://github.com/miguelmota/ethereum-input-data-decoder).

If ethereum-input-to-object prioritises convenience over function too much for you, check out his project.
