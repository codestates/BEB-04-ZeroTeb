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
const titleTextSize = 20; 
const inputBoxHeight = 30;
const inputTextSize = 14;
const inputLeft = 10;
interface Props {}

const Enroll: React.FC<Props> = () => {
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
  //
  const mode = ['date', 'time']
  // 최종적인 저장
  const [modalVisible, setModalVisible] = useState(false) // 모달창 켜기 끄기
  // 등록할 이벤트 데이터
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

  //썸네일, 토큰 이미지 선택
  const pickImage = async (e: string) => {
    console.log('이미지 선택')
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
  // 등록 이벤트 응모: 티켓당 count*5, 판매 price*count*0.05
  const onStart = () => {
    console.log('onstart')
    let money = 0 // 보증금
    // 응모일때
    if (list.type === 'entry') {
      console.log(list.price[0].count * 5)
      setDeposit(list.price[0].count * 5)
    }
    else{
      list.price.map((value, index) => {
        money += value.price * value.count
      })
      console.log(money * 0.05)
      setDeposit(money * 0.05)
    }
    setModalVisible(true)
  }

  // 서버에 이벤트 등록 요청
  const onCheckEnroll = async () => {
    // 조건문 달아서 axios POST
    try{
      console.log('이벤트 등록 중~~~');
      const result = await axios
        .post(ENROLL_URL, list, {
          headers: {
            Cookie: AccessToken,
          },
        })
        .then(res => {
          console.log(res.data)        
        })
      console.log(result);
      // if(result.message){
      //   console.log('이벤트 등록 실패ㅠㅠ')
      //   alert('이벤트 등록 실패ㅠㅠ')
      // }else{
      //   console.log('이벤트 등록 성공!!')
      //   alert('이벤트 등록 성공!!')     
      //   navigation.goBack() //마이 페이지로 돌아감 
      // }    
      setModalVisible(false)
    }catch(e){
      console.log('이벤트 등록 중 에러 발생')
      console.log(e)
      alert('에러 발생');
      setModalVisible(false)
    }
  }

  React.useEffect(()=>{
    console.log(list);
  }, [list])

  return (
    <View style={style.enrollContainer}>
      <ScrollView decelerationRate="fast">
        <View style={style.enrollTitle}>
          <Text style={style.enrollTitleText}>이벤트 등록</Text>
        </View>
        <View>
          {/* 제목 */}
          <View>
            <Text style={style.enrollContentText}>제목</Text>
            <View style={style.enrollInput}>
              <TextInput
                style={{ left: moderateScale(inputLeft), fontSize: moderateScale(inputTextSize) }}
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
                  이벤트 구매/응모 {value == 'date' ? '기간' : '시간'}
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
                  이벤트 행사 {value == 'date' ? '기간' : '시간'}
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

          {/* 판매 형태 */}
          <SetSellTypeModal list={list} setList={setList} />

          {/* 가격 */}
          <View>
            <Text style={style.enrollContentText}>가격</Text>
            <View style={style.rowContentWrapper}>
              {/* 가격 (3개의 칸) */}
              {list.type === 'sale' ? (
                //sale 정보 받기
                <DetailPrice list={list} setList={setList} />
              ) : (
                // entry 정보 받기
                <View>                
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
                          fontSize: moderateScale(15),
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
                  <Text style={{fontSize: moderateScale(13), alignSelf: 'flex-start', left: moderateScale(5)}}>※ 등급/응모 가격/응모 개수</Text>
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
                  fontSize: moderateScale(15),
                  textAlign: 'left',
                  textAlignVertical: 'top',
                  padding: moderateScale(5)
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
                <Image
                  source={{ uri: list.thumnail }}
                  style={{
                    margin: moderateScale(5),
                    width: SCREEN_WIDTH - moderateScale(80),
                    height: moderateScale(180),
                    resizeMode: 'cover'
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
                    margin: moderateScale(5),
                    width: SCREEN_WIDTH - moderateScale(80),
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

      {/* 보증금 확인 모달 */}
      <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
        <View style={style.modalContainer}>
          <View
            style={style.blankSpace}
            onTouchEnd={() => setModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
          />
          <View style={style.modalSelectBody}>          
            <Text style={{width: SCREEN_WIDTH *0.6, fontSize: moderateScale(20), marginBottom: moderateScale(20), textAlign: 'center'}}>
              현재 보증금: {deposit} Klay
            </Text>
            <Text style={{width: SCREEN_WIDTH *0.6, fontSize: moderateScale(11), marginBottom: moderateScale(20), textAlign: 'center'}}>
              등록을 진행 하시려면 확인을 눌러주세요.
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
    fontSize: moderateScale(titleTextSize),
    fontWeight: 'bold',
    color: '#333333',
    paddingVertical: '5@msr',
  },
  DateTimeContent: {
    width: SCREEN_WIDTH / 2 - moderateScale(30),
    height: moderateScale(inputBoxHeight),
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    justifyContent: 'center',
  },
  InputPrice: {
    width: SCREEN_WIDTH / 3.5,
    marginRight: '5@msr',
    height: '30@msr',
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
    width: SCREEN_WIDTH - moderateScale(45),
    padding: '10@msr',
    height: '210@msr',
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    marginBottom: '10@msr',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  rowContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: '10@msr',
    justifyContent: 'flex-start',
  },
  enrollSubmmitButtonContainer: {
    marginTop: '20@msr',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30@msr',
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
    width: SCREEN_WIDTH * (2 / 3),
    height: SCREEN_HEIGHT * 0.3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10@msr',
  },
  modalSubmmit: {
    width: SCREEN_WIDTH / 2,
    height: '30@msr',
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
