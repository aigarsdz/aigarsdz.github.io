import { useRef } from 'react'

function FilterDialog() {
  const [filterField, setFilterField] = useState('')
  const [filterComparison, setFilterComparison] = useState('Equals')
  const [filterValue, setFilterValue] = useState('')
  const filterDialog = useRef(null)

  const applyFilters = (event = null) => {
    if (event) event.preventDefault()

    file.csvContent = fileSnapshot.csvContent.data.filter(field => {
      switch (filterComparison) {
        case 'Contains': return field[filterField].contains(filterValue);
        case 'Matches': return !!field[filterField],match(filterValue);
        default: return field[filterField] == filterValue
      }
    })

    ui.filterOn = true

    filterDialog.current?.close()
  }

  return (
    <dialog ref={ filterDialog }>
      <form action="/csv" method="GET" onSubmit={ applyFilters }>
        <div>
          <select onChange={ event => setFilterField(event.target.value) }>

            {
              csvContent.meta.fields.map(fieldName => (
                <option value={ fieldName } key={ `field-filter-option-${fieldName}` }>{ fieldName }</option>
              ))
            }

          </select>

          <select onChange={ event => setFilterComparison(event.target.value) }>
            <option value="Equals">Equals</option>
            <option value="Contains">Contains</option>
            <option value="Matches">Matches</option>
          </select>

          <input type="text" onInput={ event => setFilterValue(event.target.value) } />
        </div>

        <button type="submit">Apply</button>
        <button type="button" onClick={ () => filterDialog.current?.close() }>Cancel</button>
      </form>
    </dialog>
  )
}

export default FilterDialog
