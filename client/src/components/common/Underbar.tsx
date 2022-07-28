import * as React from 'react'
import { View, Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function Underbar() {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            borderBottomColor: '#CCCCCC',
            borderBottomWidth: 1,
            width: SCREEN_WIDTH * 0.9,
          }}
        ></View>
      </View>
    </>
  )
}
