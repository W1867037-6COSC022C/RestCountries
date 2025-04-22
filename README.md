# rest_countries - Frontend for RestCountriesAPI

React application (bootstrapped with Create-React-App) for consuming the RestCountriesAPI.  
Supports user authentication (JWT), per‑user API key management, admin views, and country lookups.

---

## Features

- **Authentication**
  - Register / Login / Logout
  - JWT stored in `localStorage` and attached to all API calls
- **User Dashboard**
  - View user profile (logged-in)
  - Generate / list / activate / delete your API keys
  - Select preffered API key for country lookups
- **Admin Dashboard** (role `admin` identified as 1)
  - View / delete all users
  - See usage counts & last‑used timestamps
- **Theming**
  - Material‑UI (MUI) with a custom theme

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Docker](#Docker)

---

## Prerequisites

- Node.js 14+
- npm (or yarn)
- (optional) Docker & Docker Compose

---

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/W1867037-6COSC022C/RestCountries.git
   cd RestCountries

   ```
2. **Install Dependencies**
   ```bash
   npm install

   ```
3. **Run in Development**
   ```bash
   npm start
   ```

Opens at http://localhost:3000.

## Docker

**A Dockerfile and .dockerignore are included for containerization.**

1. **Build the image**

   ```bash
   docker build -t rest-countries-frontend .
   ```
