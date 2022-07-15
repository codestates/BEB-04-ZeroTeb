import * as React from 'react'
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const Searchbar = ({ ...props }: TextInputProps) => {
  return (
    <View>
      <View style={style.searchbarContainner}>
        <Ionicons
          name="search"
          size={15}
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

const style = StyleSheet.create({
  searchbarContainner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    paddingHorizontal: 10,
    width: SCREEN_WIDTH * 0.9,
    minHeight: 40,
    maxHeight: 40,
    margin: 20,
  },
  searchbarbarIcon: {
    color: 'black',
  },
  searchbarbarText: {
    width: SCREEN_WIDTH * 0.8,
    fontSize: 12,
    paddingLeft: 5,
    color: 'gray',
  },
})

export default Searchbar
