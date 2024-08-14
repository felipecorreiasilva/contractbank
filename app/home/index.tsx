import { StyleSheet, Text, View, FlatList, Button, RefreshControl } from 'react-native'
import React, {useRef, useCallback, useMemo, useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Balance from '../components/Balance'
import Movements from '../components/Movements'
import Actions from '../components/Actions'
import { db } from '../services/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { ScrollView } from 'moti'
import "react-native-get-random-values"
import "@ethersproject/shims"

import { useAppDispatch, useAppSelector } from '../context/store'
import { setUser } from '../context/reducers/userSlice'

const list = [
  
  {
    id: 1,
    label: 'Boleto conta luz',
    value: '300,90',
    date: '17/09/2022',
    type: 0 // Despesas
  },
  
  {
    id: 2,
    label: 'Pix Cliente X',
    value: '2.500,00',
    date: '17/09/2022',
    type: 1 // Despesas
  },
  
  {
    id: 3,
    label: 'Salário',
    value: '7.200,90',
    date: '17/09/2022',
    type: 1 // Despesas
  },

]


const Home = () => {
  
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const [userDb, setUserDb] = useState({})
    const [etherBalance, setEtherBalance] = useState(0)

    const [refresh, setRefresh] = React.useState(false)
    const [status, setStatus] = React.useState(false)

    const onRefresh = () => {
      setRefresh(true)
      setTimeout(() => {
        setRefresh(false)
        setStatus(true)
      }, 2800);
    }

    const currencyFormatter = (lang:any, currency:any, balance:any)=> Intl.NumberFormat(lang,{
      style: "currency",
      maximumFractionDigits: 2,
      currency,

  }).format(balance)

    useEffect(() => {
      const handleGetData = async() =>{
          const docRef = doc(db, "users", user?.id);
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
      
      
  }, [refresh])
    
  return (

    

    <View style={styles.container}
    
    >
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
    }
    >
      <Header username={user?.username} />
      <Balance saldo={currencyFormatter("pt-BR", "BRL", user?.balance / 10e1)}/>
      <Actions/>
      <Text style={styles.title} >Últimas movimentações</Text>
      
    </ScrollView>  

      
      <FlatList
      
      style={styles.list}
      data={list}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <Movements data={item} />}
      />      
      
    </View>

    
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14

  },
  list: {
    marginStart: 14,
    marginEnd: 14
  }
})