import * as React from 'react'
import { moderateScale } from 'react-native-size-matters'
import { View, Text, StyleSheet } from 'react-native'
import { Children, cloneElement, isValidElement } from 'react'

type Props = {
  children: any
  color: string
  stroke: number
}
const styles = StyleSheet.create({
  outline: {
    position: 'absolute',
  },
})

class TextStroke extends React.Component<Props> {
  createClones = (w: number, h: number, color?: string) => {
    const { children } = this.props
    return Children.map(children, child => {
      if (isValidElement(child)) {
        const currentProps = child.props as any
        const currentStyle = currentProps ? currentProps.style || {} : {}

        const newProps = {
          ...currentProps,
          style: {
            ...currentStyle,
            textShadowOffset: {
              width: w,
              height: h,
            },
            textShadowColor: color,
            textShadowRadius: 1,
          },
        }
        return cloneElement(child, newProps)
      }
      return child
    })
  }

  render() {
    const { color, stroke, children } = this.props
    const strokeW = stroke
    const top = this.createClones(0, -strokeW * 1.2, color)
    const topLeft = this.createClones(-strokeW, -strokeW, color)
    const topRight = this.createClones(strokeW, -strokeW, color)
    const right = this.createClones(strokeW, 0, color)
    const bottom = this.createClones(0, strokeW, color)
    const bottomLeft = this.createClones(-strokeW, strokeW, color)
    const bottomRight = this.createClones(strokeW, strokeW, color)
    const left = this.createClones(-strokeW * 1.2, 0, color)

    return (
      <View>
        <View style={styles.outline}>{left}</View>
        <View style={styles.outline}>{right}</View>
        <View style={styles.outline}>{bottom}</View>
        <View style={styles.outline}>{top}</View>
        <View style={styles.outline}>{topLeft}</View>
        <View style={styles.outline}>{topRight}</View>
        <View style={styles.outline}>{bottomLeft}</View>
        {bottomRight}
      </View>
    )
  }
}
interface avatarProps {
  size: number
  color: string
  title: string | number
}

const AvatarIcon: React.FC<avatarProps> = ({ size, color, title }) => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: moderateScale(size),
          height: moderateScale(size),
          borderRadius: moderateScale(50),
          backgroundColor: color || 'skyblue',
        }}
      >
        <TextStroke stroke={0.5} color={'#ffffff'}>
          <Text
            style={{
              fontSize: moderateScale(size / 2 || 64),
            }}
          >
            {title}
          </Text>
        </TextStroke>
      </View>
    </>
  )
}

export default AvatarIcon
