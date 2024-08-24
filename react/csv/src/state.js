import { useState, useEffect } from 'react'
import { createState } from './lib/global_state'

export const useGlobalState = createState({
  csvContent: {
    meta: { fields: [] },
    data: []
  },
  selectedRows: [],
  filteredRows: [],
  filters: [],
  page: 0
})
