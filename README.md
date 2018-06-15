# Zendesk service

## How to prove it

### Node.js

Download Node.js from [here](https://nodejs.org/es/download/package-manager/)

Install yarn
```
npm install yarn
```

### MongoDB

Install MongoDB
* [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)
* [macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
* [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

**Important:** After installation, make sure you have the MongoDB service running.

## Project approach

```
$ git clone https://github.com/carlosaospinac/tech-test.git
$ cd tech-test
```

## 1. server

```
$ cd server/
```

Environment requirements (Python 3.6+):
```
$ python3 -m venv env  # Creates a virtual environment
$ source env/bin/activate  # Activates it
$ pip install --upgrade pip
$ pip install -r requirements.txt
$ cd ..  # Returns to project root
```
Note: You can run `deactivate` to deactivate the virtual environment

## 2. gui

```
$ cd gui/
$ yarn install
$ cd ..
```
Note: You can also use `npm` instead of `yarn`

## 3. running project
In the project root directory (`tech-test/`)...

Open two terminal instances (in `tech-test/` path)

### 3.1. Backend terminal
```
$ source server/env/bin/activate
```
```
$ echo "domain = '<YOUR_DOMAIN>'
> email = '<YOUR_EMAIL>'
> api_token = '<YOUR_API_TOKEN>'" > server/scripts/creds.py
```
Replacing `<YOUR_DOMAIN>`, `<YOUR_EMAIL>` and `<YOUR_API_TOKEN>` by the corresponding data, e.g.,
```
$ echo "domain = 'https://yoursubdomain.zendesk.com'
> email = 'youremail@examp.le'
> api_token = '7XRZtGoeet1Yuqc5x4Yh....'" > server/scripts/creds.py
```
Sensitive to the use of quotation marks.

#### Run backend
```
$ python server/app.py
```
You will see something like...
```
[2018-06-15 13:39:14 -0500] [10249] [DEBUG] 
                 ▄▄▄▄▄
        ▀▀▀██████▄▄▄       _______________
      ▄▄▄▄▄  █████████▄  /                 \
     ▀▀▀▀█████▌ ▀▐▄ ▀▐█ |   Gotta go fast!  |
   ▀▀█████▄▄ ▀██████▄██ | _________________/
   ▀▄▄▄▄▄  ▀▀█▄▀█════█▀ |/
        ▀▀▀▄  ▀▀███ ▀       ▄▄
     ▄███▀▀██▄████████▄ ▄▀▀▀▀▀▀█▌
   ██▀▄▄▄██▀▄███▀ ▀▀████      ▄██
▄▀▀▀▄██▄▀▀▌████▒▒▒▒▒▒███     ▌▄▄▀
▌    ▐▀████▐███▒▒▒▒▒▐██▌
▀▄▄▄▄▀   ▀▀████▒▒▒▒▄██▀
          ▀▀█████████▀
        ▄▄██▀██████▀█
      ▄██▀     ▀▀▀  █
     ▄█             ▐▌
 ▄▄▄▄█▌              ▀█▄▄▄▄▀▀▄
▌     ▐                ▀▀▄▄▄▀
 ▀▀▄▄▀

[2018-06-15 13:39:14 -0500] [10249] [INFO] Goin' Fast @ http://0.0.0.0:8000
[2018-06-15 13:39:14 -0500] [10249] [INFO] Starting worker [10249]
```

### 3.1. Backend terminal (in the second terminal instance)
```
$ cd gui/
$ yarn start
```
You will see something like...
```
Compiled successfully!

You can now view gui in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.1.11:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

### *Now you can explore!*
