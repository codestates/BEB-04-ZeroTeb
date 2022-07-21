import React from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  region: string
}

export default function RegionButton(prop: Props) {
  console.log('button create:', prop.region)
  return (
    <View style={styles.buttonContainer}>{prop.region}</View>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#000000',

    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'lightgray',
  },
})
