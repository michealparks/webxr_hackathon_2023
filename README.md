# webxr_hackathon_2023

## Developing

Once you've installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Links and resources
* RATK
  * https://github.com/meta-quest/reality-accelerator-toolkit
* Networking CORS
  * https://github.com/muaz-khan/RTCMultiConnection
  * https://github.com/muaz-khan/RTCMultiConnection-Server
  * https://gist.github.com/balupton/3696140
  * Edited in response.writeHead
  * https://stackoverflow.com/questions/44405448/how-to-allow-cors-with-node-js-without-using-express
  * Edited in server.js ioServer(httpApp, )
  * https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked
  * https://socket.io/docs/v3/handling-cors/
* Felix portal
  * https://github.com/felixtrz/blazoid
* STUN TURN ICE
  * https://stackoverflow.com/questions/62658148/how-to-connect-to-stun-and-turn-servers-using-simple-peer
* 