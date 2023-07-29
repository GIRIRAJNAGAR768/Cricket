import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

export const useGameHook = () => {
  const allPlayers = ['Kirat Boli', 'N.S Nodhi', 'R Rumrah', 'Shashi Henra'];
  const currentlyPlayingsData = [allPlayers[0], allPlayers[1]];
  const remainingPlayersData = [allPlayers[2], allPlayers[3]];

  const scoreBoardData = {
    [allPlayers[0]]: {
      ballsPlayed: 0,
      score: 0,
      isOut: false,
    },
    [allPlayers[1]]: {
      ballsPlayed: 0,
      score: 0,
      isOut: false,
    },
    [allPlayers[2]]: {
      ballsPlayed: 0,
      score: 0,
      isOut: false,
    },
    [allPlayers[3]]: {
      ballsPlayed: 0,
      score: 0,
      isOut: false,
    },
  };

  const playersProbabilities = {
    [allPlayers[0]]: [5, 30, 25, 10, 15, 1, 9, 5],
    [allPlayers[1]]: [10, 40, 20, 5, 10, 1, 4, 10],
    [allPlayers[2]]: [20, 30, 15, 5, 5, 1, 4, 20],
    [allPlayers[3]]: [30, 25, 5, 0, 5, 1, 4, 30],
  };

  const [currentOver, setCurrentOver] = useState(0);
  const [ballsPlayed, setBallsPlayed] = useState(0);
  const [requiredRuns, setRequiredRuns] = useState(40);
  const [totalRuns, setTotalRuns] = useState(0);
  const [wickets, setWickets] = useState(0);

  const [currentlyPlayings, setCurrentlyPlayings] = useState(
    currentlyPlayingsData,
  );
  const [remainingPlayers, setRemainingPlayers] =
    useState(remainingPlayersData);

  const [scoreBoard, setScoreBoard] = useState(scoreBoardData);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastBallResult, setLastBallResult] = useState('Game Started');

  //Game updates
  useEffect(() => {
    if (wickets === 3 || currentOver === 4.0 || requiredRuns <= 0) {
      setIsGameOver(true);
      let winner = '';
      if (requiredRuns <= 0) {
        winner = `Bengaluru Won the match By ${3 - wickets} Wickets.`;
      } else {
        winner = `Bengaluru lost the match By ${requiredRuns} Runs.`;
      }
      setLastBallResult(winner);
      Alert.alert('Game is Over', winner);
    }
  }, [wickets, currentOver, requiredRuns]);

  const onClickBowl = () => {
    const randomNumber = generatePlayerRandomNumber();
    let newScoreBoard = {...scoreBoard};
    let newRemainingPlayers = [...remainingPlayers];

    // update balls for current player
    newScoreBoard[currentlyPlayings[0]].ballsPlayed += 1;

    //New ball added and coverted to over
    let totalBallsPlayed = ballsPlayed + 1;
    const round = Math.floor(totalBallsPlayed / 6);
    const mod = totalBallsPlayed % 6;
    const newCurrentOver = round + '.' + mod;

    let newCurrentlyPlayings = [...currentlyPlayings];

    //Wicket handler
    if (randomNumber === 7) {
      let newWickets = wickets + 1;

      //Updating wicket for strike player
      newScoreBoard[currentlyPlayings[0]].isOut = true;

      //If all wickets are done, the last player only remain in the game
      if (newWickets === 3) {
        newCurrentlyPlayings = [currentlyPlayings[1]];
      } else {
        //If it is not last wicket then only we will update currently playings and remaing players
        newCurrentlyPlayings = [remainingPlayers[0], currentlyPlayings[1]];
      }

      //Updating the remaining player once current player is out
      newRemainingPlayers = remainingPlayers.filter(
        player => player !== remainingPlayers[0],
      );
      setWickets(newWickets);
      setLastBallResult(`${currentlyPlayings[0]} is OUT`);
    } else {
      let newRequiredRuns = requiredRuns - randomNumber;

      //Updating score for strike player
      newScoreBoard[currentlyPlayings[0]].score += randomNumber;
      let newRuns = totalRuns + randomNumber;

      //If run is 1,3 and 5, strike will get change
      if (randomNumber % 2 !== 0) {
        newCurrentlyPlayings = newCurrentlyPlayings.reverse();
      }
      setRequiredRuns(newRequiredRuns);
      setTotalRuns(newRuns);

      //Updating result for on strike player
      setLastBallResult(`${currentlyPlayings[0]} got ${randomNumber} run`);
    }

    //Again we will change strike once over is done
    if (totalBallsPlayed % 6 === 0) {
      newCurrentlyPlayings = newCurrentlyPlayings.reverse();
    }

    console.log('currentlyPlayings', currentlyPlayings, newCurrentlyPlayings);

    setCurrentlyPlayings(newCurrentlyPlayings);
    setRemainingPlayers(newRemainingPlayers);
    setScoreBoard(newScoreBoard);
    setBallsPlayed(totalBallsPlayed);
    setCurrentOver(newCurrentOver);
  };

  const generatePlayerRandomNumber = () => {
    const playerOnStrike = currentlyPlayings[0];
    const playersProbability = playersProbabilities[playerOnStrike];
    // const resultantIndexes = [0, 1, 2, 3, 4, 5, 6, 7];

    // total of probs is 100 -- generate number between 1-100
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // Get index between 1 to 8 based on probability of each score index which is 1 to 8
    let initialTotalProb = 0;
    const lastScoreIndex = playersProbability?.length - 1;

    for (let i = 0; i < lastScoreIndex; i++) {
      initialTotalProb += playersProbability[i];
      if (randomNumber < initialTotalProb) {
        // return resultantIndexes[i];
        return i;
      }
    }
    // return resultantIndexes[lastScoreIndex];
    return lastScoreIndex;
  };

  const onMatchRestart = () => {
    setIsGameOver(false);
    setLastBallResult('Game Started');
    setCurrentOver(0);
    setBallsPlayed(0);
    setRequiredRuns(40);
    setTotalRuns(0);
    setWickets(0);
    setCurrentlyPlayings(currentlyPlayingsData);
    setRemainingPlayers(remainingPlayersData);
    setScoreBoard(scoreBoardData);
  };

  return {
    onClickBowl,
    scoreBoard,
    totalRuns,
    wickets,
    currentOver,
    currentlyPlayings,
    isGameOver,
    lastBallResult,
    onMatchRestart,
  };
};
