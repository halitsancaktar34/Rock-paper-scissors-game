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
import {choices} from './src/data/mockData';
import {COLORS} from './src/utils/constant';
import { styles } from './src/styles';


const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [win, setWin] = useState(0);
  const [draw, setDraw] = useState(0);
  const [loss, setLoss] = useState(0);

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
      setDraw(draw + 1);
    } else if (
      (user?.name === 'Taş' && computer?.name === 'Makas') ||
      (user?.name === 'Makas' && computer?.name === 'Kağıt') ||
      (user?.name === 'Kağıt' && computer?.name === 'Taş')
    ) {
      setResult('Kazandınız');
      setWin(win + 1);
    } else {
      setResult('Kaybettiniz');
      setLoss(loss + 1);
    }
  };

  const resetGame = () => {
    setWin(0);
    setDraw(0);
    setLoss(0);
    setResult(null);
    setComputerChoice(null);
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
        <Text style={styles.title}>ROCK PAPER SCISSORS</Text>
        <Text style={styles.choiceText}>User's Choice:</Text>
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
            {paddingTop: 20},
          ]}>
          {result}
        </Text>
        {computerChoice && (
          <>
            <Text style={styles.choiceText}>Computer's Choice:</Text>
            <View style={styles.button}>
              <Image source={computerChoice.image} style={styles.image} />
            </View>
          </>
        )}
        {/* Result Section */}
        <View style={styles.bottomSection}>
          <View style={styles.results}>
            <View>
              <Text style={styles.resultTitle}>Win</Text>
              <Text style={styles.result}>{win}</Text>
            </View>
            <View>
              <Text style={styles.resultTitle}>Draw</Text>
              <Text style={styles.result}>{draw}</Text>
            </View>
            <View>
              <Text style={styles.resultTitle}>Loss</Text>
              <Text style={styles.result}>{loss}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => resetGame()}>
            <Text style={{fontSize: 20, alignSelf: 'center', padding: 10}}>
              RESET
            </Text>
          </TouchableOpacity>
        </View>
      </FadeInView>
    </SafeAreaView>
  );
};

export default App;