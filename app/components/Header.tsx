import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import {COLORS} from '@/constants/Colors'
import { Feather } from '@expo/vector-icons'
import { MotiView, MotiText } from 'moti'
import { router } from 'expo-router'

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64

interface HeaderProps {
    username:string
}

const Header = (props:HeaderProps) => {

    return (
    

    <View
    style={styles.containner}
    >
        <MotiView
        style={styles.content}
        from={{
            translateY: -150,
            opacity: 0,
        }}
        animate={{
            translateY: 0,
            opacity: 1,
        }}
        transition={{
            type: "timing",
            duration: 800,
            delay: 300,
        }}
        >
            <MotiText 
            style={styles.username}
            from={{
                translateX: - 300

            }}
            animate={{
                translateX: 0
            }}
            transition={{
                type: "timing",
                duration: 800,
                delay: 800,
            }}
            >
                {props.username}
            </MotiText>
            <TouchableOpacity
            onPress={() => router.replace('/profile')}
            activeOpacity={0.9}
            style={styles.buttonUser}
            >
                <Feather name='user' size={27} color='#fff' />
            </TouchableOpacity>

        </MotiView>
    </View>   
    
  )
}

export default Header

const styles = StyleSheet.create({
    containner:{
        backgroundColor: COLORS.secondary,
        paddingTop: statusBarHeight,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44
    },
    content:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    username:{
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    },
    buttonUser:{
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44/2,
        


    }

})