import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const DetailList = (props: any) => {
  // list={list} setList={setList} props.list
  const propertiesHandler = (e: any, index: any, name: string) => {
    props.setList({
      ...props.list,
      price: [
        ...props.list.price.slice(0, index),
        {
          ...props.list.price[index],
          [name]: e,
        },
        ...props.list.price.slice(index + 1),
      ],
    })
  }

  const addPropertiesHandler = () => {
    props.setList({
      ...props.list,
      price: [
        ...props.list.price,
        {
          class: '',
          price: '',
          count: '',
        },
      ],
    })
  }

  const removePropertiesHandler = (e: any, index: any) => {
    const removeProperties = props.list.price.filter(
      (item: any, itemIndex: any) => index !== itemIndex,
    )
    props.setList({
      ...props.list.price,
      price: removeProperties,
    })
  }

  return (
    <View>
      {props.list.price.map((attribute: any, index: any) => {
        return (
          <View key={index} style={style.InputPriceWrapper}>
            <View style={style.InputPrice}>
              <TextInput
                style={style.InputContent}
                testID="class"
                placeholder={'...class'}
                onChangeText={e => {
                  propertiesHandler(e, index, 'class')
                }}
                value={attribute.class}
              ></TextInput>
            </View>
            <View style={style.InputPrice}>
              <TextInput
                style={style.InputContent}
                testID="price"
                placeholder={'...price'}
                keyboardType="number-pad"
                onChangeText={e => {
                  propertiesHandler(e, index, 'price')
                }}
                value={attribute.price}
              ></TextInput>
            </View>
            <View style={style.InputPrice}>
              <TextInput
                style={style.InputContent}
                testID="count"
                placeholder={'...count'}
                keyboardType="number-pad"
                onChangeText={e => {
                  propertiesHandler(e, index, 'count')
                }}
                value={attribute.count}
              ></TextInput>
            </View>
            <TouchableOpacity
              style={{ marginLeft: 10, marginTop: 5 }}
              onPress={e => {
                removePropertiesHandler(e, index)
              }}
            >
              <AntDesign name="minuscircle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )
      })}
      <View>
        <TouchableOpacity
          style={{ marginLeft: 20, marginBottom: 5 }}
          onPress={addPropertiesHandler}
        >
          <AntDesign name="pluscircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
})

export default DetailList
