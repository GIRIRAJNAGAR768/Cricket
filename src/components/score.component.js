/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';

const ScoreComponent = props => {
  const {totalRuns, wickets, currentOver, strikePlayerRuns} = props;
  return (
    <View style={styles.scoreContainer}>
      <View style={styles.totalScoreBox}>
        <Text style={{...styles.scoreTextStyle, marginBottom: 5}}>
          {`Score: ${totalRuns}-${wickets}`}
        </Text>
        <Text style={styles.scoreTextStyle}>{`Over: ${currentOver}`}</Text>
      </View>
      <View style={styles.currentPlayerScoreBox}>
        <Text style={styles.scoreTextStyleBold}>{strikePlayerRuns}</Text>
        <Text style={styles.scoreTextStyle}>{'Runs'}</Text>
      </View>
    </View>
  );
};

export default ScoreComponent;
