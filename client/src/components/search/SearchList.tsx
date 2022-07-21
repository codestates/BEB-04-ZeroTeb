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
import { useState } from 'react'
import { EventType } from '../../models/Event'
import { getDate } from '../../utils/unixTime'
import { countSeat } from '../../utils/count'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

interface searchListProps {
  sendList: EventType[]
}

const SearchList: React.FC<searchListProps> = ({ sendList }) => {
  const checkWin = () =>{
    console.log('당첨')
  }

  return (
    <ScrollView style={style.SearchListOuterContainer}>
      <Text style={style.listTitle}>검색목록</Text>
      {sendList.map((event: EventType, index: number) => {        

          return (
            <View key={index} style={style.SearchListInnerContainer}>
              <View style={style.Wrapper}>
                <View style={style.ImageWrapper}>
                  <ImageBackground
                    source={{ uri: event.thumnail }}
                    resizeMode='stretch'
                    style={style.consertImage}
                  ></ImageBackground>
                </View>
                <View style={style.SearchListTextContainer}>
                  <View style={style.textWrapper}>
                    <Text style={style.SearchListTitle}>{event.title}</Text>
                    <Text style={style.SearchListSeat}>
                      남은 좌석 : {event.remaining} / {countSeat(event.price)}
                    </Text>
                    <Text style={style.SearchListDate}>
                      공연 기간 : {getDate(event.event_start_date)} ~{' '}
                      {getDate(event.event_end_date)}
                    </Text>
                    <Pressable onPress={checkWin}>
                      <View style={style.checkBtn}>
                        <Text>당첨 확인</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )        
      })}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  listTitle:{
    marginTop: 5,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  SearchListOuterContainer: {    
    marginTop: 5,
    alignSelf: 'center',
    maxWidth: SCREEN_WIDTH * 0.95,
  },
  SearchListInnerContainer: {    
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 2,

  },
  Wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: SCREEN_HEIGHT*0.18,    
  },
  ImageWrapper: {    
    width: SCREEN_WIDTH*0.25,
    height: SCREEN_WIDTH*0.25,
    borderRadius: 50,    
    overflow: 'hidden',    
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginRight: 10

  },
  consertImage: {
    width: SCREEN_WIDTH*0.4,
    height: SCREEN_WIDTH*0.3,
    alignItems: 'center',    
    justifyContent: 'center'
  },
  SearchListTextContainer: { 
    width: '65%' 
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  SearchListTitle: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'right',
    color: 'black',
  },
  SearchListSeat: {
    fontSize: 13,
    alignItems: 'flex-end',
    textAlign: 'right',
    color: 'black',
  },
  SearchListDate: {
    fontSize: 11,
    alignItems: 'flex-end',
    textAlign: 'right',
    color: 'black',
  },
  checkBtn:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 7
  }
})

export default SearchList
