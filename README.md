# TODO-App
# Todo Manager Application

## Overview

Todo Manager is a full-stack web application developed using React, Node.js, Express, and MySQL. The application allows users to securely register and log in to manage their personal todo tasks.

Users can create, update, delete, search, and filter todos. Each todo can include a due date and time, and tasks are displayed in order based on upcoming schedules. The application also includes completed task management, protected routes using JWT authentication, password hashing with bcrypt, reusable frontend components, responsive UI design, and database migration and seed scripts.

### Technologies Used

Frontend:

* React.js
* React Router DOM
* Axios
* Bootstrap+CSS

Backend:

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

Database:

* MySQL

---

# Setup Guide

## 1. Clone the Repository

```bash
git clone 
```

---

# Backend Setup

## Navigate to backend folder

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env` file

```env
PORT=5000
DB_HOST="Your Host name "
DB_PORT=" Mysql port"
DB_USER="Db user name"
DB_PASSWORD= " Db password"
DB_NAME=todo_app
JWT_SECRET= "secret key"
```

## Run database migration

```bash
npm run migrate
```

## Run seed file

```bash
npm run seed
```

## Start backend server

```bash
npm run dev
```

Backend server will run on:

```txt
http://localhost:5000
```

---

# Frontend Setup

## Navigate to frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Start frontend application

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

# Sample Login Credentials

E-mail:- kasun@gmail.com                                 
Password:- 123456
