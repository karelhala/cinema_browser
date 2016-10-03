## Developer Setup
This guide will address what do you need to run this project locally.

### Prerequisites
First of all this is pure JS project so you need Node.js and it's written in Typescript.
 * Node.js, please use either LTS version or newer version (mor than `5.x.x`)
 * Typescript in version `1.8.9`

##### Node.js installation
  * Go to https://nodejs.org/en/ and install desired version (the newer the better)
  * For Fedora users: 
  ```
  $ sudo dnf install npm -y
  ```
Check version of node installed `node -v` and if it's lower than 5.x.x you need to update it.
  * For Fedora users update to stable version ([n updater](https://gist.github.com/karelhala/a6c839ffd5ac6dcc3d2a25b7f2b9728e))

##### Typings installation
 * Since this project is using typescript we also need to install typings to global scope 
 ```
 $ npm install -g typings
 ```

##### Webpack installation
 * This project is using webpack for bundling final product together so you have to install it globally as well
  ```
  $ npm install -g webpack
  ```
  
### Run project
Clone this repository and navigate to it.

When running this project for first time or after long time of inactivity run installation so you get the dependencies.
```
$ npm install
```

To run this project in development mode run
```bash
$ npm start
```
Server will serve contents of whole project's directory and will run on port `4000`.
```
http://localhost:4000
```

##### Development mode
In dev mode your browser will open new tab with this project running in it, after changing some file webpack browser sync 
will pick up and it will auto refresh each time you do some changes.

##### Pushing to master
If you need to push some changes (either directly to master or via pull request) please add these files as well:
```
./dist/js/cinema_browser.js
./dist/css/cinema_browser.css
```
