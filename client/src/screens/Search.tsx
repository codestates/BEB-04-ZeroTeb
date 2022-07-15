import * as React from 'react'
import { useState } from 'react'
import { View, StyleSheet, StatusBar, Platform, Dimensions } from 'react-native'
import Searchbar from '../components/Searchbar'
import SearchList from '../layout/search/SearchList'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight
const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function Search() {
  const [enteredSearch, setEnteredSearch] = useState<string>('')

  function searchInputHandler(enteredText: string) {
    setEnteredSearch(enteredText)
  }
  const [sendList, setSendList] = useState<string>('')

  function searchEnterHandler(e: any) {
    setSendList(enteredSearch)
  }

  return (
    <View style={style.searchContainer}>
      <Searchbar
        value={enteredSearch}
        onChangeText={searchInputHandler}
        onSubmitEditing={searchEnterHandler}
      />
      {/* 나중에 인기 검색어 추가 부분 */}
      {/* <Hashtag props={DummyDate.event} /> */}

      <SearchList style={style.searchListContainner} props={sendList} />
    </View>
  )
}

const style = StyleSheet.create({
  searchContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
  searchListContainner: {
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
})
