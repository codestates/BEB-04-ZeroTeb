import React, { useState } from 'react'
import { Modal, View, Dimensions, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { regionActions } from '../../store/regionSlice'
import RegionButton from './RegionButton'
import { ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

interface Props {
  modalVisible: boolean
  setModalVisible: any
  body: any
}
const RegionSelectModal = (props: Props) => {
  const [regionList, setRegionList] = useState([
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
  ])
  const [region, setRegion] = useState('전국')
  const dispatch = useDispatch()

  const selectRegion = (target: string) => {
    console.log(target)
    dispatch(regionActions.setRegion(target))
    setRegion(target)
    props.setModalVisible(false)
  }
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={props.modalVisible}
    >
      <View style={styles.container}>
        <View
          style={styles.blankSpace}
          onTouchEnd={() => props.setModalVisible(false)} // 모달 빈 공간을 누르면 창 닫기
        />
        <View style={styles.selectSpace}>
        <Text style={styles.regionTitle}>지역 선택</Text>
        <View style={styles.line}></View>
        <View style={styles.regionSpace}>
          {regionList.map((ele, index) => {
            return (
              <RegionButton
                region={ele}
                key={index}
                selectRegion={selectRegion}
              ></RegionButton>
            )
          })}
        </View>
      </View>
        {/* {props.body} */}
      </View>
      
    </Modal>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankSpace: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  selectSpace: {
    flexDirection: 'column',
    width: '300@msr',
    height: '590@msr',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '6@msr',
  },
  regionTitle: {
    marginTop: '15@msr',
    marginBottom: '5@msr',
    fontSize: '25@msr',
    alignSelf: 'center',
  },
  line: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
  },
  regionSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingHorizontal: '18@msr',
    paddingTop: '10@msr',
    width: '280@msr',
  }
})

export default RegionSelectModal
