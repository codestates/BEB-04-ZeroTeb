import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Platform,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { EventType, EventEnroll } from '../../models/Event'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import GoBackButton from '../../components/common/GoBackButton'
import SetDateAndTime from '../../components/enroll/SetDateAndTime'
import DetailPrice from '../../components/enroll/DetailPrice'
import ConcertTypes from '../../components/enroll/ConcertTypesModal'
import PlaceModalSelect from '../../components/enroll/PlaceModal'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
//import { getDateAndTime, getDate } from '../../utils/unixTime'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

export default function Enroll() {
  const navigation = useNavigation()
  const [list, setList] = useState<EventType>() // 최종적인 저장

  // Enroll에서 작성한 것들 저장
  const [content, setContent] = useState<EventEnroll>({
    title: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    place: '',
    content: '',
    token_url: '',
    concert_type: '',
  })
  const [image, setImage] = useState<string>(' ') // 이미지 받기
  const [startDate, setStartDate] = useState(new Date()) // 시작 날짜, 시간
  const [endDate, setEndDate] = useState(new Date()) // 끝나는 날짜, 시간

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  // 가격 부분 버튼 누를 때마다 컴포넌트 생성
  const [countList, setCountList] = useState([0])
  const [price, setprice] = useState<object>({}) // 가격 부분

  const onAddDetailDiv = () => {
    let countArr = [...countList]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter) // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setCountList(countArr)
  }

  return (
    <View style={style.enrollContainer}>
      <TouchableOpacity
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack()
          }
        }}
      >
        <GoBackButton />
      </TouchableOpacity>
      <ScrollView decelerationRate="fast">
        <View style={style.enrollTitle}>
          <Text style={style.enrollTitleText}>이벤트 등록</Text>
        </View>
        <View style={style.contentsWrapper}>
          {/* 제목 */}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>제목</Text>
            <TextInput
              style={style.enrollInput}
              value={content.title}
              onChangeText={text => setContent({ ...content, title: text })}
            ></TextInput>
          </View>

          {/* 기간 (TextInput 2개 필요)*/}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>기간</Text>
            <View style={style.doubleContent}>
              <SetDateAndTime
                setStartDate={setStartDate}
                setEndDate={undefined}
                value={startDate}
                mode="date"
              />
              <SetDateAndTime
                setStartDate={undefined}
                setEndDate={setEndDate}
                value={endDate}
                mode="date"
              />
            </View>
          </View>

          {/* 시간 (TextInput 2개 필요)*/}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>시간</Text>
            <View style={style.doubleContent}>
              <SetDateAndTime
                setStartDate={setStartDate}
                setEndDate={undefined}
                value={startDate}
                mode="time"
              />
              <SetDateAndTime
                setStartDate={undefined}
                setEndDate={setEndDate}
                value={endDate}
                mode="time"
              />
            </View>
          </View>

          {/* 장소 (체크박스) */}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>장소</Text>
            {/* 장소 고르기 */}
            <PlaceModalSelect content={content} setContent={setContent} />
          </View>

          {/* 가격 (3개의 칸) */}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>가격</Text>

            <View style={style.priceWrapper}>
              <DetailPrice countList={countList} setprice={setprice} />
              <TouchableOpacity onPress={onAddDetailDiv}>
                <AntDesign name="pluscircle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 내용 (!TextInput 칸 넓이 증가) */}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>내용</Text>
            <View style={style.InputContentWrapper}>
              <TextInput
                style={style.InputContent}
                value={content.content}
                onChangeText={text => setContent({ ...content, content: text })}
              ></TextInput>
            </View>
          </View>

          {/* 토큰 이미지 () */}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>토큰 이미지</Text>
            <TouchableOpacity onPress={pickImage}>
              <View style={style.InputContentWrapper}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: SCREEN_WIDTH - 60,
                    height: 180,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* 콘서트 종류 */}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>콘서트 종류</Text>
            {/* 콘서트 종류 고르기 */}
            <ConcertTypes content={content} setContent={setContent} />
          </View>
        </View>
      </ScrollView>

      {/* 등록 버튼 */}
      <TouchableOpacity
        onPress={() => {
          console.log(content)
          console.log(countList)
        }}
      >
        <Text style={style.enrollSubmmit}>등록</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  enrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: STATUSBAR_HEIGHT,
  },
  enrollTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: STATUSBAR_HEIGHT,
    marginBottom: STATUSBAR_HEIGHT,
  },
  enrollTitleText: {
    textAlign: 'center',
    fontSize: 30,
  },
  doubleContent: {
    flexDirection: 'row',
  },
  contentsWrapper: {
    flex: 1,
  },
  enrollContents: {},
  enrollContentText: {
    left: 20,
    fontSize: 20,
  },
  enrollInput: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
    maxHeight: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  InputContentWrapper: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
  },
  InputContent: {
    flex: 1,
  },
  priceWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  enrollSubmmit: {
    width: SCREEN_WIDTH - 30,
    height: STATUSBAR_HEIGHT,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#3AACFF',
  },
})
