### Project Details
* Project name: Brush Up
* Description: Brush Up is our take on gamified art history education. Similar to sites like Kahoot, users can create a room and invite friends to join with a join code. Once the quiz has started, users view an image of a painting and must identify its artist. During the quiz, users are able to see their score, and a winner is displayed at the end. Right now, our quiz is generated using data from the MET API, so only works associated with the MET are included. We hoped that users could use our site to learn about the MET artwork before a visit or to increase their knowledge of artwork in general!
* Team members + contributions:
    * Ethan Jiang (ejiang24) – backend generation of quiz using MET API, our socket.io frontman
    * Jakob Wismar (jwismar) – backend generation of quiz also, caching, and backend testing
    * Charles Levy (clevy9) – frontend page navigation (buttons) and integrating socket.io into frontend
    * Caroline Hwang (chwang15) – frontend page navigation, style, and testing
* Total estimated time: 70 hr
* Repo: https://github.com/ejiang24/brushup 

### Design Choices
* Frontend: Our frontend is divided into pages. In the App class, we set up the Router for the pages so that users can navigate between links when they click a button. Some of the pages we include are Home, CreateRoom, Question, Results, etc. We make the API call to the backend when someone creates a new room and we pass the created quiz and current scores between pages using socket. Additionally, we have APIQuestion and APIQuiz interfaces to represent the Json that is passed from the backend to frontend when the quiz is created. However, we ended up only really using this in our testing since most of the quiz is handled by socket.io. We also have a header component which exists at the top of each quiz page. 
* Backend: Our backend is split into two main categories—our custom API, which generates quizzes, and our socket server, which manages web socket connections.
    * Custom API
        * Our custom API is a server which currently has a single endpoint, makequiz, which generates a quiz. Our program does this by making calls to the publicly available Met API, and using this API’s endpoints to randomly generate a set of 5 questions, each with randomly generated answers.
        * Because making the initial call to the Met API to acquire a list of IDs of all eligible objects is expensive, we implemented a cache to cut down on runtime. 
    * Socket server
        * We also implemented another server which manages the web sockets for multiplayer functionality. It is hooked up to the front end, and listens for a number of events such as player answers and room creation before emitting relevant events to the players to keep everyone in sync. 
        * It also keeps track of a number of states, such as scores, room codes, number of players, player readiness, etc..

### Errors/Bugs
* Button presses
    * Backend right now tests the number of times a button is pressed and compares it to the number of players, so one player can press the answer twice for a 2 person game and then both players advance. We are aware this can be fixed with some CSS but have not gotten there yet.

### Tests
* Frontend: We use mock quizzes to replicate API calls and have a Route “/mockcreateroom” so that we can navigate to the CreateRoom page but tell the socket.io to use our mock quizzes. We test for what occurs when the user gets an answer wrong and right and do this with multiple mock quizzes. We also test for when the user forgets to input key information, like their name or room code.
* Backend: We mock API calls to ensure that the QuizHandler handler generates valid quizzes that meet certain requirements (contain 5 questions, a correct answer, 4 choices, no duplicate quizzes, etc.). We also mock API calls to ensure that the SaveGameHandler behaves correctly under different scenarios. These tests use the Mockito library to set up mock objects to simulate requests to the handler.

### How to run
* Tests
    * Frontend: Running the frontend tests requires the socket in the backend to also be running because our frontend functionality is very much reliant on socket.io. First, run socket.io by navigating to socketBack on the backend and entering “npm run start”. Then, we have threeee frontend testing files, but only one can be run at a time or else the socket will think they are joining the same room and mess up the tests we’ve written. So, to run the first testing file, enter “npm test tests.test.tsx”, to run the second testing file, enteer "npm test tests2.test.tsx", and to run the second testing file, enter “npm test errors.test.tsx”. It’s important to also note that between running the three testing files, you must restart the socket by entering ctrl-c and “npm run start” again so that the socket does not count the new testing file as part of the previous game.
    * Backend: In the project ``/backend`` directory, execute ``mvn test``.
* Whole program
    * Our project has 3 components that must be started before the program can run. In the backend, start the Server by opening the backend as a project in IntelliJ and pressing the green play button in the Server class. Then, in one terminal, navigate to socketBack also in the backend and enter “npm run start” into the terminal to start running socket.io. Lastly, launch the frontend by navigating to the frontend folder and enter “npm run start” or “npm run dev”, follow the local host link, and begin playing! 
        * Note: Our local host origins vary on our computers, so if the program is not loading, check that the cors origin in socketBack matches the local host that is displayed when you launch the frontend.
