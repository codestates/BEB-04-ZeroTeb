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

const { width: SCREEN_WIDTH } = Dimensions.get('window')

type SearchListContent = {
  props: {
    enteredSearch: any
  }
}

const SearchList: React.FC<SearchListContent> = ({ props }) => {
  const [list, setList] = useState<EventType>([...DummyDate.event])

  return (
    <View style={style.SearchListOuterContainer}>
      <View>
        <Text>검색목록 (장르로 검색)</Text>
      </View>
      {list.slice(0, 4).map((event: any, index: any) => {
        if (event.category.indexOf(props) !== -1) {
          return (
            <View key={index} style={style.SearchListInnerContainer}>
              <ImageBackground
                source={{ uri: event.thumnail }}
                resizeMode="cover"
                style={style.consertImage}
              ></ImageBackground>
              <Text style={style.SearchListText}>{event.category}</Text>
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
  consertImage: {
    alignItems: 'center',
    maxHeight: 100,
    maxWidth: 100,
    paddingTop: 60,
  },
  SearchListText: {
    fontSize: 20,
    alignItems: 'flex-end',
    textAlign: 'right',
    color: 'black',
  },
})

export default SearchList
