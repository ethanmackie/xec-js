/*
    Bare bones XEC native transtion builder example
*/

// xec-js-examples require code from the main bch-js repo
const XECJS = require('../src/xec-js')

// Instantiate xec-js based on the network.
const xecjs = new XECJS()

const log = console.log

// Sample transaction building parameters
// Your app should be parsing these via utxo and balance -related api calls
// =============================================================================
const SEND_ADDR = 'ecash:qpa....'
const SEND_MNEMONIC = '...'
const RECV_ADDR = 'ecash:qzvy....'
const originalAmount = 50000000
const satoshisToSend = 1000
const txid = '8f9dfa294314d70db248dc05fb9703b6e65440354026ebca6b07526f46d6fa2f'
const vout = 0
// =============================================================================

async function buildXecTx () {
  try {
    // instantiate transaction builder
    const transactionBuilder = new xecjs.TransactionBuilder()

    // add input with txid and index of vout
    transactionBuilder.addInput(txid, vout)

    // get byte count to calculate fee. paying 1.2 sat/byte
    const byteCount = xecjs.BitcoinCash.getByteCount(
      { P2PKH: 1 },
      { P2PKH: 2 }
    )

    log(`Transaction byte count: ${byteCount}`)
    const satoshisPerByte = 1.2
    const txFee = Math.floor(satoshisPerByte * byteCount)
    log(`Transaction fee: ${txFee}`)

    // amount to send back to the sending address.
    // It's the original amount - 1 sat/byte for tx size
    const remainder = originalAmount - satoshisToSend - txFee

    if (remainder < 0) {
      throw new Error('Not enough XEC to complete transaction!')
    }

    // add output w/ address and amount to send
    transactionBuilder.addOutput(RECV_ADDR, satoshisToSend)
    transactionBuilder.addOutput(SEND_ADDR, remainder)

    // Generate a change address from a Mnemonic of a private key.
    const keyPair = await keyPairFromMnemonic(SEND_MNEMONIC)
    // Generate a keypair from the change address.
    // Sign the transaction with the HD node.
    let redeemScript
    transactionBuilder.sign(
      0,
      keyPair,
      redeemScript,
      transactionBuilder.hashTypes.SIGHASH_ALL,
      originalAmount
    )

    // build tx
    const tx = transactionBuilder.build()

    // output rawhex
    const hex = tx.toHex()
    log(`TX hex: ${hex}`)

    // Insert logic to broadcast transation to the network
    // either via bch-api or chronik-client
  } catch (err) {
    log('error: ', err)
  }
}
buildXecTx()

// Generate a change address from a Mnemonic of a private key.
async function keyPairFromMnemonic (mnemonic) {
  // root seed buffer
  const rootSeed = await xecjs.Mnemonic.toSeed(mnemonic)
  // master HDNode
  const masterHDNode = xecjs.HDNode.fromSeed(rootSeed)

  // HDNode of BIP44 account
  // Note: Cashtab uses deriv path 1899
  const account = xecjs.HDNode.derivePath(masterHDNode, "m/44'/1899'/0'/0/0")

  return account
}
