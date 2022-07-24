import * as React from 'react'
import { View, Text, Dimensions, ScrollView, Image } from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import KilpImage from '../../../assets/kilpImg/kilp_image.png'

import Title from '../../components/common/Title'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const Notice = () => {
  const whatTT = [
    {
      img: ' ',
      contents:
        '다양한 종류의 이벤트를 개최하고 다른 사람의 이벤트에도 참여해보세요!',
    },
    {
      img: ' ',
      contents:
        '위치, 이벤트 종류, 검색으로 원하는 이벤트를 찾아 즐길 수 있습니다.',
    },
    {
      img: ' ',
      contents:
        '개최자로 부터 보증금을 받아서 이벤트에 문제가 발생시 구매자 분들에게 보상해드립니다.',
    },
    {
      img: ' ',
      contents:
        '이벤트 티켓 분실 걱정 NO! \n NFT로 된 티켓으로 이벤트를 즐기실 수 있습니다!',
    },
    {
      img: ' ',
      contents:
        '이벤트에 참여 할 수록 해당 아티스트에 대한 SBT(소울바운드토큰)가 쌓이고 팬이 되어 주세요!',
    },
  ]

  const tutorialList = [
    {
      img: ' ',
      contents: 'Kilp 로그인을 한 다음 등록버튼[+]을 눌러주세요!',
    },
    {
      img: ' ',
      contents: '이벤트와 관련된 각종 정보들을 작성해 주세요.',
    },
    {
      img: ' ',
      contents: '카테고리, 위치, 검색을 이용해서 관심있는 이벤트를 찾아주세요!',
    },
    {
      img: ' ',
      contents:
        '마음에 드는 이벤트를 누른 후 해당 정보들이 맞는지 확인후 구매/응모 버튼을 눌러서 진행해주세요!',
    },
    {
      img: ' ',
      contents:
        '다양한 종류의 이벤트를 개최하고 다른 사람의 이벤트에도 참여해보세요!',
    },
  ]
  return (
    <View style={style.noticeContainer}>
      <ScrollView decelerationRate="fast">
        <Title title={'공지사항'} size={30} />
        <View style={style.contentsContainer}>
          <Text style={style.contentsText}>TT 어플이란?</Text>
          <ScrollView
            decelerationRate="fast"
            horizontal
            pagingEnabled
            indicatorStyle={'black'}
          >
            {whatTT.map((event: any, index: React.Key) => {
              return (
                <View key={index} style={style.noticeBody}>
                  <Image
                    source={KilpImage}
                    style={{
                      width: SCREEN_WIDTH - moderateScale(70),
                      height: moderateScale(180),
                    }}
                  />
                  <Text style={style.noticeText}>{event.contents}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View style={style.contentsContainer}>
          <Text style={style.contentsText}>사용방법</Text>
          <ScrollView
            decelerationRate="fast"
            horizontal
            pagingEnabled
            indicatorStyle={'black'}
          >
            {tutorialList.map((event: any, index: React.Key) => {
              return (
                <View key={index} style={style.noticeBody}>
                  <Image
                    source={KilpImage}
                    style={{
                      width: SCREEN_WIDTH - moderateScale(70),
                      height: SCREEN_HEIGHT / 5,
                    }}
                  />
                  <Text style={style.noticeText}>{event.contents}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

const style = ScaledSheet.create({
  noticeContainer: {
    backgroundColor: 'white',
    paddingTop: '15@msr',
  },
  contentsContainer: {
    height: SCREEN_HEIGHT / 2,
  },
  contentsText: {
    fontSize: '20@msr',
    marginLeft: '20@msr',
    marginVertical: '20@msr',
  },
  noticeBody: {
    // padding: '20@msr',
    width: SCREEN_WIDTH,
    alignItems: 'center',
    overflow: 'scroll',
    backgroundColor: 'white',
    borderRadius: '10@msr',
  },
  noticeText: {
    fontSize: '16@msr',
    margin: '10@msr',
    color: 'black',
    paddingTop: '30@msr',
    fontWeight: '600',
  },
})

export default Notice
