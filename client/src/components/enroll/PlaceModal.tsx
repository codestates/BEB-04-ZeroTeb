import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { useState } from 'react'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const PlaceModal = (props: any) => {
  const setList = props.setList

  const location = [
    '전국',
    '서울',
    '부산',
    '인천',
    '대구',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
  ]

  const [modalVisible, setModalVisible] = useState(false) // 모달창 켜기 끄기

  //모달창 on/off
  const onStart = () => {
    setModalVisible(true)
  }

  const onSelectPlace = (e: any) => {
    setModalVisible(false)
    setList({ ...props.list, location: e })
  }

  return (
    <View>
      <Text style={style.enrollContentText}>장소</Text>
      <View>
        <TouchableOpacity onPress={onStart}>
          <View style={style.enrollInput}>
            {props.list.location === '' ? (
              <View style={{ left: moderateScale(10) }}>
                <AntDesign
                  name="pluscircle"
                  size={moderateScale(18)}
                  color="black"
                />
              </View>
            ) : (
              <Text
                style={{ left: moderateScale(10), fontSize: moderateScale(15) }}
              >
                {props.list.location}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
          <View style={style.modalContainer}>
            <View
              style={style.blankSpace}
              onTouchEnd={() => setModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
            />
            <View style={style.modalSelectBody}>
              {location.map((keyword, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={style.modalSelect}
                    onPress={() => onSelectPlace(keyword)}
                  >
                    <Text style={style.modalText}>{keyword}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </Modal>
      </View>
      <Text style={style.enrollContentText}>나머지 주소</Text>
      <View style={style.enrollInput}>
        <TextInput
          style={{ left: moderateScale(10), fontSize: moderateScale(15) }}
          value={props.list.sub_location}
          onChangeText={text => setList({ ...props.list, sub_location: text })}
        ></TextInput>
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  enrollContentText: {
    fontSize: '20@msr',
    fontWeight: 'bold',
    color: '#333333',
    paddingVertical: '5@msr',
  },
  enrollInput: {
    height: '30@msr',
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    justifyContent: 'center',
    marginBottom: '10@msr',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSelectBody: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: '10@msr',
    flexWrap: 'wrap',
  },
  modalSelect: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_HEIGHT * 0.055,
    backgroundColor: '#3AACFF',
    borderRadius: '10@msr',
    margin: '5@msr',
    padding: '10@msr',
  },
  modalText: {
    fontSize: '14@msr',
    color: 'white',
    textAlign: 'center',
  },
  blankSpace: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
})

export default PlaceModal
