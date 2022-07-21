import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { EventType, EventEnroll } from '../../models/Event'
import { useState } from 'react'
import SetSellTypeModal from '../../components/enroll/SetSellTypeModal'
import SetDateAndTime from '../../components/enroll/SetDateAndTime'
import DetailPrice from '../../components/enroll/DetailPrice'
import ConcertTypes from '../../components/enroll/ConcertTypesModal'
import PlaceModalSelect from '../../components/enroll/PlaceModal'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight

interface Props {
  props: any
}

const Enroll: React.FC<Props> = props => {
  const [list, setList] = useState<EventType>() // 최종적인 저장
  // Enroll에서 작성한 것들 저장
  const [content, setContent] = useState<EventEnroll>({
    title: '',
    type: 'entry',
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
  const [entryPrice, setEntryPrice] = useState({
    class: 'A',
    price: '',
    count: '',
  })
  const [price, setprice] = useState({
    attributes: [],
  })

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

  const onCheckEnroll = () => {
    alert('onCheckEnroll 에서 보내는 작업 + 빈칸 확인')
    console.log(price)
  }

  return (
    <View style={style.enrollContainer}>
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
              <View style={style.DateTimeContent}>
                <SetDateAndTime
                  setStartDate={setStartDate}
                  setEndDate={undefined}
                  value={startDate}
                  mode="date"
                />
              </View>
              <Text>~</Text>
              <View style={style.DateTimeContent}>
                <SetDateAndTime
                  setStartDate={undefined}
                  setEndDate={setEndDate}
                  value={endDate}
                  mode="date"
                />
              </View>
            </View>
          </View>

          {/* 시간 (TextInput 2개 필요)*/}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>시간</Text>
            <View style={style.doubleContent}>
              <View style={style.DateTimeContent}>
                <SetDateAndTime
                  setStartDate={setStartDate}
                  setEndDate={undefined}
                  value={startDate}
                  mode="time"
                />
              </View>
              <Text>~</Text>
              <View style={style.DateTimeContent}>
                <SetDateAndTime
                  setStartDate={undefined}
                  setEndDate={setEndDate}
                  value={endDate}
                  mode="time"
                />
              </View>
            </View>
          </View>

          {/* 장소 (체크박스) */}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>장소</Text>
            {/* 장소 고르기 */}
            <PlaceModalSelect content={content} setContent={setContent} />
          </View>

          {/* 판매 타입 */}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>판매 타입(응모, 구매)</Text>
            {/* 판매 타입 고르기 */}
            <SetSellTypeModal content={content} setContent={setContent} />
          </View>

          {/* 가격 (3개의 칸) */}
          {content.type === 'sale' ? (
            <View style={style.enrollContents}>
              <Text style={style.enrollContentText}>가격</Text>

              <View style={style.priceWrapper}>
                <DetailPrice price={price} setprice={setprice} />
              </View>
            </View>
          ) : (
            <View style={style.enrollContents}>
              <Text style={style.enrollContentText}>가격</Text>

              <View style={style.priceWrapper}>
                <View style={style.InputPriceWrapper}>
                  <View style={style.InputPrice}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                      {entryPrice.class}
                    </Text>
                  </View>
                  <View style={style.InputPrice}>
                    <TextInput
                      style={{ textAlign: 'center' }}
                      testID="price"
                      placeholder={'price input..'}
                      onChangeText={(e: any) => {
                        setEntryPrice({ ...entryPrice, price: e })
                      }}
                      value={entryPrice.price}
                    ></TextInput>
                  </View>
                  <View style={style.InputPrice}>
                    <TextInput
                      style={{ textAlign: 'center' }}
                      testID="count"
                      placeholder={'count input..'}
                      onChangeText={(e: any) => {
                        setEntryPrice({ ...entryPrice, count: e })
                      }}
                      value={entryPrice.count}
                    ></TextInput>
                  </View>
                </View>
              </View>
            </View>
          )}

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
                    margin: 10,
                    width: SCREEN_WIDTH - 60,
                    height: 180,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* 이벤트 종류 */}
          <View style={style.enrollContents}>
            <Text style={style.enrollContentText}>이벤트 종류</Text>
            {/* 이벤트 종류 고르기 */}
            <ConcertTypes content={content} setContent={setContent} />
          </View>
        </View>
      </ScrollView>

      {/* 등록 버튼 */}
      <TouchableOpacity
        onPress={() => {
          onCheckEnroll()
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
  DateTimeContent: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 5,
    marginBottom: 10,
    width: SCREEN_WIDTH / 2 - 30,
    maxHeight: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  InputPriceWrapper: {
    flexDirection: 'row',
  },
  InputPrice: {
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 10,
    width: SCREEN_WIDTH / 4,
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  InputContent: {
    flex: 1,
    textAlign: 'center',
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

export default Enroll
