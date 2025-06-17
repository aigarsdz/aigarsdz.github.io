<script setup>
import { useTemplateRef } from 'vue'
import state from '@/state'
import { readTextFile, saveJSONFile } from '@/lib/file_handler'

const fileField = useTemplateRef('file-field')

function openFile() {
	fileField.value.click()
}

async function readFile(event) {
	if (event.target.files.length > 0) {
		const fileContent = await readTextFile(event.target.files[0])

    state.updateInput(fileContent)
	}
}

function saveOutput() {
  saveJSONFile(state.output)
}

function clearInput() {
	state.updateInput('')
}
</script>

<template>
	<div id="toolbar">
		<input type="file" ref="file-field" style="display: none;" @change="readFile">

    <button type="button" @click="openFile">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
        <path
          d="M245,110.64A16,16,0,0,0,232,104H216V88a16,16,0,0,0-16-16H130.67L102.94,51.2a16.14,16.14,0,0,0-9.6-3.2H40A16,16,0,0,0,24,64V208h0a8,8,0,0,0,8,8H211.1a8,8,0,0,0,7.59-5.47l28.49-85.47A16.05,16.05,0,0,0,245,110.64ZM93.34,64,123.2,86.4A8,8,0,0,0,128,88h72v16H69.77a16,16,0,0,0-15.18,10.94L40,158.7V64Zm112,136H43.1l26.67-80H232Z">
        </path>
      </svg>
    </button>
    <button type="button" @click="saveOutput">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
        <path
          d="M219.31,72,184,36.69A15.86,15.86,0,0,0,172.69,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V83.31A15.86,15.86,0,0,0,219.31,72ZM168,208H88V152h80Zm40,0H184V152a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v56H48V48H172.69L208,83.31ZM160,72a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h56A8,8,0,0,1,160,72Z">
        </path>
      </svg>
    </button>
    <button type="button" @click="clearInput">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
        <path
          d="M225,80.4,183.6,39a24,24,0,0,0-33.94,0L31,157.66a24,24,0,0,0,0,33.94l30.06,30.06A8,8,0,0,0,66.74,224H216a8,8,0,0,0,0-16h-84.7L225,114.34A24,24,0,0,0,225,80.4ZM108.68,208H70.05L42.33,180.28a8,8,0,0,1,0-11.31L96,115.31,148.69,168Zm105-105L160,156.69,107.31,104,161,50.34a8,8,0,0,1,11.32,0l41.38,41.38a8,8,0,0,1,0,11.31Z">
        </path>
      </svg>
    </button>
  </div>
</template>