import * as React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface goBackButtonProps {}

const GoBackButton: React.FC<goBackButtonProps> = ({}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack()
        }
      }}
    >
      <View style={style.goBackButtonContainer}>
        <AntDesign name="left" size={moderateScale(24)} color="black" />
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  goBackButtonContainer: {
    margin: moderateScale(25),
  },
})

export default GoBackButton
