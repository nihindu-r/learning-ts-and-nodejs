# learning-ts-and-nodejs
Repo for me to learn Typescript and NodeJS. This project implements the API found here: https://petstore.swagger.io/#/, in TypeScript, using NodeJS and an Express framework. It also uses Mongoose to connect to and update MongoDB and is currently using Postman to verify that items are working as intended, with the goal of 
moving tests in Mocha or Chai.


To start: `npm run dev`

TODO table
| Base router | Route                    | Verb     | Action                                       | Input                                                                                                              | Output                                                                                                       | TODO                                                                          |
|-------------|--------------------------|----------|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| pet         | /pet                     | `POST`   | Add a new pet to the store.                  | Body (petSchema Object)                                                                                            | 200 (Pet added)  OR 405 invalid input (pet added doesn't meet validation rule)                               | Fix so that failing validation doesn't kill the app and instead returns a 405 |
| pet         | /pet/{petID}             | `GET`    | Find an existing pet by ID                   | Path (petID String to cast to Integer number)                                                                      | 200 (Pet found)  OR 400 (Invalid ID supplied)  OR 404 (Pet not found)                                        | Add error handling for 400 and 404 (invalid ID supplied and pet not found)    |
| pet         | /pet/{petID}             | `DELETE` | Delete an existing pet by ID                 | Path (petID String to cast to Integer number) AND Header (API key - this will be extension work for me)            | 200 (Pet deleted)  OR 400 (Invalid ID supplied)  OR 404 (Pet not found)                                      | Add error handling for 400 (invalid ID supplied). API Key is EXTENSION        |
| pet         | /pet                     | `PUT`    | Updates an existing pet                      | Body (petSchema Object)                                                                                            | 200 (Pet updated) OR 404 (Pet not found) OR 405 invalid input (pet added doesn't meet validation rule)        | Add error handling for 400 (invalid ID supplied)                                |
| pet         | /pet/findByStatus        | `GET`    | Finds Pets by status                         | Body (Array<Status (String)>)                                                                                      | 200 (Pet(s) found) OR 400 (invalid status)                                                                    | Current checking isn't catching invalid status                           |
| pet         | /pet/{petId}             | `POST`   | Updates a pet in the store with form data    | Path (petID String to cast to Integer number) AND formData??? Don't really understand how the form data works here | 200 (Pet updated) OR 404 (Pet not found) OR 405 invalid input (pet modification doesn't meet validation rule) | Implement - EXTENSION                                                         |
| pet         | /pet/{petId}/uploadImage | `POST`   | Uploads an image                             | Path (petID String to cast to Integer number) AND file (formData)                                                  | 200 (successful operation - would also need to add URL to specified petID)                                   | Implement - EXTENSION                                                         |
| store       | /store/order             | `POST`   | Place an order for a pet                     | Body (orderSchema Object)                                                                                          | 200 (Order created) OR 400 (invalid order)                                                                   | Implement                                                                     |
| store       | /store/order/{petID}     | `GET`    | Find purchase order by petID                 | Path (petID String to cast to Integer number)                                                                      | 200 (Order found) OR 400 (Invalid ID supplied) OR 404 (Order not found)                                      | Implement                                                                     |
| store       | /store/order/{orderID}   | `DELETE` | Delete purchase order by ID                  | Path (orderID String to cast to positive Integer number)                                                           | 200 (Order deleted) OR 400 (Invalid ID supplied) OR 404 (Order not found)                                    | Implement                                                                     |
| store       | /store/inventory         | `GET`    | Returns pet inventories by status            | No parameters                                                                                                      | 200 (Returns a map of status codes to quantities)                                                            | Implement                                                                     |
| user        | /user                    | `POST`   | Create user                                  | Body User                                                                                                          | 200 (User added) OR 405 invalid input (user added don't meet validation rule)                                | Implement                                                                     |
| user        | /user/{username}         | `GET`    | Get user by user name                        | Path (username String)                                                                                             | 200 (successful operation) OR 400 (invalid username) OR 404 (username not found)                             | Implement                                                                     |
| user        | /user/{username}         | `PUT`    | Updated user                                 | Path (username String)                                                                                             | 200 (successful operation) OR 400 (invalid username) OR 404 (username not found)                             | Implement                                                                     |
| user        | /user/{username}         | `DELETE` | Delete user                                  | Path (username String)                                                                                             | 200 (successful operation) OR 400 (invalid username) OR 404 (username not found)                             | Implement                                                                     |
| user        | /user/createWithList     | `POST`   | Creates list of users with given input array | Body Array<User>                                                                                                   | 200 (Users added) OR 405 invalid input (user(s) added don't meet validation rule)                            | Implement                                                                     |
| user        | /user/login              | `GET`    | Logs user into the system                    | Parameters (username String, password String)                                                                      | 200 (Successful operation) OR 400 (Invalid Username and Password supplied)                                   | Implement? Not confident on how to authenticate for other uses.               |
| user        | /user/logout             | `GET`    | Logs user out of the system                  | No parameters                                                                                                      | 200 (Successfully logged out)                                                                                | Implement? Not confident on how to manage this                                |




Test bodies (for Postman):

`/pet
POST:
{
  "id": 0,
  "name": "doggie",
  "status": "Available"
}`

/pet/findByStatus

GET

{
    "statusArray" : ["Pending", "Available"]
}


`/store/order
POST 
{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2025-03-31T05:40:50.915Z",
  "status": "placed",
  "complete": true
}`