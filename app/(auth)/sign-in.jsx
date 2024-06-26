import { View, Text, ScrollView, Image } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
import { db } from './firebaseConfig';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from '../../context/UserContext';


const SignIn = () => {
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const { setUser, user } = useContext(UserContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveUser = async (email, name) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        name: name
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const userExistsWith = async (email) => {
    const usersRef = query(collection(db, "users"), where("email", "==", email));
    try {
      const querySnapshot = await getDocs(usersRef);
      
      if (!querySnapshot.empty) {
        return true;
      } 
      return false;
    } catch (error) {
      console.error("Error checking if user exists:", error);
      throw error; // Propagate the error
    }
  }

  const handleEmailSignIn = async () => {
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, form.email, form.password);
      setUser(user);
      router.push('/home');
      console.log(user)
    } catch(error) {
      console.log(error)
    }
  }

  const handleOnpress = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (!isSignedIn) {
        const userInfo = await GoogleSignin.signIn();
        const user = userInfo.user;
        console.log('signed in user', user);
        setUser(user);
        await AsyncStorage.setItem('email', user.email);
      }
      else {
        const user = await GoogleSignin.getCurrentUser();
        console.log('current user', user.user);
        setUser(user.user);
        const { user: { email } } = user;
        await AsyncStorage.setItem('email', email);
      }
      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  }, [])


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-between min-h-[50vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'  />
{/*           <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})} 
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})} 
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={async () => await handleEmailSignIn()}
            containerStyles={'mt-7'}
            isLoading={isSubmitting}
          /> */}
{/*           <Text className="font-pmedium text-base text-center text-gray-100 my-3">Or</Text> */}
          <View className="justify-center pt-5 flex-col items-center gap-2">
           <Text className='text-semibold mt-10 font-semibold text-white text-xl text-center mx-4'>All it takes is one loss to start doubting yourself again</Text>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              style={{ alignSelf: 'center' }}
              onPress={handleOnpress}
            />
{/*             <View className='flex-row gap-x-2'>
              <Text className="text-lg text-gray-100 font-pregular">Don't have an account ?</Text>
              <Link href={'/sign-up'} className='text-lg font-psemibold text-secondary-100'>Sign Up</Link>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn