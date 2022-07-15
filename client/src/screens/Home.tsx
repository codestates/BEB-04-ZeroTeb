import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Banner from '../components/Banner'
import Location from '../components/Location'
import Title from '../components/Title'
import SearchBar from '../components/Searchbar'
import EventList from '../layout/event/EventList'
import DummyDate from '../data/DummyData.json'
import axios, { AxiosRequestConfig } from 'axios'
import { EventType } from '../models/Event'
import { TabActions, useNavigation } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RootTabParamList } from '../navigations/NavBar'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

type Props = BottomTabScreenProps<RootTabParamList, 'Search'>

export default function Home() {
  //입력창 누르면 Search tab으로 이동
  const navigation = useNavigation()
  const jumpToSearch = TabActions.jumpTo('Search')

  const [list, setList] = useState<EventType>([...DummyDate.event])

  const getEventList = async () => {
    try {
      const config: AxiosRequestConfig = {
        method: 'get',
        // url: 'http://localhost:8080/event/list?page=2&count=5',
        url: 'http://f82ebb62-8f0d-4fdf-b843-4bf1034e484e.mock.pstmn.io/event/list?page=2&count=5',
        withCredentials: true,
      }
      const res = await axios(config)
      setList(res.data)
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    getEventList()
  }, [])

  return (
    <>
      <View style={style.homeContainer}>
        <Location />
        <ScrollView decelerationRate="fast">
          <View>
            <Title title={'찾았다 내 취향 💕'} size={22} />
            <Title title={'ZeroTeb에서 발견!'} size={22} />
            <Banner eventList={list} />
            <TouchableOpacity onPress={() => navigation.dispatch(jumpToSearch)}>
              <SearchBar
                editable={false} //터치했을때 키보드 안나오게
              />
            </TouchableOpacity>
          </View>
          <View>
            <Title title={'다가오는 공연'} size={17} />
            <EventList eventList={list} />
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
})
