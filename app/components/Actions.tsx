import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'

const _Actions = [
   
    {
        path: 'areapix',
        label: 'Área Pix',
        icon: 'pix',
        component: 0,
    },
   
    {
        path: 'home',
        label: 'Pagar',
        icon: 'barcode',
        component: 0,
    },
   
    {
        path: 'valuetransferpix',
        label: 'Transferir',
        icon: 'money-bill-transfer',
        component: 0,
    },
   
    {
        path: 'home',
        label: 'Entradas',
        icon: 'addfolder',
        component: 1,
    },
   
    {
        path: 'home',
        label: 'Compras',
        icon: 'tagso',
        component: 1,
    },
   
    {
        path: 'home',
        label: 'Carteira',
        icon: 'creditcard',
        component: 1,
    },
   
    {
        path: 'profile',
        label: 'Conta',
        icon: 'setting',
        component: 1,
    },

]

const Actions = () => {

  return (
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false} >
    {
       _Actions.map((action:any, i:number) => {
            return (
                <TouchableOpacity key={i} onPress={()=>router.replace(`/${action.path}`)} style={styles.actionButton} >
                    <View style={styles.areaButton} >

                    {(action.component == 0) &&
                        (<FontAwesome6 name={action.icon} size={24} color="black" />)
                    }
                    {(action.component == 1) &&
                        
                        (<AntDesign name={action.icon} size={24} color='#000' />)
                    }

                    
                        
                    </View>
                    <Text style={styles.labelButton}>{action.label}</Text>
                </TouchableOpacity>
            )
       }) 
    }
    

    </ScrollView>
  )
}

export default Actions

const styles = StyleSheet.create({
    container:{
        maxHeight: 84,
        marginBottom: 14,
        marginTop: 18,
        paddingEnd: 14,
        paddingStart: 14
    },
    actionButton:{
        alignItems: 'center',
        marginRight: 32

    },
    areaButton:{
        backgroundColor: '#ecf0f1',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelButton:{
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})