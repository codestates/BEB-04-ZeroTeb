import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'

const Data = ['지갑정보', '구매내역', '응모내역', '공지사항', '문의하기']
const window = Dimensions.get('window')

interface infoProps {
  headerHeight: number
  tabBarHeight: number
  tabRoute: any
  listArrRef: any
  isTabFocused: boolean
  scrollY: number
}

const MyPageInfo: React.FC<infoProps> = props => {
  const { headerHeight, tabBarHeight, tabRoute, listArrRef, isTabFocused } =
    props

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
          minHeight: window.height + headerHeight - tabBarHeight,
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

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  itemContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 25,
  },
})

export default MyPageInfo
