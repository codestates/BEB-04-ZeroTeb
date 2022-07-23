import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
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
            <Text style={{ left: 20, fontSize: 20 }}>
              {props.list.location}
            </Text>
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
          style={{ left: 20, fontSize: 20 }}
          value={props.list.sub_location}
          onChangeText={text => setList({ ...props.list, sub_location: text })}
        ></TextInput>
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  enrollContentText: {
    fontSize: '20@mvs',
    fontWeight: 'bold',
    color: '#333333',
    paddingVertical: '5@msr',
  },
  enrollInput: {
    minHeight: '25@vs',
    maxHeight: '25@vs',
    borderWidth: 1,
    borderRadius: 10,
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
    height: SCREEN_HEIGHT / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  modalSelect: {
    width: SCREEN_WIDTH / 4,
    backgroundColor: '#3AACFF',
    borderRadius: 10,
    margin: '5@msr',
    padding: '10@msr',
  },
  modalText: {
    fontSize: '14@mvs',
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
