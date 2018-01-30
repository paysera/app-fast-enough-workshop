app-fast-enough-workshop
========================

Here you will learn how to create Real-Time PHP application with PWA and Electron.

### Prerequisites

* setup
  * decent OS - `linux`, `macos`, maybe `windows` will do
  * `docker` and `docker-compose` installed - https://store.docker.com/search?type=edition&offering=community
  * decent web browser - `chrome`, `firefox`, will experience problems with `safari` or `internet-explorer` 
  * `postman` - https://www.getpostman.com/
* other
  * github account - https://github.com/
  * pusher account - https://pusher.com/
 
### Prepare the containers

* `backend`:
  * `cd` to directory
  * rename `database.dist.sqlite` to `database.sqlite` inside `app/Resources`
  * run `docker-compose up` container will make `composer install` and launch built-in `symfony server`
  * go to address `http://localhost:8888` - you should see some logs

* `frontend` 
  * `cd` to directory
  * run `docker-compose up` container will make `npm install` and launch webpack dev server `npm run app:start`. 
  * go to address `http://localhost:9999` - you should see some text
  * allow public access: `npm run app:public`
  * build app: `npm run app:build`

Try both of these address - you should see some logs in containers

In case you need to enter these containers, please use:
* `docker exec -it -u app backend_web_1 bash`
* `docker exec -it -u node frontend_node_1 bash`

Do not forget to check container names.

### Electron

If you not familiar with it, please read https://services.github.com/on-demand/paths/electron/starting-with-electron/outline.html

We prepared `frontend_node_1` container so it can build electron app for Linux (Ubuntu) platform ,
just run `npm run forge:package` inside of `frontend_node_1` container. 
After it's done, look for binaries inside `frontend/out` folder.

If You want to preview Electron app, only `host build` option from below can provide `npm run forge:start` command.
Simply because `docker` does not have `GTK` or `Display` 

In case your OS is other than Ubuntu, these are the options we provide:

* special container:
  * go to `frontend/multiplatform-build` and run `docker compose up`
  * in another terminal run `docker exec -it -u app multiplatformbuild_node_1 bash`
  * now you can build package for `Windows`, `Linux`, `Mac` systems:
    * `npm run builder:win`
    * `npm run builder:linux`
    * `npm run builder:mac`

* host build:
  * in your Windows/Mac, you should install `node` and run `npm install` inside of `frontend` folder
  * now run `npm run forge:package` and look for binary inside `frontend/app` folder.

### Mobile-ready

We will use `manifest.json` and `ngrok` to allow native look from smart phone

* download and extract `ngrok` - https://ngrok.com/download
* run `ngrok http 9999` - you will get world visible url to your `frontend` container 
* do not forget to run `ngrok http 8888` - you will get world visible url to your `backend` container
* change `BACKEND_HOST` inside `frontend/src/main/config.js` to `ngrok` url pointing to `backend` container
* create `manifest.json` and follow instruction in https://developers.google.com/web/fundamentals/web-app-manifest/
* go with your mobile browser to `frontend` world visible url, from settings you should be able to choose `add to home screen`
* launch the app from home screen. 
