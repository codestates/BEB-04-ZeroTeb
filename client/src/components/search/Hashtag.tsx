import * as React from 'react'
import { useState } from 'react'
import { Text, View, Pressable } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Title from '../common/Title'

type HashtagContent = {
  hashtags: string[]
  onPress: Function
}

const Hashtag: React.FC<HashtagContent> = ({ hashtags, onPress }) => {
  const [hashtag, setHashtag] = useState<string[]>(hashtags)

  return (
    <View style={style.hashtagOuterContainer}>
      <Title title={'인기검색어'} size={17} />
      <View style={style.hashtagInnerContainer}>
        {hashtag.map((keyword, index) => {
          return (
            <Pressable key={index} onPress={() => onPress(keyword)}>
              <View style={style.hashtagButton}>
                <Text style={style.hashtagText}>{keyword}</Text>
              </View>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  hashtagOuterContainer: {
    flex: 1,
    padding: '5@msr',
  },
  hashtagInnerContainer: { flexDirection: 'row', padding: '10@msr' },
  hashtagButton: {
    flexDirection: 'row',
    margin: '5@msr',
    paddingHorizontal: '15@msr',
    paddingVertical: '10@msr',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEFCF3',
    borderRadius: 15,
    borderColor: '#FEE396',
    borderWidth: 1,
  },
  hashtagText: { color: '#544612', fontSize: '12@msr' },
})

export default Hashtag
