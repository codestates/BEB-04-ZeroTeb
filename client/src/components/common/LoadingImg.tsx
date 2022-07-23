import * as React from 'react'
import { View, Image, Dimensions } from 'react-native'

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
            uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif',
          }}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
      </View>
    </>
  )
}

export default LoadingImg
