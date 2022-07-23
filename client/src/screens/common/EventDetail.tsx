import * as React from 'react'
import {
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
  GestureResponderEvent,
} from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import InnerText from '../../components/common/InnerText'
import Unserbar from '../../components/common/Underbar'
import AvatarIcon from '../../components/common/AvatarIcon'
import Title from '../../components/common/Title'
import CheckModal from '../../components/event/CheckModal'
import EntryBottomContent from '../../components/event/EntryBottomContent'
import SaleBottomContent from '../../components/event/SaleBottomContent'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group'
import { EventType } from '../../models/Event'
import { getDate, getDateAndTime } from '../../utils/unixTime'
import { profile_url } from '../../utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Index'
import { useNavigation, useRoute } from '@react-navigation/native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const radioButtonsData: RadioButtonProps[] = [{}]
interface eventDetailProps {
  eventDetail: EventType
}

const EventDetail: React.FC<eventDetailProps> = ({}) => {
  const route = useRoute()
  const eventDetail = route.params?.event

  const [modalVisible, setModalVisible] = React.useState<boolean>(false)

  const navigation = useNavigation()
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )
  // 라디오 버튼에 가격항목 추가
  function mapRadio(prices: { class: string; price: number; count: number }[]) {
    const newArr: RadioButtonProps[] = []
    prices.map((el, index) => {
      return newArr.push({
        id: index,
        label: el.class + ' Class / ' + el.price + ' Klay',
        value: el.price,
        selected: false,
        size: moderateScale(20),
        labelStyle: style.eventText,
      })
    })
    newArr[0].selected = true
    setRadioButtons(newArr)
  }
  React.useEffect(() => {
    mapRadio(eventDetail.price)
  }, [])
  const [radioButtons, setRadioButtons] =
    React.useState<RadioButtonProps[]>(radioButtonsData)

  // 라디오 버튼으로 선택한 가격
  const [selectPrice, setSelectPrice] = React.useState<number>(
    eventDetail.price[0].price,
  )
  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    const selectValue = radioButtonsArray.filter(
      button => button.selected === true,
    )
    setSelectPrice(selectValue[0].value)
    setRadioButtons(radioButtonsArray)
  }

  const pressButtonHendler = (event: GestureResponderEvent) => {
    // if (KilpAddress === '') {
    //   navigation.navigate('SignIn', { gotoMyPage: false })
    // } else {
    setModalVisible(true)
    // }
  }

  const getPayment = () => {
    setModalVisible(false)
    console.log('이제 클립으로 결제 진행')
  }

  return (
    <ScrollView style={style.eventOuterContainer}>
      <CheckModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        body={selectPrice}
        getPayment={getPayment}
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
          <InnerText
            innerText={`관람일 :  ${getDate(eventDetail.event_start_date)} `}
            size={15}
          />
        ) : (
          <View>
            <InnerText innerText={'응모기간 : '} size={15} />
            <InnerText
              innerText={`${getDateAndTime(
                eventDetail.event_start_date,
              )} ~ ${getDateAndTime(eventDetail.event_end_date)}`}
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
      <Unserbar />
      <Text></Text>
      <Title title={'이벤트 내용'} size={20} />
      <View style={style.eventContentContainer}>
        <InnerText innerText={eventDetail.contents} size={15} />
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
    backgroundColor: '#FFCC00',
    borderRadius: '15@msr',
    borderColor: '#FEE396',
    borderWidth: 1,
  },
  eventText: { color: '#666666', fontSize: '12@msr' },
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
