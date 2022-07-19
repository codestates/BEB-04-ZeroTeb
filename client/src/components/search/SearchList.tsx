import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native'
import { useState } from 'react'
import { EventType } from '../../models/Event'
import DummyDate from '../../data/DummyData.json'
import { getDate } from '../../utils/unixTime'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const SearchList = ({ sendList }: EventType[]) => {
  const [list, setList] = useState<EventType[]>([...DummyDate.event])

  return (
    <View style={style.SearchListOuterContainer}>
      <View>
        <Text>검색목록</Text>
      </View>
      {list.slice(0, 4).map((event: EventType, index: number) => {
        if (event.category) {
          return (
            <View key={index} style={style.SearchListInnerContainer}>
              <View style={style.Wrapper}>
                <View style={style.ImageWrapper}>
                  <ImageBackground
                    source={{ uri: event.thumnail }}
                    style={style.consertImage}
                    imageStyle={{ borderRadius: 50 }}
                  ></ImageBackground>
                </View>
                <View style={style.textWrapper}>
                  <Text style={style.SearchListTitle}>{event.title}</Text>
                  <Text style={style.SearchListSeat}>
                    남은 좌석 : {event.remaining} /{' '}
                    {event.price[0].count + event.price[1].count}{' '}
                  </Text>
                  <Text style={style.SearchListDate}>
                    공연 기간 : {getDate(event.event_start_date)} ~{' '}
                    {getDate(event.event_end_date)}
                  </Text>
                </View>
              </View>
            </View>
          )
        }
      })}
    </View>
  )
}

const style = StyleSheet.create({
  SearchListOuterContainer: {
    left: 20,
    maxWidth: SCREEN_WIDTH * 0.9,
  },
  SearchListInnerContainer: {
    padding: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  Wrapper: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  ImageWrapper: {
    flex: 1,
    // maxHeight: 100,
    maxWidth: 80,
  },

  consertImage: {
    alignItems: 'center',
    paddingTop: 80,
  },

  textWrapper: {
    flex: 1,
    paddingTop: 25,
    alignItems: 'flex-end',
  },

  SearchListTitle: {
    fontSize: 13,
    textAlign: 'right',
    color: 'black',
  },
  SearchListSeat: {
    fontSize: 14,
    alignItems: 'flex-end',
    textAlign: 'right',
    color: 'black',
  },
  SearchListDate: {
    fontSize: 12,
    alignItems: 'flex-end',
    textAlign: 'right',
    color: 'black',
  },
})

export default SearchList
