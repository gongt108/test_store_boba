import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import FeaturedCafe from './FeaturedCafe'
import client from '../sanity';

const FeaturedCafes = ({ clickCafe }) => {

  const [cafeList, setCafeList] = useState([]);

  useEffect(() => {
    client.fetch(
        `*[_type == "cafe"]`
    ).then(data => {
        setCafeList(data.sort(function(a, b) {
          return a.order > b.order;
        }))
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
                clickCafe={clickCafe}
            />
        ))}
      
      
    </ScrollView>
    </View>
  )
}

export default FeaturedCafes