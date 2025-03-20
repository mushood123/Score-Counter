// App.tsx
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Modal, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

interface MatchResult {
  id: string;
  teamAScore: number;
  teamBScore: number;
  winner: string;
  date: string;
}

const App = () => {
  const [teamAScore, setTeamAScore] = useState<number>(0);
  const [teamBScore, setTeamBScore] = useState<number>(0);
  const [tieOccurrence, setTieOccurrence] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [matchHistory, setMatchHistory] = useState<MatchResult[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [seriesWinner, setSeriesWinner] = useState<string | null>(null);
  const [showFinalResultModal, setShowFinalResultModal] = useState<boolean>(false);
  const [finalWinner, setFinalWinner] = useState<string | null>(null);

  // Load match history when component mounts
  useEffect(() => {
    loadMatchHistory();
  }, []);

  // Load match history from AsyncStorage
  const loadMatchHistory = async () => {
    try {
      const historyJson = await AsyncStorage.getItem('matchHistory');
      if (historyJson) {
        const history = JSON.parse(historyJson) as MatchResult[];
        setMatchHistory(history);
        calculateSeriesWinner(history);
      }
    } catch (error) {
      console.error('Error loading match history:', error);
    }
  };

  // Save match history to AsyncStorage
  const saveMatchHistory = async (history: MatchResult[]) => {
    try {
      const historyJson = JSON.stringify(history);
      await AsyncStorage.setItem('matchHistory', historyJson);
    } catch (error) {
      console.error('Error saving match history:', error);
    }
  };

  // Calculate the series winner based on match history
  const calculateSeriesWinner = (history: MatchResult[]) => {
    if (history.length === 0) return;

    let teamAWins = 0;
    let teamBWins = 0;

    history.forEach(match => {
      if (match.winner === 'Team A') teamAWins++;
      if (match.winner === 'Team B') teamBWins++;
    });

    if (teamAWins > teamBWins) {
      setSeriesWinner('Team A');
    } else if (teamBWins > teamAWins) {
      setSeriesWinner('Team B');
    } else {
      setSeriesWinner('Tied');
    }

    // Check if we've reached 5 matches
    if (history.length >= 5) {
      // Determine final winner
      let finalWinnerTeam;
      if (teamAWins > teamBWins) {
        finalWinnerTeam = 'Team A';
      } else if (teamBWins > teamAWins) {
        finalWinnerTeam = 'Team B';
      } else {
        finalWinnerTeam = 'Tied Series';
      }

      setFinalWinner(finalWinnerTeam);
      setShowFinalResultModal(true);
    }
  };

  // Reset everything after the 5-match series is complete
  const resetEverything = async () => {
    try {
      // Clear history in AsyncStorage
      await AsyncStorage.removeItem('matchHistory');

      // Reset all state
      setMatchHistory([]);
      setTeamAScore(0);
      setTeamBScore(0);
      setTieOccurrence(0);
      setWinner(null);
      setSeriesWinner(null);
      setFinalWinner(null);
      setShowWinnerModal(false);
      setShowHistoryModal(false);
      setShowFinalResultModal(false);
    } catch (error) {
      console.error('Error resetting match data:', error);
    }
  };

  // Save current match result to history
  const saveCurrentMatchResult = () => {
    if (!winner) return;

    const newResult: MatchResult = {
      id: Date.now().toString(),
      teamAScore,
      teamBScore,
      winner,
      date: new Date().toLocaleString(),
    };

    // Add new result and keep only most recent 5 matches
    const updatedHistory = [newResult, ...matchHistory].slice(0, 5);
    setMatchHistory(updatedHistory);
    saveMatchHistory(updatedHistory);
    calculateSeriesWinner(updatedHistory);
  };

  const incrementTeamA = () => {
    // Don't allow increments if there's already a winner
    if (winner) return;

    const newScore = teamAScore + 1;
    setTeamAScore(newScore);

    // Check for winner
    if (newScore >= 11) {
      setWinner('Team A');
      setShowWinnerModal(true);
      return;
    }

    checkForTie(newScore, teamBScore);
  };

  const incrementTeamB = () => {
    // Don't allow increments if there's already a winner
    if (winner) return;

    const newScore = teamBScore + 1;
    setTeamBScore(newScore);

    // Check for winner
    if (newScore >= 11) {
      setWinner('Team B');
      setShowWinnerModal(true);
      return;
    }

    checkForTie(teamAScore, newScore);
  };

  const checkForTie = (scoreA: number, scoreB: number) => {
    if (scoreA === scoreB && scoreA >= 10) {
      // If scores are tied and it's >= 10
      if (tieOccurrence === 0) {
        // First tie
        setTeamAScore(8);
        setTeamBScore(8);
        setTieOccurrence(1);
      } else if (tieOccurrence === 1) {
        // Second tie
        setTeamAScore(9);
        setTeamBScore(9);
        setTieOccurrence(2);
      }
      // For any subsequent ties, no special action
    }
  };

  const resetScores = () => {
    // Save match result before resetting if there's a winner
    if (winner) {
      saveCurrentMatchResult();
    }

    setTeamAScore(0);
    setTeamBScore(0);
    setTieOccurrence(0);
    setWinner(null);
    setShowWinnerModal(false);
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('matchHistory');
      setMatchHistory([]);
      setSeriesWinner(null);
      setShowHistoryModal(false);
    } catch (error) {
      console.error('Error clearing match history:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Score Counter</Text>
        <Text style={styles.subtitle}>Tie Count: {tieOccurrence}</Text>
        {winner && <Text style={styles.winnerText}>Winner: {winner}!</Text>}
        {seriesWinner && (
          <Text style={styles.seriesText}>
            Series leader: {seriesWinner} ({matchHistory.length}/5 games)
          </Text>
        )}
      </View>

      <View style={styles.scoreContainer}>
        <TouchableOpacity
          style={[styles.scoreButton, styles.teamA]}
          onPress={incrementTeamA}
        >
          <Text style={styles.teamName}>Team A</Text>
          <Text style={styles.scoreText}>{teamAScore}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.scoreButton, styles.teamB]}
          onPress={incrementTeamB}
        >
          <Text style={styles.teamName}>Team B</Text>
          <Text style={styles.scoreText}>{teamBScore}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetScores}
        >
          <Text style={styles.resetText}>Reset Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => setShowHistoryModal(true)}
        >
          <Text style={styles.resetText}>Match History</Text>
        </TouchableOpacity>
      </View>

      {/* Winner Modal */}
      <Modal
        transparent={true}
        visible={showWinnerModal}
        animationType="fade"
        onRequestClose={() => setShowWinnerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>We Have a Winner!</Text>
            <Text style={styles.modalMessage}>{winner} has won the game!</Text>
            <Text style={styles.modalScore}>Final Score: {teamAScore} - {teamBScore}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={resetScores}
            >
              <Text style={styles.modalButtonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* History Modal */}
      <Modal
        transparent={true}
        visible={showHistoryModal}
        animationType="slide"
        onRequestClose={() => setShowHistoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.historyModalContent]}>
            <Text style={styles.modalTitle}>Match History</Text>

            {seriesWinner && (
              <Text style={styles.seriesWinnerText}>
                Series leader: {seriesWinner}
              </Text>
            )}

            {matchHistory.length > 0 ? (
              <FlatList
                data={matchHistory}
                keyExtractor={(item) => item.id}
                style={styles.historyList}
                renderItem={({ item }) => (
                  <View style={styles.historyItem}>
                    <Text style={styles.historyWinner}>{item.winner}</Text>
                    <Text style={styles.historyScore}>
                      Team A: {item.teamAScore} - Team B: {item.teamBScore}
                    </Text>
                    <Text style={styles.historyDate}>{item.date}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noHistoryText}>No match history yet</Text>
            )}

            <View style={styles.historyButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowHistoryModal(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>

              {matchHistory.length > 0 && (
                <TouchableOpacity
                  style={[styles.modalButton, styles.clearButton]}
                  onPress={clearHistory}
                >
                  <Text style={styles.modalButtonText}>Clear History</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Final Series Result Modal */}
      <Modal
        transparent={true}
        visible={showFinalResultModal}
        animationType="fade"
        onRequestClose={() => setShowFinalResultModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Series Complete!</Text>

            {finalWinner === 'Tied Series' ? (
              <Text style={styles.finalResultText}>The series ended in a tie!</Text>
            ) : (
              <Text style={styles.finalResultText}>{finalWinner} wins the series!</Text>
            )}

            <Text style={styles.modalMessage}>All 5 matches have been played.</Text>

            <View style={styles.finalScoresContainer}>
              <Text style={styles.finalScoreTitle}>Final Score Summary:</Text>
              <Text style={styles.finalScoreText}>
                Team A: {matchHistory.filter(match => match.winner === 'Team A').length} wins
              </Text>
              <Text style={styles.finalScoreText}>
                Team B: {matchHistory.filter(match => match.winner === 'Team B').length} wins
              </Text>
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={resetEverything}
            >
              <Text style={styles.modalButtonText}>Start New Series</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


export default App;