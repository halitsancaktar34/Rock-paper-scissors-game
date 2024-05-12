import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';

//Data İmport
import {choices} from './src/data/mockData';

//Utils İmport
import {COLORS} from './src/utils/constant';

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  //Functions
  const handleUserChoice = userChoice => {
    setUserChoice(userChoice);
    randomComputerChoice(userChoice);
  };
  const randomComputerChoice = userChoice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];
    setComputerChoice(computerChoice);
    determineWinner(userChoice, computerChoice);
  };

  const determineWinner = (user, computer) => {
    if (user?.name === computer?.name) {
      setResult('Berabere');
    } else if (
      (user?.name === 'Taş' && computer?.name === 'Makas') ||
      (user?.name === 'Makas' && computer?.name === 'Kağıt') ||
      (user?.name === 'Kağıt' && computer?.name === 'Taş')
    ) {
      setResult('Kazandınız');
    } else {
      setResult('Kaybettiniz');
    }
  };

  //Animation
  const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [result]);

    return (
      <Animated.View // Special animatable View
        style={[
          {
            ...props.style,
            opacity: fadeAnim, // Bind opacity to animated value
          },
          styles.bg,
          {
            backgroundColor:
              result === 'Kazandınız'
                ? '#88c435'
                : result === 'Kaybettiniz'
                ? 'red'
                : result === 'Berabere'
                ? '#ecba31'
                : COLORS.BACKGROUNDCOLOR, // COLORS.BACKGROUNDCOLOR bir sabit değer olmalı.
          },
        ]}>
        {props.children}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar barStyle={'light-content'} />
      <FadeInView>
        <Text style={styles.title}>TAŞ KAĞIT MAKAS</Text>
        <Text style={styles.choiceText}>Kullanıcının Seçimi:</Text>
        <View style={styles.choices}>
          {choices?.map(choice => (
            <TouchableOpacity
              key={choice.id}
              style={styles.button}
              onPress={() => handleUserChoice(choice)}>
              <Image source={choice.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={[
            styles.choiceText,
            {fontWeight: 'bold'},
            {fontSize: 25},
            {marginTop: 50},
          ]}>
          {result}
        </Text>
        {computerChoice && (
          <>
            <Text style={styles.choiceText}>Bilgisayarın Seçimi:</Text>
            <View style={styles.button}>
              <Image source={computerChoice.image} style={styles.image} />
            </View>
          </>
        )}
      </FadeInView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.WHİTE,
    marginBottom: 20,
  },
  choiceText: {
    marginVertical: 20,
    fontSize: 20,
    color: COLORS.WHİTE,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
    marginHorizontal: 20,
  },
  button: {padding: 10, borderRadius: 10, backgroundColor: '#E1E1E1'},
  image: {width: 90, height: 90},
});
