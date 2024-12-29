import { exportCSVFile } from '../lib/csv'
import { useGlobalState } from '../state'
import UploadButton from './upload_button'
import { PAGE_SIZE } from './pagination'

function Toolbar() {
  const [csvContent, setCSVContent] = useGlobalState('csvContent')
  const [selectedRows, setSelectedRows] = useGlobalState('selectedRows')
  const [_filterDialogVisible, setFilterDialogVisible] = useGlobalState('filterDialogVisible')

  const deleteRows = () => {
    setSelectedRows([])

    if (csvContent.data.length <= PAGE_SIZE * page) {
      // TODO: go to the first page
    }
  }

  const downloadCSV = () => {
    exportCSVFile(csvContent.data)
  }

  return (
    <div id="toolbar">
      <UploadButton>
        <svg width="15px" height="15px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12H12M15 12H12M12 12V9M12 12V15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path
            d="M4 21.4V2.6C4 2.26863 4.26863 2 4.6 2H16.2515C16.4106 2 16.5632 2.06321 16.6757 2.17574L19.8243 5.32426C19.9368 5.43679 20 5.5894 20 5.74853V21.4C20 21.7314 19.7314 22 19.4 22H4.6C4.26863 22 4 21.7314 4 21.4Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
          <path d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </UploadButton>

      <button type="button" disabled={ selectedRows.length == 0 } onClick={ deleteRows }>
        <svg width="15px" height="15px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.99219 13H11.9922H14.9922" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path
            d="M3.03919 4.2939C3.01449 4.10866 3.0791 3.92338 3.23133 3.81499C3.9272 3.31953 6.3142 2 12 2C17.6858 2 20.0728 3.31952 20.7687 3.81499C20.9209 3.92338 20.9855 4.10866 20.9608 4.2939L19.2616 17.0378C19.0968 18.2744 18.3644 19.3632 17.2813 19.9821L16.9614 20.1649C13.8871 21.9217 10.1129 21.9217 7.03861 20.1649L6.71873 19.9821C5.6356 19.3632 4.90325 18.2744 4.73838 17.0378L3.03919 4.2939Z"
            strokeWidth="1.5"></path>
          <path d="M3 5C5.57143 7.66666 18.4286 7.66662 21 5" strokeWidth="1.5"></path></svg>
      </button>

      <button type="button" disabled={ csvContent.data.length == 0 } onClick={ downloadCSV }>
        <svg width="15px" height="15px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 20L18 20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>

      <button type="button" disabled={ csvContent.meta.fields.length == 0 } onClick={ () => setFilterDialogVisible(true) }>
        <svg width="15px" height="15px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
        </svg>
      </button>
    </div>
  )
}

export default Toolbar
