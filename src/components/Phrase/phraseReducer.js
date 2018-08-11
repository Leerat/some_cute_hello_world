import * as CON from 'constants.js'

const source = 'Some cute hello world'

const defaultState = {
  status: null,
  entity: Array.from(source),
  isDragged: false
}

export default (state = defaultState, action ) => {
  const { type, payload, response, error } = action

  switch ( type ) {
    case CON.REORDER_PHRASE:
      return {
        ...state,
        entity: payload.phrase
      }
    case CON.DRAG_LETTER:
      return {
        ...state,
        isDragged: true
      }
    default:
      return state
  }
}
