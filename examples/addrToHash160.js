/*
    Convert an eCash address to hash160 public key hash example
*/

// import to become relative after npm publication
const XECJS = require('../src/xec-js')
// const ecashaddrjs = require('ecashaddrjs')

// Instantiate xec-js based on the network.
const xecjs = new XECJS()

const log = console.log

const ECASH_ADDR = 'ecash:qzagy47mvh6qxkvcn3acjnz73rkhkc6y7ccxkrr6zd'

async function addrToHash160 (eCashAddr) {
  try {
    // direct conversion of an eCash address to hash160 public key hash
    const hash160 = xecjs.Address.toHash160(eCashAddr)
    log('The hash160 for ' + ECASH_ADDR + ' is: ' + hash160)
  } catch (err) {
    log('Error in addrToHash160(): ' + err)
  }
}
addrToHash160(ECASH_ADDR)
