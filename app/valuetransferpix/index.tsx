import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import {COLORS} from '@/constants/Colors'
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { db } from '../services/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import "react-native-get-random-values"
import "@ethersproject/shims"
import { useAppDispatch, useAppSelector } from '../context/store';
import { router } from 'expo-router';
import { setUser } from '../context/reducers/userSlice';


const ValueTransferPix = () => {

    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const [maskTransferPix, setMaskTransferPix] = useState('')
    const [valueTransferPix, setValueTransferPix] = useState(0)
    const [userDb, setUserDb] = useState({})
    const [buttonsVisible, setButtonsVisible] = useState(false)
    const [etherBalance, setEtherBalance] = useState(0)
    
    const currencyFormatter = (lang:any, currency:any, balance:any)=> Intl.NumberFormat(lang,{
        
        style: "currency",
        maximumFractionDigits: 2,
        currency,

    }).format(balance)

    async function handleValueTransferPix() {
        const valueTransferPixRef = doc(db, 'users', user.id);
        
        if (valueTransferPix != 0 && valueTransferPix <= user.balance){

            await setDoc(valueTransferPixRef, { valueTransferPix }, { merge: true }).then(()=>{
                
                dispatch(setUser({...userDb, valueTransferPix}))
                
                router.replace('/newtransferpix') 
                
            }).catch((err)=>{
                console.log('error: ', err)
            })
        }
        
        else {
            alert('Você não tem saldo suficiente!')
            
        }
          
    }

    useEffect(() => {
        const handleGetData = async() =>{
            const docRef = doc(db, "users", user.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                const data = docSnap.data()
                setUserDb({...data})
                dispatch(setUser({...data}))

              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        handleGetData()
        
    }, [])

    useEffect(() =>{
        Keyboard.addListener("keyboardDidShow", () => {
            setButtonsVisible(true)
        })

        Keyboard.addListener("keyboardDidHide", () => {
            setButtonsVisible(false)
        })
    })

  return (
    
    <KeyboardAvoidingView
        keyboardVerticalOffset={25}
        style={styles.container}
        behavior={Platform.select({android: 'height', ios: 'padding'})}
        >
            
    <View>
        <TouchableOpacity
            onPress={()=>router.replace('/home')}
            style={styles.close}
            >
            <EvilIcons name="close" size={40} color="black" />
        </TouchableOpacity>
      <Text style={styles.title}>Qual é o valor da transferência?</Text>
      <Text style={styles.label}>saldo disponivel em conta {currencyFormatter("pt-BR", "BRL", user?.balance / 10e1)}</Text>

        <TextInputMask
        
        style={styles.textInput}
        type={'money'}
        value={maskTransferPix}
        placeholderTextColor="#C0C0C0"
        onChangeText={text => {
            setMaskTransferPix(text)
            text = text.replace('R$', '')
            text = text.replace('.', '')
            text = text.replace(',', '')
            setValueTransferPix(parseInt(text))

        }}
        
        />
        {buttonsVisible ?(
            
                (valueTransferPix == 0) ? (
                    <View>
                <TouchableOpacity style={styles.button} >
                    <View style={styles.areaButtonBlock} >
                        <AntDesign name="arrowright" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                </View>) 
                : 
                (
                    <View>
                <TouchableOpacity onPress={handleValueTransferPix} style={styles.button} >
            <View style={styles.areaButton} >
                <AntDesign name="arrowright" size={24} color="white" />
            </View>
                </TouchableOpacity>
                </View>)
            
        ) : (
            (valueTransferPix == 0) ? (
                <View style={styles.areaButtonBlockHide}>
            <TouchableOpacity style={styles.button} >
                <View style={styles.areaButtonBlock} >
                    <AntDesign name="arrowright" size={24} color="white" />
                </View>
            </TouchableOpacity>
            </View>) 
            : 
            (
                <View style={styles.areaButtonHide} >
            <TouchableOpacity onPress={handleValueTransferPix} style={styles.button} >
        <View style={styles.areaButton} >
            <AntDesign name="arrowright" size={24} color="white" />
        </View>
            </TouchableOpacity>
            </View>)
        )}
        
        
        
        </View>
        
        </KeyboardAvoidingView>
    
    
  )
}

export default ValueTransferPix

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginStart: 30,
        marginEnd: 30
        
    },
    title:{
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 30
    },
    label:{
        fontSize: 16,
        
        color: '#C0C0C0',
        marginVertical: 35,

    },
    textInput:{
        width: "100%",
        height: 48,
        borderBottomWidth: 1.5,
        borderBottomColor: '#dadada',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        fontSize: 20
    },
    button: {
        flex: 1,
        
    },
    areaButton:{
        backgroundColor: COLORS.black,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '80%',
        top: 150
    
    },
    areaButtonBlock:{
        backgroundColor: '#C0C0C0',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '80%',
        top: 150
    },
    areaButtonBlockHide:{
        top: 250
    },
    areaButtonHide:{
        top: 250
    },
    
    close: {
        marginTop: 50,
        
    },
})