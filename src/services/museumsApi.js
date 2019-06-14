import querystring from 'querystring'
import api from './baseApi'
import firebase from 'react-native-firebase'

export const getMuseums = ({ limit, skip, text, last }) => {
  // api.get(`museums?${querystring.stringify(params)}`)
  return new Promise((resolve) => {
    museumsRef = firebase.database().ref("museums");

    museumsRef.once('value', (data) => {
      data = data.val()
      let museums = Object.keys(data).map(key => ({
        ...data[key],
        _id: key
      }))

      if (text) {
        museums = museums.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0)
      }

      resolve({ museums })
    })
  })

}