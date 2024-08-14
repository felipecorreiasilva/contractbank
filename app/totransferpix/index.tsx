import {
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
KeyboardAvoidingView,
Keyboard,
Platform,
ScrollView,
RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import {COLORS} from "@/constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { db } from "../services/firebase";
import {
getDoc,
doc,
collection,
updateDoc,
query,
where,
getDocs,
setDoc,
addDoc,
increment
} from "firebase/firestore";
import Button from "../components/Button";
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import { setUser } from "../context/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../context/store";
import { router } from "expo-router";
import {v4} from 'uuid'
const ToTransferPix = () => {

const {user} = useAppSelector((state) => state.userReducer);
const dispatch = useAppDispatch();

const [userDb, setUserDb] = useState({})
const [uuid, setUuid] = useState('')
const [toTransferPix, setToTransferPix] = useState<any>({})
const [refresh, setRefresh] = React.useState(false)
const [status, setStatus] = React.useState(false)

async function handleToTransferPix() {
    
    const fromTransferPixDoc = doc(db, 'users', user.id)
    const fromTransferPixCollection = collection(fromTransferPixDoc, "completedTransferPix")
    
    const toTransferPixDoc = doc(db, 'users', toTransferPix?.id);
    
    const toTransferPixCollection = collection(toTransferPixDoc, "completedTransferPix")

    console.log('arrombado',toTransferPixCollection)

    const toCompletedTransferPix = {
        txid: uuid,
        uid: user.id,
        cpf: user.cpf,
        username: user.username,
        valueTransferPix: user.valueTransferPix,
        publicKey: user.publicKey,
        addressWallet: user.addressWallet

    }
    
    const fromCompletedTransferPix = {
        txid: uuid,
        uid: toTransferPix.id,
        cpf: toTransferPix.cpf,
        username: toTransferPix.username,
        valueTransferPix: toTransferPix.valueTransferPix,
        publicKey: toTransferPix.publicKey,
        addressWallet: toTransferPix.addressWallet

    }

        await setDoc(doc(fromTransferPixCollection,uuid), { ...fromCompletedTransferPix})

            await setDoc(doc(toTransferPixCollection,uuid), { ...toCompletedTransferPix})
            
            dispatch(setUser({...user, fromCompletedTransferPix}))
            
            updateDoc(fromTransferPixDoc, {
                balance: increment(-user.valueTransferPix)
            })
            
            updateDoc(toTransferPixDoc, {
                balance: increment(+user.valueTransferPix)
            })

            router.replace('/home')
    
    }

    const onRefresh = () => {
    setRefresh(true)
    setTimeout(() => {
        setRefresh(false)
        setStatus(true)
    }, 2800);
    }

const currencyFormatter = (lang:string, currency:string, balance:number) =>
    Intl.NumberFormat(lang, {
    style: "currency",
    maximumFractionDigits: 2,
    currency,
    }).format(balance);

    useEffect(() => {
    const handleGetData = async() =>{

        const toTransferPixDoc = doc(db, 'users', user.id);
        const toTransferPixDocFrom = doc(db, 'users', toTransferPixDoc?.id);

        const docSnap = await getDoc(toTransferPixDoc);
        
            if (docSnap.exists()) {
            
            const data = docSnap.data()
            
            setUserDb({ ...data });
            setToTransferPix({...data?.newTransferPix})
            dispatch(setUser({...data, toTransferPix: data?.newTransferPix}))
            
            } else {
            
            console.log("No such document!");
            }
        
        
    }
    handleGetData()
    
}, [refresh])

useEffect(() => {

    setUuid(v4())
    
    
}, [])

return (
    <KeyboardAvoidingView
    style={styles.container}
    keyboardVerticalOffset={10}
    behavior={Platform.select({android: 'height', ios: 'padding'})}
    >
    
    <ScrollView
    
    refreshControl={
    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
    }
    >
    
    

    <Text style={styles.title}>Transferindo</Text>
    <Text style={styles.balance}>{currencyFormatter("pt-BR", "BRL", toTransferPix?.valueTransferPix / 100)}</Text>
    {/* bote um touchable de editar aqui */}
    <View style={styles.fromUsername}>
        <Text  style={{ fontSize: 20 }}>para</Text>
        <Text style={{ marginLeft: 10, fontWeight: 'bold',fontSize: 20}} >{toTransferPix?.username}</Text>
    </View>
    
    {/* touchable <Text>Escrever uma menssagem...</Text> */}
    <View style={styles.fromData}>
    <Text style={{...styles.fromDataText, color: '#7d7d7d'}} >CPF</Text>
    <Text style={styles.fromDataText} >{toTransferPix?.cpf}</Text>

    </View>

    <View style={styles.fromData}>
    <Text style={{...styles.fromDataText, color: '#7d7d7d'}}>Instituição</Text>
    <Text style={styles.fromDataText}>CB PAGAMENTOS - IP</Text>

    </View>

    <Button
            onPress={handleToTransferPix}
            title="Transferir"
            filled
            style={{
                marginTop: 24,
            }}
            />
    

    </ScrollView>


    </KeyboardAvoidingView>
    
)
}

export default ToTransferPix

const styles = StyleSheet.create({
container:{
    flex: 1,
    marginStart: 30,
    marginEnd: 30
    
},
balance: {
    fontSize: 30
},
fromUsername: {
    marginTop: 20,
    flexDirection: 'row'
},
fromData:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    
},
fromDataText:{
    fontSize: 16,
    fontWeight: '400'
},
title:{
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 25
},
})