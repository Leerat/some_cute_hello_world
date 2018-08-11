import * as CON from 'constants.js'

export function reorderPhrase(phrase) {
  return {
    type: CON.REORDER_PHRASE,
    payload: {phrase}
  }
}

export function dragLetter() {
  return {
    type: CON.DRAG_LETTER,
  }
}
