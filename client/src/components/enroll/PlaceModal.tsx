import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native'
import { useState } from 'react'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const PlaceModal = (props: any) => {
  const setContent = props.setContent
  const place = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도',
  ]

  const [modalVisible, setModalVisible] = useState(false) // 모달창 켜기 끄기
  const onStart = () => {
    setModalVisible(true)
  }

  const onSelectPlace = (e: any) => {
    setModalVisible(false)
    setContent({ ...props.content, place: e })
  }
  return (
    <View style={style.modalWrapper}>
      <TouchableOpacity onPress={onStart}>
        <View style={style.enrollInput}>
          <Text style={style.enrollContentText}>{props.content.place}</Text>
        </View>
      </TouchableOpacity>
      <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
        <View style={style.modalContainer}>
          <View
            style={style.blankSpace}
            onTouchEnd={() => setModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
          />
          <View style={style.modalSelectBody}>
            {place.map((keyword, index) => {
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
  )
}

const style = StyleSheet.create({
  modalWrapper: {},
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
  modalContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSelectBody: {
    overflow: 'scroll',
    width: SCREEN_WIDTH / 2,
    height: SCREEN_HEIGHT / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSelect: {
    width: SCREEN_WIDTH / 4,
    backgroundColor: 'white',
    borderWidth: 1,
    margin: 3,
  },
  modalText: {
    fontSize: 14,
    color: 'blue',
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
