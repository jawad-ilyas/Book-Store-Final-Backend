===========================================
POSTMAN TESTING — AuthorController
===========================================

BASE_URL: http://localhost:3000/api/v1/author

CREATE AUTHOR

METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Content-Type: application/json
Authorization: Bearer <ADMIN_JWT_TOKEN>

BODY (raw JSON):

{
  "name": "J. K. Rowling",
  "bio": "Author of Harry Potter series",
  "photo": "https://example.com/jk.jpg",
  "socialLinks": ["https://twitter.com/jkrowling"]
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Author created successfully",
  "author": {
    "_id": "AUTHOR_ID_HERE",
    "name": "J. K. Rowling",
    "bio": "Author of Harry Potter series",
    "photo": "https://example.com/jk.jpg",
    "socialLinks": ["https://twitter.com/jkrowling"]
  }
}


GET ALL AUTHORS

METHOD: GET
URL: {{BASE_URL}}

HEADERS: None

EXPECTED RESPONSE:

{
  "success": true,
  "message": "All authors fetched successfully",
  "authors": [
    {
      "_id": "AUTHOR_ID_HERE",
      "name": "J. K. Rowling",
      "bio": "Author of Harry Potter series",
      "photo": "https://example.com/jk.jpg",
      "socialLinks": ["https://twitter.com/jkrowling"]
    }
  ]
}


GET SINGLE AUTHOR

METHOD: GET
URL: {{BASE_URL}}/{{authorId}}

HEADERS: None

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Author fetched successfully",
  "author": {
    "_id": "AUTHOR_ID_HERE",
    "name": "J. K. Rowling",
    "bio": "Author of Harry Potter series",
    "photo": "https://example.com/jk.jpg",
    "socialLinks": ["https://twitter.com/jkrowling"]
  }
}


UPDATE AUTHOR

METHOD: PUT
URL: {{BASE_URL}}/{{authorId}}

HEADERS:
Content-Type: application/json
Authorization: Bearer <ADMIN_JWT_TOKEN>

BODY (raw JSON):

{
  "name": "J. K. Rowling Updated",
  "bio": "Updated bio"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Author updated successfully",
  "author": {
    "_id": "AUTHOR_ID_HERE",
    "name": "J. K. Rowling Updated",
    "bio": "Updated bio",
    "photo": "https://example.com/jk.jpg",
    "socialLinks": ["https://twitter.com/jkrowling"]
  }
}


DELETE AUTHOR

METHOD: DELETE
URL: {{BASE_URL}}/{{authorId}}

HEADERS:
Authorization: Bearer <ADMIN_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Author deleted successfully"
}

NOTES

• Store the authorId returned from "Create Author" to use for GET/UPDATE/DELETE.
• All admin-only routes require Authorization header: Bearer <ADMIN_JWT_TOKEN>.
• Use correct BASE_URL according to your local setup.