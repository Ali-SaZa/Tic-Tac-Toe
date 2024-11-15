<script>
  import { onMount } from 'svelte';
  import Cell from '~/lib/components/Cell.svelte';

  let board = Array(3).fill(null).map(() => Array(3).fill({ value: null, color: null }));
  let players = { X: 'Player X', O: 'Player O' };
  let currentPlayer = 'X';
  let winner = null;
  let rounds = [];
  let playerColors = { X: '#b60202', O: '#028302' };

  function initializePlayers() {
    players.X = prompt('Enter name for Player X:', 'Player 1') || 'Player X';
    players.O = prompt('Enter name for Player O:', 'Player 2') || 'Player O';
  }

  onMount(() => {
    initializePlayers();
  });

  function handleCellClick(row, col) {
    if (!board[row][col].value && !winner) {
      board[row][col] = { value: currentPlayer, color: playerColors[currentPlayer] };
      if (isWinner()) {
        winner = currentPlayer;
        rounds = [...rounds, `${players[winner]} wins!`];
        setTimeout(resetBoard, 2000);
      } else if (board.flat().every(cell => cell.value)) {
        rounds = [...rounds, 'The round is tied'];
        setTimeout(resetBoard, 1000);
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  function isWinner() {
    const winLines = [
      ...board.map(row => row.map(cell => cell.value)),
      ...board[0].map((_, col) => board.map(row => row[col].value)),
      [board[0][0].value, board[1][1].value, board[2][2].value],
      [board[0][2].value, board[1][1].value, board[2][0].value],
    ];
    return winLines.some(line => line.every(value => value === currentPlayer));
  }

  function resetBoard() {
    board = Array(3).fill(null).map(() => Array(3).fill({ value: null, color: null }));
    winner = null;
    currentPlayer = 'X';
  }

  function resetAll() {
    resetBoard();
    rounds = [];
    initializePlayers();
  }
</script>

<div class="container">
  <div class="content">
    <h1 class="board-title">Tic Tac Toe</h1>
    <div>Turn: {players[currentPlayer]}</div>
    <div class="board">
      {#each board as row, rowIndex}
        {#each row as cell, colIndex}
          <Cell
            value={cell.value}
            playerColor={cell.color}
            isDisabled={!!cell.value || !!winner}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        {/each}
      {/each}
    </div>
    <div class="info">
      {#if winner}
        🎉 Winner: {players[winner]}
      {/if}
    </div>
  </div>

  <div class="sidebar">
    <div class="sidebar-header">
      <p>Game History:</p>
      <button class="reset-button" on:click={resetAll}>Reset All</button>
    </div>
    {#each rounds as round, index}
      <div class="round">{index + 1}. {round}</div>
    {/each}
  </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        min-height: 100vh;
        position: relative;
    }

    .board-title {
        margin-top: 20px;
        text-align: center;
    }

    .board {
        display: grid;
        grid-template-columns: repeat(3, 100px);
        gap: 10px;
        margin: 20px 0;
    }

    .sidebar {
        width: 300px;
        position: absolute;
        left: 20px;
        top: 30px;
    }

    .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .round {
        margin-bottom: 10px;
        padding: 10px;
        background-color: #f4f4f4;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .reset-button {
        display: block;
        padding: 10px 20px;
        font-size: 1rem;
        color: white;
        background-color: #007bff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }

    .reset-button:hover {
        background-color: #0056b3;
    }

    .info {
        margin-top: 20px;
        font-size: 1.2rem;
        text-align: center;
    }
</style>
