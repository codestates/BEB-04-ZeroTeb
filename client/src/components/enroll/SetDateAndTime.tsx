import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { useState } from 'react'
import { getDate, getTime } from '../../utils/unixTime'
import RNDateTimePicker from '@react-native-community/datetimepicker'

// 하루를 초로 나타낼 시
const oneDay = 86400

const SetDateAndTime = (props: any) => {
  const setRecruitStart = props.setRecruitStart
  const setRecruitEnd = props.setRecruitEnd
  const setEventStart = props.setEventStart
  const setEventEnd = props.setEventEnd

  let value: number
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
          recruit_start_date: value,
        })
      else if (props.type === 'recruit_end_date')
        setRecruitEnd({
          ...props.list,
          recruit_end_date: value,
        })
      else if (props.type === 'event_start_date')
        setEventStart({
          ...props.list,
          event_start_date: value,
        })
      else
        setEventEnd({
          ...props.list,
          event_end_date: value,
        })
      setShow(false)
    } else {
      const currentDate = Math.floor(Number(selectedDate) / 1000)
      // 이벤트 구매/응모 기간 시작날짜
      if (props.type === 'recruit_start_date') {
        if (currentDate <= Math.floor(Number(new Date()) / 1000 - 1000))
          alert('이미 지나간 날입니다.')
        else if (currentDate > props.list.recruit_end_date) {
          setRecruitStart({
            ...props.list,
            recruit_start_date: currentDate,
            recruit_end_date: currentDate + oneDay,
          })
        } else
          setRecruitStart({ ...props.list, recruit_start_date: currentDate })
      }
      // 이벤트 구매/응모 기간 끝나는 날짜
      else if (props.type === 'recruit_end_date') {
        if (currentDate < props.list.recruit_start_date)
          alert('등록보다 후에 해야합니다.')
        else setRecruitEnd({ ...props.list, recruit_end_date: currentDate })
      }
      // 이벤트 행사 기간 시작날짜
      else if (props.type === 'event_start_date') {
        if (currentDate <= props.list.recruit_end_date)
          alert('마감보다 후에 해야합니다.')
        else if (currentDate > props.list.event_end_date) {
          setEventStart({
            ...props.list,
            event_start_date: currentDate,
            event_end_date: currentDate + oneDay,
          })
        } else setEventStart({ ...props.list, event_start_date: currentDate })
      }
      // 이벤트 행사 기간 끝나는 날짜
      else {
        if (currentDate < props.list.event_start_date)
          alert('시작보다 후에 해야합니다.')
        else setEventEnd({ ...props.list, event_end_date: currentDate })
      }
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
          <RNDateTimePicker
            testID="test"
            value={new Date(value * 1000)}
            // display={props.mode === 'date' ? 'default' : 'spinner'}
            mode={props.mode}
            is24Hour={true}
            onChange={onChangeDateTime}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

const style = ScaledSheet.create({
  dateTimeCSS: {
    textAlign: 'center',
    fontSize: '15@msr',
  },
})

export default SetDateAndTime
