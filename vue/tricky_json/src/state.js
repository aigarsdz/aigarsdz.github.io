import { reactive } from 'vue'
import { tokenize, parse } from './lib/json_parser'

const state = reactive({
  input: '',
  output: '',

  updateInput(value) {
    this.input = value

    if (this.input.length == 0) {
      this.output = ''
    } else {
      try {
        const parsedJSON = JSON.parse(value)

        if (parsedJSON) {
          this.output = JSON.stringify(parsedJSON, null, 2)
        }
      } catch (_error) {
        const tokens = tokenize(value)
        const result = parse(tokens)

        this.output = JSON.stringify(result, null, 2)
      }
    }
  }
})

export default state