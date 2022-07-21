import * as React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'

const SetDateAndTime = (props: any) => {
  const setStartDate = props.setStartDate
  const setEndDate = props.setEndDate
  const [show, setShow] = useState(false)

  // 날짜 시간등 바뀜
  const onChangeDateTime = (event: any, selectedDate: any) => {
    if (selectedDate === undefined) {
      if (setStartDate === undefined) setEndDate(new Date())
      else setStartDate(new Date())
      setShow(false)
    } else {
      const currentDate = selectedDate
      if (setStartDate === undefined) setEndDate(currentDate)
      else setStartDate(currentDate)
      setShow(false)
    }
  }

  const showpicker = () => {
    setShow(true)
  }

  return (
    <View>
      <TouchableOpacity onPress={showpicker}>
        {props.mode === 'date' ? (
          <Text style={style.dateTimeCSS}>
            {props.value.getFullYear()}년 {props.value.getMonth() + 1}월{' '}
            {props.value.getDate()}일
          </Text>
        ) : (
          <Text style={style.dateTimeCSS}>
            {props.value.getHours()}시 {props.value.getMinutes()}분
          </Text>
        )}
        {/* 시작 날짜 */}
        {show && (
          <DateTimePicker
            testID="test"
            value={props.value}
            mode={props.mode}
            is24Hour={true}
            onChange={onChangeDateTime}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  doubleInput: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
    maxHeight: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  dateTimeCSS: {
    textAlign: 'center',
    fontSize: 20,
  },
})

export default SetDateAndTime
