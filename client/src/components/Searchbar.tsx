import * as React from 'react'
import { TextInput, View, StyleSheet, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import Hashtag from './Hashtag'
import SearchList from '../layout/search/SearchList'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function Searchbar() {
  const [enteredSearch, setEnteredSearch] = useState<string>('')
  const [sendText, setSendText] = useState<string>('')

  function searchInputHandler(enteredText: string) {
    setEnteredSearch(enteredText)
  }

  function searchEnterHandler(e: any) {
    setSendText(enteredSearch)
  }

  return (
    <View>
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
          onSubmitEditing={searchEnterHandler}
        ></TextInput>

        {/* 나중에 인기 검색어 추가 부분 */}
        {/* <Hashtag props={DummyDate.event} /> */}
      </View>

      <SearchList style={style.searchbarContainner} props={sendText} />
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
    minHeight: 40,
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
