import { View, Text } from 'react-native'
import React from 'react'
import CafeCard from './CafeCard'

const CafeMenu = () => {
  return (
    <View>
      <CafeCard 
        title='Barney'
        imgUrl='https://s3-media0.fl.yelpcdn.com/bphoto/0ja1lMTKPttwyzcCi7XJ3g/348s.jpg'
      />
    </View>
  )
}

export default CafeMenu