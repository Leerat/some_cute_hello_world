import * as CON from 'constants.js'

const source = 'Some cute hello world'

const defaultState = {
  status: null,
  entity: Array.from(source)
}

export default (state = defaultState, action ) => {
  const { type, payload, response, error } = action

  switch ( type ) {
    case CON.REORDER_PHRASE:
      return {
        ...state,
        entity: payload.phrase
      }
    default:
      return state
  }
}
