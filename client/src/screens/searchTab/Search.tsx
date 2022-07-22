import { useNavigation } from '@react-navigation/native'
import axios, { AxiosRequestConfig } from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { View, StatusBar, Platform, Pressable } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Hashtag from '../../components/search/Hashtag'
import Searchbar from '../../components/search/Searchbar'
import { EventType } from '../../models/Event'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

export default function Search() {
  const navigation = useNavigation()
  const [enteredSearch, setEnteredSearch] = useState<string>('')

  function searchInputHandler(enteredText: string) {
    setEnteredSearch(enteredText)
  }
  const [sendList, setSendList] = useState<EventType[]>([])

  const searchEnterHandler = async () => {
    try {
      if (enteredSearch === '') {
        return
      }
      console.log('enteredSearch----------' + enteredSearch)
      navigation.navigate('SearchListup', { searchWord: enteredSearch })
      setEnteredSearch('')
    } catch (err) {
      alert(err)
    }
  }

  function pressHandler(e: string) {
    navigation.navigate('SearchListup', { searchWord: e })
  }

  return (
    <View style={style.searchContainer}>
      <Searchbar
        value={enteredSearch}
        onChangeText={searchInputHandler}
        onSubmitEditing={searchEnterHandler}
      />
      <Hashtag
        hashtags={['아이유', '폴킴', '코드 스테이츠', '그라운드X']}
        onPress={pressHandler}
      />
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
