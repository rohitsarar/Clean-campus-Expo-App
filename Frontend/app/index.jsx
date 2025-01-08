import { View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

export default function Index() {
  return (
    <View>
      <Redirect href={'/(tabs)/home'}></Redirect>
    </View>
  )
}