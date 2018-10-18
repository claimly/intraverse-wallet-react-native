import branch from 'react-native-branch'
import WalletReceiveStore from '../modules/WalletReceive/WalletReceiveStore'

class BranchListener {
  _unsubscribeFromBranch = null

  init() {
    _unsubscribeFromBranch = branch.subscribe(({ error, params }) => {
      if (error) {
        console.error('Error from Branch: ' + error)
        return
      }

      // params will never be null if error is null

      if (params['+non_branch_link']) {
        const nonBranchUrl = params['+non_branch_link']
        // Route non-Branch URL if appropriate.
        return
      }

      if (!params['+clicked_branch_link']) {
        // Indicates initialization success and some other conditions.
        // No link was opened.
        return
      }

      // A Branch link was opened.
      // Route link based on data in params.

      if (!params['snd']) {
        // link wasn't a valid send
        return
      }

      const snd = params.snd
      WalletReceiveStore.isInitFromNotification = true
      WalletReceiveStore.setCurrentReceipt(snd)
    })
  }

  stop() {
    if (_unsubscribeFromBranch) {
      _unsubscribeFromBranch()
      _unsubscribeFromBranch = null
    }
  }
}

export default new BranchListener()
