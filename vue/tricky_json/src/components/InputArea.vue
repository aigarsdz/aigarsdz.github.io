<script setup>
	import { ref, useTemplateRef, onUpdated } from 'vue'

	import state from '@/state'

	const textArea = useTemplateRef('input-area')

	let caretPosition = ref(0)
	let caretPositionChanged = ref(false)

	function insertTab(currentCaretPosition) {
		const updatedCaretPosition = currentCaretPosition + 2
		const updatedInput = state.input.substring(0, currentCaretPosition) + '  ' + state.input.substring(currentCaretPosition, state.input.length)

		caretPosition = updatedCaretPosition
		caretPositionChanged = true

		state.updateInput(updatedInput)
	}

	function insertMatchingCharacter(currentCaretPosition, character, matchingCharacter) {
		const updatedCaretPosition = currentCaretPosition + 1
		const updatedInput = state.input.substring(0, currentCaretPosition)
			+ `${character}${matchingCharacter}`
			+ state.input.substring(currentCaretPosition, state.input.length)

		caretPosition = updatedCaretPosition
		caretPositionChanged = true

		state.updateInput(updatedInput)
	}

	function handleKeyDown(event) {
		const currentCaretPosition = event.target.selectionStart
		const pairCharacters = ['{', "'", '"', '[']
		const matchingPairCharacters = ['}', "'", '"', ']']
		const characterIndex = pairCharacters.indexOf(event.key)

		if (event.key == 'Tab') {
			event.preventDefault()

			insertTab(currentCaretPosition)
		} else if (characterIndex > -1) {
			event.preventDefault()

			insertMatchingCharacter(currentCaretPosition, event.key, matchingPairCharacters[characterIndex])
		}
	}

	onUpdated(() => {
		if (caretPositionChanged === true) {
			textArea.value.selectionStart = caretPosition
			textArea.value.selectionEnd = caretPosition

			caretPositionChanged = false
		}
	})
</script>

<template>
	<textarea
		placeholder="{}"
		id="input_area"
		ref="input-area"
		@keydown="handleKeyDown"
		@input="event => state.updateInput(event.target.value)"
		:value="state.input"
	></textarea>
</template>