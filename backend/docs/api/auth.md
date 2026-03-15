# Auth API Documentation

**Base URL:** `/api/auth`

---

## 1. Register
**POST** `/api/auth/register` | **Auth Required:** No

**Request Body:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "John@123" }
```
**Response `201`:** `{ "message": "User registered successfully" }`

**Errors:** `400` Validation error | `409` Email already registered | `500` Server error

---

## 2. Login
**POST** `/api/auth/login` | **Auth Required:** No

**Request Body:**
```json
{ "email": "john@example.com", "password": "John@123", "role": "user" }
```
**Response `200`:**
```json
{ "token": "jwt_token_here", "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "user" } }
```
**Errors:** `400` Validation error | `401` Invalid credentials | `404` User not found | `500` Server error

---

## 3. Google Login
**POST** `/api/auth/google-login` | **Auth Required:** No

**Request Body:** `{ "code": "google_auth_code_here" }`

**Response `200`:**
```json
{ "token": "jwt_token_here", "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "user" } }
```
**Errors:** `400` Validation error | `500` Google login failed

---

## 4. GitHub Login — Get Auth URL
**GET** `/api/auth/github` | **Auth Required:** No

**Response `200`:** `{ "url": "https://github.com/login/oauth/authorize?..." }`

**Errors:** `500` Server error

---

## 5. GitHub Callback
**GET** `/api/auth/github/callback?code=...&state=...` | **Auth Required:** No

**Query Params:** `code` — GitHub OAuth code | `state` — CSRF state token

**Response:** Redirects to `FRONTEND_URL/userDashboard`

**Errors:** `400` Invalid state | `500` GitHub login failed

---

## 6. Logout
**POST** `/api/auth/logout` | **Auth Required:** No

**Response `200`:** `{ "message": "Logout successful" }`

---

## 7. Check Auth
**GET** `/api/auth/check-auth` | **Auth Required:** Yes

**Response `200`:** `{ "isAuthenticated": true, "user": { "id": 1, "role": "user" } }`

**Errors:** `401` Unauthorized: No token provided | `403` Forbidden: Invalid or expired token

---

## 8. Get User Details
**GET** `/api/auth/userDetails` | **Auth Required:** Yes

**Response `200`:**
```json
{ "id": 1, "name": "John Doe", "email": "john@example.com", "role": "user" }
```
**Errors:** `401` Unauthorized | `403` Forbidden | `404` User not found | `500` Server error

---

## 9. Forgot Password — Send OTP
**POST** `/api/auth/forgot-password` | **Auth Required:** No

**Request Body:** `{ "email": "john@example.com" }`

**Response `200`:** `{ "message": "OTP sent successfully" }`

**Errors:** `400` Validation error | `404` User not found | `500` Server error

---

## 10. Reset Password
**POST** `/api/auth/reset-password` | **Auth Required:** No

**Request Body:**
```json
{ "email": "john@example.com", "otp": "123456", "newPassword": "NewPass@123" }
```
**Response `200`:** `{ "message": "Password reset successfully" }`

**Errors:** `400` Validation error | `400` Invalid OTP | `404` OTP not found | `410` OTP expired | `500` Server error