import * as React from 'react'
import { View, Text, ImageBackground, Dimensions } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function CategoryList() {
  return (
    <View style={style.categoryListOuterContainer}>
      <View style={style.categoryListInnerContainer}>
        <ImageBackground
          source={require('../../assets/categoryImg/consert.png')}
          resizeMode="cover"
          style={style.categoryImg}
        >
          <Text style={style.categoryText}>Consert</Text>
        </ImageBackground>
      </View>
      <View style={style.categoryListInnerContainer}>
        <ImageBackground
          source={require('../../assets/categoryImg/theater.png')}
          resizeMode="cover"
          style={style.categoryImg}
        >
          <Text style={style.categoryText}>Theater</Text>
        </ImageBackground>
      </View>
      <View style={style.categoryListInnerContainer}>
        <ImageBackground
          source={require('../../assets/categoryImg/kids.png')}
          resizeMode="cover"
          style={style.categoryImg}
        >
          <Text style={style.categoryText}>Kids</Text>
        </ImageBackground>
      </View>
      <View style={style.categoryListInnerContainer}>
        <ImageBackground
          source={require('../../assets/categoryImg/musical.png')}
          resizeMode="cover"
          style={style.categoryImg}
        >
          <Text style={style.categoryText}>Musical</Text>
        </ImageBackground>
      </View>
      <View style={style.categoryListInnerContainer}>
        <ImageBackground
          source={require('../../assets/categoryImg/exhibition.png')}
          resizeMode="cover"
          style={style.categoryImg}
        >
          <Text style={style.categoryText}>Exhibition</Text>
        </ImageBackground>
      </View>
      <View style={style.categoryListInnerContainer}>
        <ImageBackground
          source={require('../../assets/categoryImg/sport.png')}
          resizeMode="cover"
          style={style.categoryImg}
        >
          <Text style={style.categoryText}>Leisure Sport</Text>
        </ImageBackground>
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  categoryListOuterContainer: {
    flex: 1,
    alignItems: 'flex-start',
    margin: '20@msr',
  },
  categoryListInnerContainer: {
    flex: 1,
    borderRadius: 10,
  },
  categoryImg: {
    width: SCREEN_WIDTH * 0.9,
    height: (SCREEN_HEIGHT * 0.65) / 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: '5@msr',
  },
  categoryText: {
    color: 'white',
    fontSize: '30@msr',
  },
})
