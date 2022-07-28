import * as React from 'react'
import { Pressable, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { useState } from 'react'
import RegionSelectModal from './RegionSelectModal'
import { useNavigation } from '@react-navigation/native'

interface Props {
  region: string
}

export default function LocationButton(props: Props) {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  const onStart = () => {
    setModalVisible(true)
  }

  return (
    <View style={style.locationButtonContainer}>
      <Pressable style={style.allLocationButtonContainner} onPress={onStart}>
        <Text style={style.allLocationButtonText}>{props.region}</Text>
        <FontAwesome5
          name="arrow-circle-down"
          size={moderateScale(17)}
          color="black"
        />
      </Pressable>
      <RegionSelectModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Pressable
        style={style.myLocationButtonContainner}
        onPress={() => {
          navigation.navigate('MyLocationListup')
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
