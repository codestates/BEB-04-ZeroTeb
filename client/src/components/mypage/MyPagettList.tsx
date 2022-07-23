import { useNavigation } from '@react-navigation/native'
import axios, { AxiosRequestConfig } from 'axios'
import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Pressable,
} from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { UserType } from '../../models/User'
import { RootState } from '../../store/Index'
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
  const navigation = useNavigation()
  // test address 주소
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )
  //트러스트 토큰 리스트
  const [token, setTokens] = useState<
    [
      {
        token_id?: string
        token_image_url?: string
      },
    ]
  >([{token_id: '1', token_image_url: 'https://images.unsplash.com/photo-1600114180229-67ab44fd85e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'}])

  const renderItem = useCallback(({ item, index }) => {
    console.log(item, index)
    return (
      <>
        {item.token_image_url === '' ? (
          <>
            <Text style={styles.tokenMsg}>보유하신 토큰이 없습니다.</Text>
          </>
        ) : (
          <Pressable onPress={()=>{navigation.navigate("TicketDetail",  { address: KilpAddress , token_id: item.token_id, token_image_url: item.token_image_url})}}>
            <Image
              source={{ uri: item.token_image_url }}
              style={{ width: SCREEN_WIDTH / 3, height: SCREEN_WIDTH / 3 }}
            />
          </Pressable>
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
  tokenMsg: { fontSize: moderateScale(25), padding: moderateScale(20) },
})

export default MyPagettList
