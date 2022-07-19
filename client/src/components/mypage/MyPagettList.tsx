import React, { useCallback } from 'react'
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native'
import DummyDate from '../../data/DummyData.json'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const Data = DummyDate.event
const window = Dimensions.get('window')

interface ttListProps {
  headerHeight: number
  tabBarHeight: number
  tabRoute: any
  listArrRef: any
  isTabFocused: boolean
  scrollY: number
}

const MyPagettList: React.FC<ttListProps> = props => {
  const { headerHeight, tabBarHeight, tabRoute, listArrRef, isTabFocused } =
    props

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.token_image_url }}
          style={{ width: SCREEN_WIDTH / 3, height: SCREEN_WIDTH / 3 }}
        />
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
        horizontal={false}
        numColumns={3}
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

const styles = StyleSheet.create({
  rootContainer: {},
  itemContainer: {},
})

export default MyPagettList
