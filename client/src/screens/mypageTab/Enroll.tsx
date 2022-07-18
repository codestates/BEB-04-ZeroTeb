import * as React from 'react'
import { View, StyleSheet, Text, StatusBar, Platform } from 'react-native'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

export default function Enroll() {
  return (
    <View style={style.enrollContainer}>
      <View style={style.enrollTitle}>
        <Text style={style.enrollTitleText}>이벤트 등록</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  enrollContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
  enrollTitle: {
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enrollTitleText: {
    textAlign: 'center',
    fontSize: 30,
  },
})
