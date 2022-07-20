import { useNavigation } from '@react-navigation/native'
import axios, { AxiosRequestConfig } from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Hashtag from '../../components/search/Hashtag'
import Searchbar from '../../components/search/Searchbar'
import DummyDate from '../../data/DummyData.json'
import { EventType } from '../../models/Event'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

export default function Search() {
  const navigation = useNavigation()
  const [enteredSearch, setEnteredSearch] = useState<string>('')

  function searchInputHandler(enteredText: string) {
    setEnteredSearch(enteredText)
  }
  const [sendList, setSendList] = useState<EventType[]>([...DummyDate.event])

  const searchEnterHandler = async () => {
    try {
      if (enteredSearch === '') {
        return
      }
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `http://server.beeimp.com:18080/event/search?keyword=${enteredSearch}`,
        withCredentials: true,
      }
      const res = await axios(config)
      setSendList(res.data)
      navigation.navigate('SearchListup', { searchEventList: sendList })
      setEnteredSearch('')
    } catch (err) {
      alert(err)
    }
  }

  function pressHandler(e) {
    console.log(e.target)
  }

  return (
    <View style={style.searchContainer}>
      <Searchbar
        value={enteredSearch}
        onChangeText={searchInputHandler}
        onSubmitEditing={searchEnterHandler}
      />
      <Hashtag
        hashtags={['김영현', '이지민', '최정환', '채희수']}
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
