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
- [API Reference](#api_ref)
- [Authors](#authors)

## 🧐 About <a name="about"></a>

---
This project was created to help us interact with a database using REST.

## 🏁 Contributing <a name="contributing"></a>

---
These instructions will get you a copy of Gainz API up and running for contribuitng with.

### Download and Setup


## 🔮 API Reference <a name="api_ref"></a>

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## ✍️ Authors <a name="authors"></a>

- [@Lowe-Man](https://github.com/Lowe-Man) - Idea & Initial work

See also the list of [contributors](https://github.com/Lowe-Man/geoserver-php/contributors) who participated in this project.