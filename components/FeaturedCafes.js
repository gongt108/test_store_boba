import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import FeaturedCafe from './FeaturedCafe'
import client from '../sanity';

const FeaturedCafes = () => {

  const [cafeList, setCafeList] = useState([]);

  useEffect(() => {
    client.fetch(
        `*[_type == "cafe"]`
    ).then(data => {
        setCafeList(data);
    })
}, [])


  return (
    <View>
      <Text className='font-bold text-lg'>Popular Cafes</Text>
    <ScrollView 
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal 
      showsHorizontalScrollIndicator={false}
    >

        {cafeList?.map(item => (
            <FeaturedCafe 
                key={item._id}
                title={item.name}
                imgUrl={item.image}
            />
        ))}
      
      
    </ScrollView>
    </View>
  )
}

export default FeaturedCafes