import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'

const FeaturedCafe = ({ imgUrl, title, clickCafe }) => {
  return (
    <TouchableOpacity 
      className='relative mr-2' 
      onPress={() => clickCafe({ title })}
    >
      
      <Image 
        source={{
            uri: urlFor(imgUrl).url()
        }}
      className='h-20 w-20 rounded'
      
      />
      <Text className='absolute bottom-1 left-1 text-purple-500 drop-shadow-lg shadow-black font-bold'>{title}</Text>
    </TouchableOpacity>
  )
}

export default FeaturedCafe