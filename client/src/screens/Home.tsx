import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import Banner from '../components/Banner'
import Location from '../components/Location'
import Searchbar from '../components/Searchbar'
import Title from '../components/Title'

export default function Home() {
  return (
    <View style={style.homeContainer}>
      <Location />
      <Title title={'찾았다 내 취향 💕'} size={25} />
      <Title title={'ZeroTeb에서 발견!'} size={25} />
      <Banner />
      <Searchbar />
    </View>
  )
}

const style = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 30,
  },
})
