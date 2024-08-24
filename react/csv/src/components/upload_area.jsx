import { useRef } from 'react'
import { useGlobalState } from '../state'
import { readFileFromInput } from '../lib/csv'

function UploadArea({ children, ...attributes }) {
  const [csvContent, setCSVContent] = useGlobalState('csvContent')
  const fileUploadField = useRef(null)

  const readFile = async changeEvent => {
    const csvContent = await readFileFromInput(changeEvent)

    if (csvContent) {
      setCSVContent(csvContent)
    }
  }

  const triggerUpload = event => {
    event.preventDefault()
    fileUploadField.current?.click()
  }

  return (
    <div { ...attributes }>
      <input type="file" name="csv_file" className="file-upload-field" ref={ fileUploadField } onChange={ readFile } />

      <a href="/upload" onClick={ triggerUpload } className="upload-area-trigger">

        { children }

      </a>
    </div>
  )
}

export default UploadArea
