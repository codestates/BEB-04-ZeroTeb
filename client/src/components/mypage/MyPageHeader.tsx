import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import AvatarIcon from '../common/AvatarIcon'
import { Entypo } from '@expo/vector-icons'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface profileProps {}

const MyPageHeader: React.FC<profileProps> = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileContainer}>
        <AvatarIcon size={65} color={'skyblue'} title={''} />
        <Text style={styles.profileText}>username</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoIconContainer}>
          <View style={styles.infoIconInnerContainer}>
            <Text style={styles.infoText}>등록</Text>
            <Entypo name="squared-plus" size={19} color="black" />
          </View>
          <AvatarIcon size={40} color={'lightgrey'} title={'10'} />
        </View>
        <View style={styles.infoIconContainer}>
          <Text style={styles.infoText}>응모</Text>
          <AvatarIcon size={40} color={'lightgrey'} title={'11'} />
        </View>
        <View style={styles.infoIconContainer}>
          <Text style={styles.infoText}>구매</Text>
          <AvatarIcon size={40} color={'lightgrey'} title={'4'} />
        </View>
        <View style={styles.infoIconContainer}>
          <Text style={styles.infoText}>관심</Text>
          <AvatarIcon size={40} color={'lightgrey'} title={'21'} />
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
  profileText: { fontSize: 30, paddingLeft: 10 },
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
