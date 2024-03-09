<script lang="ts">
  import electronLogo from '../assets/electron.svg'
  import { link } from 'svelte-spa-router'

  const ipcPingHandle = (): void => window.electron.ipcRenderer.send('ping')
  const ipcDialogHandle = (): void => window.api.openDialog()

  // Create WebSocket connection.
  let socket = new WebSocket('ws://localhost:4915')

  // Connection opened
  socket.addEventListener('open', () => {
    socket.send('Hello Server!')
  })

  // Listen for messages
  socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data)
  })

  const emitEvent = (): void => socket.send('Hello World, i am totally fine!')
</script>

<main class="w-full h-svh flex justify-center items-center flex-col gap-8">
  <img alt="logo" class="w-40" src={electronLogo} />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="svelte">Svelte</span>
    and
    <span class="ts">TypeScript</span>
  </div>

  <a href="/author" use:link class="link link-primary">Go to author Page</a>

  <p class="kbd">Please try pressing F12 to open the devTool</p>

  <div class="actions">
    <a href="https://electron-vite.org/" target="_blank" rel="noreferrer" class="btn">
      Documentation
    </a>

    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-missing-attribute-->
    <a target="_blank" rel="noreferrer" on:click={ipcPingHandle} class="btn">Send Ping IPC</a>

    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-missing-attribute-->
    <a target="_blank" rel="noreferrer" on:click={ipcDialogHandle} class="btn">Send Dialog IPC</a>

    <button on:click={emitEvent} class="btn">Emit Event</button>
  </div>
</main>
