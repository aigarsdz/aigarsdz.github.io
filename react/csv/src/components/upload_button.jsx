import { useRef } from 'react'
import { useGlobalState } from '../state'
import { readFileFromInput, readFileFromDrop } from '../lib/csv'

function UploadButton({ id, className, children }) {
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

  const receiveDrop = async event => {
    event.preventDefault()
    event.stopPropagation()

    const csvContent = await readFileFromDrop(event)

    if (csvContent) {
      setCSVContent(csvContent)
    }
  }

	return (
		<>
			<input type="file" name="csv_file" className="file-upload-field" ref={ fileUploadField } onChange={ readFile } />
			<button type="button" id={id} className={className} onClick={ triggerUpload } onDrop={ receiveDrop } onDragOver={event => event.preventDefault()}>

				{children}

			</button>
		</>
	)
}

export default UploadButton