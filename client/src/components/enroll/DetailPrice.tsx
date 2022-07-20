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
  const propertiesHandler = (e: any, index: any, name: string) => {
    props.setprice({
      ...props.price,
      attributes: [
        ...props.price.attributes.slice(0, index),
        {
          ...props.price.attributes[index],
          [name]: e,
        },
        ...props.price.attributes.slice(index + 1),
      ],
    })
  }

  const addPropertiesHandler = () => {
    props.setprice({
      ...props.price,
      attributes: [
        ...props.price.attributes,
        {
          class: '',
          price: '',
          count: '',
        },
      ],
    })
  }

  const removePropertiesHandler = (e: any, index: any) => {
    const removeProperties = props.price.attributes.filter(
      (item: any, itemIndex: any) => index !== itemIndex,
    )
    props.setprice({
      ...props.price.attributes,
      attributes: removeProperties,
    })
  }

  return (
    <View>
      {props.price.attributes.map((attribute: any, index: any) => {
        return (
          <View key={index} style={style.InputPriceWrapper}>
            <View style={style.InputPrice}>
              <TextInput
                testID="class"
                placeholder={'class input..'}
                onChangeText={e => {
                  propertiesHandler(e, index, 'class')
                }}
                value={attribute.class}
              ></TextInput>
            </View>
            <View style={style.InputPrice}>
              <TextInput
                testID="price"
                placeholder={'price input..'}
                onChangeText={e => {
                  propertiesHandler(e, index, 'price')
                }}
                value={attribute.price}
              ></TextInput>
            </View>
            <View style={style.InputPrice}>
              <TextInput
                testID="count"
                placeholder={'count input..'}
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
    flex: 1,
    textAlign: 'center',
  },
})

export default DetailList
