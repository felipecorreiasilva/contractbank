import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MotiView, AnimatePresence, MotiText } from 'moti'

interface MovementsProps {
    data: any
}

const Movements = (props:MovementsProps) => {
    const [showValue, setShowValue] = useState(false)
  return (
    <TouchableOpacity style={styles.container} onPress={()=> setShowValue(!showValue) } >
      <Text style={styles.date} >{props.data.date}</Text>
      <View style={styles.content} >
        <Text style={styles.label} >{props.data.label}</Text>

        {showValue? (
            <AnimatePresence exitBeforeEnter>
            <MotiText
            style={props.data.type === 1 ? styles.value : styles.expenses}
            from={{
                translateX: 100,
            }}
            animate={{
                translateX: 0
            }}
            transition={{
                type: 'timing',
                duration: 500
            }}
            >
            {props.data.type === 1 ? `R$ ${props.data.value}`: `R$ -${props.data.value}`}
            </MotiText>
            </AnimatePresence>
        ) : (
            <AnimatePresence exitBeforeEnter>
                <MotiView
                style={styles.skeleton}
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing'  }}
                >
                </MotiView>
            </AnimatePresence>
        )}

      </View>
    </TouchableOpacity>
  )
}

export default Movements

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dadada'
    },
    content:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8
    },
    date:{
        color: '#dadada',
        fontWeight: 'bold'
    },
    label:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    value:{
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    expenses:{
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: 'bold'
    },
    skeleton:{
        marginTop: 6,
        width: 80,
        height: 10,
        backgroundColor: '#dadada',
        borderRadius: 8
    }

})