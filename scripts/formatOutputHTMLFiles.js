import fs from 'node:fs'
import { format } from 'oxfmt'

try	{
	const content = fs.readFileSync('dist/index.html').toString()
	const { code } = await format('dist/index.html', content)

	fs.writeFileSync('dist/index.html', code)
} catch (error) {
	console.error(error)
}