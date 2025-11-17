===========================================
POSTMAN TESTING — CouponController
===========================================

BASE_URL: http://localhost:3000/api/coupons

CREATE NEW COUPON

METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json

BODY (raw JSON):

{
  "code": "WELCOME10",
  "couponName": "Welcome Discount",
  "discountType": "percentage", 
  "discountValue": 10,
  "minOrderAmount": 50,
  "startDate": "2025-11-17T00:00:00.000Z",
  "endDate": "2025-12-31T23:59:59.000Z",
  "usageLimit": 100,
  "isActive": true
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "New coupon is created",
  "coupon": {
    "_id": "COUPON_ID_HERE",
    "code": "WELCOME10",
    "couponName": "Welcome Discount",
    "discountType": "percentage",
    "discountValue": 10,
    "minOrderAmount": 50,
    "startDate": "2025-11-17T00:00:00.000Z",
    "endDate": "2025-12-31T23:59:59.000Z",
    "usageLimit": 100,
    "isActive": true
  }
}


GET ALL COUPONS

METHOD: GET
URL: {{BASE_URL}}

HEADERS: None

EXPECTED RESPONSE:

{
  "success": true,
  "message": "All coupons are fetched",
  "coupons": [
    {
      "_id": "COUPON_ID_HERE",
      "code": "WELCOME10",
      "couponName": "Welcome Discount",
      "discountType": "percentage",
      "discountValue": 10,
      "minOrderAmount": 50,
      "isActive": true
    }
  ]
}


DELETE COUPON

METHOD: DELETE
URL: {{BASE_URL}}/<couponId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Coupon deleted successfully"
}


USE COUPON (Apply coupon for a user)

METHOD: POST
URL: {{BASE_URL}}/<couponId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

BODY (optional):

{}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "You can use coupon"
}


If the coupon usage limit is reached:

{
  "success": false,
  "message": "Coupon reached the limit"
}

NOTES:

• Replace <YOUR_JWT_TOKEN> with a valid JWT from login.
• Replace <couponId> with the coupon ID returned from "Create Coupon" or "Get All Coupons".
• Only authenticated users can use coupons.
• Admin authentication is required to create or delete coupons.