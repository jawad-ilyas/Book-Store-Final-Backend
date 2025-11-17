===========================================
POSTMAN TESTING — BannerController
===========================================

BASE_URL: http://localhost:3000/api/v1/banner

CREATE BANNER

METHOD: POST
URL: {{BASE_URL}}

HEADERS:
Content-Type: multipart/form-data
Authorization: Bearer <ADMIN_JWT_TOKEN>

BODY (form-data):

heroTitle: "Summer Sale"
heroSubtitle: "Up to 50% off"
heroImage: <upload file>
bannerImage: <upload file>
promoText: "Buy Now"
promoLink: "https://example.com/sale"
topSellerBookIds: ["BOOK_ID_1", "BOOK_ID_2"]


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Banner created successfully",
  "banner": {
    "_id": "BANNER_ID_HERE",
    "heroTitle": "Summer Sale",
    "heroSubtitle": "Up to 50% off",
    "heroImage": "URL_TO_HERO_IMAGE",
    "bannerImage": "URL_TO_BANNER_IMAGE",
    "promoText": "Buy Now",
    "promoLink": "https://example.com/sale",
    "topSellerBookIds": ["BOOK_ID_1", "BOOK_ID_2"]
  }
}


GET ALL BANNERS

METHOD: GET
URL: {{BASE_URL}}

HEADERS: None

EXPECTED RESPONSE:

{
  "success": true,
  "message": "All Banners are Fetched",
  "banners": [
    {
      "_id": "BANNER_ID_HERE",
      "heroTitle": "Summer Sale",
      "heroSubtitle": "Up to 50% off",
      "heroImage": "URL_TO_HERO_IMAGE",
      "bannerImage": "URL_TO_BANNER_IMAGE",
      "promoText": "Buy Now",
      "promoLink": "https://example.com/sale",
      "topSellerBookIds": ["BOOK_ID_1", "BOOK_ID_2"]
    }
  ]
}


UPDATE BANNER (TEXT DATA)

METHOD: PUT
URL: {{BASE_URL}}/{{bannerId}}

HEADERS:
Content-Type: application/json
Authorization: Bearer <ADMIN_JWT_TOKEN>

BODY (raw JSON):

{
  "heroTitle": "Winter Sale Updated",
  "promoText": "Shop Now",
  "promoLink": "https://example.com/winter-sale"
}


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Banner updated successfully",
  "banner": {
    "_id": "BANNER_ID_HERE",
    "heroTitle": "Winter Sale Updated",
    "heroSubtitle": "Up to 50% off",
    "heroImage": "URL_TO_HERO_IMAGE",
    "bannerImage": "URL_TO_BANNER_IMAGE",
    "promoText": "Shop Now",
    "promoLink": "https://example.com/winter-sale",
    "topSellerBookIds": ["BOOK_ID_1", "BOOK_ID_2"]
  }
}


UPDATE HERO IMAGE

METHOD: PUT
URL: {{BASE_URL}}/hero-image

HEADERS:
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: multipart/form-data

BODY (form-data):

id: <bannerId>
heroImage: <upload new file>


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Hero image updated successfully",
  "heroImage": "URL_TO_NEW_HERO_IMAGE"
}


UPDATE BANNER IMAGE

METHOD: PUT
URL: {{BASE_URL}}/banner-image

HEADERS:
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: multipart/form-data

BODY (form-data):

id: <bannerId>
bannerImage: <upload new file>


EXPECTED RESPONSE:

{
  "success": true,
  "message": "Banner image updated successfully",
  "bannerImage": "URL_TO_NEW_BANNER_IMAGE"
}


DELETE BANNER

METHOD: DELETE
URL: {{BASE_URL}}/{{bannerId}}

HEADERS:
Authorization: Bearer <ADMIN_JWT_TOKEN>

EXPECTED RESPONSE:

{
  "success": true,
  "message": "Banner deleted successfully"
}

NOTES

• Store the bannerId returned from "Create Banner" to use for GET/UPDATE/DELETE.
• All admin-only routes require Authorization header: Bearer <ADMIN_JWT_TOKEN>.
• Upload images as form-data using key names heroImage and bannerImage.
• For text updates, use JSON body in PUT /banner/:id.