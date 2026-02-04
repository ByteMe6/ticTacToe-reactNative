import React, { Component } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pole as initialPole, CellValue } from './pole';

type WinnerValue = CellValue | 'draw' | null;

type State = {
  pole: CellValue[][];
  moveCount: number;
  winner: WinnerValue;
};

class Main extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      pole: initialPole,
      moveCount: 0,
      winner: null,
    };
  }

  async componentDidMount() {
    try {
      const [savedPole, savedMoveCount, savedWinner] = await Promise.all([
        AsyncStorage.getItem('gameState'),
        AsyncStorage.getItem('moveCount'),
        AsyncStorage.getItem('winner'),
      ]);

      let poleFromStorage: CellValue[][] = initialPole;

      if (savedPole) {
        try {
          const parsed = JSON.parse(savedPole);
          if (
            Array.isArray(parsed) &&
            parsed.length === 3 &&
            parsed.every(
              (row: unknown) => Array.isArray(row) && (row as unknown[]).length === 3,
            )
          ) {
            poleFromStorage = parsed as CellValue[][];
          }
        } catch {
        }
      }

      this.setState({
        pole: poleFromStorage,
        moveCount: savedMoveCount ? parseInt(savedMoveCount, 10) || 0 : 0,
        winner:
          savedWinner && savedWinner !== ''
            ? (savedWinner as WinnerValue)
            : null,
      });
    } catch {
      this.setState({
        pole: initialPole,
        moveCount: 0,
        winner: null,
      });
    }
  }

  checkWinner = (pole: CellValue[][]): WinnerValue => {
    for (let i = 0; i < 3; i++) {
      if (
        pole[i][0] !== '' &&
        pole[i][0] === pole[i][1] &&
        pole[i][0] === pole[i][2]
      ) {
        return pole[i][0];
      }
      if (
        pole[0][i] !== '' &&
        pole[0][i] === pole[1][i] &&
        pole[0][i] === pole[2][i]
      ) {
        return pole[0][i];
      }
    }

    if (
      pole[0][0] !== '' &&
      pole[0][0] === pole[1][1] &&
      pole[0][0] === pole[2][2]
    ) {
      return pole[0][0];
    }
    if (
      pole[0][2] !== '' &&
      pole[0][2] === pole[1][1] &&
      pole[0][2] === pole[2][0]
    ) {
      return pole[0][2];
    }

    const isDraw = pole.every(row => row.every(cell => cell !== ''));
    if (isDraw) return 'draw';

    return null;
  };

  handleClick = async (i: number, j: number) => {
    const { winner, pole, moveCount } = this.state;

    if (winner || pole[i][j] !== '') {
      return;
    }

    const newPole: CellValue[][] = pole.map(row => [...row]);
    const newMoveCount = moveCount + 1;
    newPole[i][j] = newMoveCount % 2 === 0 ? 'O' : 'X';

    const newWinner = this.checkWinner(newPole);

    this.setState({
      pole: newPole,
      moveCount: newMoveCount,
      winner: newWinner,
    });

    try {
      await AsyncStorage.multiSet([
        ['gameState', JSON.stringify(newPole)],
        ['moveCount', newMoveCount.toString()],
        ['winner', newWinner ?? ''],
      ]);
    } catch {
    }
  };

  clearGame = async () => {
    const emptyPole: CellValue[][] = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    this.setState({
      pole: emptyPole,
      moveCount: 0,
      winner: null,
    });

    try {
      await AsyncStorage.multiSet([
        ['gameState', JSON.stringify(emptyPole)],
        ['moveCount', '0'],
        ['winner', ''],
      ]);
    } catch {
    }
  };

  renderSymbol = (value: CellValue) => {
    switch (value) {
      case 'X':
        return <Text style={styles.cross}>X</Text>;
      case 'O':
        return <Text style={styles.circle}>O</Text>;
      default:
        return null;
    }
  };

  renderWinnerMessage = () => {
    const { winner } = this.state;
    if (!winner) return null;

    if (winner === 'draw') {
      return 'Ничья!';
    }
    return `Победитель: ${winner}!`;
  };

  render() {
    const { pole, winner } = this.state;

    return (
      <View style={styles.container}>
        {winner && (
          <View>
            <Text style={styles.winner}>{this.renderWinnerMessage()}</Text>
          </View>
        )}

        {pole.map((row, i) => (
          <View style={styles.row} key={i}>
            {row.map((cell, j) => (
              <Pressable
                style={styles.Yacheyka}
                key={j}
                onPress={() => this.handleClick(i, j)}
              >
                {this.renderSymbol(cell)}
              </Pressable>
            ))}
          </View>
        ))}

        <Pressable style={styles.clearButton} onPress={this.clearGame}>
          <Text style={styles.clearButtonText}>Очистить поле</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  Yacheyka: {
    backgroundColor: 'rgb(228, 228, 228)',
    width: 100,
    height: 100,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    color: 'black',
    fontSize: 40,
  },
  cross: {
    color: 'black',
    fontSize: 50,
  },
  winner: {
    fontSize: 20,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: 'rgb(208, 157, 255)',
    borderRadius: 10,
    padding: 10,
    margin: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
  },
});

export default Main;
