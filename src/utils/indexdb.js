export default class IndexDb {
  constructor (options) {
    this.options = options
  }

  createDb (users) {
    let request = indexedDB.open('AdminDatabase', 1)

    request.onsuccess = (event) => {
      let db = event.target.result
      console.log(db)
    }

    request.onerror = (err) => {
      console.error(err)
    }

    request.onupgradeneeded = (event) => {
      let db = event.target.result
      if (!db.objectStoreNames.contains('users')) {
        let store = db.createObjectStore('users', {
          keyPath: 'store',
          autoincrement: true
        })
        store.put({
          store: 'Main Store',
          users: users
        })
      }
    }

    request.oncomplete = () => {
      request.close()
    }
  }

  queryDb ({key, getValue}) {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open('AdminDatabase', 1)

      request.onsuccess = (event) => {
        let db = event.target.result
        try {
          let tx = db.transaction(key, 'readonly')
          let store = tx.objectStore(key)
          let value = store.get(getValue)

          value.onsuccess = (event) => {
            resolve(event.target.result)
          }
        } catch (err) {
          // swallow err
        }
      }

      request.oncomplete = () => {
        request.close()
      }

      request.onerror = (err) => {
        console.error(err)
      }
    })
  }
}
