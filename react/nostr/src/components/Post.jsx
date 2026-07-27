import * as nip10 from '@nostr/tools/nip10'
import Repost from './Repost'

import '../css/post.css'

export default function Post({ post }) {
  const event = nip10.parse(post)

  if (event.reply) return null

  if (post.kind == 6) return <Repost post={post} />

	return (
		<article className="post">
      <time>{(new Date(post.created_at * 1000)).toLocaleString()}</time>
      <p key={post.sig}>{post.content}</p>
    </article>
	)
}