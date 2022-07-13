import * as React from 'react'
import { View, StyleSheet, StatusBar, Platform } from 'react-native'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

export default function Search() {
  return <View style={style.searchContainer}></View>
}

const style = StyleSheet.create({
  searchContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
})
