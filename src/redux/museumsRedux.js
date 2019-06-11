import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  museumsRequest: ['skip', 'limit', 'text'],
  museumsSuccess: ['museums', 'hasMore'],
  museumsFailure: null,
})

export const MuseumsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  museums: [],
  isRequesting: false,
  isLoadingMore: false,
  hasMore: false,
})

/* ------------- Reducers ------------- */

const museumsRequest = (state, { skip }) => {
  return state.merge({ isRequesting: !skip, isLoadingMore: !!skip })
}

const museumsSuccess = (state, { museums, hasMore }) => {
  const isLoadingMore = state.isLoadingMore
  if (isLoadingMore) {
    const currentMuseums = state.museums
    museums = currentMuseums.concat(museums)
  }

  return state.merge({
    museums,
    isRequesting: false,
    isLoadingMore: false,
    hasMore,
  })
}

const museumsFailure = (state) => {
  return state.merge({ isRequesting: false, isLoadingMore: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MUSEUMS_REQUEST]: museumsRequest,
  [Types.MUSEUMS_SUCCESS]: museumsSuccess,
  [Types.MUSEUMS_FAILURE]: museumsFailure,
})
