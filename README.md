# digitalkram.se

## Setup
Create two enviroments files in root folder named:
`.env.develop`
`.env.production`

* ask for env keys

### Install
`install -g gatsby-cli`

`npm install`

## run development
`gatsby develop`
* Go to local http://localhost:8000/

### Firebase console (needs invitation)(But not needed to run project)
https://console.firebase.google.com/project/digitalakramar/

## Build:
To build release package: `Gatsby build`

To test build on http://localhost:8000/: `Gatsby serve`

### Release Build 
Install firebase command line tools: `npm install -g firebase-tools`

Relase build to firebase hosting: `firebase deploy -m "version messege`

