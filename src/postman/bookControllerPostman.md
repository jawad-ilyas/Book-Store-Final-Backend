===========================================
POSTMAN TESTING — BookController
===========================================

BASE_URL: http://localhost:3000/api/books

CREATE NEW BOOK

METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: multipart/form-data

BODY (form-data):

title: "JavaScript Mastery"
author: <AUTHOR_ID>
category: <CATEGORY_ID>
subCategory: "Programming"
price: 25
discountPercent: 10
description: "A complete guide to modern JavaScript."
coverImage: <upload file>
images: <upload multiple files if needed>
stock: 50
publisher: "Tech Books Publishing"
isbn: "978-1234567890"
pages: 450
language: ["English"]
tags: ["javascript", "programming", "web"]
topSeller: true
recommended: true
slug: "javascript-mastery"


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Book created successfully",
  "book": {
    "_id": "BOOK_ID_HERE",
    "title": "JavaScript Mastery",
    "author": "AUTHOR_ID",
    "category": "CATEGORY_ID",
    "subCategory": "Programming",
    "price": 25,
    "discountPercent": 10,
    "description": "A complete guide to modern JavaScript.",
    "coverImage": "URL_TO_COVER_IMAGE",
    "images": ["URL_TO_IMAGE_1", "URL_TO_IMAGE_2"],
    "stock": 50,
    "publisher": "Tech Books Publishing",
    "isbn": "978-1234567890",
    "pages": 450,
    "language": ["English"],
    "tags": ["javascript", "programming", "web"],
    "topSeller": true,
    "recommended": true,
    "slug": "javascript-mastery"
  }
}


GET ALL BOOKS

METHOD: GET
URL: {{BASE_URL}}

HEADERS: None

EXPECTED RESPONSE:

{
  "success": true,
  "message": "All books fetched successfully",
  "books": [
    {
      "_id": "BOOK_ID_HERE",
      "title": "JavaScript Mastery",
      "author": "AUTHOR_ID",
      "category": "CATEGORY_ID",
      "price": 25
    }
  ]
}


GET SINGLE BOOK

METHOD: GET
URL: {{BASE_URL}}/<bookId>

EXAMPLE:
http://localhost:3000/api/books/64f2345678abcdef12345678

HEADERS: None

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Book fetched successfully",
  "book": {
    "_id": "BOOK_ID_HERE",
    "title": "JavaScript Mastery",
    "author": "AUTHOR_ID",
    "category": "CATEGORY_ID",
    "price": 25,
    "coverImage": "URL_TO_COVER_IMAGE",
    "stock": 50
  }
}


UPDATE BOOK

METHOD: PUT
URL: {{BASE_URL}}/<bookId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: multipart/form-data

BODY (form-data):

title: "JavaScript Mastery Updated"
price: 30
stock: 40
coverImage: <upload new file>


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Book updated successfully",
  "book": {
    "_id": "BOOK_ID_HERE",
    "title": "JavaScript Mastery Updated",
    "price": 30,
    "stock": 40,
    "coverImage": "URL_TO_NEW_COVER_IMAGE"
  }
}


DELETE BOOK

METHOD: DELETE
URL: {{BASE_URL}}/<bookId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Book deleted successfully"
}

NOTES:

• Replace <YOUR_JWT_TOKEN> with the token from your login response.
• Replace <bookId>, <AUTHOR_ID>, and <CATEGORY_ID> with the correct IDs from your DB.
• Use multipart/form-data for uploading images (coverImage, images).
• Only authorized users (admin) can create, update, or delete books.