===========================================
POSTMAN TESTING — SubscriptionPlanController
===========================================

BASE_URL: http://localhost:3000/api/subscription-plans

CREATE NEW SUBSCRIPTION PLAN

METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_ADMIN_JWT_TOKEN>
Content-Type: application/json

BODY (raw JSON):

{
  "name": "Premium Plan",
  "priceMonthly": 20,
  "priceYearly": 200,
  "featured": ["Unlimited Books", "Priority Support"],
  "isActive": true
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Subscription plan created successfully",
  "subscriptionPlan": {
    "_id": "PLAN_ID_HERE",
    "name": "Premium Plan",
    "priceMonthly": 20,
    "priceYearly": 200,
    "featured": ["Unlimited Books", "Priority Support"],
    "isActive": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}


GET ALL SUBSCRIPTION PLANS

METHOD: GET
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "All subscription plans fetched successfully",
  "subscriptionPlans": [
    {
      "_id": "PLAN_ID_1",
      "name": "Basic Plan",
      "priceMonthly": 10,
      "priceYearly": 100,
      "featured": ["Access to Limited Books"],
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "_id": "PLAN_ID_2",
      "name": "Premium Plan",
      "priceMonthly": 20,
      "priceYearly": 200,
      "featured": ["Unlimited Books", "Priority Support"],
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}


GET SINGLE SUBSCRIPTION PLAN

METHOD: GET
URL: {{BASE_URL}}/<planId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Subscription plan fetched successfully",
  "subscriptionPlan": {
    "_id": "PLAN_ID_HERE",
    "name": "Premium Plan",
    "priceMonthly": 20,
    "priceYearly": 200,
    "featured": ["Unlimited Books", "Priority Support"],
    "isActive": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}


UPDATE SUBSCRIPTION PLAN

METHOD: PUT
URL: {{BASE_URL}}/<planId>

HEADERS:
Authorization: Bearer <YOUR_ADMIN_JWT_TOKEN>
Content-Type: application/json

BODY (JSON):

{
  "name": "Premium Plus Plan",
  "priceMonthly": 25,
  "priceYearly": 250,
  "featured": ["Unlimited Books", "Priority Support", "Offline Access"],
  "isActive": true
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Subscription plan updated successfully",
  "subscriptionPlan": {
    "_id": "PLAN_ID_HERE",
    "name": "Premium Plus Plan",
    "priceMonthly": 25,
    "priceYearly": 250,
    "featured": ["Unlimited Books", "Priority Support", "Offline Access"],
    "isActive": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}


DELETE SUBSCRIPTION PLAN

METHOD: DELETE
URL: {{BASE_URL}}/<planId>

HEADERS:
Authorization: Bearer <YOUR_ADMIN_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Subscription plan deleted successfully"
}

NOTES:

• Replace <YOUR_JWT_TOKEN> or <YOUR_ADMIN_JWT_TOKEN> with the token from login response.
• Replace <planId> with the ID returned from "Create Subscription Plan" or "Get All Plans".
• Only admins should be able to create, update, or delete subscription plans.