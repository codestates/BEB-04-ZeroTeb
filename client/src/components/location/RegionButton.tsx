import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

interface Props {
  region: string
  selectRegion: any
}

export default function RegionButton(prop: Props) {
  return (
    <Pressable onPress={()=>{prop.selectRegion(prop.region)}}>
        <View style={styles.buttonContainer}><Text style={styles.textContainer}>{prop.region}</Text></View>
    </Pressable>
  )
}
const styles = ScaledSheet.create({
  buttonContainer: {
    marginHorizontal: '16@msr',
    marginVertical: '10@msr',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90@msr',
    height: '40@vs',
    borderWidth: 1,
    borderRadius: 10,
    color: 'skyblue',
    borderStyle: 'solid',
    borderColor: 'skyblue',    
  },
  textContainer:{
    fontSize: '15@msr'
  }
})
