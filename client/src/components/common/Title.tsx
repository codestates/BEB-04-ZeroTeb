import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

interface titleProps {
  title: string
  size: number
}

const Title: React.FC<titleProps> = ({ title, size }) => {
  return (
    <View style={style.titleContainer}>
      <Text style={{ fontSize: moderateScale(size) }}>{title}</Text>
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
