import axios from 'axios'
import _ from 'lodash'
import AppConfig from '../configs/AppConfig'

const api = axios.create({
  baseURL: AppConfig.baseURL,
})

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      return Promise.reject({ code: error.response.status, message: error.response.data.message }); // eslint-disable-line
    }
    if (error.request)
      return Promise.reject({ message: 'No response was received' }); // eslint-disable-line
    return Promise.reject(error)
  },
)


export default api
