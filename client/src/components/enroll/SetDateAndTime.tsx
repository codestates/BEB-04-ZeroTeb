import * as React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { getDate, getTime } from '../../utils/unixTime'

const SetDateAndTime = (props: any) => {
  const setRecruitStart = props.setRecruitStart
  const setRecruitEnd = props.setRecruitEnd
  const setEventStart = props.setEventStart
  const setEventEnd = props.setEventEnd

  let value
  if (props.type === 'recruit_start_date') value = props.list.recruit_start_date
  else if (props.type === 'recruit_end_date')
    value = props.list.recruit_end_date
  else if (props.type === 'event_start_date')
    value = props.list.event_start_date
  else value = props.list.event_end_date

  const [show, setShow] = useState(false)

  // 날짜 시간등 바뀜
  const onChangeDateTime = (event: any, selectedDate: any) => {
    if (selectedDate === undefined) {
      if (props.type === 'recruit_start_date')
        setRecruitStart({
          ...props.list,
          recruit_start_date: Number(new Date()) / 1000,
        })
      else if (props.type === 'recruit_end_date')
        setRecruitEnd({
          ...props.list,
          recruit_end_date: Number(new Date()) / 1000,
        })
      else if (props.type === 'event_start_date')
        setEventStart({
          ...props.list,
          event_start_date: Number(new Date()) / 1000,
        })
      else
        setEventEnd({
          ...props.list,
          event_end_date: Number(new Date()) / 1000,
        })
      setShow(false)
    } else {
      const currentDate = Number(selectedDate) / 1000
      if (props.type === 'recruit_start_date')
        setRecruitStart({ ...props.list, recruit_start_date: currentDate })
      else if (props.type === 'recruit_end_date')
        setRecruitEnd({ ...props.list, recruit_end_date: currentDate })
      else if (props.type === 'event_start_date')
        setEventStart({ ...props.list, event_start_date: currentDate })
      else setEventEnd({ ...props.list, event_end_date: currentDate })
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
          <Text style={style.dateTimeCSS}>{getDate(value)}</Text>
        ) : (
          <Text style={style.dateTimeCSS}>{getTime(value)}</Text>
        )}
        {/* 모달 부분 */}
        {show && (
          <DateTimePicker
            testID="test"
            value={new Date(value * 1000)}
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
