import { useMemo } from 'react'
import { useGlobalState } from '../state'

export const PAGE_SIZE = 100

function calculatePageCount(collectionLength) {
  return Math.ceil(collectionLength / PAGE_SIZE)
}

function Pagination() {
  const [page, setPage] = useGlobalState('page')
  const [csvContent] = useGlobalState('csvContent')
  const [filteredRows] = useGlobalState('filteredRows')
  const [filters] = useGlobalState('filters')

  const pageCount = useMemo(() => {
    let rows = csvContent.data

    if (filters.length > 0) {
      rows = filteredRows
    }

    if (rows.length == 0) {
      return 1
    }

    return Math.ceil(rows.length / PAGE_SIZE)
  }, [csvContent, filteredRows])

  const changePage = event => {
    const pageNumber = parseInt(event.currentTarget.dataset.targetPage, 10)

    setPage(pageNumber)
  }

  return (
    <div id="pagination">
      <span>
        Page { page + 1 } of { pageCount }
      </span>
      <div id="pagination_button_block">
        <button type="button" disabled={ page < 2 } data-target-page="0" onClick={ changePage }>
          <svg width="15px" height="15px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 6L5 12L11 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M19 6L13 12L19 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <button type="button" disabled={ page == 0 } data-target-page={ page - 1 } onClick={ changePage }>
          <svg width="15px" height="15px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <button type="button" disabled={ page == pageCount - 1 || pageCount == 1 } data-target-page={ page + 1 } onClick={ changePage }>
          <svg width="15px" height="15px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <button type="button" disabled={ page >= pageCount - 2 } data-target-page={ pageCount - 1 } onClick={ changePage }>
          <svg width="15px" height="15px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 6L19 12L13 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M5 6L11 12L5 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Pagination
