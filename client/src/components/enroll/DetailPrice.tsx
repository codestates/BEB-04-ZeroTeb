import * as React from 'react'
import { View, StyleSheet, Text, TextInput, Dimensions } from 'react-native'
import { useState } from 'react'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const DetailList = (props: any) => {
  const [value, setValue] = useState<{
    class: string
    price: string
    count: string
  }>({
    class: '',
    price: '',
    count: '',
  })
  return (
    <View>
      {props.countList &&
        props.countList.map((item: any, i: any) => (
          <View key={i} style={style.InputPriceWrapper}>
            <View style={style.InputPrice}>
              <TextInput
                placeholder="class input"
                style={style.InputContent}
                value={value.class}
                onChangeText={text => setValue({ ...value, class: text })}
              ></TextInput>
            </View>
            <View style={style.InputPrice}>
              <TextInput
                placeholder="price input"
                style={style.InputContent}
                value={value.price}
                onChangeText={text => setValue({ ...value, price: text })}
              ></TextInput>
            </View>
            <View style={style.InputPrice}>
              <TextInput
                placeholder="좌석수 input"
                style={style.InputContent}
                value={value.count}
                onChangeText={text => setValue({ ...value, count: text })}
              ></TextInput>
            </View>
          </View>
        ))}
    </View>
  )
}

const style = StyleSheet.create({
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
})

export default DetailList
