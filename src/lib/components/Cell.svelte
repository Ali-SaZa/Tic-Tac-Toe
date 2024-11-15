<script>
  export let value;
  export let onClick;
  export let isDisabled;
  export let playerColor;
</script>

<div
  class="cell {value ? 'disabled active' : ''}"
  on:click={() => !isDisabled && onClick()}
  style="--player-color: {playerColor}; --border-color: {value ? playerColor : '#e0e0e0'}">
  {value || ''}
</div>

<style>
    .cell {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        border: 2px solid var(--border-color, #e0e0e0);
        cursor: pointer;
        transition: background-color 0.3s ease, border-color 0.3s ease;
        border-radius: 8px;
    }

    .cell.disabled {
        cursor: not-allowed;
        background-color: #e0e0e0;
    }

    .cell.active {
        background-color: var(--player-color);
        color: white;
    }
</style>
