import React from 'react'
import LottieView from 'lottie-react-native'

export default class Splash extends React.PureComponent {
  render() {
    return (
      <LottieView
        source={require('../../../assets/logoImg/splash_json.json')}
        autoPlay
        loop={false}
      />
    )
  }
}
