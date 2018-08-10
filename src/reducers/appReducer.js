import * as CON from 'constants'

const defaultState = {
  status: null,
}

export default (state = defaultState, action ) => {
  const { type, payload, response, error } = action

  switch ( type ) {
    default:
      return state
  }
}
