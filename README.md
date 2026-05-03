# 🚀 PPDB Backend System

Production-ready backend system for **PPDB (Penerimaan Peserta Didik Baru)**.

---

## 🔥 API Examples

---

# 🔐 AUTH

## 🟢 Login

```http
POST /api/auth/login
```

### Request

```json
{
  "username": "superadmin",
  "password": "admin123"
}
```

### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "mustChangePassword": false
}
```

---

## 🔄 Change Password

```http
POST /api/auth/change-password
```

### Header

```http
Authorization: Bearer TOKEN
```

### Request

```json
{
  "oldPassword": "admin123",
  "newPassword": "newpassword123"
}
```

### Response

```json
{
  "message": "Password updated successfully"
}
```

---

# 🎯 CAMPAIGN

## 🟢 Get All Campaign

```http
GET /api/ppdb/campaign
```

### Response

```json
[
  {
    "id": "uuid",
    "name": "Gelombang 1",
    "price": 250000,
    "isActive": true
  }
]
```

---

## 🔒 Create Campaign

```http
POST /api/ppdb/campaign
```

### Request

```json
{
  "name": "Gelombang 2",
  "price": 300000,
  "startDate": "2026-01-01",
  "endDate": "2026-12-31"
}
```

---

# 📝 REGISTRATION

## 🟢 Register

```http
POST /api/ppdb/registration
```

### Request

```json
{
  "namaLengkap": "Ikhsan Fahri",
  "email": "ikhsan@mail.com",
  "noHp": "08123456789",
  "skwb": "12345678",
  "level": "SMP",
  "campaignId": "uuid"
}
```

### Response

```json
{
  "message": "Registration success",
  "data": {
    "id": "uuid",
    "skwb": "12345678",
    "status": "PENDING"
  }
}
```

---

# 💳 PAYMENT

## 🟢 Get Snap Token

```http
GET /api/ppdb/payment/snap/:registrationId
```

### Response

```json
{
  "token": "snap_token",
  "redirectUrl": "https://app.sandbox.midtrans.com/..."
}
```

---

## 🔔 Webhook (Midtrans)

```http
POST /api/ppdb/payment/webhook
```

### Request

```json
{
  "order_id": "ORDER-123",
  "transaction_status": "settlement",
  "payment_type": "bank_transfer"
}
```

### Response

```json
{
  "message": "OK"
}
```

---

# 📁 DOCUMENT

## 📤 Upload Document

```http
POST /api/ppdb/document/upload
```

### Form Data

```
file: (file)
registrationId: uuid
documentTypeId: uuid
```

### Response

```json
{
  "message": "Upload success",
  "data": {
    "id": "doc-id",
    "status": "PENDING"
  }
}
```

---

## 📄 Get Documents

```http
GET /api/ppdb/document/:registrationId
```

### Response

```json
[
  {
    "id": "doc-id",
    "fileUrl": "uploads/documents/file.jpg",
    "status": "PENDING",
    "documentType": {
      "name": "Ijazah"
    }
  }
]
```

---

## 🔍 Review Document

```http
PATCH /api/ppdb/document/review/:id
```

### Request (APPROVE)

```json
{
  "status": "APPROVED"
}
```

### Request (REJECT)

```json
{
  "status": "REJECTED",
  "note": "File terlalu buram"
}
```

---

# 📚 SUBJECT

## 🟢 Get Subjects

```http
GET /api/ppdb/subject
```

### Response

```json
[
  {
    "id": "sub-1",
    "name": "Matematika"
  }
]
```

---

# 📊 SCORE

## 🟢 Bulk Insert Score

```http
POST /api/ppdb/score/bulk
```

### Request

```json
[
  {
    "registrationId": "uuid",
    "subjectId": "sub-1",
    "semester": 7,
    "value": 90
  }
]
```

### Response

```json
[
  {
    "id": "score-id",
    "value": 90
  }
]
```

---

## 📄 Get Scores

```http
GET /api/ppdb/score/:registrationId
```

### Response

```json
[
  {
    "semester": 7,
    "value": 90,
    "subject": {
      "name": "Matematika"
    }
  }
]
```

---

# ⚠️ BUSINESS RULES

* SD ❌ tidak input nilai
* SMP ✔ semester 7–11
* SMA ✔ semester 1–5
* Payment hanya valid via webhook
* Reject document wajib note

---
