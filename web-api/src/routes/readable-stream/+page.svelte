
<script lang="ts">
  import http from '../../lib/http/client';
  import { tick } from 'svelte';
  const { json, cancel } = http('http://universities.hipolabs.com/');

  let progressValue = '0';

  const setProgressBarValue = async (payload: any) => {
    const { received, length, loading } = payload;
    const value = ((received / length) * 100).toFixed(2);
    progressValue = value;
    await tick();
  };

  window.addEventListener('fetch-progress', async (e: any) => {
    await setProgressBarValue(e.detail);
  });

  window.addEventListener('fetch-finished', async (e: any) => {
    console.log('fetch-finished', e.detail);
    await setProgressBarValue(e.detail);
  });

  $: props = {progressValue}
</script>

<div class="container">
  <label for="progress-bar" id="progress-label"> Download progress: {props.progressValue}% </label>
  <progress id="progress-bar" value={props.progressValue} min="0" max="100"></progress>
  <button id="fetch-button" on:click={async() => await json('search?country=United+States')}>Fetch</button>
  <button id="abort-button" on:click={cancel}>Cancel request</button>
</div>

<style>
  progress {
    width: 100%;
    height: 2rem;
    border-radius: 0;
    margin: 1rem 0;
  }
  
  progress[value]::-webkit-progress-value {
    background-color: steelblue;
  }
  
  button {
    width: 100%;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    margin: 0.25rem 0;
  }
  
  #fetch-button {
    background-color: cornflowerblue;
  }
  
  #abort-button {
    background-color: coral;
  }
  
  .container {
    max-width: 35rem;
    margin: auto;
  }
</style>
