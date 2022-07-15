import * as React from 'react'
import { TextInput, TextInputProps, View, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const Searchbar = ({ ...props }: TextInputProps) => {
  return (
    <View>
      <View style={style.searchbarContainner}>
        <Ionicons
          name="search"
          size={moderateScale(15)}
          color="black"
          style={style.searchbarbarIcon}
        />
        <TextInput
          style={style.searchbarbarText}
          placeholder={'ZeroTeb을 검색하세요!'}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          {...props}
        ></TextInput>
      </View>
    </View>
  )
}

const style = ScaledSheet.create({
  searchbarContainner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    paddingHorizontal: '10@msr',
    width: SCREEN_WIDTH * 0.9,
    minHeight: '30@vs',
    maxHeight: '30@vs',
    margin: '20@msr',
  },
  searchbarbarIcon: {
    color: 'black',
  },
  searchbarbarText: {
    width: SCREEN_WIDTH * 0.8,
    fontSize: '12@msr',
    paddingLeft: '5@msr',
    color: 'gray',
  },
})

export default Searchbar
