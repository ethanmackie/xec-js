# xec-js

[![Version](https://img.shields.io/npm/v/xec-js)](https://www.npmjs.com/package/xec-js)
[![Downloads/week](https://img.shields.io/npm/dw/xec-js)](https://npmjs.org/package/xec-js)
[![License](https://img.shields.io/npm/l/@xec-js)](https://github.com/ethanmackie/xec-js/blob/main/LICENSE.md)
[![js-standard-style](https://img.shields.io/badge/javascript-standard%20code%20style-green.svg?style=flat-square)](https://github.com/feross/standard)

[xec-js](https://www.npmjs.com/package/xec-js) is a JavaScript npm library for creating web and mobile apps that can interact with the eCash (XEC) blockchain.

### Quick Links

- [npm Library](https://www.npmjs.com/package/xec-js)
- [Documentation](https://bchjs.fullstack.cash/) (being)
- [rest.kingbch.com](https://rest.kingbch.com) - The eCash REST API this library talks to by default.
- [FullStack.cash](https://fullstack.cash) - cloud-based infrastructure for application developers.
- [Permissionless Software Foundation](https://psfoundation.cash) - The organization that maintains the original library that this is forked from.

### Quick Notes

- Install library: `npm install xec-js`

- Instantiate the library in your code:

```
const XECJS = require("xec-js")
let xecjs = new XECJS() // Defaults to the XEC network.
```

This library is intended to be paired with the 
the [xec-api](https://rest.kingbch.com/) REST API. The `restURL` property can be changed to work with different eCash XEC networks:

- Default eCash REST API server: https://rest.kingbch.com/v4/
- PSF's ABC Mainnet REST API server: https://abc.fullstack.cash/v5/


## New eCash Features

- transaction-builder can now directly take in an eCash address as part of adding tx outputs without the need for cash address conversion beforehand
> See [buildXecTx.js](https://github.com/ethanmackie/xec-js/tree/main/examples/buildXecTx.js) example

- Address.toHash160() can now directly take in an eCash address for conversion to a hash160 public key hash
> See [addrToHash160.js](https://github.com/ethanmackie/xec-js/tree/main/examples/addrToHash160.js) example

- Address.toCashAddress() can now directly take in an eCash address for conversion to a cash address


## License

[MIT](LICENSE.md)

