import * as React from 'react'
import { moderateScale } from 'react-native-size-matters'
import { View, Text } from 'react-native'
interface avatarProps {
  size: number
  color: string
  title: string | number
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
          borderRadius: moderateScale(50),
          backgroundColor: color || 'skyblue',
        }}
      >
        <Text style={{ fontSize: moderateScale(size / 2 || 64) }}>{title}</Text>
      </View>
    </>
  )
}

export default AvatarIcon
