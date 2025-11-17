===========================================
POSTMAN TESTING — ReviewController
===========================================

BASE_URL: http://localhost:3000/api/reviews

CREATE NEW REVIEW

METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json

BODY (raw JSON):

{
  "bookId": "BOOK_ID_HERE",
  "rating": 4,
  "comment": "This book is amazing and highly recommended!"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Review added successfully",
  "review": {
    "_id": "REVIEW_ID_HERE",
    "userId": "USER_ID_HERE",
    "bookId": "BOOK_ID_HERE",
    "rating": 4,
    "comment": "This book is amazing and highly recommended!",
    "createdAt": "...",
    "updatedAt": "..."
  }
}


GET REVIEWS FOR A BOOK

METHOD: GET
URL: {{BASE_URL}}/book/<bookId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Reviews fetched successfully",
  "reviews": [
    {
      "_id": "REVIEW_ID_1",
      "userId": "USER_ID_HERE",
      "bookId": "BOOK_ID_HERE",
      "rating": 5,
      "comment": "Loved this book!",
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "_id": "REVIEW_ID_2",
      "userId": "USER_ID_HERE",
      "bookId": "BOOK_ID_HERE",
      "rating": 4,
      "comment": "Very informative.",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}


GET REVIEW BY ID

METHOD: GET
URL: {{BASE_URL}}/<reviewId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Review fetched successfully",
  "review": {
    "_id": "REVIEW_ID_HERE",
    "userId": "USER_ID_HERE",
    "bookId": "BOOK_ID_HERE",
    "rating": 4,
    "comment": "This book is amazing and highly recommended!",
    "createdAt": "...",
    "updatedAt": "..."
  }
}


UPDATE REVIEW

METHOD: PUT
URL: {{BASE_URL}}/<reviewId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json

BODY (JSON):

{
  "rating": 5,
  "comment": "Updated comment: Absolutely loved it!"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Review updated successfully",
  "review": {
    "_id": "REVIEW_ID_HERE",
    "userId": "USER_ID_HERE",
    "bookId": "BOOK_ID_HERE",
    "rating": 5,
    "comment": "Updated comment: Absolutely loved it!",
    "createdAt": "...",
    "updatedAt": "..."
  }
}


DELETE REVIEW

METHOD: DELETE
URL: {{BASE_URL}}/<reviewId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Review deleted successfully"
}

NOTES:

• Replace <YOUR_JWT_TOKEN> with token from login response.
• Replace <reviewId> with the ID returned from "Create Review".
• Replace <bookId> with the book ID you want reviews for.
• Users can only update or delete their own reviews.