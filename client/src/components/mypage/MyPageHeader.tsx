import React, { useEffect } from 'react'
import { View, Text, Dimensions, Pressable } from 'react-native'
import AvatarIcon from '../common/AvatarIcon'
import { Entypo } from '@expo/vector-icons'
import { UserType } from '../../models/User'
import { useNavigation } from '@react-navigation/native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

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
          size={moderateScale(65)}
          color={userInfo.profile_url}
          title={'TT'}
        />
        <Text style={styles.profileText}>{userInfo.username}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoIconContainer}>
          <View style={styles.infoIconInnerContainer}>
            <Text style={styles.infoText}>등록</Text>
            <Pressable onPress={() => navigation.navigate('Enroll')}>
              <Entypo
                name="squared-plus"
                size={moderateScale(19)}
                color="black"
              />
            </Pressable>
          </View>
          <Pressable
            onPress={() => navigation.navigate('MyList', { type: 'created' })}
          >
            <AvatarIcon
              size={moderateScale(50)}
              color={'lightgrey'}
              title={userInfo.history.created}
            />
          </Pressable>
        </View>
        <View style={styles.infoIconContainer}>
          <Text style={styles.infoText}>응모</Text>
          <Pressable
            onPress={() => navigation.navigate('MyList', { type: 'entry' })}
          >
            <AvatarIcon
              size={moderateScale(50)}
              color={'lightgrey'}
              title={userInfo.history.entry}
            />
          </Pressable>
        </View>
        <View style={styles.infoIconContainer}>
          <Text style={styles.infoText}>구매</Text>
          <Pressable
            onPress={() => navigation.navigate('MyList', { type: 'sale' })}
          >
            <AvatarIcon
              size={moderateScale(50)}
              color={'lightgrey'}
              title={userInfo.history.sale}
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: '20@msr',
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10@msr',
  },
  profileText: { fontSize: '20@msr', paddingLeft: '10@msr' },
  headerText: {
    fontSize: '25@msr',
    color: '#FFD800',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10@msr',
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
    padding: '10@msr',

    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_HEIGHT * 0.14,
  },
  infoText: {
    fontSize: '18@msr',
    justifyContent: 'flex-start',
    padding: '10@msr',
  },
})

export default MyPageHeader
