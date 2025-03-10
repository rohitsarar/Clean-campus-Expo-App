import { View, Text } from 'react-native'
import React from 'react'
import PersonInfo from '../personalinfo/PersonInfo'
import { LinearGradient } from 'expo-linear-gradient'
export default function ProfileScreen() {
  return (
   <LinearGradient colors={['black','white']}>
          {/* <PersonInfo/> */}
         <PersonInfo/>
         </LinearGradient>
  )
}