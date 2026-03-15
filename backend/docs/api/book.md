# Books API Documentation

**Base URL:** `/api/books`
**Auth Required:** Yes

---

## 1. Get Books With Reviews
**GET** `/api/books/bookReviews` | **Auth Required:** Yes

**Query Params:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| page | number | No | Page number (default: 1, fetches 24 books per request) |
| search | string | No | Search books by title |

**Response `200`:**
```json
{
  "books": [
    {
      "id": 1,
      "title": "Atomic Habits",
      "author": "James Clear",
      "year": 2018,
      "image_url": "https://example.com/image.jpg",
      "totalReviews": 2,
      "reviews": [
        {
          "reviewId": 1,
          "rating": 5,
          "comment": "Great book!",
          "createdAt": "2024-01-01T00:00:00.000Z",
          "reviewedBy": {
            "userId": 1,
            "name": "John Doe",
            "email": "john@example.com"
          }
        }
      ]
    }
  ]
}
```
**Errors:** `401` Unauthorized | `403` Forbidden | `500` Server error

---

## 2. Get Books Count
**GET** `/api/books/getBookCount` | **Auth Required:** Yes

**Query Params:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| search | string | No | Filter count by title search |

**Response `200`:**
```json
{ "totalBooks": 100, "lastPage": 13 }
```
**Errors:** `401` Unauthorized | `403` Forbidden | `500` Server error