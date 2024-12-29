import Papa from 'papaparse'

function readFileContent(file) {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader()

      reader.onload = loadEvent => {
        const fileContent = loadEvent.target.result
        const csvContent = Papa.parse(fileContent, {
          header: true
        })

        resolve(csvContent)
      }

      reader.onerror = reject

      reader.readAsText(file)
    } else {
      resolve(null)
    }
  })
}

export function readFileFromInput(changeEvent) {
  const file = changeEvent.target.files[0]

  changeEvent.target.value = null

  return readFileContent(file)
}

export function readFileFromDrop(event) {
  if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
    return readFileContent(event.dataTransfer.files[0])
  }

  return Promise.reject(new Error('A file has not been provided'))
}

export function exportCSVFile(data) {
  const fileContent = Papa.unparse(data)
  const downloadLinkElement = document.createElement('a')

  downloadLinkElement.href = URL.createObjectURL(new Blob([fileContent], { type: 'text/csv' }))
  downloadLinkElement.download = 'table.csv'

  document.body.appendChild(downloadLinkElement)
  downloadLinkElement.click()
  document.body.removeChild(downloadLinkElement)
}
