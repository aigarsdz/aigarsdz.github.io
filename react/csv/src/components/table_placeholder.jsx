import UploadButton from './upload_button'

function TablePlaceholder() {
  return (
    <UploadButton id="table_placeholder">
      <svg width="48px" height="48px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22V13M12 13L15.5 16.5M12 13L8.5 16.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path
          d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"></path>
      </svg>
    </UploadButton>
  )
}

export default TablePlaceholder
