import * as React from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native'
import GoBackButton from '../../components/common/GoBackButton'
import { useNavigation } from '@react-navigation/native'
import SearchList from '../../components/search/SearchList'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

function SearchListup() {
  const navigation = useNavigation()

  return (
    <View style={styles.searchListupContainer}>
      <TouchableOpacity
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack()
          }
        }}
      >
        <GoBackButton />
      </TouchableOpacity>
      <SearchList sendList={[]} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchListupContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
})

export default SearchListup
