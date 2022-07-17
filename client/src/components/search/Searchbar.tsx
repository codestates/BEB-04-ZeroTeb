import * as React from 'react'
import { useRef } from 'react'
import { TextInput, TextInputProps, View, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const Searchbar = ({ ...props }: TextInputProps) => {
  const searchbarInput = useRef<null | TextInput>(null)
  const navigation = useNavigation()
  const route = useRoute()

  //search screen으로 이동 시 input으로 포커스
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // if (route.path === 'Home') {
      searchbarInput.current?.focus()
      // }
    })
    return unsubscribe
  }, [navigation])

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
          ref={searchbarInput}
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
