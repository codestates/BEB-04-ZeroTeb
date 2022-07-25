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
  RefreshControl,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { EnrollType } from '../../models/Event'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import SetSellTypeModal from '../../components/enroll/SetSellTypeModal'
import SetDateAndTime from '../../components/enroll/SetDateAndTime'
import DetailPrice from '../../components/enroll/DetailPrice'
import ConcertTypes from '../../components/enroll/ConcertTypesModal'
import PlaceModalSelect from '../../components/enroll/PlaceModal'
import FormData from 'form-data'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight
const ENROLL_URL = 'http://server.beeimp.com:18080/event/create' //prepare url
const titleTextSize = 20
const inputBoxHeight = 30
const inputTextSize = 14
const inputLeft = 10
// 하루를 초로 나타낼 시
const oneDay = 86400
const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const Enroll = () => {
  const navigation = useNavigation()
  // 지갑 주소
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )
  // jwt 토큰
  const AccessToken = useSelector(
    (state: RootState) => state.signin.AccessToken,
  )
  // 로그인된 사용자 이름
  const userName = useSelector((state: RootState) => state.signin.userName)
  // 날짜 시간 구분용 list
  const mode = ['date', 'time']
  // 모달창 켜기 끄기
  const [modalVisible, setModalVisible] = useState(false)
  // 등록할 이벤트 데이터 초기값
  const initData = {
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
    recruit_end_date: Math.floor(Number(new Date()) / 1000 + oneDay),
    event_start_date: Math.floor(Number(new Date()) / 1000 + oneDay * 2),
    event_end_date: Math.floor(Number(new Date()) / 1000 + oneDay * 3),
    created_date: Math.floor(Number(new Date()) / 1000),
    modified_date: Math.floor(Number(new Date()) / 1000),
  }
  // 등록할 이벤트 데이터
  const [list, setList] = useState<EnrollType>(initData)
  const [deposit, setDeposit] = useState<Number>(0) // 보증금 useState
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setList(initData)
    wait(1000).then(() => setRefreshing(false))
  }, [])

  //썸네일, 토큰 이미지 선택
  const pickImage = async (e: string) => {
    console.log('이미지 선택')
    const name = e
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
  // 등록 이벤트
  const onStart = () => {
    setModalVisible(true)
    console.log('onstart')
    let money = 0 // 보증금
    // 응모일때
    if (list.type === 'entry') {
      console.log(list.price[0].count * 5)
      setDeposit(list.price[0].count * 5)
    } else {
      list.price.map((value, index) => {
        money += value.price * value.count
      })
      console.log(money * 0.05)
      setDeposit(money * 0.05)
    }
  }

  // 서버에 이벤트 등록 요청
  const onCheckEnroll = async () => {
    const filename = list.thumnail.split('/').pop()
    const formData = new FormData()
    formData.append('file', {
      uri: list.thumnail,
      name: filename,
      type: 'image/jpg',
    })
    const filename2 = list.token_image_url.split('/').pop()
    const formData2 = new FormData()
    formData2.append('file', {
      uri: list.token_image_url,
      name: filename2,
      type: 'image/jpg',
    })
    console.log('=============', formData)
    // 조건문 달아서 axios POST

    try {
      console.log('썸네일 이미지 업로드 중~~~')
      const thumRes = await axios
        .post(`http://server.beeimp.com:18080/file`, formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(res => {
          return res.data.savedPath
        })
      console.log('토큰 이미지 업로드 중~~~')
      const tokenImgRes = await axios
        .post(`http://server.beeimp.com:18080/file`, formData2, {
          headers: {
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(res => {
          return res.data.savedPath
        })
      setList({
        ...list,
        thumnail: `http://server.beeimp.com:18080/${thumRes}`,
        token_image_url: `http://server.beeimp.com:18080/${tokenImgRes}`,
      })
      console.log('이벤트 등록 중~~~')
      await axios
        .post(ENROLL_URL, list, {
          headers: {
            Cookie: AccessToken,
          },
        })
        .then(res => {
          console.log('res:', res)
        })
      setModalVisible(false)
      navigation.goBack() //마이 페이지로 돌아감
    } catch (e) {
      console.log('이벤트 등록 중 에러 발생')
      console.log(e)
      alert('에러 발생')
      setModalVisible(false)
    }
  }
  // 등록버튼 활성화 / 비활성화
  // 전체 list 요소들 다 검사하는
  const onCheckList = () => {
    let key: string
    let priceKey: string | number
    let check: boolean = true
    const listComponent = Object(list)
    for (key in listComponent) {
      if (key === 'price') {
        listComponent[key].map((value: any, index: number) => {
          for (priceKey in value) {
            // class , price , count
            if (value[priceKey] === '') {
              check = false
            }
            if (value[priceKey] === 0) {
              check = false
            }
          }
        })
      }
      if (listComponent[key] === '') {
        check = false
      }
      if (listComponent[key] === ' ') {
        check = false
      }
    }
    return check
  }

  React.useEffect(() => {
    console.log(list)
  }, [list])

  return (
    <View style={style.enrollContainer}>
      <ScrollView
        decelerationRate="fast"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={style.enrollTitle}>
          <Text style={style.enrollTitleText}>이벤트 등록</Text>
        </View>
        <View>
          {/* 제목 */}
          <View>
            <Text style={style.enrollContentText}>제목</Text>
            <View style={style.enrollInput}>
              <TextInput
                style={{
                  left: moderateScale(inputLeft),
                  fontSize: moderateScale(inputTextSize),
                }}
                value={list.title}
                onChangeText={text => setList({ ...list, title: text })}
              ></TextInput>
            </View>
          </View>
          {/* 이벤트 종류 */}
          <ConcertTypes list={list} setList={setList} />
          <View>
            <Text style={style.enrollContentText}>이벤트 구매/응모 기간</Text>
          </View>
          <View style={style.DateTimeWrapper}>
            {/* 기간 (TextInput 2개 필요)*/}
            <View>
              {mode.map((value, index) => {
                return (
                  <View key={index} style={style.rowContentWrapper}>
                    <View style={style.DateTimeContent}>
                      <SetDateAndTime
                        setRecruitStart={setList}
                        type={'recruit_start_date'}
                        list={list}
                        mode={value}
                      />
                    </View>
                  </View>
                )
              })}
            </View>
            <Text
              style={{
                fontSize: moderateScale(25),
                top: moderateScale(12),
              }}
            >
              {' '}
              ~{' '}
            </Text>
            <View>
              {mode.map((value, index) => {
                return (
                  <View key={index} style={style.rowContentWrapper}>
                    <View style={style.DateTimeContent}>
                      <SetDateAndTime
                        setRecruitEnd={setList}
                        type={'recruit_end_date'}
                        list={list}
                        mode={value}
                      />
                    </View>
                  </View>
                )
              })}
            </View>
          </View>

          <View>
            <Text style={style.enrollContentText}>이벤트 행사 기간</Text>
          </View>
          <View style={style.DateTimeWrapper}>
            {/* 기간 (TextInput 2개 필요)*/}
            <View>
              {mode.map((value, index) => {
                return (
                  <View key={index} style={style.rowContentWrapper}>
                    <View style={style.DateTimeContent}>
                      <SetDateAndTime
                        setEventStart={setList}
                        type={'event_start_date'}
                        list={list}
                        mode={value}
                      />
                    </View>
                  </View>
                )
              })}
            </View>
            <Text
              style={{
                fontSize: moderateScale(25),
                top: moderateScale(12),
              }}
            >
              {' '}
              ~{' '}
            </Text>
            <View>
              {mode.map((value, index) => {
                return (
                  <View key={index} style={style.rowContentWrapper}>
                    <View style={style.DateTimeContent}>
                      <SetDateAndTime
                        setEventEnd={setList}
                        type={'event_end_date'}
                        list={list}
                        mode={value}
                      />
                    </View>
                  </View>
                )
              })}
            </View>
          </View>

          {/* 장소 (체크박스) */}
          <PlaceModalSelect list={list} setList={setList} />

          {/* 판매 타입 */}
          <SetSellTypeModal list={list} setList={setList} />
          <View>
            <Text style={style.enrollContentText}>가격</Text>
            <Text
              style={{
                fontSize: moderateScale(13),
                alignSelf: 'flex-start',
                left: moderateScale(5),
                marginBottom: moderateScale(10),
              }}
            >
              ※ 등급/응모 가격/응모 개수
            </Text>
            {/* 가격 (3개의 칸) */}
            {list.type === 'sale' ? (
              <DetailPrice list={list} setList={setList} />
            ) : (
              <View style={style.rowContentWrapper}>
                <View style={style.InputPrice}>
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      textAlign: 'center',
                    }}
                  >
                    {list.price[0].class}
                  </Text>
                </View>
                <View style={style.InputPrice}>
                  <TextInput
                    style={{
                      fontSize: moderateScale(15),
                      textAlign: 'center',
                    }}
                    placeholder={'price'}
                    keyboardType="number-pad"
                    onChangeText={(e: any) => {
                      setList({
                        ...list,
                        price: [{ ...list.price[0], ['price']: Number(e) }],
                      })
                    }}
                    value={String(list.price[0].price)}
                  ></TextInput>
                </View>
                <View style={style.InputPrice}>
                  <TextInput
                    style={{
                      fontSize: moderateScale(15),
                      textAlign: 'center',
                    }}
                    placeholder={'count'}
                    keyboardType="number-pad"
                    onChangeText={(e: any) => {
                      setList({
                        ...list,
                        price: [{ ...list.price[0], ['count']: Number(e) }],
                      })
                    }}
                    value={String(list.price[0].count)}
                  ></TextInput>
                </View>
              </View>
            )}
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
            <Text style={style.enrollContentText}>이벤트 썸네일</Text>
            <TouchableOpacity onPress={() => pickImage('thumnail')}>
              <View style={style.enrollInputLarge}>
                {list.thumnail === ' ' ? (
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: moderateScale(40),
                    }}
                  >
                    <AntDesign
                      name="picture"
                      size={moderateScale(60)}
                      color="gray"
                    />
                    <Text style={{ fontSize: moderateScale(15) }}>
                      눌러서 이미지를 업로드 하세요
                    </Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: list.thumnail }}
                    style={{
                      width: SCREEN_WIDTH - moderateScale(70),
                      height: moderateScale(180),
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* 토큰 이미지  */}
          <View>
            <Text style={style.enrollContentText}>토큰 이미지</Text>
            <TouchableOpacity onPress={() => pickImage('token_image_url')}>
              <View style={style.enrollInputLarge}>
                {list.token_image_url === ' ' ? (
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: moderateScale(40),
                    }}
                  >
                    <AntDesign
                      name="picture"
                      size={moderateScale(60)}
                      color="gray"
                    />
                    <Text style={{ fontSize: moderateScale(15) }}>
                      눌러서 이미지를 업로드 하세요
                    </Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: list.token_image_url }}
                    style={{
                      width: SCREEN_WIDTH - moderateScale(70),
                      height: moderateScale(180),
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 등록 버튼 */}
      {onCheckList() ? (
        <TouchableOpacity onPress={onStart}>
          <View style={style.enrollSubmmitButtonContainer}>
            <Text style={style.enrollSubmmitButton}>등록</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onStart} disabled>
          <View style={style.enrollSubmmitButtonContainerDisable}>
            <Text style={style.enrollSubmmitButton}>등록</Text>
          </View>
        </TouchableOpacity>
      )}
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
    paddingHorizontal: '20@msr',
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
    fontSize: moderateScale(titleTextSize),
    fontWeight: 'bold',
    color: '#333333',
    paddingVertical: '5@msr',
  },
  DateTimeWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  DateTimeContent: {
    width: SCREEN_WIDTH / 2 - moderateScale(37),
    height: moderateScale(inputBoxHeight),
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    justifyContent: 'center',
  },
  InputPrice: {
    width: SCREEN_WIDTH / 3.5,
    height: '30@msr',
    marginRight: '6@msr',
    minHeight: '25@msr',
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    justifyContent: 'center',
  },
  enrollInput: {
    height: moderateScale(inputBoxHeight),
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
    marginVertical: '10@msr',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30@msr',
    borderRadius: '10@msr',
    backgroundColor: '#3AACFF',
  },
  enrollSubmmitButtonContainerDisable: {
    marginVertical: '10@msr',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30@msr',
    borderRadius: '10@msr',
    backgroundColor: 'gray',
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
    height: '30@msr',
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
