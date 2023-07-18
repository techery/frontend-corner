
<script lang="ts">
  import { demonstrateSimple, demonstrateIdle, insertPageTitle } from '../../lib/idle-callback';
  let messages = [];
  const handleSimple = () => {
    messages = [];
    messages = demonstrateSimple(messages);
  }
  const handleIdle = () => {
    messages = [];
    messages = demonstrateIdle(messages);
  }

  $: props = {messages}
</script>

<button on:click={handleSimple}>Demonstrate simple</button>
<button on:click={handleIdle}>Demonstrate idle</button>
<button on:click={insertPageTitle}>Insert page title</button>


{#each props.messages as message}
  <p>{message}</p>
{/each}



