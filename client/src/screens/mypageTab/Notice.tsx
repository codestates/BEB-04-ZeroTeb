import * as React from 'react'
import { View, Dimensions } from 'react-native'
import Title from '../../components/common/Title'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const Notice = () => {
  return (
    <>
      <View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: 'white',
        }}
      >
        <Title title={'공지사항'} size={30} />
      </View>
    </>
  )
}

export default Notice
