# Admin API Documentation

**Base URL:** `/api/admin`
**Auth Required:** Yes (Admin role only)

---

## 1. Upload Books via CSV
**POST** `/api/admin/upload-books-csv` | **Auth Required:** Yes (Admin)

**Request:** `multipart/form-data`
| Field | Type | Description |
|-------|------|-------------|
| file | .csv | CSV with columns: title, author, year, image_url |

**Response `201`:**
```json
{ "message": "CSV processed successfully", "successCount": 10, "failedCount": 2 }
```
**Errors:** `400` CSV file is required | `403` Only admins can upload books | `409` Book already exists in the database | `500` Server error

---

## 2. Edit Book
**PUT** `/api/admin/edit-book` | **Auth Required:** Yes (Admin)

**Request Body:**
```json
{ "book_id": 1, "title": "New Title", "author": "New Author", "year": 2024 }
```
**Response `200`:** `{ "message": "Book updated successfully" }`

**Errors:** `400` Validation error | `403` Only admin can edit books | `404` Book not found | `500` Server error

---

## 3. Delete Book
**DELETE** `/api/admin/delete-book` | **Auth Required:** Yes (Admin)

**Request Body:**
```json
{ "book_id": 1 }
```
**Response `200`:** `{ "message": "Book deleted successfully" }`

**Errors:** `400` Validation error | `403` Only admins can delete books | `404` Book not found | `500` Server error

---

## 4. Get All Users
**GET** `/api/admin/getAllUsers` | **Auth Required:** Yes (Admin)

**Response `200`:**
```json
{ "users": [ { "name": "John Doe", "email": "john@example.com" } ] }
```
**Errors:** `403` Only admins can view users | `500` Server error

---

## 5. Delete User
**DELETE** `/api/admin/deleteUser` | **Auth Required:** Yes (Admin)

**Request Body:**
```json
{ "email": "john@example.com" }
```
**Response `200`:** `{ "message": "User deleted successfully" }`

**Errors:** `400` Email is required | `403` Only admins can delete users | `404` User not found | `500` Server error

---

## 6. Get All Reviews
**GET** `/api/admin/getAllReviews` | **Auth Required:** Yes (Admin)

**Response `200`:**
```json
{
  "reviews": [
    {
      "id": 1,
      "book_id": 2,
      "rating": 5,
      "comment": "Great book!",
      "user": { "email": "john@example.com" }
    }
  ]
}
```
**Errors:** `403` Only admins can view reviews | `500` Server error

---

## 7. Get Stats
**GET** `/api/admin/stats` | **Auth Required:** Yes (Admin)

**Response `200`:**
```json
{
  "totalUsers": 100,
  "totalBooks": 50,
  "totalReviews": 200,
  "recentBooks": [
    { "title": "Atomic Habits", "author": "James Clear", "createdAt": "2024-01-01T00:00:00.000Z" }
  ],
  "recentReviews": [
    {
      "rating": 5,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "book": { "title": "Atomic Habits" },
      "user": { "email": "john@example.com" }
    }
  ]
}
```
**Errors:** `403` Only admins can view stats | `500` Server error