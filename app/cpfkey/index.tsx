import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState, useRef} from 'react'
import { TextInput } from 'react-native-gesture-handler'
import {COLORS} from '@/constants/Colors'
import { TextInputMask } from 'react-native-masked-text'
import { Ionicons } from '@expo/vector-icons'
import Button from '../components/Button'
import { db } from '../services/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '../context/store'
import { router } from 'expo-router'
import { setUser } from '../context/reducers/userSlice'

const CpfKey = () => {

    const [ cpfKeyPix, setCpfKeyPix ] = useState('');
    const cpfKeyPixRef = useRef<any>(null)
    const {user} = useAppSelector(state => state.userReducer)
    
    const dispatch = useAppDispatch()

    async function handleCreateCpfKey() {
        const keyRef = doc(db, 'users', user.id);
        const unmaskCpf = cpfKeyPixRef?.current.getRawValue()
          
        if (unmaskCpf == user.cpf && user.cpfKeyPix === undefined){

            await setDoc(keyRef, { cpfKeyPix: unmaskCpf }, { merge: true }).then(()=>{
                alert('Sua chave pix ' + cpfKeyPix + ' foi cadastrada com sucesso')
                const data = {
                    ...user,
                    cpfKeyPix: unmaskCpf
                }
                dispatch(setUser({...user, cpfKeyPix: unmaskCpf}))
                
                router.replace('/home')
            }).catch((err)=>{
                console.log('error: ', err)
            })

        }else if(user.cpfKeyPix != undefined){
            alert('Chave pix de CPF já está cadastrada')
        }else if(unmaskCpf === undefined ){
            alert('Você não informou qual chave pix deseja')
        }else if(unmaskCpf != user.cpf){
            alert('A chave pix de cpf deve ser semlhante a da sua conta')
        }
  
        
    }

  return (

    <View>
    <TouchableOpacity
            onPress={()=>router.replace('/areapix')}
            style={styles.close}
            >
            <Ionicons name="chevron-back-sharp" size={40} color="#7a7979" />
        </TouchableOpacity>

      <View style={styles.content} >
      <Text
        style={styles.title}
        >Registrar CPF</Text>

        <Text
        style={styles.options}
        >Insira o cpf que você quer usar para receber transferência por pix</Text>

        <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            flexDirection: "row",
            justifyContent: 'space-between',
            paddingLeft: 22
        }} >

        <TextInputMask
                style={styles.inputMask}
                placeholder='Digite seu CPF'
                placeholderTextColor="#C0C0C0"
                type='cpf'
                value={cpfKeyPix}
                onChangeText={ text => setCpfKeyPix(text) }
                ref={cpfKeyPixRef}
        />  
        
        </View>

        <Button
            onPress={handleCreateCpfKey}
            title="Criar"
            filled
            style={{
                marginTop: 24,
            }}
            />

    </View>
      
    </View>
  )
}

export default CpfKey

const styles = StyleSheet.create({
    content:{
        
        marginStart: 'auto',
        marginEnd: 'auto',
        marginVertical: 20
        
    },
    title:{
        fontSize: 35
    },
    options:{
        fontSize: 18,
        color: '#7a7979',
        marginVertical: 20

    },
    close: {
        marginTop: 50,
        
    },
    inputMask:{
        width: '85%'
    }
})