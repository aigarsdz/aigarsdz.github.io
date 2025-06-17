export function readTextFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = loadEvent => resolve(loadEvent.target.result)
		reader.onerror = reject

		reader.readAsText(file)
	})
}

export function saveJSONFile(fileContent) {
  const downloadLink = document.createElement('a')
  const file = new Blob([fileContent], { type: 'application/json' })
  const timestamp = Date.now()

  downloadLink.href = URL.createObjectURL(file)
  downloadLink.download = `output_${timestamp}.json`

  downloadLink.click()
  URL.revokeObjectURL(downloadLink.href)
}
