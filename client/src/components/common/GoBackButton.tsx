import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'

interface goBackButtonProps {}

const GoBackButton: React.FC<goBackButtonProps> = ({}) => {
  return (
    <View style={style.goBackButtonContainer}>
      <AntDesign name="left" size={moderateScale(24)} color="black" />
    </View>
  )
}

const style = StyleSheet.create({
  goBackButtonContainer: {
    margin: moderateScale(25),
  },
})

export default GoBackButton
