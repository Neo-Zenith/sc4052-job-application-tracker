## `POST /signup`

Registers a new user.

### Request Body

The request body should contain the following fields:

- `user`: The details of the user to be registered.

### Response

- `201 Created`: Returns a success message and the registered user details.
- `400 Bad Request`: If the username or email already exists.
- `500 Internal Server Error`: If an error occurs during user registration.

---

## `POST /login`

Authenticates a user and generates an access token.

### Request Body

The request body should contain the following fields:

- `request`: The authentication request details.

### Response

- `200 OK`: Returns the access token and a success message if the user is authenticated.
- `401 Unauthorized`: If the user authentication fails.

---

## `POST /logout`

Logs out the currently authenticated user.

### Response

- `200 OK`: Returns a success message after logging out the user.

---

## `GET /users`

Retrieves a list of all users.

### Response

- `200 OK`: Returns a list of all users.

---

## `GET /users/{id}`

Retrieves a user by their ID.

### Parameters

- `id`: The ID of the user.

### Response

- `200 OK`: Returns the user with the specified ID.
- `404 Not Found`: If the user with the specified ID does not exist.

---

## `POST /users`

Creates a new user.

### Request Body

The request body should contain the following fields:

- `user`: The details of the user to be created.

### Response

- `200 OK`: Returns the newly created user.

---

## `PUT /users/{id}`

Updates an existing user.

### Parameters

- `id`: The ID of the user to be updated.

### Request Body

The request body should contain the updated details of the user.

### Response

- `200 OK`: Returns the updated user.
- `404 Not Found`: If the user with the specified ID does not exist.

---

## `DELETE /users/{id}`

Deletes a user by their ID.

### Parameters

- `id`: The ID of the user to be deleted.

### Response

- `200 OK`: Returns a success message after deleting the user.

---

## `GET /applications`

Retrieves a list of all applications.

### Parameters

- `userId` (optional): The ID of the user.
- `status` (optional): The status of the application.

### Response

- `200 OK`: Returns a list of applications that match the specified criteria.
- `404 Not Found`: If no applications are found.

---

## `GET /applications/count/last7days`

Retrieves the count of applications created in the last 7 days.

### Response

- `200 OK`: Returns the count of applications in the last 7 days.

---

## `GET /applications/{id}`

Retrieves an application by its ID.

### Parameters

- `id`: The ID of the application.

### Response

- `200 OK`: Returns the application with the specified ID.
- `404 Not Found`: If the application with the specified ID does not exist.

---

## `POST /applications`

Creates a new application.

### Request Body

The request body should contain the following fields:

- `request`: The details of the application to be created.

### Response

- `200 OK`: Returns the newly created application.
- `500 Internal Server Error`: If an error occurs while fetching the user.

---

## `PUT /applications/{id}`

Updates an existing application.

### Parameters

- `id`: The ID of the application to be updated.

### Request Body

The request body should contain the updated details of the application.

### Response

- `200 OK`: Returns the updated application.
- `404 Not Found`: If the application with the specified ID does not exist.

---

## `DELETE /applications/{id}`

Deletes an application by its ID.

### Parameters

- `id`: The ID of the application to be deleted.

### Response

- `200 OK`: Returns a success message after deleting the application.
