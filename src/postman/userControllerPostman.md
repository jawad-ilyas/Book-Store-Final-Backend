# POSTMAN TESTING — UserController

## Base URL
http://localhost:3000/api

css
Copy code

## Authentication
All endpoints require a valid JWT token in the headers:
Authorization: Bearer <token>

yaml
Copy code

---

## 1. Add Books to Wishlist

**Endpoint:** `/wishlist/add`  
**Method:** `POST`

**Headers:**
Content-Type: application/json
Authorization: Bearer <token>

css
Copy code

**Body (JSON):**
```json
{
  "books": ["<bookId1>", "<bookId2>"]
}
Success Response:

Status: 200 OK

json
Copy code
{
  "message": "Books added to wishlist successfully",
  "success": true,
  "wishlist": {
    "userId": "<userId>",
    "books": [
      {
        "_id": "<bookId1>",
        "title": "Book Title 1",
        "author": "Author 1"
      }
    ]
  }
}
Error Responses:

400: Books are required

409: Some books are invalid

2. Remove Books from Wishlist
Endpoint: /wishlist/remove
Method: POST

Headers:

pgsql
Copy code
Content-Type: application/json
Authorization: Bearer <token>
Body (JSON):

json
Copy code
{
  "books": ["<bookId1>", "<bookId2>"]
}
Success Response:

Status: 200 OK

json
Copy code
{
  "message": "Books removed from wishlist successfully",
  "success": true,
  "wishlist": {
    "userId": "<userId>",
    "books": []
  }
}
Error Responses:

400: Books are required

404: Wishlist not found

409: Some books are invalid

3. Add Book to Cart
Endpoint: /cart/add
Method: POST

Headers:

pgsql
Copy code
Content-Type: application/json
Authorization: Bearer <token>
Body (JSON):

json
Copy code
{
  "bookId": "<bookId>",
  "quantity": 2
}
Success Response:

Status: 200 OK

json
Copy code
{
  "message": "Book added to cart successfully",
  "success": true,
  "cart": {
    "userId": "<userId>",
    "items": [
      {
        "bookId": {
          "_id": "<bookId>",
          "title": "Book Title",
          "author": "Author Name"
        },
        "quantity": 2
      }
    ]
  }
}
Error Responses:

400: Book and quantity are required

4. Remove Book from Cart
Endpoint: /cart/remove
Method: POST

Headers:

pgsql
Copy code
Content-Type: application/json
Authorization: Bearer <token>
Body (JSON):

json
Copy code
{
  "bookId": "<bookId>",
  "quantity": 1
}
Success Response:

Status: 200 OK

json
Copy code
{
  "message": "Item removed from cart successfully",
  "success": true,
  "cart": {
    "userId": "<userId>",
    "items": []
  }
}
Error Responses:

400: Book and quantity are required

404: Cart not found

404: Book not found in cart

5. Update Cart Item Quantity
Endpoint: /cart/update
Method: PUT

Headers:

pgsql
Copy code
Content-Type: application/json
Authorization: Bearer <token>
Body (JSON):

json
Copy code
{
  "bookId": "<bookId>",
  "quantity": 3
}
Success Response:

Status: 200 OK

json
Copy code
{
  "success": true,
  "message": "Cart updated successfully",
  "cart": {
    "userId": "<userId>",
    "items": [
      {
        "bookId": "<bookId>",
        "quantity": 3
      }
    ]
  }
}
Error Responses:

400: bookId and valid quantity are required

404: Cart not found

404: Book not found in cart