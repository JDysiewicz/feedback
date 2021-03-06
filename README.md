This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Feedbacker 📝📁
This is a **simple** way for employers to gather *anonymous feedback* from their employees for use in a live discussion environemnt. The project is currently hosted on Heroku over at [https://feedback-dysiewicz.herokuapp.com/](https://feedback-dysiewicz.herokuapp.com/).

### Why?
Because its useful to have a live chat about potentially sensitive topics which people may not feel comfortable bringing up. This tool lets people post on a feedback board, and others to also upvote/downvote the comment to express their agreement or disagreement.

### Features
- **Live updates for all ⏱**: once someone posts something it can be seen to all
- **Upvoting/Downvoting live ✅/❌**. 300 comments saying the the same thing in different words is hard to parse; 1 comment with 299 upvotes agreeing with the sentiment is much easier. Each person can vote up to three times on each item (positive or negative), so express either very strong agreement (3 upvotes) or very strong disagreement (3 downvotes). This allows people to express themselves better rather than just a simple thumbs up/down system.
- **Downloading Feedback 💾**: After the session has ended and all feedback cast, the feedback can easily be downloaded into a .csv file for ease of use. This allows a quick reference in which feedback was the most agreed upon; this data can be colated and integrated into other services as it is in a ready-made csv file.
- **Rooms 🏠**: Each room/board has its own roomId, and so many different boards can be created to keep feedback separated (e.g - can have a positive feedback board and a negative feedback board). This allows modularised feedback at a glance.
- **Vote Visibility 👁**: It's known that people change their decision based on what everyone around them thinks (even if it is completely obvious they're not correct: see [Asch Conformity Experiment](https://www.youtube.com/watch?v=FnT2FcuZaYI)). Hiding the voting on what people agree/disagree with ensures more accurate feedback; only the creator of the room can toggle this, and this will update for everyone connected to the room (and people that join the room later!).

### Usage
To test this, clone the `main` branch. Then, start up the CRA dev server by running `npm start` in the root project directory (`C:/User/Desktop/feedback/` for example). Also, open another terminal and run the backend Express server to allow the WebSocket functionality by running `npm start` in the `/server` directory (`C:/User/Desktop/feedback/server`). Then, you can open up `localhost:3000` and see a screen asking you to create a room, or join a new room. Clicking `create room` will redirect you to an empty board, which will display a *Room Id* value. For others to join, share this value with them. Then, they will join the same room by putting this value into the `join a room` input field, then clicking `join a room` button. 

### IMPORTNAT NOTE
This is a *proof of concept* mainly. There are many bugs. There is not much error handling. You don't have to try hard to break this. However, I think the main functionality is here to allow easier feedback gathering for employers in a really simple way. Furthermore, currently all the messages for *every* board is stored on the server; this is not efficient, and may lead to a heap overflow (crashing of the server). In future, migrating this over to a more extensible platform may be benficial. Better error handling would be nicer too.

There's also no styling yet. So yeah.

