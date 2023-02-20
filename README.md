# Hotel Managment API

A simple API for managing hotel operations.

This Hotel Management API registers Users and Admins, allows the Admin to create rooms and section types, fetch all rooms, fetch particular rooms with id, update individual rooms and deletes rooms with an id.

## How To Use

Clone the repo

Change directory into the hotelManagement-api directory.

Create a .env file on the folder and include DATABASE_URI in the file

Run the command below in your terminal to :

`npm init -y`: * Initialize the application.

`npm install`: * Install the dependencies.

`npm start`: * Start the application

Head on to create requests on Postman using the following methods: 

POST "/api/v1/section/": Creates a new section type.

GET "/api/v1/section/:id": Retrieves a section type by its id.

GET "/api/v1/section/": Retrieves all section types in the hotel.

PUT "/api/v1/section/:id": Updates a section type by its id.

DELETE "/api/v1/section/:id": Deletes a section type by its id.

#### Substitute the method sections above with any of the sections below to consume the API operations

### Sections
* room-Types
* rooms
* users