<h3 align="center">Gainz API</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg?style=flat-square)]()
![GitHub issues](https://img.shields.io/github/issues/Lowe-Man/gainz-api?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Lowe-Man/gainz-api?style=flat-square)
![GitHub](https://img.shields.io/github/license/Lowe-Man/gainz-api?color=blue&style=flat-square)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/Lowe-Man/gainz-api?label=release&style=flat-square)

</div>

---

<p align="center"> This is the API for the main project called Gainz
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
  - [Changelog](CHANGELOG.md)
- [Contributing](#contributing)
  - [Download and Setup](#download-and-setup)
- [API Reference](#api_ref)
- [Authors](#authors)

## 🧐 About <a name="about"></a>

---
This project was created to help us interact with a database using REST.

## 🏁 Contributing <a name="contributing"></a>

---
These instructions will get you a copy of Gainz API up and running for contributing with.

### Prerequisite

Please make sure you have these installed before moving on

- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [NodeJS](https://nodejs.org/)

### Download and Setup <a name="download-and-setup"></a>

#### Download

Run `git clone <URL>` with the repository URL in order to get a local copy of the project.

#### Setup

1. Go to the `config` folder with in the root of the project
2. Find the `.env.sample` file and copy and change the name to `.env`
  - `DB_USER` - The user for the connection to database
  - `DB_HOST` - The host name or IP address for the database server **Note: Port is locked at the default for MySQL**
  - `DB_PASS` - The password for the connection to the database
  - `DATABASE` - The name of the database that you want to connect to
  - `API_SECRET` - [JWT](https://jwt.io/) secret

## 🔮 API Reference <a name="api_ref"></a>

### Workout

#### Get all workouts

```
  GET /workout/get-all
```

| Parameter | Type     | Description                | Default |
| :--------: | :-------: | :------------------------- | :------: |
| `limit` | `integer` | **Optional** How many items per page | 3
| `cursor` | `integer` | **Optional** Cursor pagination to get the next page. This can be obtained from the `next` element in the response| null

#### Create new workout

```
  POST /workout/create
```

Here is a sample body of the request

```json
{
  "title": "Example Title",
  "body": "Example body"
}
```

### User Authentication

#### Create new user

```
  PUT /auth/signup
```

Here is a sample of the body request

```json
{
  "name": "John Doe",
  "password": "password",
  "email": "johndoe@example.com"
}
```

#### Login user

```
  PUT /auth/signup
```

Here is a sample of the body request

```json
{
  "email": "johndoe@example.com",
  "password": "password"
}
```

## ✍️ Authors <a name="authors"></a>

- [@Lowe-Man](https://github.com/Lowe-Man) - Idea & Initial work

See also the list of [contributors](https://github.com/Lowe-Man/geoserver-php/contributors) who participated in this
project.