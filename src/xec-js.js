/*
  This is the primary library file for xec-js. This file combines all the other
  libraries in order to create the XECJS class.
*/

// xec-api mainnet.
const DEFAULT_REST_API = 'https://rest.kingbch.com/v4/'

// local deps
const BitcoinCash = require('./bitcoincash')
const Util = require('./util')
const Mnemonic = require('./mnemonic')
const Address = require('./address')
const HDNode = require('./hdnode')
const TransactionBuilder = require('./transaction-builder')
const ECPair = require('./ecpair')
const Script = require('./script')
const SLP = require('./slp/slp')
const Ecash = require('./ecash')

class XECJS {
  constructor (config) {
    // Try to retrieve the REST API URL from different sources.
    if (config && config.restURL && config.restURL !== '') {
      this.restURL = config.restURL
    } else if (process.env.RESTURL && process.env.RESTURL !== '') {
      this.restURL = process.env.RESTURL
    } else this.restURL = DEFAULT_REST_API

    // Retrieve the apiToken
    this.apiToken = '' // default value.
    if (config && config.apiToken && config.apiToken !== '') {
      this.apiToken = config.apiToken
    } else if (process.env.BCHJSTOKEN && process.env.BCHJSTOKEN !== '') {
      this.apiToken = process.env.BCHJSTOKEN
    }

    // Retrieve the Basic Authentication password.
    this.authPass = '' // default value.
    if (config && config.authPass && config.authPass !== '') {
      this.authPass = config.authPass
    } else if (process.env.BCHJSAUTHPASS && process.env.BCHJSAUTHPASS !== '') {
      this.authPass = process.env.BCHJSAUTHPASS
    }

    // Generate a Basic Authentication token from an auth password
    this.authToken = ''
    if (this.authPass) {
      // console.log(`bch-js initialized with authPass: ${this.authPass}`)
      // Generate the header for Basic Authentication.
      const combined = `fullstackcash:${this.authPass}`
      const base64Credential = Buffer.from(combined).toString('base64')
      this.authToken = `Basic ${base64Credential}`
    }

    const libConfig = {
      restURL: this.restURL,
      apiToken: this.apiToken,
      authToken: this.authToken
    }

    // Populate utility functions
    this.Address = new Address(libConfig)
    this.BitcoinCash = new BitcoinCash(this.Address)
    this.ECPair = ECPair
    this.ECPair.setAddress(this.Address)
    this.HDNode = new HDNode(this.Address)
    this.Mnemonic = new Mnemonic(this.Address)
    this.Script = new Script()
    this.TransactionBuilder = TransactionBuilder
    this.TransactionBuilder.setAddress(this.Address)
    this.Util = new Util(libConfig)

    this.SLP = new SLP(libConfig)
    this.SLP.HDNode = this.HDNode

    this.eCash = new Ecash()
  }
}

module.exports = XECJS
