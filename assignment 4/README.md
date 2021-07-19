# Node Master - Assignment 4

## Pizza Delivery API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/872726-9f2db027-678f-4f55-a554-c3d97aabd38a?action=collection%2Ffork&collection-url=entityId%3D872726-9f2db027-678f-4f55-a554-c3d97aabd38a%26entityType%3Dcollection%26workspaceId%3D809816f8-b2af-47b3-96fc-9541141ecb8e)

With the following endpoints you are able to:

- Create a new user: `POST /user`
- Update an existent user: `PUT /user`
- Delete an existent user: `DELETE /user`
- Login: `POST /login`
- Logout: `POST /logout`
- Get menu items (require authentication): `GET /items`
- Add new items to the cart (require authentication): `PUT /item`
- Finish the order (require authentication): `POST /checkout`

## Table of content

- [Node Master - Assignment 4](#node-master---assignment-4)
  - [Pizza Delivery API](#pizza-delivery-api)
  - [Table of content](#table-of-content)
  - [Endpoints](#endpoints)
    - [Create user](#create-user)
    - [Update user](#update-user)
    - [Delete user](#delete-user)
    - [Login](#login)
    - [Logout](#logout)
    - [Get Items](#get-items)
    - [Add item to cart](#add-item-to-cart)
    - [Checkout](#checkout)
  - [Environment variables](#environment-variables)

## Endpoints

### Create user

```
POST http://localhost:3000/user

{
  "name": "Josnei",
  "email": "super.josnei@email.com",
  "address": "ABC 122",
  "password": "123456"
}
```

### Update user

```
PUT http://localhost:3000/user

{
  "email": "super.josnei@email.com",
  "name": "Josnei 2021",
  "address": "Rua das Flores 123"
}
```

### Delete user

```
DELETE http://localhost:3000/user

{
  "email": "super.josnei@email.com"
}
```

### Login

```
POST http://localhost:3000/login

{
  "email": "super.josnei@email.com",
  "password": "123456"
}
```

### Logout

```
POST http://localhost:3000/logout

Authorization
Bearer 1D1CL9hn30FlagoHtW9OaK24ekfcdYundefinedsPSFYzjXYG8wXqGxCm8
```

### Get Items

```
GET http://localhost:3000/items

Authorization
Bearer xAoHQMTQwyr6AnJKlO92N2YUl2tsYCQKS0imLtcaSxZo6SwwK0
```

### Add item to cart

```
PUT http://localhost:3000/item

Authorization
Bearer xAoHQMTQwyr6AnJKlO92N2YUl2tsYCQKS0imLtcaSxZo6SwwK0

{
  "code": "B_0007",
  "amount": 2
}
```

### Checkout

```
POST http://localhost:3000/checkout
Authorization
Bearer xAoHQMTQwyr6AnJKlO92N2YUl2tsYCQKS0imLtcaSxZo6SwwK0
```

## Environment variables

|      name      | required | default |
| :------------: | :------: | :-----: |
|    DATA_DIR    |  false   | 'data'  |
|  TOKEN_LENGTH  |  false   |   50    |
|  STRIPE_TOKEN  |   true   |    -    |
| MAILGUN_DOMAIN |   true   |    -    |
| MAILGUN_SECRET |   true   |    -    |
