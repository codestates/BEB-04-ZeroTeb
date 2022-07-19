import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SearchList from '../../components/search/SearchList'

function SearchListup() {
  const navigation = useNavigation()

  return (
    <View style={styles.searchListupContainer}>
      <SearchList sendList={[]} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchListupContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
})

export default SearchListup
