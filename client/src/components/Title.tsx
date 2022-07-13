import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface titleProps {
  title: string
  size: number
}

const Title: React.FC<titleProps> = ({ title, size }) => {
  return (
    <View style={style.titleContainer}>
      <Text style={{ fontSize: size }}>{title}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  titleContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
})

export default Title
