import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { router } from 'expo-router';

const Actions = [
    
    {
        label: 'Endereço de CPF',
        path: 'cpfkey'
    },
    
    {
        label: 'Endereço de Email',
        path: 'cpfkey'
    },
    
    {
        label: 'Numero de Celular',
        path: 'cpfkey'
    },
    
    {
        label: 'Gerar chave Aleatória',
        path: 'cpfkey'
    },

] 

const ActionsKeysManage = () => {
    
  return (
    <View style={styles.container} >
        
        {Actions.map((action:any, i:any)=>{
            return (
                <View key={i} style={styles.options} > 
            
                <Entypo name="text-document" size={30} color="black" />
                <Text style={styles.text} >{action.label}</Text>
                <TouchableOpacity onPress={()=>router.replace(`/${action.path}`)}>
                <AntDesign name="plus" size={30} color="#7a7979" />
                
                </TouchableOpacity>
            
        </View>
            )
        })}
        
  
    </View>
  )
}

export default ActionsKeysManage

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        marginStart: 35,
        marginEnd: 20
        
    },
    options:{
        marginTop: 25,
        marginRight: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text:{
        fontWeight: 'bold',
        fontSize: 15
        
    }
})