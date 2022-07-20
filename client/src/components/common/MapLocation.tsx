import * as React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { View, Dimensions, Platform } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface mapProps {
  x: number
  y: number
}

const MapLocation: React.FC<mapProps> = ({ x, y }) => {
  return (
    <>
      <View style={style.container}>
        <MapView
          style={style.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userLocationPriority={'balanced'}
          initialRegion={{
            latitude: x,
            longitude: y,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: x, longitude: y }}
            title="this is a event location"
          />
        </MapView>
      </View>
    </>
  )
}

const style = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.7,
  },
})

export default MapLocation
