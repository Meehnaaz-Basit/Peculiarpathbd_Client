# PeculiarPathBD

Welcome to PeculiarPathBD, your ultimate guide to exploring Bangladesh!

## Overview

PeculiarPathBD is a role-based online platform designed to help travelers discover the beauty of Bangladesh. It offers comprehensive guides and travel packages tailored for three distinct roles:

- **User:** Can explore detailed guides on destinations, book tour packages, manage bookings and wishlist, read tourist stories, and interact with tour guides.
- **Tour Guide:** Can create and manage tour packages, view assigned tours, interact with booked tourists, and manage profile information.
- **Admin:** Has full control over the platform, including adding new tour packages, managing users (assigning roles, viewing requests), and overseeing site operations.

- **Live Site URL:** [PeculiarPathBD](https://www.peculiarpathbd.com)

## Admin Credentials

- **Username:** Meehnaaz
- **UserEmail:** meehnaaz@gmail.com
- **Password:** meehnaazAdmin27

## Key Features

### Personalized Tour Packages

Explore and book personalized tour packages tailored to your preferences. Each package offers detailed itineraries, pricing information, and the ability to add tours to your wishlist for future planning.

### Interactive Tour Guide Profiles

Get to know our experienced tour guides through detailed profiles. Learn about their backgrounds, specialties, and reviews from other travelers. Easily connect with guides to plan your ideal travel experience.

### User-Friendly Dashboard

Enjoy a seamless user experience with a responsive dashboard. From managing bookings and wishlist items to exploring tourist stories and interacting with guides, everything is accessible and intuitive.

## Technology Used

- **Frontend:** React.js, TailwindCSS, React-Router
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Authentication, JWT (JSON Web Tokens)
- **Image Hosting:** imgBB
- **State Management:** Tanstack Query

## How to Clone

## Cloning the Project

### Client Side

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Meehnaaz-Basit/Peculiarpathbd_Client.git
   cd PeculiarPathBD_Client

   ```

2. **Install dependencies**

```sh
npm install

```

3. **Create an `.env.local` file in the root directory and add the following codes:**

```sh
VITE_APIKEY=####
VITE_AUTHDOMAIN=####
VITE_PROJECTID=####
VITE_STORAGEBUCKET=####
VITE_MESSAGINGSENDERID=####
VITE_APPID=####

VITE_API_URL=`your site url`
VITE_IMGBB_API_KEY=`your imgbb account key`
```

- Replace the `#` with your Firebase auth configuration.

### Server Side

1. **Clone the server side of this project: `https://github.com/Meehnaaz-Basit/PeculiarPathBD_Server.git`**

- [You can find it here](https://github.com/Meehnaaz-Basit/PeculiarPathBD_Server)

2. **Copy code**

```sh
git clone https://github.com/Meehnaaz-Basit/PeculiarPathBD_Server.git
cd WoodWoven_Server
nmp install
```

3. **Create an `.env` file in the root directory and add the following codes:**

- Copy code

```sh
DB_USER=#
DB_PASS=#
ACCESS_TOKEN_SECRET= `jwt secret`
```

- Replace the `#` with your MongoDB server username and password.

4. **Start the server**

```sh
npm start

```
