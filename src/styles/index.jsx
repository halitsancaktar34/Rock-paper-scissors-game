import { StyleSheet } from "react-native";
import { COLORS } from "../utils/constant";

export const styles = StyleSheet.create({
    bg: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.WHİTE,
      marginTop: 160,
      marginBottom: 20,
    },
    choiceText: {
      marginVertical: 10,
      fontSize: 20,
      color: COLORS.WHİTE,
    },
    choices: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 20,
      marginHorizontal: 20,
      marginTop: 10
    },
    button: {padding: 10, borderRadius: 10, backgroundColor: '#E1E1E1'},
    image: {width: 90, height: 90},
    bottomSection: {bottom: 110, position: 'absolute'},
    results: {flexDirection: 'row', gap: 40},
    resultTitle: {fontSize: 25, color: COLORS.WHİTE, fontWeight: '700'},
    result: {fontSize: 20, color: COLORS.WHİTE, alignSelf: 'center', fontWeight:"500"},
    resetButton: {
      marginTop: 30,
      width: 100,
      backgroundColor: COLORS.WHİTE,
      alignSelf: 'center',
      borderRadius: 30,
    },
  });