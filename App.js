import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { Button } from "react-native-web";

export default function App() {
    const STYLES = ['default', 'dark-content', 'light-content'];
    const [darkMode, setDarkMode] = useState(false)
    const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=']
    const [currentNumber, setCurrentNumber] = useState("")
    const [lastNumber, setLastNumber] = useState("")


    function calculator() {
        const splitNumbers = currentNumber.split(' ')
        const fistNumber = parseFloat(splitNumbers[0])
        const lastNumber = parseFloat(splitNumbers[2])
        const operator = splitNumbers[1]

        switch (operator) {
            case '+':
                setCurrentNumber((fistNumber + lastNumber).toString())
                return
            case '-':
                setCurrentNumber((fistNumber - lastNumber).toString())
                return
            case '*':
                setCurrentNumber((fistNumber * lastNumber).toString())
                return
            case '/':
                setCurrentNumber((fistNumber / lastNumber).toString())
                return
        }
    }

    function handleInput(buttonPressed) {
        console.log(buttonPressed)
        if (buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "*" | buttonPressed === "/") {
            setCurrentNumber(currentNumber + " " + buttonPressed + " ")
            return
        }
        switch (buttonPressed) {
            case 'DEL':
                setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
                return
            case 'AC':
                setLastNumber("")
                setCurrentNumber("")
                return
            case '=':
                setLastNumber(currentNumber + " = ")
                calculator()
                return
            case '+/-':
                return
        }

        setCurrentNumber(currentNumber + buttonPressed)
    }



    const styles = StyleSheet.create({

        results: {
            backgroundColor: darkMode ? "#000" : "#fff",
            width: '100%',
            minHeight: 350,
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },
        resultText: {
            color: darkMode ? "#f5f5f5" : "#282F38",
            margin: 10,
            fontSize: 40
        },

        historyText: {
            color: darkMode ? "#B5B7BB" : "#7c7c7c",
            fontSize: 20,
            marginRight: 10,
            alignSelf: 'flex-end',
        },
        themeButton: {
            alignSelf: 'flex-start',
            bottom: 120,
            margin: 10,
            backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,

        },
        buttons: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        button: {
           
           borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 90,
            minHeight: 90,
            flex: 2,
        },
        textButton: {
            color: darkMode ? "#b5b7bb" : "#7c7c7c",
            fontSize: 20,
        },
    });


    return (
        <View>
            <StatusBar backgroundColor={darkMode ? "white": "black" } barStyle="light-content" />
            <View style={styles.results}>
                <TouchableOpacity style={styles.themeButton}>
                    <Entypo name={darkMode ? "light-up" : 'moon'} size={24} color={darkMode ? "white" : 'black'} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)} />
                </TouchableOpacity>
                <Text style={styles.historyText}>{lastNumber}</Text>
                <Text style={styles.resultText}>{currentNumber}</Text>
            </View>
            <View style={styles.buttons}>
                {buttons.map((button) =>
                    button === '=' ?
                        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {borderRadius: 70, backgroundColor: 'black' }]}>
                            <Text style={[styles.textButton, { color: "orange", fontSize: 50 }]}>{button}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button,
                        { backgroundColor: typeof (button) === 'number' ? darkMode === true ? '#303946' : '#fff' : darkMode === true ? '#fff' : '#fff' }]}>
                            <Text style={styles.textButton, {color: "orange" , fontSize: 30}}>{button}</Text>
                        </TouchableOpacity>
                )}
                
            </View>
        </View>
    )
}