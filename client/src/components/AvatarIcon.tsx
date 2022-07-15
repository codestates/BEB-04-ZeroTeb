import * as React from 'react'
import { Avatar } from '@rneui/themed'
import { moderateScale } from 'react-native-size-matters'
interface avatarProps {
  imgUri: string
  size: number
  color: string
}

const AvatarIcon: React.FC<avatarProps> = ({
  imgUri,
  size = 64,
  color = 'skyblue',
}) => {
  return (
    <Avatar
      size={moderateScale(size)}
      rounded
      source={imgUri ? { uri: imgUri } : {}}
      icon={{ name: 'user', type: 'font-awesome' }}
      // title="Rd"
      containerStyle={{ backgroundColor: color }}
    />
  )
}

export default AvatarIcon
