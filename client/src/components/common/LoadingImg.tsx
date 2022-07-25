import * as React from 'react'
import { View, Image, Dimensions } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const LoadingImg = () => {
  return (
    <>
      <View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          paddingTop: SCREEN_WIDTH * 0.5,
          backgroundColor: 'white',
        }}
      >
        <Image
          source={{
            uri: 'https://i.ibb.co/5vP1d8X/Spin-1s-200px-without-Background.gif',
          }}
          style={{
            width: moderateScale(100),
            height: moderateScale(100),
            alignSelf: 'center',
          }}
        />
      </View>
    </>
  )
}

export default LoadingImg
