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

export default function CategoryButton(prop) {
  return (
    <View style={style.categoryButtonOuterContainer}>
      <Pressable
        style={({ pressed }) => [
          style.categoryButtonInnerContainer,
          pressed ? style.Pressed : null,
        ]}
        onPress={prop.onPress}
      >
        <ImageBackground
          source={{ uri: prop.contentURL }}
          resizeMode="cover"
          style={style.categoryImg}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text style={style.categoryText}>{prop.contentTitle}</Text>
        </ImageBackground>
      </Pressable>
    </View>
  )
}

const style = ScaledSheet.create({
  categoryButtonOuterContainer: {
    flex: 1,
    alignItems: 'flex-start',
    margin: '20@msr',
    elevation: 4, //갤럭시 boxshodow
    shadowColor: 'black', // ios boxshodow
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  categoryButtonInnerContainer: {
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