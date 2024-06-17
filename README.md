# IsraelifyApp

<img src="https://github.com/Gal-Or/IsraelifyApp/assets/7868565/1d0e9429-e8fa-43db-8e26-58f1d2454238" alt="IsraelifyApp" width="400">

deployed version - https://israelify.onrender.com/


IsraelifyApp is the final project of the Fullstack Development course at Coding Academy. This project aims to replicate the core features of Spotify, tailored specifically for Israeli music enthusiasts. 

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

Israelify is a music streaming platform that allows users to explore, listen to, and create playlists of their favorite Israeli songs. The application mimics the user experience and functionality of Spotify, with a focus on providing a rich library of Israeli music.

This project was developed as the final project in the Fullstack Development course at Coding Academy. The primary goal was to apply the knowledge and skills acquired during the course to build a fully functional web application.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Music Library**: Browse and search a vast collection of Israeli songs.
- **Playlists**: Create, edit, and share playlists.
- **Real-time Playback**: Enjoy seamless music playback with a user-friendly player.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Interactive UI**: Intuitive and interactive user interface for an enhanced user experience.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Gal-Or/IsraelifyApp.git
    cd IsraelifyApp
    ```

2. **Install server dependencies:**
    ```sh
    cd server
    npm install
    ```

3. **Install client dependencies:**
    ```sh
    cd ../client
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the `server` directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

5. **Run the application:**
    ```sh
    # In the server directory
    npm start

    # In the client directory
    npm start
    ```

6. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`

## Usage

Once the application is running, you can:

- Register a new account or log in with existing credentials.
- Browse the music library and search for songs.
- Play music using the integrated player.
- Create and manage your playlists.

## Technologies Used

- **Frontend:**
  - React
  - Redux
  - SCSS
  - React Router

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose

- **Authentication:**
  - JSON Web Tokens (JWT)
  
- **Other Tools:**
  - Webpack
  - Babel

## Contributing

We welcome contributions to IsraelifyApp! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact us at:

- **Name**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [Gal-Or](https://github.com/Gal-Or)

---

Thank you for visiting the IsraelifyApp repository! We hope you enjoy using our music streaming platform.
