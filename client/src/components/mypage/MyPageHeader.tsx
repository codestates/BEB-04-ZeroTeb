import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, Pressable } from 'react-native'
import AvatarIcon from '../common/AvatarIcon'
import { Entypo } from '@expo/vector-icons'
import { UserType } from '../../models/User'
import { useNavigation } from '@react-navigation/native'
import { firstLetter } from '../../utils/utils'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface profileProps {
  userInfo: UserType
}

const MyPageHeader: React.FC<profileProps> = ({ userInfo }) => {
  const navigation = useNavigation()

  useEffect(() => {}, [userInfo])

  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileContainer}>
        <AvatarIcon
          size={65}
          color={userInfo.profile_url}
          title={firstLetter(userInfo.username)}
        />
        <Text style={styles.profileText}>{userInfo.username}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoIconContainer}>
          <View style={styles.infoIconInnerContainer}>
            <Text style={styles.infoText}>등록</Text>
            <Pressable onPress={() => navigation.navigate('Enroll')}>
              <Entypo name="squared-plus" size={19} color="black" />
            </Pressable>
          </View>
          <AvatarIcon
            size={40}
            color={'lightgrey'}
            title={userInfo.history.created}
          />
        </View>
        <View style={styles.infoIconContainer}>
          <Text style={styles.infoText}>응모</Text>
          <AvatarIcon
            size={40}
            color={'lightgrey'}
            title={userInfo.history.entry}
          />
        </View>
        <View style={styles.infoIconContainer}>
          <Text style={styles.infoText}>구매</Text>
          <AvatarIcon
            size={40}
            color={'lightgrey'}
            title={userInfo.history.sale}
          />
        </View>
        <View style={styles.infoIconContainer}>
          <Text style={styles.infoText}>관심</Text>
          <AvatarIcon
            size={40}
            color={'lightgrey'}
            title={userInfo.history.liked}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 20,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  profileText: { fontSize: 20, paddingLeft: 10 },
  headerText: {
    fontSize: 25,
    color: '#FFD800',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  infoIconInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,

    width: SCREEN_WIDTH * 0.23,
  },
  infoText: { justifyContent: 'flex-start', padding: 5 },
})

export default MyPageHeader
