import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient"
import {COLORS} from '@/constants/Colors'
import Button from '../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

const Welcome = () => {
  return (
    

<LinearGradient
    style={{
        flex: 1
    }}
    colors={[COLORS.secondary, COLORS.primary]}
    >
        <SafeAreaView style={{flex: 1}}>
            <View>
 
                <Image
                    source={require("@/assets/images/ContractBank.png")}
                    style={{
                        height: 400,
                        width: 200,
                        borderRadius: 20,
                        position: "absolute",
                        
                        left: 100,
                        
                    }}
                />
            </View>
            {/* content */}

            <View style={{
                paddingHorizontal: 22,
                position: 'absolute',
                top: 400,
                width: "100%",

            }}>

            <Text style={{
                fontSize: 40,
                fontWeight: 800,
                color: COLORS.white
            }}>Seja bem vindo a ContractBank</Text>

            <Text style={{
                fontSize: 25,
                fontWeight: 800,
                color: COLORS.white,
                marginTop: 50
            }}>Começe</Text>
                <View style={{marginVertical: 22, }} >
                    <Text
                    style={{
                        fontSize: 16,
                        color: COLORS.white,
                        marginVertical: 4
                    }}
                    >Conectando-se para fazer transições</Text>
                    <Text 
                    style={{
                        fontSize: 16,
                        color: COLORS.white,
                    }}
                    >Ou criando a sua conta!</Text>

                </View>

                <Button
                title="Inscrever-se"
                onPress={()=>router.replace('/signup')}
                style={{
                    marginTop: 22,
                    with: "100%"
                }}
                />

                <View style={{
                    flexDirection: "row",
                    marginTop: 12,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: COLORS.white
                    }}>Já tem uma conta?</Text>
                    <Pressable
                    onPress={()=>router.replace('/login')}
                    
                    >
                        <Text
                        style={{
                            fontSize: 16,
                            color: COLORS.white,
                            fontWeight: "bold",
                            marginLeft: 4
                        }}
                        >
                            Login
                        </Text>

                    </Pressable>
                </View>

            </View>

        </SafeAreaView>

    </LinearGradient>
    
  )
}

export default Welcome

const styles = StyleSheet.create({})