import React, { FC, useState, useEffect } from 'react'
import {
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
  GestureResponderEvent,
} from 'react-native'
import axios, { AxiosRequestConfig } from 'axios'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import InnerText from '../../components/common/InnerText'
import Unserbar from '../../components/common/Underbar'
import AvatarIcon from '../../components/common/AvatarIcon'
import EntryBottomContent from '../../components/event/EntryBottomContent'
import SaleBottomContent from '../../components/event/SaleBottomContent'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group'
import { EventType } from '../../models/Event'
import { getDate, getDateAndTime } from '../../utils/unixTime'
import { profile_url } from '../../utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Index'
import { useNavigation, useRoute } from '@react-navigation/native'
import BeforeTransaction from '../../components/event/BeforeTransactionModal'
import AfterTransactionModal from '../../components/event/AfterTransactionModal'
import LoadingModal from '../../components/common/LoadingModal'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const radioButtonsData: RadioButtonProps[] = [{ id: '0' }]
interface eventDetailProps {
  eventDetail: EventType
}

const EventDetail: FC<eventDetailProps> = ({}) => {
  const route = useRoute()
  const eventDetail = route.params?.event

  const [btModalVisible, setBtModalVisible] = useState<boolean>(false)
  const [loadingModalVisible, setLoadingModalVisible] = useState<boolean>(false)
  const [atModalVisible, setAtModalVisible] = useState<boolean>(false)
  const [afterModalBoolean, setAfterModalBoolean] = useState<boolean>(false)
  const afterModalMessage: string = '결제'
  const navigation = useNavigation()
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )
  // 라디오 버튼에 가격항목 추가
  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(radioButtonsData)
  function mapRadio(prices: { class: string; price: number; count: number }[]) {
    const newArr: RadioButtonProps[] = []
    prices.map((el, index) => {
      return newArr.push({
        id: index.toString(),
        label: el.class + ' Class / ' + el.price + ' Klay',
        value: el.price.toString(),
        selected: false,
        size: moderateScale(20),
        labelStyle: style.RadioButtonText,
      })
    })
    newArr[0].selected = true
    setRadioButtons(newArr)
  }

  // 라디오 버튼으로 선택한 값
  const [selectValue, setSelectValue] = useState<RadioButtonProps>({
    id: '0',
    label:
      eventDetail.price[0].class +
      ' Class / ' +
      eventDetail.price[0].price +
      ' Klay',
    value: eventDetail.price[0].price.toString(),
    selected: false,
    size: moderateScale(20),
    labelStyle: style.RadioButtonText,
  })
  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    const selectValue = radioButtonsArray.filter(
      button => button.selected === true,
    )
    console.log(selectValue)
    setSelectValue(selectValue[0])
    setRadioButtons(radioButtonsArray)
  }
  useEffect(() => {
    mapRadio(eventDetail.price)
    console.log(selectValue)
  }, [])
  const pressButtonHendler = (event: GestureResponderEvent) => {
    if (KilpAddress === '') {
      navigation.navigate('SignIn', { gotoMyPage: false })
    } else {
      setBtModalVisible(true)
    }
  }

  const getPayment = async () => {
    setBtModalVisible(false)
    setLoadingModalVisible(true)

    console.log('이제 클립으로 결제 진행')

    // 구매 , 응모에 따라 다른 데이터를 보내줘야 한다.
    let url = ''
    let data = {}
    console.log(
      'eventDetail.event_id',
      eventDetail.event_id,
      'selectValue.id',
      selectValue.id,
    )
    if (eventDetail.type === 'sale') {
      console.log('sale')
      url = 'http://server.beeimp.com:18080/token/buy'
      data = {
        event_id: eventDetail.event_id,
        class_id: selectValue.id,
      }
    } else {
      console.log('entry')
      url = 'http://server.beeimp.com:18080/token/entry'
      data = {
        event_id: eventDetail.event_id,
      }
    }

    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: url,
        data: data,
        withCredentials: true,
      }

      const res = await axios(config)

      console.log(res.data)
      if (
        res.data.message === '정상적으로 응모되었습니다.' ||
        res.data.message === '정상적으로 구매되었습니다.'
      ) {
        console.log('ok')
        setLoadingModalVisible(false)
        setAtModalVisible(true)
        setAfterModalBoolean(true) // 성공시 true
      } else {
        setLoadingModalVisible(false)
        setAtModalVisible(true)
        setAfterModalBoolean(false) // 실패시 false
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ScrollView style={style.eventOuterContainer}>
      <LoadingModal
        loadingModalVisible={loadingModalVisible}
        setLoadingModalVisible={setLoadingModalVisible}
      />
      <BeforeTransaction
        btModalVisible={btModalVisible}
        setBtModalVisible={setBtModalVisible}
        body={selectValue}
        getPayment={getPayment}
      />
      <AfterTransactionModal
        atModalVisible={atModalVisible}
        setAtModalVisible={setAtModalVisible}
        message={afterModalMessage}
        body={afterModalBoolean}
      />
      <View style={style.eventImgContainer}>
        <Image
          style={style.eventImg}
          source={{ uri: eventDetail.thumnail }}
        ></Image>
      </View>

      <View style={style.eventTitleContainer}>
        <Text></Text>
        <InnerText innerText={eventDetail.title} size={30} />
        {eventDetail.type === 'sale' ? (
          <>
            <InnerText
              innerText={`관람일 :  ${getDateAndTime(
                eventDetail.event_start_date,
              )} `}
              size={15}
            />
            <InnerText
              innerText={`구매 가능 기간 \n: ${getDateAndTime(
                eventDetail.recruit_start_date,
              )} ~ ${getDateAndTime(eventDetail.recruit_end_date)}`}
              size={15}
            />
          </>
        ) : (
          <View>
            <InnerText
              innerText={`응모기간 \n: ${getDateAndTime(
                eventDetail.recruit_start_date,
              )} ~ ${getDateAndTime(eventDetail.recruit_end_date)}`}
              size={15}
            />
          </View>
        )}
        <Text></Text>
        <View style={style.eventDateandButtonContainer}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
          <Pressable
            style={style.eventButtonContainer}
            onPress={pressButtonHendler}
          >
            <View style={style.eventButton}>
              <Text style={style.eventText}>
                {eventDetail.type === 'sale' ? '구매하기' : '응모하기'}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Unserbar />
      <View style={style.promoterContainer}>
        <AvatarIcon
          size={50}
          color={profile_url(eventDetail.address)}
          title={'TT'}
        />
        <InnerText innerText={eventDetail.promoter} size={20} />
      </View>

      {eventDetail.type === 'sale' ? (
        <SaleBottomContent eventDetail={eventDetail} />
      ) : (
        <EntryBottomContent eventDetail={eventDetail} />
      )}
    </ScrollView>
  )
}

const style = ScaledSheet.create({
  eventOuterContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  eventImgContainer: {
    marginTop: '20@msr',
    alignItems: 'center',
  },
  eventImg: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    resizeMode: 'cover',
    borderRadius: '4@msr',
  },
  eventTitleContainer: {
    marginTop: '10@msr',
    paddingHorizontal: '10@msr',
    justifyContent: 'space-around',
  },
  eventPrice: {
    color: '#666666',
    fontSize: '20@msr',
    marginHorizontal: '10@msr',
  },
  eventDateandButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventButtonContainer: { padding: '10@msr' },
  eventButton: {
    margin: '5@msr',
    paddingHorizontal: '15@msr',
    paddingVertical: '10@msr',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D8BF4',
    borderRadius: '15@msr',
    borderColor: '#5D8BF4',
    borderWidth: 1,
  },
  eventText: { color: '#ffffff', fontSize: '12@msr' },
  RadioButtonText: { fontSize: '15@msr' },
  promoterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '15@msr',
    paddingHorizontal: '20@msr',
  },
  eventContentContainer: {
    paddingVertical: '15@msr',
    paddingHorizontal: '10@msr',
  },
})

export default EventDetail
