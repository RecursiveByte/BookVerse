# Reviews API Documentation

**Base URL:** `/api/review`
**Auth Required:** Yes

---

## 1. Add Review
**POST** `/api/review/add-review` | **Auth Required:** Yes

**Request Body:**
```json
{ "bookId": 1, "rating": 5, "comment": "Great book!" }
```
**Response `201`:**
```json
{ "message": "Review added successfully", "reviewId": 1 }
```
**Errors:** `400` Validation error | `401` Unauthorized | `403` Forbidden | `404` Book not found | `500` Server error

---

## 2. Edit Review
**PUT** `/api/review/edit-review` | **Auth Required:** Yes

**Request Body:**
```json
{ "reviewId": 1, "rating": 4, "comment": "Updated comment" }
```
**Response `200`:** `{ "message": "Review updated successfully" }`

**Errors:** `400` Validation error | `401` Unauthorized | `403` You can only edit your own review | `404` Review not found | `500` Server error

---

## 3. Delete Review
**DELETE** `/api/review/delete-review` | **Auth Required:** Yes

**Request Body:**
```json
{ "reviewId": 1 }
```
**Response `200`:** `{ "message": "Review deleted successfully" }`

**Errors:** `400` Validation error | `401` Unauthorized | `403` You can only delete your own review | `404` Review not found | `500` Server error