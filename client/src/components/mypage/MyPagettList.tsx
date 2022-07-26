import { useNavigation } from '@react-navigation/native'
import axios, { AxiosRequestConfig } from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
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

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface ttListProps {
  headerHeight: number
  tabRoute: any
  listArrRef: any
  isTabFocused: boolean
  scrollY: number
  userInfo: UserType
  token_data: any
}

const MyPagettList: React.FC<ttListProps> = props => {
  const {
    headerHeight,
    tabRoute,
    listArrRef,
    isTabFocused,
    userInfo,
    token_data,
  } = props
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
  >(token_data)

  // const getMyTT = async() =>{
  //   console.log('TT 데이터 호출!')
  //   let url = `http://server.beeimp.com:18080/token/list?address=${KilpAddress}`
  //   try {
  //     const config: AxiosRequestConfig = {
  //       method: 'get',
  //       url: url,
  //       withCredentials: true,
  //     }

  //     const res = await axios(config)

  //     console.log(res.data)
  //     if (res.data.message) {
  //       console.log(res.data.message);
  //       alert('TT 로딩 실패')
  //     }else{
  //       console.log(res.data)
  //       setTokens(res.data)
  //     }
  //   } catch (e) {
  //     console.log(e)

  //   }
  // }

  // useEffect(()=>{
  //   getMyTT()
  // }, [])

  const renderItem = useCallback(({ item, index }) => {
    console.log(item, index)
    return (
      <>
        {item.token_image_url === '' ? (
          <>
            <Text style={styles.tokenMsg}>보유하신 토큰이 없습니다.</Text>
          </>
        ) : (
          <Pressable
            style={{ borderColor: 'white', borderWidth: 1 }}
            onPress={() => {
              navigation.navigate('TicketDetail', {
                address: KilpAddress,
                token_id: item.token_id,
                token_image_url: item.token_image_url,
              })
            }}
          >
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
