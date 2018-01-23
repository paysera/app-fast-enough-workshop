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
  * go to address `http://172.18.0.2:8888` - you should see some logs

* `frontend` 
  * `cd` to directory
  * run `docker-compose up` container will make `npm install` and launch node's `light-server`. 
  * go to address `http://0.0.0.0:9999` - you should see some text

Try both of these address - you should see some logs in containers

In case you need to enter these containers, please use:
* `docker exec -it -u app backend_web_1 bash`
* `docker exec -it -u node frontend_node_1 bash`

Do not forget to check container names.

