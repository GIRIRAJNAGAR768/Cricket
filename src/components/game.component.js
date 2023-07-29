/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import ScoreComponent from './score.component';
import PlayersComponent from './players.component';
import BowlButtonComponent from './bowl.button.component';
import {useGameHook} from '../hooks/game.hook';

const GameComponent = () => {
  const {
    onClickBowl,
    scoreBoard,
    totalRuns,
    wickets,
    currentOver,
    currentlyPlayings,
    isGameOver,
    lastBallResult,
    onMatchRestart,
  } = useGameHook();

  return (
    <View style={styles.container}>
      {/* Top Score Container */}
      <ScoreComponent
        totalRuns={totalRuns}
        wickets={wickets}
        currentOver={currentOver}
        strikePlayerRuns={scoreBoard[currentlyPlayings[0]].score}
      />

      {/* Middle Player container */}
      <PlayersComponent
        scoreBoard={scoreBoard}
        currentlyPlayings={currentlyPlayings}
      />

      {/* Bowl button container */}
      <BowlButtonComponent
        onClickBowl={onClickBowl}
        isGameOver={isGameOver}
        onMatchRestart={onMatchRestart}
      />

      {/* Last boll result update */}
      <View style={styles.resultBox}>
        <Text style={styles.lastBallResultText}>
          {'Last Boll Result: '}
          <Text style={{...styles.lastBallResultText, color: '#498FD5'}}>
            {lastBallResult}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default GameComponent;
