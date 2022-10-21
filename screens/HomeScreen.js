import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MagnifyingGlassIcon, PlayCircleIcon, ShoppingBagIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';

import FeaturedCafes from '../components/FeaturedCafes.js';
import CafeCard from '../components/CafeCard.js';
import client from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [cafeMenu, setCafeMenu] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    useEffect(() => {
        client.fetch(
            `*[_type == "product"]`
        ).then(data => {
            setCafeMenu(data);
        })
    }, [])

  return (
    <SafeAreaView className="bg-white p-5" >

          <View>

            <View className='flex-row flex-1 justify-between mx-4 mt-4'>
                <Text style={{fontFamily: 'AlexBrush-Regular'}} className="text-red-500 text-3xl">BoBa</Text>
                <TouchableOpacity className='p-2' onPress={() => {
                    navigation.navigate('Cart', {})
                }}>
                <ShoppingBagIcon size={25} color={"#D3D3D3"} />
                </TouchableOpacity>
                
            </View>
          
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-4 mx-4 mt-2 ">
            <MagnifyingGlassIcon color="#5A5A5A" className="align-middle" />
            <TextInput 
                placeholder="boba duh..."
                keyboardType="default"
            />

          </View>
          </View>
          <View className="mt-2 mx-4">
              <FeaturedCafes />
              </View>

              <ScrollView className='mt-6' contentContainerStyle={{ paddingBottom: 400 }}>
              <View className='flex-wrap flex-row mx-2'>
                {cafeMenu?.map(item => (
                    <CafeCard 
                        key={item._id}
                        title={item.name}
                        imgUrl={item.image[0]}
                        price={item.price}
                        details={item.details}
                        customization={item.customization}
                        reviews={item.reviews}
                    />
                ))}
              </View>
          </ScrollView>
          
          
    </SafeAreaView>
  )
}

export default HomeScreen;