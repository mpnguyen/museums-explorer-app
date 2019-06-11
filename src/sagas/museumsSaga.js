import { call, put, takeLatest, all } from 'redux-saga/effects'
import MuseumsActions, { MuseumsTypes } from '../redux/museumsRedux'
import * as Api from '../services/museumsApi'

function* museumsSagas() {
  yield all([
    yield takeLatest(MuseumsTypes.MUSEUMS_REQUEST, museumsRequest),

  ])
}

export function* museumsRequest({ skip, limit, text }) {
  try {
    const { museums } = yield call(Api.getMuseums, { skip, limit, text })

    yield put(MuseumsActions.museumsSuccess(museums, museums.length === limit))
  } catch (error) {
    yield put(MuseumsActions.museumsFailure())
  }
}

export default museumsSagas
