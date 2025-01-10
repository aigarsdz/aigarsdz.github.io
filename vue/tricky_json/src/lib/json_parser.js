const DOUBLE_QUOTE = '"'
const SINGLE_QUOTE = "'"
const LEFT_CURLY_BRACE = '{'
const RIGHT_CURLY_BRACE = '}'
const LEFT_SQUARE_BRACKET = '['
const RIGHT_SQUARE_BRACKET = ']'
const COLON = ':'
const COMMA = ','
const WHITESPACE = [' ', '\t', '\b', '\n', '\r']
const SYNTAX_ELEMENTS = [LEFT_CURLY_BRACE, RIGHT_CURLY_BRACE, LEFT_SQUARE_BRACKET, RIGHT_SQUARE_BRACKET, COLON]

function parseString(characters) {
	let character = characters.shift()
	let result = ''
	let quoteMode = DOUBLE_QUOTE

	if (character == DOUBLE_QUOTE) {
		quoteMode = DOUBLE_QUOTE
	} else if (character == SINGLE_QUOTE) {
		quoteMode = SINGLE_QUOTE
	} else {
		characters.unshift(character)

		return null
	}

	while (characters.length > 0) {
		character = characters.shift()

		if ((quoteMode == DOUBLE_QUOTE && character == DOUBLE_QUOTE) || (quoteMode == SINGLE_QUOTE && character == SINGLE_QUOTE)) {
			break
		} else {
			result += character
		}
	}

	return result
}

function parseNumber(characters) {
	const numberCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', 'e', 'E']

	let character = null
	let result = ''

	while (characters.length > 0) {
		character = characters.shift()

		if (numberCharacters.includes(character)) {
			result += character
		} else {
			characters.unshift(character)

			break
		}
	}

	if (result.length == 0) {
		return null
	}

	if (result.includes('.')) {
		return parseFloat(result)
	}

	return parseInt(result, 10)
}

function parseBool(characters) {
	if (characters.length > 5) {
		const text = characters.slice(0, 5).join('')

		if (text == 'false') {
			characters.splice(0, 5)

			return false
		}
	}

	if (characters.length > 4) {
		const text = characters.slice(0, 4).join('')

		if (text == 'true') {
			characters.splice(0, 4)

			return false
		}
	}

	return null
}

function parseNull(characters) {
	if (characters.length > 4) {
		const text = characters.slice(0, 4).join('')

		if (text == 'null') {
			characters.splice(0, 4)

			return true
		}
	}

	return null
}

function parseKey(characters) {
	let character = characters.shift()
	let result = ''

	if (SYNTAX_ELEMENTS.includes(character) || WHITESPACE.includes(character) || character == COMMA) {
		characters.unshift(character)

		return null
	}

	while (characters.length > 0) {
		if (character == COLON) {
			characters.unshift(character)

			break
		} else {
			result += character
		}

		character = characters.shift()
	}

	return result
}

function parseSingleLineComment(characters) {
	let character = characters.shift()
	let nextCharacter = characters.shift()

	if (character != '/' || (character == '/' && nextCharacter != '/')) {
		characters.unshift(nextCharacter)
		characters.unshift(character)

		return null
	}

	while (characters.length > 0) {
		if (character == '\n' || character == '\r') {
			break
		}

		character = characters.shift()
	}
}

function parseMultiLineComment(characters) {
	let character = characters.shift()
	let nextCharacter = characters.shift()

	if (character != '/' || nextCharacter != '*') {
		characters.unshift(nextCharacter)
		characters.unshift(character)

		return null
	}

	while (characters.length > 0) {
		character = nextCharacter
		nextCharacter = characters.shift()

		if (character == '*' && nextCharacter == '/') {
			break
		}
	}
}

export function tokenize(value) {
	const characters = value.split('')
	const tokens = []
	let token = null

	while (characters.length > 0) {
		parseSingleLineComment(characters)
		parseMultiLineComment(characters)

		token = parseString(characters)

		if (token != null) {
			tokens.push(token)

			continue
		}

		token = parseNumber(characters)

		if (token != null) {
			tokens.push(token)

			continue
		}

		token = parseBool(characters)

		if (token != null) {
			tokens.push(token)

			continue
		}

		token = parseNull(characters)

		if (token != null) {
			tokens.push(null)

			continue
		}

		token = parseKey(characters)

		if (token != null) {
			tokens.push(token)

			continue
		}

		const character = characters.shift()

		if (SYNTAX_ELEMENTS.includes(character)) {
			tokens.push(character)
		}
	}

	return tokens
}

function parseObject(tokens) {
	const result = {}

	let token
	let nextToken
	let value

	while (tokens.length > 0) {
		token = tokens.shift()

		if (token == RIGHT_CURLY_BRACE) {
			break
		}

		if (tokens.length > 1) {
			nextToken = tokens.shift()

			if (nextToken == COLON) {
				value = parse(tokens, false)
				result[token] = value
			}
		}
	}

	return result
}

function parseArray(tokens) {
	const result = []

	let token
	let nextToken
	let value

	while (tokens.length > 0) {
		nextToken = tokens.shift()

		if (nextToken == RIGHT_SQUARE_BRACKET) {
			break
		} else {
			tokens.unshift(nextToken)
		}

		value = parse(tokens, false)

		result.push(value)
	}

	return result
}

export function parse(tokens, root = true) {
	const token = tokens.shift()

	if (root && (token != LEFT_CURLY_BRACE && token != LEFT_SQUARE_BRACKET)) {
		return null
	}

	if (token == LEFT_CURLY_BRACE) {
		return parseObject(tokens)
	} else if (token == LEFT_SQUARE_BRACKET) {
		return parseArray(tokens)
	}

	return token
}