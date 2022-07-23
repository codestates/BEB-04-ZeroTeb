import * as React from 'react'
import axios from 'axios'
import { RootState } from '../../store/Index'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { EnrollType } from '../../models/Event'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import SetSellTypeModal from '../../components/enroll/SetSellTypeModal'
import SetDateAndTime from '../../components/enroll/SetDateAndTime'
import DetailPrice from '../../components/enroll/DetailPrice'
import ConcertTypes from '../../components/enroll/ConcertTypesModal'
import PlaceModalSelect from '../../components/enroll/PlaceModal'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight
const ENROLL_URL = 'http://server.beeimp.com:18080/event/create' //prepare url

interface Props {}

const Enroll: React.FC<Props> = () => {
  const navigation = useNavigation()
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )
  const AccessToken = useSelector(
    (state: RootState) => state.signin.AccessToken,
  )
  const userName = useSelector((state: RootState) => state.signin.userName)
  // console.log(AccessToken)
  const mode = ['date', 'time']
  // 최종적인 저장
  const [modalVisible, setModalVisible] = useState(false) // 모달창 켜기 끄기
  const [list, setList] = useState<EnrollType>({
    title: '',
    promoter: userName,
    address: KilpAddress,
    location: '',
    sub_location: '',
    category: '',
    type: 'entry',
    thumnail: ' ',
    token_image_url: ' ',
    price: [{ class: 'S', price: 0, count: 0 }],
    contents: '',
    option: {},
    recruit_start_date: Math.floor(Number(new Date()) / 1000),
    recruit_end_date: Math.floor(Number(new Date()) / 1000),
    event_start_date: Math.floor(Number(new Date()) / 1000),
    event_end_date: Math.floor(Number(new Date()) / 1000),
    created_date: Math.floor(Number(new Date()) / 1000),
    modified_date: Math.floor(Number(new Date()) / 1000),
  })
  const [deposit, setDeposit] = useState<Number>(0)

  const pickImage = async (e: string) => {
    const name = e
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      if (name === 'token_image_url')
        setList({ ...list, token_image_url: result.uri })
      else setList({ ...list, thumnail: result.uri })
    }
  }
  const onStart = () => {
    let money = 0
    // 응모일때
    if (list.type === 'entry') {
      money += Number(list.price[0].count)
      setDeposit(money * 5)
    }
    // 판매일때
    else {
      {
        list.price.map((value, index) => {
          money += Number(value.price * value.count)
        })
        setDeposit(money * 0.05)
      }
    }
    setModalVisible(true)
  }

  const onCheckEnroll = async () => {
    // 조건문 달아서 axios POST
    console.log(list)
    await axios
      .post(ENROLL_URL, list, {
        headers: {
          Cookie: AccessToken,
        },
      })
      .then(res => {
        console.log(res.data)
        navigation.goBack()
      })
    setModalVisible(false)
  }

  return (
    <View style={style.enrollContainer}>
      <ScrollView decelerationRate="fast">
        <View style={style.enrollTitle}>
          <Text style={style.enrollTitleText}>이벤트 등록</Text>
        </View>
        <View style={{ flex: 1 }}>
          {/* 제목 */}
          <View>
            <Text style={style.enrollContentText}>제목</Text>
            <View style={style.enrollInput}>
              <TextInput
                style={{ left: moderateScale(20), fontSize: moderateScale(20) }}
                value={list.title}
                onChangeText={text => setList({ ...list, title: text })}
              ></TextInput>
            </View>
          </View>
          {/* 이벤트 종류 */}
          <ConcertTypes list={list} setList={setList} />

          {/* 기간 (TextInput 2개 필요)*/}
          {mode.map((value, index) => {
            return (
              <View key={index}>
                <Text style={style.enrollContentText}>
                  이벤트 등록 및 마감 {value == 'date' ? '기간' : '시간'}
                </Text>
                <View style={style.rowContentWrapper}>
                  <View style={style.DateTimeContent}>
                    <SetDateAndTime
                      setRecruitStart={setList}
                      type={'recruit_start_date'}
                      list={list}
                      mode={value}
                    />
                  </View>
                  <Text> ~ </Text>
                  <View style={style.DateTimeContent}>
                    <SetDateAndTime
                      setRecruitEnd={setList}
                      type={'recruit_end_date'}
                      list={list}
                      mode={value}
                    />
                  </View>
                </View>
              </View>
            )
          })}

          {/* 기간 (TextInput 2개 필요)*/}
          {mode.map((value, index) => {
            return (
              <View key={index}>
                <Text style={style.enrollContentText}>
                  이벤트 시작 및 종료 {value == 'date' ? '기간' : '시간'}
                </Text>
                <View style={style.rowContentWrapper}>
                  <View style={style.DateTimeContent}>
                    <SetDateAndTime
                      setEventStart={setList}
                      type={'event_start_date'}
                      list={list}
                      mode={value}
                    />
                  </View>
                  <Text> ~ </Text>
                  <View style={style.DateTimeContent}>
                    <SetDateAndTime
                      setEventEnd={setList}
                      type={'event_end_date'}
                      list={list}
                      mode={value}
                    />
                  </View>
                </View>
              </View>
            )
          })}

          {/* 장소 (체크박스) */}
          <PlaceModalSelect list={list} setList={setList} />

          {/* 판매 타입 */}
          <SetSellTypeModal list={list} setList={setList} />
          <View>
            <Text style={style.enrollContentText}>가격</Text>
            <View style={style.rowContentWrapper}>
              {/* 가격 (3개의 칸) */}
              {list.type === 'sale' ? (
                <DetailPrice list={list} setList={setList} />
              ) : (
                <View style={style.rowContentWrapper}>
                  <View style={style.InputPrice}>
                    <Text
                      style={{
                        fontSize: moderateScale(20),
                        textAlign: 'center',
                      }}
                    >
                      {list.price[0].class}
                    </Text>
                  </View>
                  <View style={style.InputPrice}>
                    <TextInput
                      style={{
                        fontSize: moderateScale(20),
                        textAlign: 'center',
                      }}
                      testID="price"
                      placeholder={'price'}
                      keyboardType="number-pad"
                      onChangeText={(e: any) => {
                        setList({
                          ...list,
                          price: [{ ...list.price[0], ['price']: e }],
                        })
                      }}
                      value={String(list.price[0].price)}
                    ></TextInput>
                  </View>
                  <View style={style.InputPrice}>
                    <TextInput
                      style={{
                        fontSize: moderateScale(20),
                        textAlign: 'center',
                      }}
                      testID="count"
                      placeholder={'count'}
                      keyboardType="number-pad"
                      onChangeText={(e: any) => {
                        setList({
                          ...list,
                          price: [{ ...list.price[0], ['count']: e }],
                        })
                      }}
                      value={String(list.price[0].count)}
                    ></TextInput>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* 보증금 */}
          {/* <View style={{ flex: 1 }}>
            <Text style={style.enrollContentText}>보증금(Klay)</Text>
            <View style={style.enrollInput}>
              <Text style={{ left: 20, fontSize: 20 }}>{list.deposit * 5}</Text>
            </View>
          </View> */}

          {/* 내용 (!TextInput 칸 넓이 증가) */}
          <View>
            <Text style={style.enrollContentText}>내용</Text>
            <View style={style.enrollInputLarge}>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: moderateScale(16),
                  textAlign: 'left',
                }}
                multiline={true}
                numberOfLines={4}
                value={list.contents}
                onChangeText={text => setList({ ...list, contents: text })}
              ></TextInput>
            </View>
          </View>
          {/* 썸네일 이미지 */}
          <View>
            <Text style={style.enrollContentText}>대표 이미지</Text>
            <TouchableOpacity onPress={() => pickImage('thumnail')}>
              <View style={style.enrollInputLarge}>
                <Image
                  source={{ uri: list.thumnail }}
                  style={{
                    margin: 10,
                    width: SCREEN_WIDTH - 60,
                    height: 180,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* 토큰 이미지  */}
          <View>
            <Text style={style.enrollContentText}>토큰 이미지</Text>
            <TouchableOpacity onPress={() => pickImage('token_image_url')}>
              <View style={style.enrollInputLarge}>
                <Image
                  source={{ uri: list.token_image_url }}
                  style={{
                    margin: moderateScale(10),
                    width: SCREEN_WIDTH - moderateScale(60),
                    height: moderateScale(180),
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 등록 버튼 */}
      <TouchableOpacity onPress={onStart}>
        <View style={style.enrollSubmmitButtonContainer}>
          <Text style={style.enrollSubmmitButton}>등록</Text>
        </View>
      </TouchableOpacity>
      <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
        <View style={style.modalContainer}>
          <View
            style={style.blankSpace}
            onTouchEnd={() => setModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
          />
          <View style={style.modalSelectBody}>
            <Text
              style={{
                width: SCREEN_WIDTH / 2,
                fontSize: moderateScale(24),
                marginBottom: moderateScale(20),
              }}
            >
              현재 보증금은 {deposit} Klay 입니다. {'\n'} 보증금을 확인하시고
              진행해주세요.
            </Text>
            <View style={{}}>
              <TouchableOpacity onPress={onCheckEnroll}>
                <Text style={style.modalSubmmit}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={style.modalSubmmit}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const style = ScaledSheet.create({
  enrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: '20@msr',
  },
  enrollTitle: {
    alignItems: 'center',
    marginVertical: '25@msr',
  },
  enrollTitleText: {
    fontWeight: 'bold',
    fontSize: '30@msr',
  },
  enrollContentText: {
    fontSize: '20@msr',
    fontWeight: 'bold',
    color: '#333333',
    paddingVertical: '5@msr',
  },
  DateTimeContent: {
    width: SCREEN_WIDTH / 2 - moderateScale(30),
    minHeight: '25@msr',
    maxHeight: '25@msr',
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    justifyContent: 'center',
  },
  InputPrice: {
    width: SCREEN_WIDTH / 3.5,
    marginRight: '5@msr',
    minHeight: '25@msr',
    maxHeight: '25@msr',
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    justifyContent: 'center',
  },

  enrollInput: {
    minHeight: '25@msr',
    maxHeight: '25@msr',
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    justifyContent: 'center',
    marginBottom: '10@msr',
  },
  enrollInputLarge: {
    maxWidth: SCREEN_WIDTH - moderateScale(30),
    padding: '10@msr',
    height: '200@msr',
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    marginBottom: '10@msr',
  },
  rowContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: '10@msr',
    justifyContent: 'space-between',
  },
  enrollSubmmitButtonContainer: {
    marginTop: '20@msr',
    justifyContent: 'center',
    alignItems: 'center',
    height: STATUSBAR_HEIGHT,
    borderRadius: '10@msr',
    backgroundColor: '#3AACFF',
  },
  enrollSubmmitButton: {
    fontSize: '20@msr',
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankSpace: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  modalSelectBody: {
    overflow: 'scroll',
    width: SCREEN_WIDTH * (2 / 3),
    height: SCREEN_HEIGHT / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10@msr',
  },
  modalSubmmit: {
    width: SCREEN_WIDTH / 2,
    height: STATUSBAR_HEIGHT,
    marginTop: '15@msr',
    marginBottom: '15@msr',
    textAlign: 'center',
    borderRadius: '10@msr',
    fontSize: '20@msr',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#3AACFF',
  },
})

export default Enroll
