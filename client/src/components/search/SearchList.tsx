import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native'
import { EventType } from '../../models/Event'
import { getDate } from '../../utils/unixTime'
import axios, { AxiosRequestConfig } from 'axios'
import { useNavigation } from '@react-navigation/native'
import { ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

interface searchListProps {
  sendList: EventType[]
  type: string
  address: string
}

const SearchList: React.FC<searchListProps> = ({ sendList, type, address }) => {
  const navigation = useNavigation()
  // 당첨자 체크 함수
  const checkWin = async (_eventId: number) => {
    try {
      const config: AxiosRequestConfig = {
        method: 'get',
        url: `http://server.beeimp.com:18080/event/entry?event_id=${_eventId}&address=${address}`,
        withCredentials: true,
      }
      const res = await axios(config)
      if (res.data.message) {
        console.log(res.data.message)
        alert(`I'm sorry, you don't win [${_eventId}] event`)
      } else {
        console.log(
          `[${res.data[0].address}] user win [${res.data[0].event_id}]event`,
        )
        alert(
          `Congratulations!! [${res.data[0].address}] user win [${res.data[0].event_id}]event`,
        )
      }
    } catch (err) {
      alert(err)
    }
  }

  return (
    <ScrollView style={style.SearchListOuterContainer}>
      <Text style={style.listTitle}>{type}검색목록</Text>
      {sendList.map((event: EventType, index: number) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              navigation.navigate('EventDetail', { event: event })
            }}
          >
            <View style={style.SearchListInnerContainer}>
              <View style={style.Wrapper}>
                <View style={style.ImageWrapper}>
                  <ImageBackground
                    source={{ uri: event.thumnail }}
                    resizeMode="stretch"
                    style={style.consertImage}
                  ></ImageBackground>
                </View>
                <View style={style.SearchListTextContainer}>
                  <View style={style.textWrapper}>
                    <Text style={style.SearchListTitle} ellipsizeMode={'tail'}>
                      {event.title}
                    </Text>
                    {event.type === 'sale' ? (
                      <Text style={style.SearchListSeat}>
                        남은 좌석 : {event.remaining} /{event.totalSeat}
                      </Text>
                    ) : (
                      <Text style={style.SearchListSeat}>
                        응모 인원 : {event.price[0].count}
                      </Text>
                    )}
                    {event.type === 'sale' ? (
                      <Text style={style.SearchListDate}>
                        공연 기간 : {getDate(event.event_start_date)} ~{' '}
                        {getDate(event.event_end_date)}
                      </Text>
                    ) : (
                      <Text style={style.SearchListDate}>
                        응모 기간 : {getDate(event.recruit_start_date)} ~{' '}
                        {getDate(event.recruit_end_date)}
                      </Text>
                    )}

                    {type === 'entry' || 'created' ? (
                      type === 'entry' ? (
                        <Pressable
                          onPress={() => {
                            checkWin(event.event_id)
                          }}
                        >
                          <View style={style.checkBtn}>
                            <Text>당첨 확인</Text>
                          </View>
                        </Pressable>
                      ) : type === 'created' ? (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('QRread', {
                              event_id: event.event_id,
                            })
                          }}
                        >
                          <View style={style.checkBtn}>
                            <Text>QR 확인</Text>
                          </View>
                        </Pressable>
                      ) : null
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const style = ScaledSheet.create({
  listTitle: {
    marginTop: '5@msr',
    paddingBottom: '10@msr',
    fontSize: '17@msr',
    fontWeight: 'bold',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  SearchListOuterContainer: {
    marginTop: '5@msr',
    alignSelf: 'center',
    maxWidth: SCREEN_WIDTH * 0.95,
  },
  SearchListInnerContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: '2@msr',
  },
  Wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10@msr',
    height: SCREEN_WIDTH * 0.3,
  },
  ImageWrapper: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: '500@msr',
    overflow: 'hidden',
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginRight: '10@msr',
  },
  consertImage: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SearchListTextContainer: {
    width: '65%',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  SearchListTitle: {
    flex: 1,
    fontSize: '17@msr',
    fontWeight: '800',
    textAlign: 'right',
    color: 'black',
  },
  SearchListSeat: {
    fontSize: '13@msr',
    alignItems: 'flex-end',
    textAlign: 'right',
    color: 'black',
  },
  SearchListDate: {
    fontSize: '11@msr',
    alignItems: 'flex-end',
    textAlign: 'right',
    color: 'black',
  },
  checkBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100@msr',
    height: '30@msr',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: '12@msr',
    marginTop: '7@msr',
  },
})

export default SearchList
