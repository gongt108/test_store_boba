import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { ArrowLeftIcon, StarIcon, XMarkIcon } from 'react-native-heroicons/solid'
import { ShoppingBagIcon, StarIcon as StarIconOutline, UserCircleIcon } from 'react-native-heroicons/outline'
import { RadioButton, Checkbox, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket, selectedBasketItems, totalBasketPrice } from '../features/basketSlice'
import CartItem from '../components/CartItem'


const CartScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const items = useSelector(selectedBasketItems);
    const totalCartPrice = useSelector(totalBasketPrice);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const removeItemFromCart = () => {
        dispatch(removeFromBasket({ id, totalPrice }))
    }

  return (
    <SafeAreaView className='h-full'>
        <View className='h-3/4'>
        <Text className='text-3xl text-center mb-8 mt-12'>My Cart</Text>
            <ScrollView className='h-96 '>
                
            <View>
                
                {items.length < 1 && 
                    <View className='text-center items-center mt-52'>
                        <ShoppingBagIcon size={50} color="#5D5D5D"/>
                        <Text className='text-lg'>Your Cart is Empty.</Text>
                    </View>
                }
                {items.length >= 1 && items.map(item => {
                    return (
                        <View className='flex-row justify-between' key={item.id}>
                        <CartItem 
                            key={item.id}
                            id={item.id}
                            imgUrl={item.imgUrl}
                            title={item.title}
                            totalPrice={item.totalPrice}
                            sweetnessLevel={item.sweetnessLevel}
                            iceLevel={item.iceLevel}
                            toppingsList={item.toppingsList}
                        />
                        <TouchableOpacity onPress={removeItemFromCart} className='top-4 right-8'>
                            <XMarkIcon color={"#FF0000"} />
                        </TouchableOpacity>
                        </View>
                    )
                })
                }
            </View>
        </ScrollView>
    </View>
        <View className='mt-4 py-4 px-8'>
            <View className='flex-row justify-between mb-4'>
                <Text className='font-bold text-lg'> Total:</Text>
                <Text className='text-lg'>${totalCartPrice}</Text>
            </View>
            <View className='flex-row justify-between mb-8'>
                <Text className='font-bold text-lg'>Shipping:</Text>
                <Text className='text-lg'>TBD</Text>
            </View>
            <TouchableOpacity onPress={() => {
                    navigation.goBack()
                    navigation.navigate('Checkout', {items, totalCartPrice})
                    
                }}>
                <Button className='mx-8 p-2' icon="cart" color="#FF0000" mode="contained" >
                    Proceed to Checkout
                </Button>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={navigation.goBack} className='absolute top-12 left-5 p-2 bg-gray-300 rounded-full'>
            <ArrowLeftIcon size={20} color={"#FFFFFF"} />
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default CartScreen