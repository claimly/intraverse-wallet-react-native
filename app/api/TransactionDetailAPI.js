import ApiCaller from './api-caller'

class TransactionDetailAPI {
  getBalanceToken(address, token) {
    // return ApiCaller.get(`http://wallet.skylab.vn/balance/${address}/${token === address ? 'eth' : token}`)
    return Promise.resolve({})
  }
}

export default new TransactionDetailAPI()
