===========================================
POSTMAN TESTING — CategoryController
===========================================

BASE_URL: http://localhost:3000/api/categories

CREATE NEW CATEGORY (ADMIN ONLY)

METHOD: POST
URL: {{BASE_URL}}/admin/createCategory

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: multipart/form-data

BODY (form-data):

name: "Fiction"
slug: "fiction"
description: "Books related to fictional stories"
coverImage: <UPLOAD_FILE>


GET ALL CATEGORIES (PUBLIC)

METHOD: GET
URL: {{BASE_URL}}

HEADERS:
None

GET SINGLE CATEGORY

METHOD: GET
URL: {{BASE_URL}}/<categoryId>

EXAMPLE:
http://localhost:3000/api/categories/67c2bc70b3ef043b9ae512a1

HEADERS:
None

UPDATE CATEGORY (ADMIN ONLY)

METHOD: PUT
URL: {{BASE_URL}}/admin/updateCategory/<categoryId>

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: multipart/form-data

BODY (form-data):
(add only fields you want to update)

name: "Updated Fiction"
slug: "updated-fiction"
description: "Updated description"
coverImage: <UPLOAD_FILE> (optional)


DELETE CATEGORY (ADMIN ONLY)

METHOD: DELETE
URL: {{BASE_URL}}/admin/deleteCategory/<categoryId>

EXAMPLE:
http://localhost:3000/api/categories/admin/deleteCategory/67c2bc70b3ef043b9ae512a1

HEADERS:
Authorization: Bearer <YOUR_JWT_TOKEN>

NOTES:

• Admin routes require valid admin JWT token.
• coverImage must be uploaded via form-data.
• slug must be unique.
• Public routes (GET all, GET by ID) do not need authentication.
• Replace <categoryId> with the real ID returned from creation.