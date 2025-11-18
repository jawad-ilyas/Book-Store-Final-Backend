# ===========================================
#        POSTMAN TESTING — AuthController
# ===========================================

BASE_URL: http://localhost:3000/api/auth

------------------------------------------------
1) USER REGISTRATION
------------------------------------------------
METHOD: POST
URL: {{BASE_URL}}/register

HEADERS:
Content-Type: application/json

BODY (raw JSON):
{
  "name": "Jawad Mughal",
  "email": "jawad@example.com",
  "password": "12345678"
}

EXPECTED RESPONSE:
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "67bf12345abc...",
    "name": "Jawad Mughal",
    "email": "jawad@example.com"
  },
  "token": "JWT_TOKEN_HERE"
}

------------------------------------------------
2) USER LOGIN
------------------------------------------------
METHOD: POST
URL: {{BASE_URL}}/login

HEADERS:
Content-Type: application/json

BODY (raw JSON):
{
  "email": "jawad@example.com",
  "password": "12345678"
}

EXPECTED RESPONSE:
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "67bf12345abc...",
    "name": "Jawad Mughal",
    "email": "jawad@example.com"
  },
  "token": "JWT_TOKEN_HERE"
}

------------------------------------------------
3) GET LOGGED-IN USER DETAILS (PROFILE)
------------------------------------------------
METHOD: GET
URL: {{BASE_URL}}/me

HEADERS:
Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>

EXPECTED RESPONSE:
{
  "success": true,
  "message": "User profile fetched",
  "user": {
    "_id": "67bf12345abc...",
    "name": "Jawad Mughal",
    "email": "jawad@example.com",
    "role": "user"
  }
}

------------------------------------------------
4) UPDATE USER PROFILE
------------------------------------------------
METHOD: PUT
URL: {{BASE_URL}}/update

HEADERS:
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

BODY:
{
  "name": "Jawad Updated",
  "email": "jawadupdated@example.com"
}

EXPECTED RESPONSE:
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "67bf12345abc...",
    "name": "Jawad Updated",
    "email": "jawadupdated@example.com"
  }
}

------------------------------------------------
5) CHANGE PASSWORD
------------------------------------------------
METHOD: PUT
URL: {{BASE_URL}}/change-password

HEADERS:
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

BODY:
{
  "oldPassword": "12345678",
  "newPassword": "987654321"
}

EXPECTED RESPONSE:
{
  "success": true,
  "message": "Password changed successfully"
}

------------------------------------------------
6) ADMIN LOGIN (IF APPLICABLE)
------------------------------------------------
METHOD: POST
URL: {{BASE_URL}}/admin/login

HEADERS:
Content-Type: application/json

BODY:
{
  "email": "admin@gmail.com",
  "password": "test"
}

EXPECTED RESPONSE:
{
  "success": true,
  "message": "Admin login successful",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "role": "admin"
  }
}

------------------------------------------------
NOTES
------------------------------------------------
• Store the JWT token from Login for testing other protected routes.
• All protected routes require:
      Authorization: Bearer <TOKEN>
• Make sure your `authMiddleware` is applied to /me, /update, /change-password.
• Use correct URLs from your project router.

