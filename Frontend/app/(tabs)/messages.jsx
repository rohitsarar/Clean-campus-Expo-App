import { View, Text } from 'react-native'
import React from 'react'
import TaskList from '../tasklist/TaskList';
export default function messages() {
  return (
  
      <View>
        <Text className="h-10 p-2 text-lg font-semibold bg-back text-white ">Clean Campus</Text>
        <TaskList/>
      </View>
 
  )
}