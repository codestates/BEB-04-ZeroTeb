import * as React from 'react'
import { StyleSheet, ScrollView, RefreshControl } from 'react-native'
import EventList from '../../components/event/EventList'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

function CategoryListup({ route }) {
  const navigation = useNavigation()
  const [listData, setListData] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setListData([])
    getListData()
    wait(2000).then(() => setRefreshing(false))
  }, [])
  const params = route.params.catagoryName.toLowerCase() // 카테고리 타이틀

  const getListData = async () => {
    try {
      const result = await axios.get(
        `http://server.beeimp.com:18080/event/list?page=1&count=9999&category=${params}`,
      )
      if (result.data.message) {
        console.log(result.data.message)
      } else {
        setListData(result.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    getListData()
  }, [])

  return (
    <ScrollView
      style={styles.categoryListupContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <EventList eventList={listData} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  categoryListupContainer: {
    backgroundColor: 'white',
  },
})

export default CategoryListup
