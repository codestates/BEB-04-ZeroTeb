import * as React from 'react'
import { View, StyleSheet } from 'react-native'

export default function MyPage() {
  return <View style={style.myPageContainer}></View>
}

const style = StyleSheet.create({
  myPageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
})
