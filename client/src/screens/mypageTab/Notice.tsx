import * as React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Title from '../../components/common/Title'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const Notice = () => {
  return (
    <>
      <View style={style.noticeContainer}>
        <Title title={'공지사항'} size={30} />
        <View style={style.contentsContainer}>
          <Text style={style.contentsText}> TT, 트러스트 티켓팅은.... </Text>
        </View>
      </View>
    </>
  )
}

const style = ScaledSheet.create({
  noticeContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'white',
    paddingTop: '15@msr',
  },
  contentsContainer: {
    padding: '20@msr',
  },
  contentsText: {
    fontSize: '20@msr',
  },
})

export default Notice
