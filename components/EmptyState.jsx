import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

const EmptyState = () => {
  return (
    <View className="justify-center items-center px-4">
      <Image 
        source={images.empty}
        className=" "
      />
    </View>
  )
}

export default EmptyState