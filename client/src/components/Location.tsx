import * as React from 'react'
import { Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'

export default function Location() {
  return (
    <View style={style.locationContainer}>
      <View style={style.allLocationContainner}>
        <Text style={style.allLocationText}>전국</Text>
        <FontAwesome5
          name="arrow-circle-down"
          size={moderateScale(17)}
          color="black"
        />
      </View>
      <View style={style.myLocationContainner}>
        <FontAwesome5
          name="location-arrow"
          size={moderateScale(12)}
          color="black"
          style={style.myLocationIcon}
        />
        <Text style={style.myLocationText}>내주변</Text>
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: '25@vs',
    minHeight: '25@vs',
    marginHorizontal: '15@msr',
    marginVertical: '10@msr',
  },
  allLocationContainner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  allLocationText: {
    fontSize: '15@msr',
    paddingRight: '5@msr',
  },
  myLocationContainner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    paddingHorizontal: '10@msr',
  },
  myLocationIcon: {
    color: 'gray',
  },
  myLocationText: {
    fontSize: '10@msr',
    paddingLeft: '5@msr',
    color: 'gray',
  },
})
