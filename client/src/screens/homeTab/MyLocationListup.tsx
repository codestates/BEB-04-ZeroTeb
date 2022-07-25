import * as React from 'react'
import { StyleSheet, ScrollView, Alert, Image } from 'react-native'
import EventList from '../../components/event/EventList'
import * as Location from 'expo-location'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { moderateScale } from 'react-native-size-matters'
function MyLocationListup() {
  const [listData, setListData] = useState([]) // 주변 이벤트 목록
  const [load, setLoad] = useState(false)

  //위도,경도 데이터 받기
  const loadMyLosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          '내주변 이벤트를 검색하기 위해서는   위치 허용이 필요합니다.',
        )
        return
      }
      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords

      // 로드된 위도, 경도로 주변 이벤트 호출
      let lat = latitude
      let lon = longitude

      if (lat < 0) {
        lat = lat * -1
      }
      if (lon < 0) {
        lon = lon * -1
      }
      console.log('위치 정보:', lat, lon)
      //임시 값 - 현재 주변에 이벤트가 없어서 보여주기 위함
      // lat = 35.33598
      // lon = 129.027419
      const result = await axios
        .get(
          `http://server.beeimp.com:18080/event/location?lat=${lat}&lon=${lon}`,
        )
        .then(res => {
          return res.data
        })
      if (result.message) {
        alert(result.message)
      } else {
        console.log('-Around Event-')
        for (let i of result) {
          console.log('[event_id, location]:', i.event_id, i.location)
        }
        setListData(result)
      }
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    setLoad(true)
    loadMyLosition().then(() => {
      setLoad(false)
    })
  }, [])

  return (
    <ScrollView style={styles.categoryListupContainer}>
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
      ) : (
        <EventList eventList={listData} />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  categoryListupContainer: {
    backgroundColor: 'white',
  },
})

export default MyLocationListup
