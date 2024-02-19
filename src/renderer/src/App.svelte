<script lang="ts">
  import Router from 'svelte-spa-router'
  import Home from './routes/Home.svelte'
  import Author from './routes/Author.svelte'

  const routes = {
    // Exact path
    '/': Home,

    // Using named parameters, with last being optional
    '/author': Author
  }
</script>

<Router {routes} />
