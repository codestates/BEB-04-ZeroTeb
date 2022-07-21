import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'

interface Props {
  region: string
  selectRegion: any
}

export default function RegionButton(prop: Props) {
  return (
    <Pressable onPress={()=>{prop.selectRegion(prop.region)}}>
        <View style={styles.buttonContainer}><Text>{prop.region}</Text></View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    color: 'skyblue',
    borderStyle: 'solid',
    borderColor: 'skyblue',    
  },
})
