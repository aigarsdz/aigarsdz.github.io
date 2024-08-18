import { makeAutoObservable } from 'mobx'

class State {
  csvContent = { meta: { fields: [] }, data: [] }
  selectedRows = new Set()

  constructor() {
    makeAutoObservable(this)
  }

  setCSVContent(content) {
    this.csvContent.meta.fields.splice(0, this.csvContent.meta.fields.length)
    this.csvContent.data.splice(0, this.csvContent.data.length)

    this.csvContent.meta.fields = content.meta.fields
    this.csvContent.data = content.data
  }

  selectRow(index) {
    this.selectedRows.add(index)
  }

  unselectRow(index) {
    this.selectedRows.delete(index)
  }

  deleteSelectedRows() {
    this.csvContent.data = this.csvContent.data.filter((_, index) => !this.selectedRows.has(index))

    this.selectedRows.clear()
  }
}

export default State
