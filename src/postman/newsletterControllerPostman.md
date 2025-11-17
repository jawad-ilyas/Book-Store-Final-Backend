===========================================
POSTMAN TESTING — NewsletterController
===========================================

BASE_URL: http://localhost:3000/api/newsletter

SUBSCRIBE TO NEWSLETTER

METHOD: POST
URL: {{BASE_URL}}/subscribe

HEADERS:
Content-Type: application/json

BODY (raw JSON):

{
  "email": "jawad@example.com"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Email is successfully subscribed",
  "newsLetter": {
    "_id": "NEWSLETTER_ID_HERE",
    "email": "jawad@example.com"
  }
}


If the email already exists:

{
  "success": false,
  "message": "Email is already present"
}


UNSUBSCRIBE FROM NEWSLETTER

METHOD: POST
URL: {{BASE_URL}}/unsubscribe

HEADERS:
Content-Type: application/json

BODY (raw JSON):

{
  "email": "jawad@example.com"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Email is unsuccessfully subscribed",
  "newsLetter": {
    "_id": "NEWSLETTER_ID_HERE",
    "email": "jawad@example.com"
  }
}


If the email does not exist:

{
  "success": false,
  "message": "Email is not present"
}

NOTES:

• subscribe endpoint adds a new email to the newsletter list.
• unsubscribe endpoint removes an existing email from the newsletter list.
• Both endpoints expect a valid email in the request body.
• Content-Type must be application/json.