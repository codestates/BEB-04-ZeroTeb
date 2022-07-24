import * as React from 'react'
import { View, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { AntDesign } from '@expo/vector-icons'
import { EnrollType } from '../../models/Event'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface Props {
  list: EnrollType
  setList: Function
}

const DetailList = (props: Props) => {
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

  // price 항목 추가 함수
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

  // price 항목 삭제 함수
  const removePropertiesHandler = (e: any, index: number) => {
    const removeProperties = props.list.price.filter(
      (
        item: { class: string; price: number; count: number },
        itemIndex: number,
      ) => index !== itemIndex,
    )
    props.setList({
      ...props.list,
      price: removeProperties,
    })
  }

  return (
    <View>
      {props.list.price.map(
        (
          attribute: { class: string; price: number; count: number },
          index: number,
        ) => {
        return (
          <View>
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
                  value={attribute.price.toString()}
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
                  value={attribute.count.toString()}
                ></TextInput>
              </View>
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
                value={attribute.count}
              ></TextInput>
            </View>
            {index === 0 || undefined ? <View style={{width: moderateScale(25)}}></View>: 
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
            }
          </View>
        )
      })}
      {/* 항목 추가 버튼 */}
      <TouchableOpacity
        style={style.IconButton}
        onPress={addPropertiesHandler}
      >
        <AntDesign name="pluscircle" size={moderateScale(25)} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const style = ScaledSheet.create({
  InputPriceWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  InputPrice: {
    width: SCREEN_WIDTH / 4,
    marginRight: '5@msr',
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
    marginTop: '5@msr',
    alignItems: 'center'
  },
})

export default DetailList
