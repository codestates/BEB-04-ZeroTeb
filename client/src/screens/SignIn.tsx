import * as React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { View,
        TouchableOpacity,
        StyleSheet,
        Text,
        Image,} from 'react-native'
import KilpImage from '../../assets/kilp_image.png';

function SignIn() {



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image  source={KilpImage} style={styles.image}/>

      <TouchableOpacity style={styles.check}>
        <Ionicons name="checkmark-circle-outline" size={25} color='gray'></Ionicons>
      </TouchableOpacity>
      <View style={styles.checkTextBox}>
        <Text style={styles.checkText}>약관에 동의 하시겠습니까?</Text>
      </View>
      <TouchableOpacity style={styles.loginbutton}>
        <Text style={styles.text}>클립으로 로그인</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
      width: 391,
      height: 296,
    },

    check: {
        right: 95
    },
    checkTextBox:{
        left: 10,
        bottom: 24      
    },    
    checkText:{
        // fontFamily: 'Itim',
        fontSize: 16,
    },
    loginbutton: {
        width: 292,
        height: 43,
        top: 0,
        borderRadius: 10,
        backgroundColor: "#F1E803",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        // fontFamily: 'JetBrains Mono',
        fontSize: 18
    }

  });

export default SignIn
