import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'

export default function Splash() {
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    animationRef.current?.play()

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120)
  }, [])

  return (
    <LottieView
      source={require('../../../assets/logoImg/splash_json.json')}
      autoPlay
      loop={false}
    />
  )
}
