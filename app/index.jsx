import { Link, Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

import { images } from '../constants'
import CustomButton from '../components/CustomButton';

export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4">
                    <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />

                    <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />

                    <View className="relative mt-5">
                        <Text className="text-white text-3xl text-center font-bold">Discover Possibilities with {''}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>
                        <Image source={images.path}  className="w-[136px] h-[15px] absolute -bottom-2 right-0" resizeMode="contain" />
                    </View>
                    <Text className="text-sm text-gray-100 mt-7 text-center font-pregular">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
                    <CustomButton title={'Continue with Email'} handlePress={() => router.push('/sign-in')} containerStyles={"w-full mt-7"} />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    );
}