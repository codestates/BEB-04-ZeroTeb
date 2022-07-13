import * as React from 'react'
import { View, StyleSheet, StatusBar, Platform } from 'react-native'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

export default function MyPage() {
  return <View style={style.myPageContainer}></View>
}

const style = StyleSheet.create({
  myPageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
})
