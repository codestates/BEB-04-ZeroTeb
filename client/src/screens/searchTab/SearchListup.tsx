import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SearchList from '../../components/search/SearchList'
import { EventType } from '../../models/Event'
import axios, { AxiosRequestConfig } from 'axios'

interface searchListProps {
  route: {
    key: string
    name: string
    params: {
      searchWord: string
    }
  }
}

const SearchListup: React.FC<searchListProps> = ({ route }) => {
  const navigation = useNavigation()
  const params = route.params.searchWord
  const [sendList, setSendList] = React.useState<EventType[]>([])
  const [noResult, setNoResult] = React.useState<boolean>(false)

  const searchHandler = async () => {
    try {
      if (params === '') {
        return
      }
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `http://server.beeimp.com:18080/event/search?keyword=${params}`,
        withCredentials: true,
      }
      const res = await axios(config)
      console.log(res.data.m)
      if (res.data.message) {
        setNoResult(true)
      } else {
        setSendList(res.data)
      }
    } catch (err) {
      alert(err)
    }
  }

  React.useEffect(() => {
    searchHandler()
  }, [])

  return (
    <View style={styles.searchListupContainer}>

      {noResult ? (
        <Text style={styles.msg}>검색 결과가 없습니다.</Text>
      ) : (
        <SearchList sendList={sendList} type={''} address={''} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchListupContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  msg: { fontSize: 20, paddingHorizontal: 20 },
})

export default SearchListup
