import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

interface InnerTextProps {
  innerText: string
  size: number
}

const InnerText: React.FC<InnerTextProps> = ({ innerText, size }) => {
  return (
    <View style={style.innerTextContainer}>
      <Text style={{ fontSize: moderateScale(size), color: '#333333' }}>
        {innerText}
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  innerTextContainer: {
    alignItems: 'flex-start',
    marginHorizontal: moderateScale(10),
  },
})

export default InnerText
