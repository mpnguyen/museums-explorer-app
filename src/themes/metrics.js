import { Dimensions, PixelRatio } from 'react-native'

const window = Dimensions.get('window')

export default {
  screenWidth: window.width,
  screenHeight: window.height,
  thinWidth: 1 / PixelRatio.get(),

  screenPadding: 20,
  headerFontSize: 18,
}