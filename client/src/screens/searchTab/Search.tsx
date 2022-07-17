import * as React from 'react'
import { useState } from 'react'
import { View, StyleSheet, StatusBar, Platform, Dimensions } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Searchbar from '../../components/search/Searchbar'
import SearchList from '../../components/search/SearchList'
import DummyDate from '../../data/DummyData.json'
import { EventType } from '../../models/Event'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

export default function Search() {
  const [enteredSearch, setEnteredSearch] = useState<string>('')

  function searchInputHandler(enteredText: string) {
    setEnteredSearch(enteredText)
  }
  const [sendList, setSendList] = useState<EventType[]>([...DummyDate.event])

  function searchEnterHandler(e: any) {}

  return (
    <View style={style.searchContainer}>
      <Searchbar value={enteredSearch} onChangeText={searchInputHandler} />
      {/* 나중에 인기 검색어 추가 부분 */}
      {/* <Hashtag props={DummyDate.event} /> */}

      <SearchList sendList={sendList} />
    </View>
  )
}

const style = ScaledSheet.create({
  searchContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
})
