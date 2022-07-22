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
import { useState } from 'react'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const PlaceModal = (props: any) => {
  const setList = props.setList

  const location = [
    '서울',
    '부산',
    '경남',
    '경북',
    '충북',
    '충남',
    '강원',
    '전북',
    '전남',
    '대구',
    '인천',
    '경기',
    '대전',
    '울산',
    '세종',
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
      <View style={style.modalWrapper}>
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
      <Text style={style.enrollContentText}>장소 (세부사항)</Text>
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

const style = StyleSheet.create({
  modalWrapper: {},
  enrollContentText: {
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  enrollInput: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSelectBody: {
    overflow: 'scroll',
    width: SCREEN_WIDTH / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalSelect: {
    width: SCREEN_WIDTH / 4,
    backgroundColor: '#3AACFF',
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 3,
  },
  modalText: {
    fontSize: 14,
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
