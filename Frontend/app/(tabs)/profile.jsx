import { View, Text } from 'react-native'
import React from 'react'
 import PersonInfo from '../../components/personalinfo/PersonInfo'


export default function Profile() {
  return (
    <View className='bg-mint h-full w-full'>
      {/* <PersonInfo/> */}
     <PersonInfo/>
    </View>
  )
}