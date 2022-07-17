import * as React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

interface eventImgProps {
  imgUri: string
  width: number
  height: number
}

const EventImg: React.FC<eventImgProps> = ({ imgUri, width, height }) => {
  return (
    <View style={style.eventImgContainer}>
      <Image
        style={{
          width: moderateScale(width),
          height: moderateScale(height),
          resizeMode: 'cover',
        }}
        source={{ uri: `${imgUri}` }}
      ></Image>
    </View>
  )
}

const style = StyleSheet.create({
  eventImgContainer: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: 'white',
  },
})

export default EventImg
