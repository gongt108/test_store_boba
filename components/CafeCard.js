import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const CafeCard = ({
    title, 
    imgUrl,
    price,
    details,
    customization,
    reviews
}) => {
    const navigation = useNavigation();
    
  return (
      <View 
        className='w-1/2 p-2'
      >
    <TouchableOpacity 
        className='h-1/4 items-center bg-white border rounded-md pt-4'
        onPress={() => {
            navigation.navigate('Drink', {
                title, 
                imgUrl,
                price,
                details,
                customization,
                reviews
            })
        }}
    >
        <Image 
            source={{uri: urlFor(imgUrl).url()}}
            className="h-36 w-36 rounded-sm bg-gray-100"
        />
        <View className='px-3 align-bottom'>
            <Text className='text-lg pt-2 mx-3 text-center '>{title}</Text>
        </View>
      
    </TouchableOpacity>
    </View>
  )
}

export default CafeCard