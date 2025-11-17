===========================================
POSTMAN TESTING — PaymentController
===========================================

BASE_URL: http://localhost:3000/api/payments

CREATE/STORE PAYMENT RESPONSE

METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json

BODY (raw JSON):

{
  "userId": "USER_ID_HERE",
  "orderId": "ORDER_ID_HERE",
  "amount": 1300,
  "status": "completed",
  "provider": "Stripe",
  "transactionId": "TXN123456789"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Payment recorded successfully",
  "payment": {
    "_id": "PAYMENT_ID_HERE",
    "userId": "USER_ID_HERE",
    "orderId": "ORDER_ID_HERE",
    "amount": 1300,
    "status": "completed",
    "provider": "Stripe",
    "transactionId": "TXN123456789",
    "createdAt": "...",
    "updatedAt": "..."
  }
}


GET PAYMENT BY ID

METHOD: GET
URL: {{BASE_URL}}/<paymentId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Payment fetched successfully",
  "payment": {
    "_id": "PAYMENT_ID_HERE",
    "userId": "USER_ID_HERE",
    "orderId": "ORDER_ID_HERE",
    "amount": 1300,
    "status": "completed",
    "provider": "Stripe",
    "transactionId": "TXN123456789"
  }
}


GET ALL PAYMENTS (ADMIN)

METHOD: GET
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <ADMIN_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "All payments fetched successfully",
  "payments": [
    {
      "_id": "PAYMENT_ID_1",
      "userId": "...",
      "orderId": "...",
      "amount": 1300,
      "status": "completed",
      "provider": "Stripe",
      "transactionId": "..."
    },
    {
      "_id": "PAYMENT_ID_2",
      "userId": "...",
      "orderId": "...",
      "amount": 800,
      "status": "pending",
      "provider": "PayPal",
      "transactionId": "..."
    }
  ]
}


UPDATE PAYMENT STATUS (ADMIN)

METHOD: PUT
URL: {{BASE_URL}}/<paymentId>

HEADERS:
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

BODY (JSON):

{
  "status": "completed"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Payment status updated successfully",
  "payment": {
    "_id": "PAYMENT_ID_HERE",
    "status": "completed",
    "userId": "...",
    "orderId": "...",
    "amount": 1300,
    "provider": "Stripe",
    "transactionId": "..."
  }
}

NOTES:

• Replace <YOUR_JWT_TOKEN> with user login token.
• Replace <ADMIN_JWT_TOKEN> with admin login token.
• Replace <paymentId> with the ID from "Create Payment Response".
• status can be "pending", "completed", or "failed".
• provider should be "Stripe" or "PayPal".