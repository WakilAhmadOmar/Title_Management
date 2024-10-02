# Title Management Application

A frontend web application that interacts with an Express backend to manage user authentication and allow users to create and read titles suggested by users. The application integrates MetaMask for cryptocurrency wallet functionality.

## Objective

Develop a frontend application that allows users to:

- Authenticate using JWT (JSON Web Tokens).
- Manage titles: view, add, and delete titles.
- Connect their MetaMask wallet to interact with the platform.

## Features

- **User Authentication**:

  - Login and registration pages.
  - Secure user sessions managed with JWT.
  - Error handling for authentication processes.

- **Title Management**:

  - Dashboard for authenticated users.
  - View a list of titles.
  - Add new titles with relevant details when the user connected their wallet.
  - Delete existing titles when the user connected their wallet.

- **MetaMask Integration**:
  - Connect users’ cryptocurrency wallets.
  - Display the connected wallet address on the dashboard.
  - Restrict title management functionalities to connected wallet users.

## Tech Stack

- **Frontend Framework**: React + Vite
- **State Management**: Context API
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library
- **MetaMask Integration**: Ethers.js

## Getting Started

To set up and run the application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/title-management-app.git
   ```

2. **Navigate into the project directory**

```bash
cd Title-Management
```

3. **Install dependencies:**

```bach
npm install
```

4. **Run the application:**

```bash
npm run dev
```

5. **Connect to the backend:**

Ensure your Express backend is running and properly configured to handle authentication and title management.

API Endpoints

User Authentication:

POST /api/auth/register: Register a new user.

POST /api/auth/login: Authenticate an existing user.

Title Management:

GET /api/titles: Retrieve a list of titles.

POST /api/titles: Create a new title.

DELETE /api/titles/:id: Delete a title by ID.

Testing
Unit tests are included for all components and functions. To run the tests, use the following

```bash
npm test
```

Contributing
Contributions are welcome! Please open an issue or submit a pull request.
