import Papa from 'papaparse'

export function readFileFromInput(changeEvent) {
  const file = changeEvent.target.files[0]

  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader()

      reader.onload = loadEvent => {
        const fileContent = loadEvent.target.result
        const csvContent = Papa.parse(fileContent, {
          header: true
        })

        changeEvent.target.value = null

        resolve(csvContent)
      }

      reader.onerror = reject

      reader.readAsText(file)
    } else {
      resolve(null)
    }
  })
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
