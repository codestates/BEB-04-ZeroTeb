import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { useFonts } from 'expo-font'

interface titleProps {
  title: string
  size: number
}

const Title: React.FC<titleProps> = ({ title, size }) => {
  const [loaded] = useFonts({
    Montserrat: require('../../../assets/fonts/gangwoneduallBold.ttf'),
  })

  if (!loaded) {
    return null
  }
  return (
    <View style={style.titleContainer}>
      <Text
        style={{
          fontSize: moderateScale(size),
          fontFamily: 'Montserrat',
        }}
      >
        {title}
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  titleContainer: {
    alignItems: 'flex-start',
    marginHorizontal: moderateScale(20),
  },
})

export default Title
