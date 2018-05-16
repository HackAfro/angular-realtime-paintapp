# Angular-Realtime-Paintapp
Realtime paint collaboration using Pusher and Angular

## Prerequisites
- [Angular](https://angular.io)
- [Express](https://expressjs.com/)
- [Pusher](https://pusher.com)
- A [Pusher account](https://pusher.com/signup) and [Pusher app credentials](http://dashboard.pusher.com/)


## Getting started
- Clone the project and install dependencies:
- Create a file named `.env`. Update the `.env` file with the content below:

```
PUSHER_APP_ID=app-id
PUSHER_APP_KEY=app-key
PUSHER_APP_SECRET=app-secret
```

- Update the `pusher.service.ts` file with your pusher key

> **Note**: ensure to replace the placeholder values with your pusher `appId`, `key` and `secret`.

- Clone the repo
- Enter the project folder
- Run npm install 
- Start server by running `node server`
- Run `ng serve` to start the Angular dev server 


## Built With

* [Pusher](https://pusher.com/) 
* [Angular](https://angular.io)
* [Express](https://expressjs.com/)