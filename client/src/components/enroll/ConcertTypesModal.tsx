import * as React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { useState } from 'react'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const ConcertTypesModal = (props: any) => {
  const setList = props.setList
  const category = [
    'concert',
    'Theater',
    'Kids',
    'Musical',
    'Exhibition',
    'Leisure Sport',
  ]
  const [modalVisible, setModalVisible] = useState(false) // 모달창 켜기 끄기
  const onStart = () => {
    setModalVisible(true)
  }
  const onSelectType = (e: any) => {
    setModalVisible(false)
    setList({ ...props.list, category: e })
  }
  return (
    <View>
      <Text style={style.enrollContentText}>이벤트 종류</Text>
      <TouchableOpacity onPress={onStart}>
        <View style={style.enrollInput}>
          {props.list.category === '' ? (
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
              {props.list.category}
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
            {category.map((keyword, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={style.modalSelect}
                  onPress={() => onSelectType(keyword)}
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

const style = ScaledSheet.create({
  enrollContentText: {
    fontSize: '18@msr',
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
    alignItems: 'center',
    borderRadius: '10@msr',
  },
  modalSelect: {
    width: SCREEN_WIDTH * 0.5,
    backgroundColor: '#3AACFF',
    borderRadius: '10@msr',
    margin: '10@msr',
  },
  modalText: {
    fontSize: '20@msr',
    color: 'white',
    textAlign: 'center',
    padding: '5@msr',
  },
  blankSpace: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
})

export default ConcertTypesModal
