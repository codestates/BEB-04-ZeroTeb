import * as React from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import RegionSelectModal from './regionSelectModal'

export default function LocationButton() {
  const [myLosition, setMyLosition] = useState<[number, number]>([0, 0])
  const [modalVisible, setModalVisible] = useState(false)

  const onStart = () => {
    setModalVisible(true)
  }

  //내주변 터치 시 위도,경도 로드
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
      setMyLosition([latitude, longitude])
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    setMyLosition(myLosition)
    console.log('----' + myLosition)
  }, [loadMyLosition])

  return (
    <View style={style.locationButtonContainer}>
      <Pressable style={style.allLocationButtonContainner} onPress={onStart}>
        <Text style={style.allLocationButtonText}>전국</Text>
        <FontAwesome5
          name="arrow-circle-down"
          size={moderateScale(17)}
          color="black"
        />
      </Pressable>
      <RegionSelectModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        body={undefined}
      />
      <Pressable
        style={style.myLocationButtonContainner}
        onPressIn={() => {
          loadMyLosition()
        }}
      >
        <FontAwesome5
          name="location-arrow"
          size={moderateScale(12)}
          color="black"
          style={style.myLocationButtonIcon}
        />
        <Text style={style.myLocationButtonText}>내주변</Text>
      </Pressable>
    </View>
  )
}

const style = ScaledSheet.create({
  locationButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: '25@vs',
    minHeight: '25@vs',
    marginHorizontal: '15@msr',
    marginVertical: '10@msr',
  },
  allLocationButtonContainner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  allLocationButtonText: {
    fontSize: '15@msr',
    paddingRight: '5@msr',
  },
  myLocationButtonContainner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    paddingHorizontal: '10@msr',
  },
  myLocationButtonIcon: {
    color: 'gray',
  },
  myLocationButtonText: {
    fontSize: '10@msr',
    paddingLeft: '5@msr',
    color: 'gray',
  },
})
