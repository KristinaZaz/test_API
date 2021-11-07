# Install dependencies: 
npm install supertest mocha chai --save-dev
# Run tests: 
npm test

#### Bugs: as API server is designed to read only, therefore POST, PUT and DELETE requests are failing in my tests.

#### Notes: first and foremost, the idea was to fetch the whole list of users available on the API server and to create a new user within the first GET request to reuse it in coming tests. Based on the received payload, extract the information about the last user in the list. Next steps were to check that the server is able to execute write requests. Here I am facing with the bug, hence, PUT, POST and DELETE requests are failing.
