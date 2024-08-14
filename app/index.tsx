import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { auth, db } from '@/app/services/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { LinearGradient } from "expo-linear-gradient"
import {COLORS} from '../constants/Colors'
import { Link, router } from "expo-router";
import { useAppDispatch, useAppSelector } from '@/app/context/store'
import { setUser } from './context/reducers/userSlice'

export default function Index() {
  
  const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        checkLoggedUser()
    }, [])

    const checkLoggedUser = async() => {
        auth.onAuthStateChanged((userCred:any) => {
            
            if (userCred?.uid){
                getDoc(doc(db, 'users', userCred?.uid)).then(docSnap => {
                    if(docSnap.exists()){
                        // console.log("User Data :", docSnap.data())
                        dispatch(setUser(docSnap.data()))    
                    }
                }).then(() => {
                    setTimeout(() => {
                      router.replace('/home');

                        
                    }, 2000)
                })
            }else {
              
                router.replace('/welcome');

            }
        })
    }
    return (
      <LinearGradient
      style={{
          flex: 1
      }}
      colors={[COLORS.secondary, COLORS.primary]}
      >
  
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
        <Text style={{color: 'white'}} >Carregando...</Text>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
  
      </LinearGradient>
      
    )
}
