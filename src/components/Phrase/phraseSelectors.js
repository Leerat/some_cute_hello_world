import { createSelector } from 'reselect'

const getPhrase = state => state.phrase

export const getPhraseSelector = createSelector(
  getPhrase,
  state => state.entity
)

export const getIsDraggedSelector = createSelector(
  getPhrase,
  state => state.isDragged
)
