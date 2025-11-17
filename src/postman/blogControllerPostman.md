===========================================
POSTMAN TESTING — BlogController
===========================================

BASE_URL: http://localhost:3000/api/blogs

CREATE NEW BLOG

METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: multipart/form-data

BODY (form-data):

name: "Top 10 Programming Books"
slug: "top-10-programming-books"
content: "This blog covers the top 10 programming books of 2025..."
thumbnail: <upload file>
tags: ["programming", "books", "tech"]
authorId: <USER_ID>


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Blog created successfully",
  "blog": {
    "_id": "BLOG_ID_HERE",
    "name": "Top 10 Programming Books",
    "slug": "top-10-programming-books",
    "content": "This blog covers the top 10 programming books of 2025...",
    "thumbnail": "URL_TO_THUMBNAIL",
    "tags": ["programming", "books", "tech"],
    "authorId": "USER_ID"
  }
}


GET ALL BLOGS

METHOD: GET
URL: {{BASE_URL}}

HEADERS: None

EXPECTED RESPONSE:

{
  "success": true,
  "message": "All blogs fetched successfully",
  "blogs": [
    {
      "_id": "BLOG_ID_HERE",
      "name": "Top 10 Programming Books",
      "slug": "top-10-programming-books",
      "content": "...",
      "thumbnail": "URL_TO_THUMBNAIL",
      "tags": ["programming", "books", "tech"],
      "authorId": "USER_ID"
    }
  ]
}


GET SINGLE BLOG

METHOD: GET
URL: {{BASE_URL}}/<blogId>

EXAMPLE:
http://localhost:3000/api/blogs/64f2345678abcdef12345678

HEADERS: None

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Blog fetched successfully",
  "blog": {
    "_id": "BLOG_ID_HERE",
    "name": "Top 10 Programming Books",
    "slug": "top-10-programming-books",
    "content": "...",
    "thumbnail": "URL_TO_THUMBNAIL",
    "tags": ["programming", "books", "tech"],
    "authorId": "USER_ID"
  }
}


UPDATE BLOG

METHOD: PUT
URL: {{BASE_URL}}/<blogId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: multipart/form-data

BODY (form-data):

name: "Top 10 Programming Books Updated"
content: "Updated content of the blog..."
thumbnail: <upload new file>
tags: ["programming", "books", "2025"]


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Blog updated successfully",
  "blog": {
    "_id": "BLOG_ID_HERE",
    "name": "Top 10 Programming Books Updated",
    "slug": "top-10-programming-books",
    "content": "Updated content of the blog...",
    "thumbnail": "URL_TO_NEW_THUMBNAIL",
    "tags": ["programming", "books", "2025"],
    "authorId": "USER_ID"
  }
}


DELETE BLOG

METHOD: DELETE
URL: {{BASE_URL}}/<blogId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Blog deleted successfully"
}

NOTES:

• Replace <YOUR_JWT_TOKEN> with the token from your login response.
• Replace <blogId> with the ID returned from "Create Blog" or "Get All Blogs".
• Only the author (or admin, if applicable) can update or delete the blog.
• Use multipart/form-data when uploading thumbnail images.