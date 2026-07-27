import { parseJSONString } from '../lib/json_parser'

export default function Repost({ post }) {
	const originalPost = parseJSONString(post.content)

	return (
		<div>
      <time>{(new Date(originalPost.created_at * 1000)).toLocaleString()}</time>
      <p key={originalPost.sig}>{originalPost.content}</p>
    </div>
	)
}