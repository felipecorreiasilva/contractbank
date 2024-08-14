import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64

const Actions = [
    
    {
        path: '/valuetransferpix',
        icon: 'money-bill-transfer',
        component: 0,
        label: 'Transferir',
    },
    
    {
        path: '/index',
        icon: 'barcode',
        component: 0,
        label: 'Pagar',
    },
    
    {
        path: '/index',
        icon: 'addfolder',
        component: 1,
        label: 'Entradas',
    },

]

const ActionsB = [
    {
        path: '/index',
        icon: 'tagso',
        component: 1,
        label: 'Compras',
    },
    
    {
        path: '/index',
        icon: 'creditcard',
        component: 1,
        label: 'Carteira',
    },
    
    {
        path: '/profile',
        icon: 'setting',
        component: 1,
        label: 'Conta',
    },
]

const ActionsAreaPix = () => {
    
  return (
    <View>
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} >
    {Actions.map((action:any, i:number) => {
        return (
            <TouchableOpacity key={i} onPress={()=>router.replace(`${action.path}`)} style={styles.actionButton} >
            <View style={styles.areaButton} >
                {(action.component == 0) &&
                    (<FontAwesome6 name={action.icon} size={30} color="black" />)
                }
                {(action.component == 1) &&
                    (<AntDesign name={action.icon} size={30} color='#000' />)
                }
            
            </View>
            <Text style={styles.labelButton}>{action.label}</Text>
            </TouchableOpacity>
        )
    })}
    

    </ScrollView>

    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} >

    {ActionsB.map((action:any, i:number) => {
        return (
            <TouchableOpacity key={i} onPress={()=>router.replace(`${action.path}`)} style={styles.actionButton} >
            <View style={styles.areaButton} >
                {(action.component == 0) &&
                    (<FontAwesome6 name={action.icon} size={30} color="black" />)
                }
                {(action.component == 1) &&
                    (<AntDesign name={action.icon}size={30} color='#000' />)
                }
            
            </View>
            <Text style={styles.labelButton}>{action.label}</Text>
            </TouchableOpacity>
        )
    })}
    
    </ScrollView>

    <View style={styles.borderBottom}>

    </View>
    
    </View>
    
  )
}

export default ActionsAreaPix

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        maxHeight: 84,
        marginBottom: 14,  
        marginEnd: 'auto',
        marginStart: 'auto',
    },
    actionButton:{
        alignItems: 'center',
        marginRight: 32

    },
    areaButton:{
        backgroundColor: '#ecf0f1',
        height: 65,
        width: 65,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelButton:{
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    borderBottom:{
        paddingVertical: 16,
        borderBottomWidth: 5,
        borderBottomColor: '#dadada',
    }
    
})