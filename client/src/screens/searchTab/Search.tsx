import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { useState } from 'react'
import {
  View,
  StatusBar,
  Platform,
  Pressable,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Hashtag from '../../components/search/Hashtag'
import Searchbar from '../../components/search/Searchbar'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight
const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export default function Search() {
  const navigation = useNavigation()
  const [enteredSearch, setEnteredSearch] = useState<string>('')
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setEnteredSearch('')
    wait(1000).then(() => setRefreshing(false))
  }, [])

  function searchInputHandler(enteredText: string) {
    setEnteredSearch(enteredText)
  }

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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Searchbar
          value={enteredSearch}
          onChangeText={searchInputHandler}
          onSubmitEditing={searchEnterHandler}
        />
        <Hashtag
          hashtags={['아이유', '폴킴', '코드 스테이츠', '그라운드X']}
          onPress={pressHandler}
        />
      </ScrollView>
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
