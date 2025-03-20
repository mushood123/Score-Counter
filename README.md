# Score Counter

A React Native mobile application for tracking scores between two teams with automatic tie-handling, match history, and series tracking. Perfect for keeping score in any two-team competition.

![Score Counter App](https://via.placeholder.com/300x600)

## Features

- 🏆 Real-time score tracking for two teams
- 🔄 Automatic handling of tie situations
- 📊 Stores match history using AsyncStorage
- 📱 Series tracking for best-of-5 matches
- 🎮 Winner notification and game reset
- 📜 Match history overview
- 🔄 Complete series reset after 5 matches

## Description

Score Counter is a digital score tracking solution that maintains a history of games for a 5-match series. The app automatically determines winners, handles tie situations with special scoring rules, and announces the overall series winner after all matches are complete.

## Tech Stack

- React Native
- TypeScript
- Expo
- AsyncStorage for persistent data

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mushood123/Score-Counter.git
cd Score-Counter
```

2. Install dependencies:
```bash
npm i
```

3. Start the Expo development server:
```bash
npx expo start
```

## Running on Devices

### For Expo Go (easiest method):
- Scan the QR code with the Expo Go app

### For Android:
```bash
npx expo run:android
```

### For iOS:
```bash
npx expo run:ios
```

## How to Use

1. Tap on "Team A" or "Team B" sections to increment scores
2. First team to reach 11 points wins the match
3. In case of a tie at 10-10, special tie-breaking rules apply
4. View match history by tapping "Match History"
5. After 5 matches, the series winner is announced
6. Start a new series after completing all 5 matches

## Game Rules

- Standard scoring: First to 11 points wins
- Tie handling: If both teams reach 10-10, scores reset to 8-8
- If another tie occurs at 9-9, normal scoring continues
- Best-of-5 series tracking
- Series winner announced after 5 matches

## Project Structure

- `App.tsx`: Main application logic
- `styles.ts`: Styling for the application

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/mushood123/Score-Counter/issues).


## Contact

- GitHub: [@mushood123](https://github.com/mushood123)
- Gmail: [khawaja.muhammad.mushood@gmail.com)
