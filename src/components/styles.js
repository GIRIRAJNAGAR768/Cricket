const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  scoreTextStyle: {
    fontSize: 16,
    color: '#498FD5',
    letterSpacing: 1,
    fontWeight: '500',
  },
  scoreTextStyleBold: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#498FD5',
  },
  currentPlayerScoreBox: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalScoreBox: {
    width: '60%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  playersSection: {
    height: '90%',
    width: '70%',
    borderWidth: 1,
    borderColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: '80%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#498FD5',
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playersContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    flex: 0.25,
    flexDirection: 'row',
  },
  resultBox: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastBallResultText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});
