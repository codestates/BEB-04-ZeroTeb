import * as React from 'react'
import { View, Text, Dimensions, ScrollView, Image } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import MyPageNotice from '../../components/mypage/MyPageNotice'

import Title from '../../components/common/Title'

const Notice = () => {
  return (
    <View style={style.noticeContainer}>
      <ScrollView decelerationRate="fast">
        <Title title={'공지사항'} size={30} />
        <MyPageNotice />
      </ScrollView>
    </View>
  )
}

const style = ScaledSheet.create({
  noticeContainer: {
    backgroundColor: 'white',
    paddingTop: '15@msr',
  },
})

export default Notice
