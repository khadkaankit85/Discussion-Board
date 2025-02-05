# Discussion Board Application - Frontend

This is the frontend of a **Discussion Board Application** built using React and TypeScript. The application allows users to create discussions, post comments, like/dislike discussions, and manage their profiles. It communicates with a backend API for data fetching and submission.

## Features

### 🔐 User Authentication

- **Protected Routes:** Only authenticated users can access protected routes.
- **Role-Based Access:** Supports roles such as `admin`, `user`, and `noauth`.
- **Cookie-Based Login:** Automatic login using cookies.
- **Google OAuth:** Login with Google option.

### 💬 Discussion Management

- **Create Discussions:** Users can create new discussions with a title and body.
- **View Discussions:** Lists all available discussions.
- **Like/Dislike:** Users can like or dislike discussions.

### 📝 Post Management

- **Add Posts:** Users can add posts (comments) to discussions.
- **View Posts:** Displays posts related to each discussion.

### 👥 User Profile

- **Profile Display:** Shows user avatar, name, and email.
- **Logout:** Option to logout from the application.

## Screenshots

### Homepage

![Homepage](https://github.com/khadkaankit85/Discussion-Board/blob/master/Frontend/public/homepage.png?raw=true)

### Login Page

![Login Page](https://github.com/khadkaankit85/Discussion-Board/blob/master/Frontend/public/loginpage.png?raw=true)

### Signup Page

![Signup Page](https://github.com/khadkaankit85/Discussion-Board/blob/master/Frontend/public/signup.png?raw=true)

### Not Found Page

![Not Found](https://github.com/khadkaankit85/Discussion-Board/blob/master/Frontend/public/notfound.jpg?raw=true)

### Login with Google

When a user clicks on **Login with Google**:
![Google Login](https://github.com/khadkaankit85/Discussion-Board/blob/master/Frontend/public/withgoogle1.jpg?raw=true)

## Tech Stack

- **React** with TypeScript
- **React Router** for navigation
- **Context API** for global state management
- **Tailwind CSS** for styling
- **Fetch API** for backend communication

### Acknowledgements

This is my own work, please refer to the documentation of each library for references

## Project Structure

```
Frontend/
├── public/                 # Static files (index.html, images, etc.)
├── src/
│   ├── assets/             # Images and other static assets
│   ├── components/         # Reusable React components
│   │   ├── AuthChecker.tsx
│   │   ├── Discussionform.tsx
│   │   ├── Discussionlist.tsx
│   │   ├── Navbar.tsx
│   │   ├── Postform.tsx
│   │   └── Postlist.tsx
│   ├── Configs/            # Configuration files (if any)
│   ├── pages/              # Route-based page components
│   │   ├── Homepage.tsx
│   │   ├── Loginpage.tsx
│   │   ├── NotFound.tsx
│   │   ├── OTPverification.tsx
│   │   ├── Signup.tsx
│   │   └── UserProfilePage.tsx
│   ├── styles/             # CSS and module stylesheets
│   │   ├── Homepage.css
│   │   ├── OTpverification.module.css
│   │   └── Signuppage.module.css
│   ├── types/              # TypeScript types and interfaces
│   │   └── types.ts
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global CSS
│   ├── main.tsx            # Application entry point
│   ├── toasts.ts          # Toast notification configurations
│   └── vite-env.d.ts       # Vite-specific TypeScript declarations
├── package.json            # NPM package configuration
├── vite.config.ts          # Vite configuration file
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration for the project
└── ... (other configuration files)
```

# Project Components & Pages

## Components

The components in the `src/components/` directory are reusable UI elements:

- **AuthChecker.tsx**  
  Verifies user authentication and protects routes.

- **Discussionform.tsx**  
  Provides a form for creating new discussions.

- **Discussionlist.tsx**  
  Displays a list of discussions, including like/dislike functionality.

- **Navbar.tsx**  
  Contains the navigation bar and manages user login/logout.

- **Postform.tsx**  
  Offers a form for adding posts/comments to discussions.

- **Postlist.tsx**  
  Renders a list of posts/comments for a discussion.

## Pages

The `src/pages/` directory holds the main page components:

- **Homepage.tsx**  
  The landing page that displays all discussions and related information.

- **Loginpage.tsx**  
  Allows users to log in with options for cookie-based login and Google OAuth.

- **Signup.tsx**  
  The user registration page.

- **NotFound.tsx**  
  A fallback page for invalid routes (404 Not Found).

- **OTPverification.tsx**  
  A page for verifying OTP during user authentication.

- **UserProfilePage.tsx**  
  Displays the user's profile information and provides a logout option.

# Project Setup and API Documentation - Backend

## API Configuration

> For development, make sure to add the following variable to your `.env` file in the project root.

```bash
DB_URL=mongodb://127.0.0.1:27017/discussionboard
```

> This is the MongoDB URL that will be used for the database connection.

---

## Routes

### 1. **POST Request: `/user/signup/withoutgoogle`**

This route handles user signup without Google authentication. On success, it returns the **access token** and **refresh token**.

#### **Response**:

- **HTTP Status Code**: `201 Created`
- **Body**: Contains the **access token** and **refresh token**.

---

### Request Body

The request should be a **JSON object** with the following fields:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### **Field Constraints**:

- **`name`**:
  - **Type**: `string`
  - **Required**: Yes
  - **Length**: 3 - 20 characters
- **`email`**:

  - **Type**: `string`
  - **Required**: Yes
  - **Format**: Must be a valid email address.

- **`password`**:
  - **Type**: `string`
  - **Required**: Yes
  - **Constraints**:
    - At least 1 lowercase letter.
    - At least 1 uppercase letter.
    - At least 1 number.
    - At least 1 special character (e.g., `!@#$%^&*`).

---

2. POST request to request OTP

route is :/user/verification/getotp
method is :POST
req body:{
userId
}
sends 201 status code with otp in mail

## Example Request

To test the signup route, you can use the following `curl` command or equivalent HTTP client:

```bash
curl -X POST http://localhost:3000/user/signup/withoutgoogle -H "Content-Type: application/json" -d '{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "Secure123!"
}'
```

---

## Example Response

On a successful signup, the response will include the **access token** and **refresh token**:

```json
{
  "message": "Signup successful",
  "access_token": "your-access-token-here",
  "refresh_token": "your-refresh-token-here"
}
```

---

## Error Handling

- If any required field is missing or does not meet the constraints, the server will respond with a **400 Bad Request** status and the relevant error message.

### Example Error Response:

```json
{
  "errors": [
    {
      "field": "name",
      "message": "Name must be between 3 and 20 characters."
    },
    {
      "field": "email",
      "message": "Email must be a valid email address."
    }
  ]
}
```

---
