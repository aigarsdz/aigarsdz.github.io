import { parseJSONString } from './json_parser'

export function getUserDetailsFromEvents(events) {
	let user = {}
	let followList = []
	let userDetailsFound = false
	let followListFound = false

	for (let i = events.length - 1; i >= 0; i--) {
		const event = events[i]

		if (event.kind == 0 && !userDetailsFound) {
			user = parseUserDetails(event.content)
			userDetailsFound = true
		}

		if (event.kind == 3 && !followListFound) {
			followList = event.tags.map(tag => tag[1])
			followListFound = true
		}
	}

	user.followList = followList

	return user
}

function parseUserDetails(content) {
	return parseJSONString(content)
}