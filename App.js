 import React, {useEffect, useState} from 'react';
 import {
   Text,
   Button,
   View,
   Image,
   StyleSheet
 } from 'react-native';
 
 import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps'
 import MapViewDirections from 'react-native-maps-directions';
 import GetLocation from 'react-native-get-location'
 // COMPONENT

const origin = {latitude: 37.78825, longitude:  -122.4324};
const destination = {latitude: 37.79825, longitude:  -122.4324};
const GOOGLE_MAPS_APIKEY = 'AIzaSyAAa4V20fRNegrMbfGlBoK3SOmxklgAMrs';

 const markers = [
   {latitude: 37.78825, longitude:  -122.4324 },
   {latitude: 37.79825, longitude:  -122.4324 },
   {latitude: 36.78825, longitude:  -122.4324 },
   {latitude: 38.78825, longitude:  -122.4324 },
   {latitude: 39.78825, longitude:  -122.4324 },
 ]

 const dangerAreas = [
  {latitude: 37.78825, longitude:  -122.4324, caseNumber: 100 },
  {latitude: 37.79825, longitude:  -122.4324, caseNumber: 500 },
  {latitude: 36.78825, longitude:  -122.4324, caseNumber: 200 },
  {latitude: 38.78825, longitude:  -122.4324, caseNumber: 10 },
  {latitude: 39.78825, longitude:  -122.4324, caseNumber: 1000 },
]
 
 const App= () => {
  const [coord, setCoord] = useState()

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {
      // console.log(location);
      setCoord(()=>location)
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
  }, [])
 
   return (
    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE}
       style={styles.map}
       region={{
         latitude:coord? coord.latitude : 37.78825 ,
         longitude: coord? coord.longitude : -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >

       <Marker
        coordinate={{
          latitude:coord? coord.latitude : 37.78825 ,
          longitude: coord? coord.longitude : -122.4324,
        }}
       >
         <Callout>
           <View>
           <Text>Hee lo</Text>
            <Text><Image source={require('./bdha.png')} style={{width: 50, height: 50}} /></Text>
           </View>
            
         </Callout>
       </Marker>
       {dangerAreas.map((marker, index) => (
         <Circle
         key={index}
          center={{
            longitude: marker.longitude,
            latitude: marker.latitude
          }}
          radius={marker.caseNumber}
          strokeWidth={3}
          strokeColor="rgba(255, 0, 0, 0.65)"
          fillColor="rgba(255, 0, 0, 0.3)"
         />
       ))}

      <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={10}
          strokeColor="red"
        />

     </MapView>

     {console.log(coord)}

    <Text style={{
      fontSize: 20,
      color: "black",
      position: "absolute", 
      zIndex: 999,
      bottom: 20
    }}>latitude: {coord?.latitude}, longitude: {coord?.longitude}</Text>

   </View>
   );
 };

 const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
 
 
 export default App;
 