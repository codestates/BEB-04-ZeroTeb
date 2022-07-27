import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Pressable,
  FlatList,
  Image,
  Text,
} from 'react-native'
import Banner from '../../components/home/Banner'
import LocationButton from '../../components/location/LocationButton'
import Title from '../../components/common/Title'
import SearchBar from '../../components/search/Searchbar'
import EventList from '../../components/event/EventList'
import axios, { AxiosRequestConfig } from 'axios'
import { EventType } from '../../models/Event'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Index'
import { moderateScale } from 'react-native-size-matters'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight
const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))

export default function Home() {
  const [noSearch, setNoSearch] = useState(false)
  const navigation = useNavigation()
  // 지역 데이터 redux
  const region = useSelector((state: RootState) => state.region.region)
  // 베너 데이터
  const [bannerList, setBannerList] = useState<EventType[]>([])
  // 이벤트 목록 데이터
  const [list, setList] = useState<EventType[]>([])
  // 로딩 유무 데이터
  const [load, setLoad] = useState<boolean>(false)
  // 무한 스크롤 페이지 데이터
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = React.useState(false)
  const onRefresh = async () => {
    setIsFetching(true)
    setLoad(true)
    setPage(1)
    setList([])
    setBannerList([])

    getBannerList()
    getEventList().then(() => {
      setLoad(false)
    })

    await sleep(1000)
    setIsFetching(false)
  }
  // 배너 데이터 호출
  const getBannerList = async () => {
    try {
      if (page >= 1) {
        const config: AxiosRequestConfig = {
          method: 'get',
          url: `http://server.beeimp.com:18080/event/banner`,
          withCredentials: true,
        }
        const res = await axios(config)
        if (res.data.message) {
          console.log(res.data.message)
        } else {
          setBannerList([...res.data])
        }
      }
    } catch (err) {
      alert(err)
    }
  }
  // 이벤트 리스트 호출
  const getEventList = async () => {
    try {
      if (page >= 1) {
        const config: AxiosRequestConfig = {
          method: 'get',
          url: `http://server.beeimp.com:18080/event/list?page=${page}&count=6&region=${region}`,
          withCredentials: true,
        }
        console.log('지역', region)
        const res = await axios(config)
        if (res.data.message) {
          console.log(res.data.message)
          setPage(0)
        } else {
          console.log('검색됨==============')

          setPage(page + 1)
          setList([...list, ...res.data])
        }
      }
    } catch (err) {
      alert(err)
    }
  }
  //페이지 로딩시 배너 호출
  useEffect(() => {
    getBannerList()
  }, [])

  // 지역 변경 시 발생
  useEffect(() => {
    console.log('지역 변경')
    setLoad(true)
    setPage(1)
    setList([])
    getEventList().then(() => {
      setLoad(false)
    })
  }, [region])

  //무한 스크롤 이벤트
  const endReached = async () => {
    console.log('length:', list.length)
    if (list.length <= 0 || list.length >= 6) {
      console.log('무한 스크롤')
      setLoad(true)
      getEventList().then(() => {
        setLoad(false)
      })
    }
  }
  useEffect(() => {
    if (list.length === 0) {
      setNoSearch(true)
    } else {
      setNoSearch(false)
    }
  }, [list])
  //
  const setListHendler = (list: []) => {
    setList(list)
  }
  return (
    <View style={style.homeContainer}>
      <LocationButton region={region} />
      <FlatList
        data={['0']}
        onEndReached={endReached}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={isFetching}
        renderItem={() => (
          <>
            <View>
              <Title title={'찾았다 내 취향 💕'} size={22} />
              <Title title={'TT 에서 발견!'} size={22} />
              <Banner eventList={bannerList} />
              <Pressable //입력창 누르면 Search tab으로 이동
                onPressIn={() => navigation.navigate('SearchStackScreen')}
              >
                <SearchBar
                  editable={false} //터치했을때 키보드 안나오게
                />
              </Pressable>
            </View>
            <View>
              <Title title={'다가오는 공연'} size={17} />
              {noSearch && !load ? (
                <Text style={{ fontSize: 15, marginLeft: 22, marginTop: 10 }}>
                  검색된 데이터가 없습니다.
                </Text>
              ) : null}
              <EventList eventList={list} />
            </View>
            {load ? (
              <Image
                source={{
                  uri: 'https://i.ibb.co/5vP1d8X/Spin-1s-200px-without-Background.gif',
                }}
                style={{
                  width: moderateScale(100),
                  height: moderateScale(100),
                  alignSelf: 'center',
                }}
              />
            ) : null}
          </>
        )}
      />
    </View>
  )
}

const style = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
  locationContainer: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
})
