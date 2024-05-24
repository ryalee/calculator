import { StatusBar } from 'expo-status-bar';
import { useDebugValue, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 3, 2, 1, '+', 0, '.', '+/-', '=' ] 

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const lastNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    switch(operator) {
      case '+': 
        setCurrentNumber((firstNumber + lastNumber).toString())
        return

      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString())
        return

      case '*':
        setCurrentNumber((firstNumber * lastNumber).toString())
        return

      case '/':
        setCurrentNumber((firstNumber / lastNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed)

    if(buttonPressed === '+' | buttonPressed === '-' | buttonPressed === '*' | buttonPressed === '/' ) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ')
      return
    }

    switch(buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length -1)))
        return
      
      case 'AC':
        setLastNumber('')
        setCurrentNumber('')
        return
      
      case '=':
        setLastNumber(currentNumber + ' = ')
        calculator()
        return

      case '+/-':
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      width: '100%',
      minHeight: 300,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      borderBottomColor: '#000',
      height: '100%',
    },
    
    resultDisplay: {
      margin: 10,
      fontSize: 32,
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    
    themeButton: {
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignSelf: 'flex-start',
      bottom: 300,
      marginTop: 60,
      marginLeft: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,
      height: 70,
      borderRadius: 50,
    },

    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    
    button: {
      borderColor: 'darkMode' ? '#3f4d5b' : '#e5e5e5',
      minWidth: 95,
      minHeight: 95,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 2,
      borderColor: '#3f4d5b',
      borderWidth: .5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? '#fff' : '#000'}/>
        </TouchableOpacity>

        <Text style={styles.historyDisplay}>{lastNumber}</Text>
        <Text style={styles.resultDisplay}>{currentNumber}</Text>

        <View style={styles.buttons}>
          {buttons.map((button) =>
            button === '=' ? 
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#9dbc7b'}]}>
              <Text style={[styles.textButton, {color: '#fff', fontSize: 30}]}>{button}</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode === true ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed'}]}>
              <Text>{button}</Text>
            </TouchableOpacity>)}
        </View>
      </View>
    </View>
  );
};

