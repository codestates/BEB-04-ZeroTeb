import * as React from 'react'
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function CategoryList({ onPress }) {
  return (
    <View style={style.categoryListOuterContainer}>
      <Pressable
        style={({ pressed }) => [
          style.categoryListInnerContainer,
          pressed ? style.Pressed : null,
        ]}
        onPress={onPress}
      >
        <ImageBackground
          source={require('../../../assets/categoryImg/consert.png')}
          resizeMode="cover"
          style={style.categoryImg}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={style.categoryText}>Consert</Text>
        </ImageBackground>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          style.categoryListInnerContainer,
          pressed ? style.Pressed : null,
        ]}
      >
        <ImageBackground
          source={require('../../../assets/categoryImg/theater.png')}
          resizeMode="cover"
          style={style.categoryImg}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={style.categoryText}>Theater</Text>
        </ImageBackground>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          style.categoryListInnerContainer,
          pressed ? style.Pressed : null,
        ]}
      >
        <ImageBackground
          source={require('../../../assets/categoryImg/kids.png')}
          resizeMode="cover"
          style={style.categoryImg}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={style.categoryText}>Kids</Text>
        </ImageBackground>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          style.categoryListInnerContainer,
          pressed ? style.Pressed : null,
        ]}
      >
        <ImageBackground
          source={require('../../../assets/categoryImg/musical.png')}
          resizeMode="cover"
          style={style.categoryImg}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={style.categoryText}>Musical</Text>
        </ImageBackground>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          style.categoryListInnerContainer,
          pressed ? style.Pressed : null,
        ]}
      >
        <ImageBackground
          source={require('../../../assets/categoryImg/exhibition.png')}
          resizeMode="cover"
          style={style.categoryImg}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={style.categoryText}>Exhibition</Text>
        </ImageBackground>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          style.categoryListInnerContainer,
          pressed ? style.Pressed : null,
        ]}
      >
        <ImageBackground
          source={require('../../../assets/categoryImg/sport.png')}
          resizeMode="cover"
          style={style.categoryImg}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={style.categoryText}>Leisure Sport</Text>
        </ImageBackground>
      </Pressable>
    </View>
  )
}

const style = ScaledSheet.create({
  categoryListOuterContainer: {
    flex: 1,
    alignItems: 'flex-start',
    margin: '20@msr',
    elevation: 4, //갤럭시 boxshodow
    shadowColor: 'black', // ios boxshodow
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  categoryListInnerContainer: {
    flex: 1,
  },
  Pressed: { opacity: 0.5 },
  categoryImg: {
    width: SCREEN_WIDTH * 0.9,
    height: (SCREEN_HEIGHT * 0.65) / 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5@msr',
  },
  categoryText: {
    color: 'white',
    fontSize: '30@msr',
    fontWeight: 'bold',
  },
})
