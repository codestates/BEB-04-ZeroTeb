import * as React from 'react'
import { View, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const DetailList = (props: any) => {
  // list={list} setList={setList} props.list
  const propertiesHandler = (e: any, index: number, name: string) => {
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

  const removePropertiesHandler = (e: any, index: number) => {
    console.log()
    const removeProperties = props.list.price.filter(
      (item: any, itemIndex: number) => index !== itemIndex,
    )
    props.setList({
      ...props.list,
      price: removeProperties,
    })
  }

  return (
    <View>
      {props.list.price.map((attribute: any, index: number) => {
        return (
          <View key={index} style={style.InputPriceWrapper}>
            <View style={style.InputPrice}>
              <TextInput
                style={style.InputContent}
                testID="class"
                placeholder={'class'}
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
                placeholder={'price'}
                keyboardType="number-pad"
                onChangeText={e => {
                  propertiesHandler(e, index, 'price')
                }}
                // value={String(attribute.price)}
              ></TextInput>
            </View>
            <View style={style.InputPrice}>
              <TextInput
                style={style.InputContent}
                testID="count"
                placeholder={'count'}
                keyboardType="number-pad"
                onChangeText={e => {
                  propertiesHandler(e, index, 'count')
                }}
                // value={String(attribute.count)}
              ></TextInput>
            </View>

            {index === 0 || undefined ? (
              <View style={style.IconButton}>
                <AntDesign
                  name="minuscircle"
                  size={moderateScale(24)}
                  color="gray"
                />
              </View>
            ) : (
              <TouchableOpacity
                style={style.IconButton}
                onPress={e => {
                  removePropertiesHandler(e, index)
                }}
              >
                <AntDesign
                  name="minuscircle"
                  size={moderateScale(24)}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
        )
      })}
      <View>
        <TouchableOpacity
          style={style.IconButton}
          onPress={addPropertiesHandler}
        >
          <AntDesign name="pluscircle" size={moderateScale(24)} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  InputPriceWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  InputPrice: {
    width: SCREEN_WIDTH / 4,

    minHeight: '25@vs',
    // maxHeight: '25@vs',
    height: '30@msr',
    borderWidth: 1,
    borderRadius: '10@msr',
    borderColor: 'gray',
    justifyContent: 'center',
    marginBottom: '10@msr',
  },
  InputContent: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '15@msr',
  },
  IconButton: {
    marginLeft: '10@msr',
    marginRight: '5@msr',
    marginTop: '5@msr',
  },
})

export default DetailList
