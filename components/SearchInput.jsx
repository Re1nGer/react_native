import { StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useState } from 'react';
import { icons } from '../constants';
import React from 'react'

const SearchInput = ({title, value, placeholder, handleChangeText, otherStyles, ...rest}) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
      <View className="border-2 w-full h-16 px-4 bg-black-100 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput
          className="text-base mt-.5 text-white flex-1 font-pregular"
          value={value}
          placeholder={"Search for a video topic"}  
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
         />
          <TouchableOpacity>
            <Image source={icons.search} resizeMode='contain' className="w-5 h-5" />
          </TouchableOpacity>
    </View>
  )
}

export default SearchInput;

const styles = StyleSheet.create({})