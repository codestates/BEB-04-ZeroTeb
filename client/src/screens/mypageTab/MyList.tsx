import axios, { AxiosRequestConfig } from 'axios'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  StatusBar,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  View,
  RefreshControl,
} from 'react-native'
import { useSelector } from 'react-redux'
import SearchList from '../../components/search/SearchList'
import { RootState } from '../../store/Index'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

interface Props {
  type: string
}

export default function MyList({ route }) {
  const [typeList, setTypeList] = useState([])
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTypeList([])
    getTypeListHandler()
    wait(1000).then(() => setRefreshing(false))
  }, [])

  console.log('props', route.params.type)
  console.log('address', KilpAddress)
  // address랑 type은 props로 받음
  //리덕스에 있는 로그인된 주소로 교환 필요

  //지금 페이지랑 카운트는 의미없음(작동 안함)
  const page = 1
  const count = 1

  //type에 따라 검색
  //entry: type data가 entry 목록 검색
  //sale: type data가 sale인 목록 검색
  //create: address데이터가 입력한 address인 목록을 검색
  //liked: 좋아요 콜렉션에 있고, 입력한 address를 가진 목록을 검색
  //http://server.beeimp.com:18080/event/history?address=0xf0a29e430d12065bfa9a5e0bc694f26accb151f4&page=1&count=5&type=created
  const getTypeListHandler = async () => {
    try {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `http://server.beeimp.com:18080/event/history?address=${KilpAddress}&page=${page}&count=${count}&type=${route.params.type}`,
        withCredentials: true,
      }
      const res = await axios(config)
      // console.log(res.data);
      if (res.data.message) {
        console.log(res.data.message)
      } else {
        setTypeList(res.data)
      }
    } catch (err) {
      alert(err)
    }
  }

  // holdings에서 address 맞는 데이터 받아와서 해당 이벤트 아이디를 가진 이벤트를 events에서 가져온다
  const getMySaleList = async () =>{
    try {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `http://server.beeimp.com:18080/event/mysale?address=${KilpAddress}`,
        withCredentials: true,
      }
      const res = await axios(config)
      // console.log(res.data);
      if (res.data.message) {
        console.log(res.data.message)
      } else {
        setTypeList(res.data)
      }
    } catch (err) {
      alert(err)
    }
  }

  //participans 데이터 가져와서 events에서 해당 아이디 세부 정보 가져와서 뿌리기
  const getMyEntryList = async () =>{
    try {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `http://server.beeimp.com:18080/event/myentry?address=${KilpAddress}`,
        withCredentials: true,
      }
      const res = await axios(config)
      // console.log(res.data);
      if (res.data.message) {
        console.log('entry fail:',res.data.message)
      } else {
        console.log('entry result:',res.data)
        setTypeList(res.data)
      }
    } catch (err) {
      alert(err)
    }
  }
  //페이지를 시작할 때, 데이터 검색
  useEffect(() => {
    
    if(route.params.type === 'created'){
      console.log('created 호출')
      getTypeListHandler()
    }
    else if(route.params.type === 'sale'){
      console.log('sale 호출')
      getMySaleList()
    }else if(route.params.type === 'entry'){
      console.log('entry 호출')
      getMyEntryList() 
    }
  }, [])

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SearchList
        sendList={typeList}
        type={route.params.type}
        address={KilpAddress}
      ></SearchList>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
})
