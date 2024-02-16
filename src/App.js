import { useState } from 'react';

function Square({ value, onSquareClick, highlight }) {
  return (
    <button className={`square ${highlight ? 'highlight' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay}) {
  function handleClick(i) {
    const winnerSquare = calculateWinner(squares);
    if(winnerSquare!==null) {
      console.log(winnerSquare);
      if (winnerSquare[0] || squares[i]) {
        return;
      }
      return     
    }    
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status, winPattern;
  if (winner) {
    status = 'Winner: ' + winner[0];
    winPattern = winner[1];
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const isHighlight = (i) => {
    if (winPattern) {
      console.log(winPattern.includes(i));
      return winPattern.includes(i);
    }
    return false;
  }


  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {[0, 1, 2].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            highlight={isHighlight(i)}
          />
        ))}
      </div>
      <div className="board-row">
      {[3, 4, 5].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            highlight={isHighlight(i)}
          />
        ))}
      </div>
      <div className="board-row">
      {[6, 7, 8].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            highlight={isHighlight(i)}
          />
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [descending, setDescending] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }



  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function toggleMoves() {
    setDescending(!descending);  
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <h1>History</h1>
        <button onClick={() => toggleMoves()} >Toggle Button</button>
        <ol>{ descending ? moves.reverse() : moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
  
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
    if (squares.every(Boolean)) {

      return ["Draw"];
    }

  }
  return null;
}


