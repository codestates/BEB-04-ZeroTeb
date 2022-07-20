import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import SearchList from '../../components/search/SearchList'

interface searchListProps {}

const SearchListup: React.FC<searchListProps> = () => {
  const route = useRoute()

  return (
    <View style={styles.searchListupContainer}>
      <SearchList sendList={route.params?.searchEventList} />
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
