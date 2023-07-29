/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';

const BowlButtonComponent = props => {
  const {onClickBowl, isGameOver, onMatchRestart} = props;
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.7}
        onPress={() => {
          if (isGameOver) {
            onMatchRestart();
          } else {
            onClickBowl();
          }
        }}>
        <Text style={{...styles.scoreTextStyle, color: '#FFFFFF'}}>
          {isGameOver ? 'Restart Match' : 'Bowl'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BowlButtonComponent;
