import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MagnifyingGlassIcon, ShoppingBagIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux'

import { selectedBasketItems } from '../features/basketSlice'
import FeaturedCafes from '../components/FeaturedCafes.js';
import CafeCard from '../components/CafeCard.js';
import client from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    const items = useSelector(selectedBasketItems);
    const [cafeMenu, setCafeMenu] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    useEffect(() => {
        client.fetch(
            `*[_type == "product"]`
        ).then(data => {
            if (searchTerm === "") {
                setCafeMenu(data);
            } else {
                setCafeMenu(data.filter((item) => {
                    return Object.keys(item).some((key) =>
                      item[key]
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toString().toLowerCase())
                    );
                  })
                  )
            }
        })
    }, [searchTerm])

    function updateSearch (event) {
        setSearchTerm(event)
    };

    function clickCafe(cafeName) {
        if (cafeName.title == "View All") {
            setSearchTerm("")
        } else {
            setSearchTerm(cafeName.title)
        }
    }

  return (
    <SafeAreaView className="bg-white p-5" >

          <View>

            <View className='flex-row flex-1 justify-between mx-4 mt-4'>
                <Text style={{fontFamily: 'AlexBrush-Regular'}} className="text-red-500 text-3xl">BoBa</Text>
                <TouchableOpacity className='p-2' onPress={() => {
                    navigation.navigate('Cart', {})
                }}>
                    <View className=''>
                        <ShoppingBagIcon size={25} color={items.length === 0 ? "#D3D3D3" : "#FF0000"} />
                    </View>
                </TouchableOpacity>
                
            </View>
          
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-4 mx-4 mt-2 ">
            <MagnifyingGlassIcon color="#5A5A5A" className="align-middle" />
            <TextInput 
                placeholder="boba duh..."
                keyboardType="default"
                onChangeText={updateSearch}
            />

          </View>
          </View>
          <View className="mt-2 mx-4">
              <FeaturedCafes clickCafe={clickCafe} />
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