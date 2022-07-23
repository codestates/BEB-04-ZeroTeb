import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { UserType } from '../../models/User'

const Data = ['지갑정보', '구매내역', '응모내역', '공지사항', '문의하기']

interface infoProps {
  headerHeight: number
  tabRoute: any
  listArrRef: any
  isTabFocused: boolean
  scrollY: number
  userInfo: UserType
}

const MyPageInfo: React.FC<infoProps> = props => {
  const { headerHeight, tabRoute, listArrRef, isTabFocused, userInfo } = props

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View
        style={{
          ...styles.itemContainer,
          // backgroundColor: index % 2 === 0 ? 'lightgray' : 'lightyellow',
        }}
      >
        <Text style={styles.itemText}>{item}</Text>
      </View>
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
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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
  itemContainer: {
    width: '100%',
    height: '60@msr',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: '25@msr',
  },
})

export default MyPageInfo
