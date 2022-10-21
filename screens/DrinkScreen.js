import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid'
import { StarIcon as StarIconOutline, UserCircleIcon } from 'react-native-heroicons/outline'
import { RadioButton, Checkbox, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, selectedBasketItems } from '../features/basketSlice'

const DrinkScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const items = useSelector(selectedBasketItems);

    const {
        params: {
            title, 
            imgUrl,
            price,
            details,
            customization,
            reviews
        },
    } = useRoute();

    const [size, setSize] = React.useState('Regular');
    const [sweetnessLevel, setSweetnessLevel] = React.useState('50%');
    const [iceLevel, setIceLevel] = React.useState('50%');
    const [toppingsList, setToppingsList] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(price);

    const options = ['0%', '25%', '50%', '75%', '100%'];
    const toppingOptions = ['honey boba', 'brown sugar boba', 'grass jelly', 'lychee jelly', 'strawberry popping boba', 'crystal boba', 'mango popping boba', 'aloe', 'egg pudding', 'coffee jelly'];

    useEffect (() => {
        setTotalPrice(price + toppingsList.length * 0.5);
    }, [toppingsList]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const handleTopping = (selectedTopping) => {
        if(toppingsList.includes(selectedTopping)) {
            setToppingsList(toppingsList.filter(topping => topping != selectedTopping));
        } else {
            setToppingsList([...toppingsList, selectedTopping]);
        }
    };

    const addItemToBasket = () => {
        dispatch(addToBasket({ title, totalPrice, imgUrl, sweetnessLevel, iceLevel, toppingsList }))
    }

  return (
      <View>
    <ScrollView>
      <Image 
            source={{uri: urlFor(imgUrl).url()}}
            className="h-96 w-full rounded-sm bg-gray-100"
        />
        <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
            <ArrowLeftIcon size={20} />
        </TouchableOpacity>
        <View className='bg-white'>
            <View className='px-4 pt-4'>
                <Text className='text-3xl font-bold'>{title}</Text>
                <View className='flex-row space-x-2 my-1 items-center'>
                    <View className='flex-row'>
                        <StarIcon color='black' size={22} />
                        <StarIcon color='black' size={22} />
                        <StarIcon color='black' size={22} />
                        <StarIcon color='black' size={22} />
                        <StarIconOutline color='black' size={22} />
                    </View>
                    <Text className='text-lg'>{reviews.length} Review(s)</Text>
                </View>
                
                <Text className='text-gray-500 mt-2 text-lg'>Description:</Text>
                <Text className='text-gray-500 mt-2 pb-4 text-md'>{details}</Text>
            </View>
        </View>

        <View className='bg-white mt-4 px-4 py-2'>
            <Text className='font-bold text-xl'>Select Size</Text>
            
            <TouchableOpacity className='flex-row items-center' onPress={() => setSize('Regular')}>
                <RadioButton 
                    value="Regular"
                    status={ size === 'Regular' ? 'checked' : 'unchecked' }
                    onPress={() => setSize('Regular')}
                />
                <Text>Regular</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-row items-center' onPress={() => setSize('Large')}>
                <RadioButton
                    value="Large"
                    status={ size === 'Large' ? 'checked' : 'unchecked' }
                    onPress={() => setSize('Large')}
                />
                <Text>Large</Text>
            </TouchableOpacity>
            
        </View>
        <View className='bg-white mt-4 px-4 py-2'>
            <Text className='font-bold text-xl'>Select Sweetness Level</Text>

            {options.map((level, i) => {
                return (
                <TouchableOpacity className='flex-row items-center' key={i} onPress={() => setSweetnessLevel(level)}>
                    <RadioButton
                        value={level}
                        status={ sweetnessLevel === level ? 'checked' : 'unchecked' }
                        onPress={() => setSweetnessLevel(level)}
                    /> 
                      <View key={i}><Text >{level}</Text></View>
                    
                </TouchableOpacity>)
            })}
            </View>

        <View className='bg-white mt-4 px-4 py-2'>
            <Text className='font-bold text-xl'>Select Ice Level</Text>
            {options.map((level, i) => {
                return (
                <TouchableOpacity className='flex-row items-center' key={i} onPress={() => setIceLevel(level)}>
                    <RadioButton
                        value={level}
                        status={ iceLevel === level ? 'checked' : 'unchecked' }
                        onPress={() => setIceLevel(level)}
                    /> 
                      <View key={i}><Text >{level}</Text></View>
                    
                </TouchableOpacity>)
            })}
        </View>
        <View className='bg-white mt-4 px-4 py-2'>
            <View className='flex-row justify-between items-center'>
                <Text className='font-bold text-xl'>Select Toppings</Text>
                <Text className='text-sm'>$0.50 each</Text>
            </View>
            
            {toppingOptions.map((topping, i) => {
                return (
                    <TouchableOpacity className='flex-row items-center' key={i} onPress={() => handleTopping(topping)}>
                        <Checkbox
                            status={toppingsList.includes(topping) ? 'checked' : 'unchecked'}
                            onPress={() => handleTopping(topping)}
                        />
                        <Text>{topping}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>

        <View className='bg-white mt-4 pb-40'>
            <View className='p-4'>
                <Text className='font-bold text-2xl mb-2'>Reviews</Text>
                <View>
                    {reviews?.map((item, i) => (
                        <View 
                            key={i} 

                          >
                              <View className='flex-row items-center'>
                                <UserCircleIcon color="#5A5A5A"/>
                                <Text className='mx-2'>Anonymous</Text>
                              </View>
                            <Text className='mt-2 mb-1 text-gray-500'>Customization: { customization ? customization[i] : "n/a"}</Text>
                            <Text className='mb-3 text-lg'>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>

    </ScrollView>
    <TouchableOpacity className='absolute top-96 mt-96 py-8 px-24' onPress={addItemToBasket}>
            <Button className='fixed p-2' icon="cart" color="#FF0000" mode="contained" >
                Add to Cart ${totalPrice}
            </Button>
            </TouchableOpacity>
    
        </View>
  )
}

export default DrinkScreen