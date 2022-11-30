<script lang="ts">
  let query = "";
  let inputElement: HTMLInputElement;
  let artworkUrls: string[] = [];

  async function onSubmit() {
    inputElement.blur();
    const response = await fetch("/artworks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    query = data.query;
    artworkUrls = data.artworkUrls;
  }

</script>

<main>
  <div class="artworks">
    {#each artworkUrls as artworkUrl}
      <img src={artworkUrl} alt="">
    {/each}
  </div>
  <form on:submit|preventDefault={onSubmit} >
    <input type="text" bind:value={query} bind:this={inputElement} placeholder="Search for album artwork...">
  </form>
</main>

<style>
  :global(body) {
    margin: 0;
    position: relative;
  }

  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {
    width: 100%;
    margin-top: 30vh;
  }

  form input {
    width: 100%;
    padding: 1rem;
    font-size: 1.6rem;
    border: 2px solid #ccc;
    border-radius: 4px;
  }

  form input:focus {
    outline: none;
    border-color: #333;
  }

  .artworks {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .artworks img {
    width: 100%;
    height: auto;
    display: block;
  }
</style>