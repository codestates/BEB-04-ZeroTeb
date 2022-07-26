import * as React from 'react'
import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import KilpImage from '../../../assets/kilpImg/kilp_image.png'
import KilpIcon from '../../../assets/kilpImg/kilp_icon.png'
import * as KlipAPI from '../../components/kilps/modal/WalletInfo'
import { useDispatch } from 'react-redux'
import { signinActions } from '../../store/signinSlice'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Index'

interface SignInProps {
  route: {
    key: string
    name: string
    params: {
      gotoMyPage: boolean
    }
  }
}

const SignIn: React.FC<SignInProps> = ({ route }) => {
  const [isChecked, setisChecked] = useState(false)
  const [lockBtn, setLockBtn] = useState(true)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )
  const AccessToken = useSelector(
    (state: RootState) => state.signin.AccessToken,
  )

  //지갑 연동하는 함수 실행
  const getUserData = async () => {
    if (lockBtn) {
      setLockBtn(false)
      await KlipAPI.getAddress(
        async (address: string) => {
          dispatch(signinActions.setKilpAddress(address))
        },
        async (accessToken: string) => {
          dispatch(signinActions.setAccessToken(accessToken))
          setLockBtn(true)
        },
      )
    }
  }

  React.useEffect(() => {
    if (AccessToken === '' && KilpAddress === '') {
    } else {
      if (route.params.gotoMyPage) {
        navigation.navigate('MyPage', {
          kilpAddress: KilpAddress,
          accessToken: AccessToken,
        })
      } else if (navigation.canGoBack()) {
        navigation.goBack()
      }
    }
  }, [KilpAddress, AccessToken])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Image source={KilpImage} style={styles.image} />

      <TouchableOpacity style={styles.checkIcon}>
        <Ionicons
          name="checkmark-circle-outline"
          size={moderateScale(23)}
          color={isChecked ? '#FFCC00' : 'gray'}
          onPress={() => {
            setisChecked(!isChecked)
          }}
        ></Ionicons>
      </TouchableOpacity>
      <View style={styles.checkTextBox}>
        <Text style={styles.checkText}>약관에 동의 하시겠습니까?</Text>
      </View>

      {isChecked ? (
        <TouchableOpacity style={styles.loginbutton} onPress={getUserData}>
          <Image source={KilpIcon} style={styles.icon} />
          <Text style={styles.text}>Kilp으로 로그인</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.loginbuttonNot} disabled>
          <Image source={KilpIcon} style={styles.icon} />
          <Text style={styles.text}>Kilp으로 로그인</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = ScaledSheet.create({
  image: {
    width: '391@s',
    height: '296@vs',
    resizeMode: 'contain',
  },
  checkIcon: {
    right: '95@msr',
  },
  checkTextBox: {
    left: '10@msr',
    bottom: '24@msr',
  },
  checkText: {
    // fontFamily: 'Itim',
    fontSize: '16@msr',
  },
  checkbox: {
    margin: '20@msr',
    textDecorationLine: 'none',
  },
  loginbutton: {
    flex: 1,
    flexDirection: 'row',
    width: '292@s',
    maxHeight: '43@vs',
    top: 0,
    borderRadius: 4,
    backgroundColor: '#216FEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginbuttonNot: {
    flex: 1,
    flexDirection: 'row',
    width: '292@s',
    maxHeight: '43@vs',
    top: 0,
    borderRadius: 4,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // fontFamily: 'JetBrains Mono',
    fontSize: '18@msr',
    color: 'white',
  },
  icon: {
    margin: '7@msr',
  },
})

export default SignIn
