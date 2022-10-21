import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'
import {  } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket, selectedBasketItems } from '../features/basketSlice'

const CartItem = ({
    id,
    title, 
    imgUrl,
    totalPrice,
    sweetnessLevel,
    iceLevel,
    toppingsList
}) => {

    const dispatch = useDispatch();

  return (
    <View className='flex-row justify-between mx-8 my-4'>
        <View className='flex-row'>
        <Image 
            source={{uri: urlFor(imgUrl).url()}}
            className="h-24 w-24 rounded-sm bg-gray-100"
        />
        <View className='ml-8'>
            <Text className='font-bold'>{title}</Text>
            <Text>${totalPrice}</Text>
            <Text className='text-gray-400'>{sweetnessLevel} sweet</Text>
            <Text className='text-gray-400'>{iceLevel} ice</Text>
            {toppingsList.map(topping => <Text key={topping} className='text-gray-400'>
                {topping}
            </Text>)}
        </View>
        </View>
    </View>
  )
}

export default CartItem