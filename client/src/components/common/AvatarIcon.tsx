import * as React from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { View, Text } from 'react-native'
interface avatarProps {
  size: number
  color: string
  title: string
}

const AvatarIcon: React.FC<avatarProps> = ({ size, color, title }) => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: moderateScale(size),
          height: moderateScale(size),
          borderRadius: 35,
          backgroundColor: color || 'skyblue',
        }}
      >
        <Text style={{ fontSize: moderateScale(size / 2 || 64) }}>{title}</Text>
      </View>
    </>
  )
}

export default AvatarIcon
