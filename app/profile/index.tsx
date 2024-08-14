import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { auth } from '../services/firebase';
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '../context/store';
import { router } from 'expo-router';
import { setUser } from '../context/reducers/userSlice';

const Profile = () => {
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const handleLogout = async() => {
        
        await auth.signOut().then(() =>{
            dispatch(setUser(null))
            router.replace('/welcome')
        })
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={()=>router.replace('/home')}
            // style={styles.close}
            >
            <Ionicons name="chevron-back-sharp" size={40} color="#7a7979" />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.9}
            style={styles.buttonLogout}
        >
        <SimpleLineIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLogout:{
        
        
    },
})