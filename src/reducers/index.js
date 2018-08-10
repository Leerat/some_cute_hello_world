import { combineReducers } from 'redux'

import appReducer from 'reducers/appReducer'
import phraseReducer from 'components/Phrase/phraseReducer'

export default combineReducers({
  app: appReducer,
  phrase: phraseReducer
})
