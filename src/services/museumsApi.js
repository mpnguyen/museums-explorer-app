import querystring from 'querystring'
import api from './baseApi'

export const getMuseums = (params) => (
  api.get(`museums?${querystring.stringify(params)}`)
)