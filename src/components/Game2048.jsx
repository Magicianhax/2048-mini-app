import { useState, useEffect, useCallback } from 'react'
import './Game2048.css'

const GRID_SIZE = 4
const WINNING_TILE = 2048

const initializeBoard = () => {
  const board = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
  addRandomTile(board)
  addRandomTile(board)
  return board
}

const addRandomTile = (board) => {
  const emptyCells = []
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (board[i][j] === 0) {
        emptyCells.push([i, j])
      }
    }
  }
  
  if (emptyCells.length > 0) {
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    board[row][col] = Math.random() < 0.9 ? 2 : 4
  }
}

const moveLeft = (board) => {
  const newBoard = board.map(row => {
    const filtered = row.filter(val => val !== 0)
    const merged = []
    
    for (let i = 0; i < filtered.length; i++) {
      if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
        merged.push(filtered[i] * 2)
        i++
      } else {
        merged.push(filtered[i])
      }
    }
    
    while (merged.length < GRID_SIZE) {
      merged.push(0)
    }
    
    return merged
  })
  
  return newBoard
}

const moveRight = (board) => {
  return board.map(row => {
    const filtered = row.filter(val => val !== 0).reverse()
    const merged = []
    
    for (let i = 0; i < filtered.length; i++) {
      if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
        merged.push(filtered[i] * 2)
        i++
      } else {
        merged.push(filtered[i])
      }
    }
    
    while (merged.length < GRID_SIZE) {
      merged.push(0)
    }
    
    return merged.reverse()
  })
}

const moveUp = (board) => {
  const transposed = board[0].map((_, colIndex) => 
    board.map(row => row[colIndex])
  )
  const moved = moveLeft(transposed)
  return moved[0].map((_, colIndex) => 
    moved.map(row => row[colIndex])
  )
}

const moveDown = (board) => {
  const transposed = board[0].map((_, colIndex) => 
    board.map(row => row[colIndex])
  )
  const moved = moveRight(transposed)
  return moved[0].map((_, colIndex) => 
    moved.map(row => row[colIndex])
  )
}

const boardsEqual = (board1, board2) => {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (board1[i][j] !== board2[i][j]) {
        return false
      }
    }
  }
  return true
}

const isGameOver = (board) => {
  // Check for empty cells
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (board[i][j] === 0) {
        return false
      }
    }
  }
  
  // Check for possible merges
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const current = board[i][j]
      if (
        (i < GRID_SIZE - 1 && board[i + 1][j] === current) ||
        (j < GRID_SIZE - 1 && board[i][j + 1] === current)
      ) {
        return false
      }
    }
  }
  
  return true
}

const hasWon = (board) => {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (board[i][j] === WINNING_TILE) {
        return true
      }
    }
  }
  return false
}

