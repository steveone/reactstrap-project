This is an example of coding with React and ReactStrap (Bootstrap 4)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To Install

You will need to download the code with using `git clone https://github.com/steveone/reactstrap-project.git`

Change to the directory and run `npm install`

## There is a server component that operates on port 8080

You can clone the server using the command `github clone https://github.com/steveone/reactstrap-api.git`

You will need to run `npm install` for the server as well and then `npm start` to run the serviceWorker

## To run the project once you have started the api server

In the project directory, you can run:

`npm start` or `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

This has been developed and tested on Mac OS X and works in Safari and Chrome.

Testing was also done on Windows 10 with Chrome, Edge and Firefox

###Features

- Uses ReactStrap (Bootstrap 4) for responsive design
- Mobile friendly down to iPhone 5
- Implements Functionality of Moving Cards Between States
- Supports delayed responses for workflow changes (5 second delay built into api)
- Smart workflow options
- Uses Node/Express API for Cards and Campaigns

###Things to know

- To change workflow, click on workflow and select new workflow from drop download
- Update will take five seconds to show, there is no indication the update is pending yet
- Drop down to select campaigns is functioning
- Search, Date and Pending options have not been implemented
- Workflow updates work through long polling, the server is polled every second until the update completes
- The API server is set to delay the workflow update by 5 seconds

###Future features

- Validate updated workflow is valid on the server side
- Add visual when workflow is updating or updated
- Offline capabilities
- Allow cards to be opened fully (full screen)
