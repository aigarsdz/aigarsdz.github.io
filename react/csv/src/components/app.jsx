import TablePlaceholder from './table_placeholder'
import Table from './table'
import Pagination from './pagination'
import Toolbar from './toolbar'
import { useGlobalState } from '../state'

function App() {
  const [csvContent, setCSVContent] = useGlobalState('csvContent')
  const [selectedRows, setSelectedRows] = useGlobalState('selectedRows')
  const [filteredRows, setFilteredRows] = useGlobalState('filteredRows')
  const [filters] = useGlobalState('filters')

  let collectionLength = csvContent.data.length

  if (filters.length > 0) {
    collectionLength = filteredRows.length
  }

  return (
    <>
      <Toolbar />

      {
        csvContent.meta.fields.length > 0
        ? <Table />
        : <TablePlaceholder />
      }

      <Pagination />
    </>
  )
}

export default App