function Game2048() {
  const [board, setBoard] = useState(initializeBoard)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('2048-best-score') || '0')
  })
  const [gameWon, setGameWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const handleMove = useCallback((moveFunction) => {
    if (gameOver) return
    
    setBoard(currentBoard => {
      const newBoard = moveFunction(currentBoard)
      
      if (!boardsEqual(currentBoard, newBoard)) {
        addRandomTile(newBoard)
        
        // Calculate score
        let newScore = 0
        for (let i = 0; i < GRID_SIZE; i++) {
          for (let j = 0; j < GRID_SIZE; j++) {
            newScore += newBoard[i][j]
          }
        }
        setScore(newScore)
        
        // Update best score
        if (newScore > bestScore) {
          setBestScore(newScore)
          localStorage.setItem('2048-best-score', newScore.toString())
        }
        
        // Check for win
        if (!gameWon && hasWon(newBoard)) {
          setGameWon(true)
        }
        
        // Check for game over
        if (isGameOver(newBoard)) {
          setGameOver(true)
        }
        
        return newBoard
      }
      
      return currentBoard
    })
  }, [gameOver, gameWon, bestScore])

  const handleKeyPress = useCallback((e) => {
    if (gameOver && e.key !== 'r' && e.key !== 'R') return
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        handleMove(moveLeft)
        break
      case 'ArrowRight':
        e.preventDefault()
        handleMove(moveRight)
        break
      case 'ArrowUp':
        e.preventDefault()
        handleMove(moveUp)
        break
      case 'ArrowDown':
        e.preventDefault()
        handleMove(moveDown)
        break
      case 'r':
      case 'R':
        if (gameOver || gameWon) {
          resetGame()
        }
        break
      default:
        break
    }
  }, [handleMove, gameOver, gameWon])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  const resetGame = () => {
    setBoard(initializeBoard)
    setScore(0)
    setGameWon(false)
    setGameOver(false)
  }

  const handleSwipe = (direction) => {
    switch (direction) {
      case 'left':
        handleMove(moveLeft)
        break
      case 'right':
        handleMove(moveRight)
        break
      case 'up':
        handleMove(moveUp)
        break
      case 'down':
        handleMove(moveDown)
        break
      default:
        break
    }
  }

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      handleSwipe('left')
    }
    if (isRightSwipe) {
      handleSwipe('right')
    }
  }

  const onTouchStartVertical = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMoveVertical = (e) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const onTouchEndVertical = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isUpSwipe = distance > minSwipeDistance
    const isDownSwipe = distance < -minSwipeDistance
    
    if (isUpSwipe) {
      handleSwipe('up')
    }
    if (isDownSwipe) {
      handleSwipe('down')
    }
  }

  const getTileColor = (value) => {
    const colors = {
      0: '#cdc1b4',
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    }
    return colors[value] || '#3c3a32'
  }

  const getTileTextColor = (value) => {
    return value <= 4 ? '#776e65' : '#f9f6f2'
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="title">
          <h1>2048</h1>
          <p>Join the tiles, get to 2048!</p>
        </div>
        <div className="scores">
          <div className="score-box">
            <div className="score-label">Score</div>
            <div className="score-value">{score}</div>
          </div>
          <div className="score-box">
            <div className="score-label">Best</div>
            <div className="score-value">{bestScore}</div>
          </div>
        </div>
      </div>

      {(gameWon || gameOver) && (
        <div className="game-message">
          {gameWon && !gameOver && (
            <div className="message-won">
              <h2>You Win!</h2>
              <p>Press R to continue playing</p>
            </div>
          )}
          {gameOver && (
            <div className="message-over">
              <h2>Game Over!</h2>
              <button onClick={resetGame} className="new-game-button">
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      <div 
        className="game-board"
        onTouchStart={onTouchStartVertical}
        onTouchMove={onTouchMoveVertical}
        onTouchEnd={onTouchEndVertical}
      >
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="game-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="game-cell"
                style={{
                  backgroundColor: getTileColor(cell),
                  color: getTileTextColor(cell),
                }}
              >
                {cell !== 0 && (
                  <span className="tile-value">{cell}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="game-controls">
        <div className="control-buttons">
          <button 
            className="control-btn" 
            onClick={() => handleMove(moveUp)}
            aria-label="Move Up"
          >
            ↑
          </button>
          <div className="horizontal-controls">
            <button 
              className="control-btn" 
              onClick={() => handleMove(moveLeft)}
              aria-label="Move Left"
            >
              ←
            </button>
            <button 
              className="control-btn" 
              onClick={() => handleMove(moveDown)}
              aria-label="Move Down"
            >
              ↓
            </button>
            <button 
              className="control-btn" 
              onClick={() => handleMove(moveRight)}
              aria-label="Move Right"
            >
              →
            </button>
          </div>
        </div>
        <button onClick={resetGame} className="new-game-button">
          New Game
        </button>
      </div>

      <div className="game-instructions">
        <p>Use arrow keys or swipe to move tiles</p>
        <p>When two tiles with the same number touch, they merge into one!</p>
      </div>
    </div>
  )
}

export default Game2048

