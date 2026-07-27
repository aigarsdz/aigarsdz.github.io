import { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { SimplePool } from '@nostr/tools/pool'
import { nip19 } from '@nostr/tools'
import { BunkerSigner } from '@nostr/tools/nip46'
import { getBunkerPointerFromBunkerURI, getClientSecretKey, getStoredBunkerPointer } from './lib/authentication'
import { getUserDetailsFromEvents } from './lib/user'
import Post from './components/Post'

import './css/home.css'

const CLIENT_SECRET_KEY = getClientSecretKey()
const INITIAL_FEED_LENGTH = 20

const feedBuffer = []
let counter = 0

function App() {
  const [pool] = useState(new SimplePool({ enablePing: true, enableReconnect: true }))
  const [user, setUser] = useState({ followList: [] })
  const [userPublicKey, setUserPublicKey] = useState(null)
  const [bunker, setBunker] = useState(null)
  const [feed, setFeed] = useState([])
  const [initialFeedLoaded, setInitialFeedLoaded] = useState(false)

  async function connectToBunker(bunkerURI) {
    const bunkerPointer = await getBunkerPointerFromBunkerURI(bunkerURI, pool)
    const bunkerSigner = BunkerSigner.fromBunker(CLIENT_SECRET_KEY, bunkerPointer, { pool })

    await bunkerSigner.connect()

    const key = await bunkerSigner.getPublicKey()

    setUserPublicKey(key)
    setBunker(bunkerSigner)
    localStorage.setItem('user_public_key', key)
    localStorage.setItem('bunker_pointer', JSON.stringify(bunkerPointer))
  }

  async function signIn(formData) {
    const bunkerURI = formData.get('uri')

    try {
      await connectToBunker(bunkerURI)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (bunker) {
      pool.querySync(
        bunker.bp.relays,
        {
          kinds: [0, 3],
          authors: [userPublicKey]
        }
      ).then(events => setUser(getUserDetailsFromEvents(events)))
    }
  }, [bunker, pool])

  useEffect(() => {
    if (bunker) {
      const subscription = pool.subscribe(
        bunker.bp.relays,
        {
          kinds: [1, 6, 30023],
          authors: [userPublicKey, ...user.followList],
          limit: INITIAL_FEED_LENGTH
        },
        {
          onevent(event) {
            console.log(event)

            if (initialFeedLoaded) {
              setFeed([event, ...feed])
            } else {
              feedBuffer.unshift(event)
              feedBuffer.sort((a, b) => b.created_at - a.created_at)
            }
          },
          oneose() {
            setInitialFeedLoaded(true)
            setFeed(feedBuffer)
          }
        }
      )

      return () => subscription.close()
    }
  }, [user])

  useEffect(() => {
    const bunkerPointer = getStoredBunkerPointer()

    if (bunkerPointer) {
      setUserPublicKey(localStorage.getItem('user_public_key'))
      setBunker(BunkerSigner.fromBunker(CLIENT_SECRET_KEY, bunkerPointer, { pool }))
    }

    return () => {
      if (bunker) {
        bunker.close().then(() => pool.close([]))
      }
    }
  }, [])

  return (
    <main>
      {bunker ? (
        <>
          <header>
            <div id="user_picture">
              {user.picture && <img src={user.picture} />}
            </div>

            <div id="user-details">
              <div><span id="username">{user.display_name}</span> &middot; {nip19.npubEncode(userPublicKey)}</div>
              <div id="nip05_address">{user.nip05}</div>
              <div>🌐 {user.website}</div>
              <div>👪 {user.followList.length}</div>
              <hr />
              <div id="user_description">{user.about}</div>
            </div>
          </header>

          <div id="post_list">
            {feed.map(post => <Post post={post} key={post.sig} />)}
          </div>
        </>
      ) : (
        <ErrorBoundary>
          <form action={signIn}>
            <input type="text" name="uri" />
            <button type="submit">Sign in</button>
          </form>
        </ErrorBoundary>
      )}
    </main>
  )
}

export default App
