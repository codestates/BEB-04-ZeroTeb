import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native'
import { UserType } from '../../models/User'
import Title from '../common/Title'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface ttListProps {
  headerHeight: number
  tabRoute: any
  listArrRef: any
  isTabFocused: boolean
  scrollY: number
  userInfo: UserType
}

const MyPagettList: React.FC<ttListProps> = props => {
  const { headerHeight, tabRoute, listArrRef, isTabFocused, userInfo } = props
  const [token, setTokens] = useState<
    [
      {
        token_id?: string
        token_image_url?: string
      },
    ]
  >()

  const renderItem = useCallback(({ item, index }) => {
    console.log(item, index)
    return (
      <>
        {item.token_image_url === '' ? (
          <>
            <Text style={styles.tokenMsg}>보유하신 토큰이 없습니다.</Text>
          </>
        ) : (
          <View>
            <Image
              source={{ uri: item.token_image_url }}
              style={{ width: SCREEN_WIDTH / 3, height: SCREEN_WIDTH / 3 }}
            />
          </View>
        )}
      </>
    )
  }, [])

  const keyExtractor = useCallback((item, index) => index.toString(), [])

  return (
    <View>
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
        data={token}
        numColumns={3}
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

const styles = StyleSheet.create({
  tokenMsg: { fontSize: 25, padding: 20 },
})

export default MyPagettList
