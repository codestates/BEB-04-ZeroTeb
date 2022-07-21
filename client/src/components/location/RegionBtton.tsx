import React, { useState } from 'react'
import { Modal, StyleSheet, View, Dimensions } from 'react-native'

interface Props {
  region: string
}

export default function RegionButton(prop: Props) {
  console.log('button create:', prop.region)
  return <View style={styles.buttonContainer}>{prop.region}</View>
}
const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
  },
})
