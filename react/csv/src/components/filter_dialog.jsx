import { useState, useEffect, useRef } from 'react'
import { useGlobalState } from '../state'

function filterRows(rows, filters) {
  let filteredRows = []

  if (filters.length > 0) {
    filteredRows = rows

    for (const filter of filters) {
      filteredRows = filteredRows.filter(field => {
        switch (filter.condition) {
          case 'contains': return field[filter.field].includes(filter.value);
          case 'matches': return !!field[filter.field].match(filter.value);
          default: return field[filter.field] == filter.value
        }
      })
    }
  }

  return filteredRows
}

function FilterDialog() {
  const [csvContent, setCSVContent] = useGlobalState('csvContent')
  const [filterDialogVisible, setFilterDialogVisible] = useGlobalState('filterDialogVisible')
  const [filteredRows, setFilteredRows] = useGlobalState('filteredRows')
  const [filters, setFilters] = useGlobalState('filters')
  const [filterField, setFilterField] = useState('')
  const [filterCondition, setFilterCondition] = useState('Equals')
  const [filterValue, setFilterValue] = useState('')
  const dialog = useRef(null)

  const applyFilters = event => {
    event.preventDefault()

    filters.push({
      field: filterField,
      condition: filterCondition,
      value: filterValue
    })

    setFilters(filters)
    setFilteredRows(filterRows(csvContent.data, filters))
    setFilterField(csvContent.meta.fields[0])
    setFilterValue('')
    setFilterCondition('equals')
  }

  const removeFilter = event => {
    const index = parseInt(event.currentTarget.dataset.index, 10)

    filters.splice(index, 1)
    setFilters(filters)
    setFilteredRows(filterRows(csvContent.data, filters))
  }

  useEffect(() => {
    if (filterDialogVisible) {
      dialog.current?.showModal()
    } else {
      dialog.current?.close()
    }
  }, [filterDialogVisible])

  return (
    <dialog id="filter_dialog" ref={ dialog }>

      {
        filters.length > 0 && (
          <div id="applied_filters">

            {
              filters.map((filter, index) => (
                <div className="filter-row" key={`filter-${filter.field}-${index}`}>
                  <span>{ filter.field }</span>
                  <span>{ filter.condition }</span>
                  <span>{ filter.value }</span>
                  <button type="button" className="filter-remove-button" data-index={ index } onClick={ removeFilter }>
                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                    </svg>
                  </button>
                </div>
              ))
            }

          </div>
        )
      }

      <form action="/csv" method="GET" onSubmit={ applyFilters }>
        <div className="filter-row">
          <select value={ filterField } onChange={ event => setFilterField(event.target.value) }>

            {
              csvContent.meta.fields.map(fieldName => (
                <option value={ fieldName } key={ `field-filter-option-${fieldName}` }>{ fieldName }</option>
              ))
            }

          </select>

          <select value={ filterCondition } onChange={ event => setFilterCondition(event.target.value) }>
            <option value="equals">equals</option>
            <option value="contains">contains</option>
            <option value="matches">matches</option>
          </select>

          <input type="text" value={ filterValue } onInput={ event => setFilterValue(event.target.value) } />

          <button type="submit">Add</button>
        </div>

        <div id="filter_dialog_actions">
          <button type="button" onClick={ () => setFilterDialogVisible(false) }>Close</button>
          <button type="button" onClick={ () => setFilters([]) }>Clear all filters</button>
        </div>
      </form>
    </dialog>
  )
}

export default FilterDialog
