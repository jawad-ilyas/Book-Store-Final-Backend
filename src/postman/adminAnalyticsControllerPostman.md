# ===========================================
#      POSTMAN TESTING — AdminAnalyticsController
# ===========================================

BASE_URL: http://localhost:3000/api/admin/analytics

⚠️ NOTE:
Admin analytics should be protected.
Use your Admin JWT Token only.

------------------------------------------------
1) GET ADMIN ANALYTICS (Dashboard Data)
------------------------------------------------
METHOD: GET
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <ADMIN_JWT_TOKEN>

------------------------------------------------
SAMPLE RESPONSE YOU SHOULD EXPECT
------------------------------------------------
{
  "success": true,
  "message": "Admin analytics fetched successfully",
  "data": {
    "totalUsers": 125,
    "totalOrders": 42,
    "dailySales": 3200,
    "monthlySales": 55000,
    "totalIncome": 55000,
    "bestSellingBooks": [
      {
        "_id": "67b2cd123123d2e2f12345ab",
        "title": "Atomic Habits",
        "author": "James Clear"
      }
    ]
  }
}

------------------------------------------------
NOTES
------------------------------------------------
• <ADMIN_JWT_TOKEN> = token from admin login.
• This endpoint is READ-ONLY (you never POST/PUT here).
• Controller automatically computes:
    - daily sales
    - monthly sales
    - best-selling books
    - total orders
    - total users
    - total income
• No body is required for this request.
• Just call this endpoint and you get the entire dashboard analytics.

