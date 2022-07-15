import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ViewProps,
} from 'react-native'
import { useState } from 'react'
import { EventType } from '../../models/Event'
import DummyDate from '../../data/DummyData.json'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const SearchList = ({ props }: ViewProps) => {
  const [list, setList] = useState<EventType>([...props])

  return (
    <View style={style.SearchListOuterContainer}>
      <View>
        <Text>검색목록 (장르로 검색)</Text>
      </View>
      {list.slice(0, 4).map((event: any, index: any) => {
        if (event.category.indexOf(props) !== -1) {
          return (
            <View key={index} style={style.SearchListInnerContainer}>
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
                  남은 좌석 : 0 / {event.price[0].count + event.price[1].count}{' '}
                </Text>
                <Text style={style.SearchListDate}>
                  공연 기간 : {event.event_start_date} ~ {event.event_end_date}
                </Text>
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
    maxHeight: 300,
  },
  SearchListInnerContainer: {
    padding: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  ImageWrapper: {
    // flex: 1,
  },

  consertImage: {
    alignItems: 'center',
    maxHeight: 100,
    maxWidth: 80,
    paddingTop: 80,
  },

  textWrapper: {
    // maxHeight: 60,
  },

  SearchListTitle: {
    fontSize: 13,
    alignItems: 'flex-end',
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
