import * as React from 'react'
import { ScrollView, Text, View } from 'react-native'
import SearchList from '../../components/search/SearchList'
import { EventType } from '../../models/Event'
import axios, { AxiosRequestConfig } from 'axios'
import LoadingImg from '../../components/common/LoadingImg'
import { ScaledSheet } from 'react-native-size-matters'

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
  const params = route.params.searchWord
  const [sendList, setSendList] = React.useState<EventType[]>([])
  const [noResult, setNoResult] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(true)

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
    searchHandler().then(() => setLoading(false))
  }, [])

  return (
    <ScrollView style={styles.searchListupContainer}>
      {loading ? (
        <LoadingImg />
      ) : (
        <>
          {noResult ? (
            <View style={styles.msgContainer}>
              <Text style={styles.msg}>검색 결과가 없습니다.</Text>
            </View>
          ) : (
            <SearchList sendList={sendList} type={''} address={''} />
          )}
        </>
      )}
    </ScrollView>
  )
}

const styles = ScaledSheet.create({
  searchListupContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  msgContainer: { paddingTop: '10@msr' },
  msg: { fontSize: '20@msr', paddingHorizontal: '20@msr' },
})

export default SearchListup
