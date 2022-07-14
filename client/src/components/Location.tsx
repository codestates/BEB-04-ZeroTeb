import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export default function Location() {
  return (
    <View style={style.locationContainer}>
      <View style={style.allLocationContainner}>
        <Text style={style.allLocationText}>전국</Text>
        <FontAwesome5 name="arrow-circle-down" size={17} color="black" />
      </View>
      <View style={style.myLocationContainner}>
        <FontAwesome5
          name="location-arrow"
          size={12}
          color="black"
          style={style.myLocationIcon}
        />
        <Text style={style.myLocationText}>내주변</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 30,
    minHeight: 30,
    margin: 20,
  },
  allLocationContainner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  allLocationText: {
    fontSize: 15,
    paddingRight: 5,
  },
  myLocationContainner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  myLocationIcon: {
    color: 'gray',
  },
  myLocationText: {
    fontSize: 10,
    paddingLeft: 5,
    color: 'gray',
  },
})
