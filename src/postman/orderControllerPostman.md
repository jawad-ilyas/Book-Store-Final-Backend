===========================================
POSTMAN TESTING — OrderController
===========================================

BASE_URL: http://localhost:3000/api/order

CREATE NEW ORDER

METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json

BODY (raw JSON):

{
  "items": [
    {
      "bookId": "BOOK_ID_HERE",
      "quantity": 2,
      "priceAtPurchase": 500
    },
    {
      "bookId": "ANOTHER_BOOK_ID",
      "quantity": 1,
      "priceAtPurchase": 300
    }
  ],
  "totalAmount": 1300,
  "paymentMethod": "card",
  "shippingAddress": "House #22, Street 10, Lahore, Punjab, Pakistan",
  "transactionId": "TXN123456789"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "_id": "ORDER_ID_HERE",
    "userId": "USER_ID_HERE",
    "items": [
      { "bookId": "BOOK_ID_HERE", "quantity": 2, "priceAtPurchase": 500 },
      { "bookId": "ANOTHER_BOOK_ID", "quantity": 1, "priceAtPurchase": 300 }
    ],
    "totalAmount": 1300,
    "paymentStatus": "pending",
    "orderStatus": "processing",
    "paymentMethod": "card",
    "shippingAddress": "House #22, Street 10, Lahore, Punjab, Pakistan",
    "transactionId": "TXN123456789"
  }
}


GET ORDER BY ID

METHOD: GET
URL: {{BASE_URL}}/<orderId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Fetched order by ID",
  "order": {
    "_id": "ORDER_ID_HERE",
    "userId": "USER_ID_HERE",
    "items": [...],
    "totalAmount": 1300,
    "paymentStatus": "pending",
    "orderStatus": "processing",
    "paymentMethod": "card",
    "shippingAddress": "..."
  }
}


GET ORDERS BY LOGGED-IN USER

METHOD: GET
URL: {{BASE_URL}}/user

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Orders fetched successfully",
  "orders": [
    { "_id": "ORDER_ID_1", "items": [...], "totalAmount": 1300, ... },
    { "_id": "ORDER_ID_2", "items": [...], "totalAmount": 800, ... }
  ]
}


GET ALL ORDERS (ADMIN)

METHOD: GET
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <ADMIN_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Orders fetched successfully",
  "orders": [ { "_id": "ORDER_ID", "userId": "...", ... } ]
}


UPDATE ORDER STATUS (ADMIN)

METHOD: PUT
URL: {{BASE_URL}}/<orderId>

HEADERS:
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

BODY (JSON):

{
  "orderStatus": "shipped"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Order status updated successfully",
  "order": {
    "_id": "ORDER_ID_HERE",
    "orderStatus": "shipped",
    ...
  }
}

NOTES:

• Replace <YOUR_JWT_TOKEN> with the token obtained from user login.
• Replace <ADMIN_JWT_TOKEN> with token obtained from admin login.
• Replace <orderId> with the order ID from "Create Order" response.
• Only admin can fetch all orders and update order status.
• Payment status is updated based on payment provider response.