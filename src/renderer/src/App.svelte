<script lang="ts">
  import electronLogo from './assets/electron.svg'

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  // Create WebSocket connection.
  let socket = new WebSocket('ws://localhost:5175')

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

<img alt="logo" class="logo" src={electronLogo} />
<div class="creator">Powered by electron-vite</div>
<div class="text">
  Build an Electron app with
  <span class="svelte">Svelte</span>
  and
  <span class="ts">TypeScript</span>
</div>
<p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
<div class="actions">
  <div class="action">
    <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
  </div>
  <div class="action">
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-missing-attribute-->
    <a target="_blank" rel="noreferrer" on:click={ipcHandle}>Send IPC</a>
    <button on:click={emitEvent}>Emit Event</button>
  </div>
</div>
