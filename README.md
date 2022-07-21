<h3 align="center">Notes API</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg?style=flat-square)]()
![GitHub issues](https://img.shields.io/github/issues/Lowe-Man/notes-api?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Lowe-Man/notes-api?style=flat-square)
![GitHub](https://img.shields.io/github/license/Lowe-Man/notes-api?color=blue&style=flat-square)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/Lowe-Man/notes-api?label=release&style=flat-square)

</div>

---

<p align="center"> This is the API for a Note Application
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
These instructions will get you a copy of Notes API up and running for contributing with.

### Prerequisite

Please make sure you have these installed before moving on

- [PostgreSQL](https://www.postgresql.org/download/)
- [NodeJS](https://nodejs.org/)

### Download and Setup <a name="download-and-setup"></a>

#### Download

Run `git clone <URL>` with the repository URL in order to get a local copy of the project.

#### Setup

1. Go to the `config` folder with in the root of the project
2. Find the `.env.sample` file and copy and change the name to `.env`
  - `POSTGRES_USER` - The user for the connection to database
  - `POSTGRES_HOST` - The host name or IP address for the database server **Note: Port is locked at the default for Postgres**
  - `POSTGRES_PASSWORD` - The password for the connection to the database
  - `POSTGRES_DB` - The name of the database that you want to connect to
  - `API_SECRET` - [JWT](https://jwt.io/) secret

## 🔮 API Reference <a name="api_ref"></a>
### Insert References Here

## ✍️ Authors <a name="authors"></a>

- [@Lowe-Man](https://github.com/Lowe-Man) - Idea & Initial work

See also the list of [contributors](https://github.com/Lowe-Man/notes-api/contributors) who participated in this
project.