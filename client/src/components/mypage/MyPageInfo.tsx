import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import {
  View,
  Text,
  Animated,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { UserType } from '../../models/User'
import { RootState } from '../../store/Index'
import * as Clipboard from 'expo-clipboard'

const Data = ['지갑정보', '공지사항', '응모내역', '구매내역']

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

interface infoProps {
  headerHeight: number
  tabRoute: any
  listArrRef: any
  isTabFocused: boolean
  scrollY: number
  userInfo: UserType
  tabBarHeight: number
}

const MyPageInfo: React.FC<infoProps> = props => {
  const {
    headerHeight,
    tabRoute,
    listArrRef,
    isTabFocused,
    userInfo,
    tabBarHeight,
  } = props
  const navigation = useNavigation()
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(KilpAddress)
  }

  const createTwoButtonAlert = () =>
    Alert.alert(`${userInfo.username}님의 지갑주소`, KilpAddress, [
      {
        text: 'Copy',
        onPress: () => copyToClipboard(),
        style: 'cancel',
      },
      { text: 'OK' },
    ])

  const PressHandler = (index: number) => {
    switch (index) {
      case 0:
        createTwoButtonAlert()
        break
      case 1:
        navigation.navigate('Notice')
        break
      case 2:
        navigation.navigate('MyList', { type: 'entry' })
        break
      case 3:
        navigation.navigate('MyList', { type: 'sale' })
        break
    }
  }

  const renderItem = useCallback(({ item, index }) => {
    return (
      <Pressable
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'white',
          borderWidth: 1,
          height: (SCREEN_HEIGHT - headerHeight - tabBarHeight * 3.85) / 2,
        }}
        onPress={() => PressHandler(index)}
      >
        <Text style={styles.itemText}>{item}</Text>
      </Pressable>
    )
  }, [])

  const keyExtractor = useCallback((item, index) => index.toString(), [])

  return (
    <View style={styles.rootContainer}>
      <Animated.FlatList
        ref={ref => {
          let foundIndex = listArrRef.current.findIndex(
            e => e.key === tabRoute.key,
          )

          if (foundIndex === -1) {
            listArrRef.current.push({
              key: tabRoute.key,
              value: ref,
            })
          } else {
            listArrRef.current[foundIndex] = {
              key: tabRoute.key,
              value: ref,
            }
          }
        }}
        data={Data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={false}
        contentContainerStyle={{
          paddingTop: headerHeight,
        }}
        scrollEventThrottle={16}
        onScroll={
          isTabFocused
            ? Animated.event(
                [{ nativeEvent: { contentOffset: { y: props.scrollY } } }],
                { useNativeDriver: true },
              )
            : null
        }
        onMomentumScrollBegin={props.onMomentumScrollBegin}
        onMomentumScrollEnd={props.onMomentumScrollEnd}
        onScrollEndDrag={props.onScrollEndDrag}
        bounces={false}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  rootContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: '25@msr',
  },
})

export default MyPageInfo
