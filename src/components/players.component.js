import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';

const PlayersComponent = props => {
  const {currentlyPlayings, scoreBoard} = props;
  return (
    <View style={styles.playersContainer}>
      <View style={styles.playersSection}>
        <Text style={styles.scoreTextStyle}>{`${currentlyPlayings[0]} (${
          scoreBoard[currentlyPlayings[0]].score
        })*`}</Text>

        {/* In Case there is not second player */}
        {currentlyPlayings[1] ? (
          <Text style={styles.scoreTextStyle}>{`${currentlyPlayings[1]} (${
            scoreBoard[currentlyPlayings[1]].score
          })`}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default PlayersComponent;
