import * as React from 'react'
import { TextInput, View, StyleSheet, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { findFocusedRoute } from '@react-navigation/native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function Searchbar() {
  const [enteredSearch, setEnteredSearch] = useState<string>('')

  function searchInputHandler(enteredText: string) {
    setEnteredSearch(enteredText)
  }

  function searchEnterHandler() {}

  return (
    <View style={style.searchbarContainner}>
      <Ionicons
        name="search"
        size={15}
        color="black"
        style={style.searchbarbarIcon}
      />
      <TextInput
        style={style.searchbarbarText}
        placeholder={'ZeroTeb을 검색하세요!'}
        autoCapitalize="none"
        autoCorrect={false}
        value={enteredSearch}
        onChangeText={searchInputHandler}
        onKeyPress={searchEnterHandler}
      ></TextInput>
    </View>
  )
}

const style = StyleSheet.create({
  searchbarContainner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    paddingHorizontal: 10,
    width: SCREEN_WIDTH * 0.9,
    maxHeight: 40,
    margin: 20,
  },
  searchbarbarIcon: {
    color: 'black',
  },
  searchbarbarText: {
    fontSize: 12,
    paddingLeft: 5,
    color: 'gray',
  },
})
