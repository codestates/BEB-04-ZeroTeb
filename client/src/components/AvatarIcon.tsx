import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from '@rneui/themed'
interface avatarProps {
  imgUri: string
  size: number
}

const AvatarIcon: React.FC<avatarProps> = ({ imgUri, size = 64 }) => {
  return (
    <Avatar
      size={size}
      rounded
      source={imgUri ? { uri: imgUri } : {}}
      icon={{ name: 'user', type: 'font-awesome' }}
      // title="Rd"
      containerStyle={{ backgroundColor: 'skyblue' }}
    />
  )
}

const style = StyleSheet.create({})

export default AvatarIcon
