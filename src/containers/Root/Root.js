import React, { Component } from 'react'
import { View, StatusBar, SafeAreaView } from 'react-native'
import Museums from '../Museums'

class RootContainer extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <Museums />
      </SafeAreaView>
    )
  }
}

export default RootContainer