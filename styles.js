import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        marginTop: 5,
        fontSize: 16,
        color: '#666',
    },
    winnerText: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    seriesText: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8e44ad',
    },
    scoreContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
    },
    scoreButton: {
        flex: 1,
        margin: 10,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    teamA: {
        backgroundColor: '#4a90e2',
    },
    teamB: {
        backgroundColor: '#e74c3c',
    },
    teamName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    resetButton: {
        flex: 1,
        marginRight: 10,
        padding: 15,
        backgroundColor: '#333',
        borderRadius: 8,
        alignItems: 'center',
    },
    historyButton: {
        flex: 1,
        marginLeft: 10,
        padding: 15,
        backgroundColor: '#8e44ad',
        borderRadius: 8,
        alignItems: 'center',
    },
    resetText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    historyModalContent: {
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    modalMessage: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalScore: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        margin: 5,
    },
    clearButton: {
        backgroundColor: '#e74c3c',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // History list styles
    historyList: {
        width: '100%',
        marginBottom: 15,
    },
    historyItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#8e44ad',
    },
    historyWinner: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    historyScore: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    historyDate: {
        fontSize: 14,
        color: '#999',
    },
    noHistoryText: {
        fontSize: 16,
        color: '#666',
        margin: 20,
    },
    historyButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    seriesWinnerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8e44ad',
        marginBottom: 15,
        textAlign: 'center',
    },
    // Final results styles
    finalResultText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#8e44ad',
        marginBottom: 15,
        textAlign: 'center',
    },
    finalScoresContainer: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    finalScoreTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    finalScoreText: {
        fontSize: 16,
        color: '#666',
        margin: 3,
    },
});
