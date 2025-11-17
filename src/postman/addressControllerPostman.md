# ===========================================
#          POSTMAN TESTING — AddressController
# ===========================================

BASE_URL: http://localhost:3000/api/address

------------------------------------------------
1) CREATE NEW ADDRESS
------------------------------------------------
METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json

BODY (JSON):
{
  "fullName": "Jawad Mughal",
  "phone": "03001234567",
  "street": "House #22, Street 10",
  "city": "Lahore",
  "state": "Punjab",
  "postalCode": "54000",
  "country": "Pakistan",
  "isDefault": true
}

------------------------------------------------
2) GET ALL ADDRESSES (Logged-in User)
------------------------------------------------
METHOD: GET
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

------------------------------------------------
3) GET SINGLE ADDRESS
------------------------------------------------
METHOD: GET
URL: {{BASE_URL}}/<addressId>

EXAMPLE:
http://localhost:3000/api/address/67b260e7c89fba3af2b912f1

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

------------------------------------------------
4) UPDATE ADDRESS
------------------------------------------------
METHOD: PUT
URL: {{BASE_URL}}/<addressId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json

BODY (JSON):
{
  "fullName": "Jawad Ahmed",
  "phone": "03007654321",
  "street": "New House #55, Street 4",
  "city": "Karachi",
  "state": "Sindh",
  "postalCode": "75000",
  "country": "Pakistan",
  "isDefault": false
}

------------------------------------------------
5) SET ADDRESS AS DEFAULT
------------------------------------------------
METHOD: PUT
URL: {{BASE_URL}}/<addressId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json

BODY (JSON):
{
  "isDefault": true
}

------------------------------------------------
6) DELETE ADDRESS
------------------------------------------------
METHOD: DELETE
URL: {{BASE_URL}}/<addressId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

------------------------------------------------
NOTES:
------------------------------------------------
• Replace <YOUR_JWT_TOKEN> with the token from your login response.
• Replace <addressId> with the ID returned from "Create Address" or "Get All Address".
• Controller automatically ensures only ONE default address per user.
• All operations require authentication.
