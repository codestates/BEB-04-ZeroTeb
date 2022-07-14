import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar, Platform, ScrollView } from 'react-native'
import AvatarIcon from '../components/AvatarIcon'
import Banner from '../components/Banner'
import Location from '../components/Location'
import Searchbar from '../components/Searchbar'
import Title from '../components/Title'
import DummyDate from '../data/DummyData.json'
import axios, { AxiosRequestConfig } from 'axios'
import { EventType } from '../models/Event'
import EventList from '../layout/event/EventList'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

export default function Home() {
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
            <Title title={'찾았다 내 취향 💕'} size={25} />
            <Title title={'ZeroTeb에서 발견!'} size={25} />
            <Banner eventList={list} />
            <Searchbar />
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
