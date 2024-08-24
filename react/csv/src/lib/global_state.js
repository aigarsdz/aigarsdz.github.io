import { useState, useEffect } from 'react'

export class GlobalState {
  #subscribers = {}
  #state = {}

  constructor(initialState) {
    this.#state = initialState
  }

  getValue(name) {
    const value = this.#state[name]

    if (typeof value != 'undefined') {
      if (Array.isArray(value)) {
        return [...value]
      } else if (typeof value == 'object') {
        return { ...value }
      }

      return value
    }

    return null
  }

  setValue(name, value) {
    if (name in this.#state) {
      if (this.#state[name] !== value) {
        this.#state[name] = value

        for (const handler of this.#subscribers[name]) {
          handler(value)
        }
      }
    } else {
      throw new Error(`Property ${name} does not exist in the current state.`)
    }
  }

  subscribe(name, handler) {
    if (!this.#subscribers[name]) {
      this.#subscribers[name] = []
    }

    if (!this.#subscribers[name].includes(handler)) {
      this.#subscribers[name].push(handler)
    }
  }

  unsubscribe(handler) {
    if (this.#subscribers[name]) {
      this.#subscribers[name] = this.#subscribers[name].filter(h => h != handler)
    }
  }
}

export function createState(initialState) {
  const state = new GlobalState(initialState)

  return name => {
    const [_state, setState] = useState({})
    const stateValue = state.getValue(name)
    const notify = () => setState({})
    const setGlobalState = value => state.setValue(name, value)

    useEffect(() => {
      state.subscribe(name, notify)

      return () => state.unsubscribe(name, notify)
    }, [])

    return [stateValue, setGlobalState]
  }
}
