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
# 🧑‍💼 Admin Dashboard API

Endpoint khusus untuk **dashboard admin PPDB**.
Digunakan untuk monitoring, filtering, dan analisis data pendaftar.

---

## 🔐 Authorization

Semua endpoint membutuhkan JWT token:

```http
Authorization: Bearer YOUR_TOKEN
```

Role yang diizinkan:

* SUPER_ADMIN
* ADMIN_PPDB
* STAFF


# 🎯 Selection API (Global Ranking & Admission)

Fitur seleksi digunakan untuk menentukan **kelulusan siswa berdasarkan nilai raport**.

⚠️ **Penting:**
Seleksi dilakukan **GLOBAL (tidak per campaign)**.
Semua peserta dari berbagai campaign akan digabung dan diranking bersama.

---

# 🧠 Konsep Seleksi

```text
Semua peserta VERIFIED
        ↓
Hitung rata-rata nilai
        ↓
Ranking global (descending)
        ↓
Ambil sesuai quota sekolah
        ↓
PASSED / FAILED
```

---

# ⚙️ Konfigurasi

Quota kelulusan diambil dari table `Setting`:

```json
{
  "key": "SELECTION_QUOTA",
  "value": "100"
}
```

---

# 🚀 Run Selection

## Endpoint

```http
POST /api/ppdb/selection/run
```

## Authorization

```http
Authorization: Bearer TOKEN
```

Role:

* ADMIN_PPDB
* SUPER_ADMIN

---

## Response

```json
{
  "message": "Global selection completed",
  "total": 120
}
```

---

# 📊 Get Ranking (Global)

## Endpoint

```http
GET /api/ppdb/selection/ranking
```

---

## Response

```json
[
  {
    "id": "reg-1",
    "namaLengkap": "Ikhsan Fahri",
    "selectionScore": 89.5,
    "selectionStatus": "PASSED"
  },
  {
    "id": "reg-2",
    "namaLengkap": "Budi",
    "selectionScore": 70,
    "selectionStatus": "FAILED"
  }
]
```

---

# 📌 Status Kelulusan

| Status  | Keterangan          |
| ------- | ------------------- |
| PENDING | Belum diseleksi     |
| PASSED  | Lulus seleksi       |
| FAILED  | Tidak lulus seleksi |

---

# ⚠️ Business Rules

* Hanya peserta dengan status **VERIFIED** yang ikut seleksi
* Nilai dihitung dari rata-rata semua score
* Campaign **tidak mempengaruhi hasil seleksi**
* Kuota bersifat global (bukan per gelombang)
* Jika tidak ada quota → semua peserta dianggap lolos

---

# 🔍 Contoh Perhitungan

```json
[
  {
    "namaLengkap": "A",
    "scores": [80, 90, 100]
  },
  {
    "namaLengkap": "B",
    "scores": [70, 75, 80]
  }
]
```

### Hasil:

```text
A → 90 (PASSED)
B → 75 (FAILED)
```

---

# 🧠 Future Improvement

* Bobot per subject (weighted score)
* Minimal nilai per mapel
* Multi jalur seleksi (zonasi, prestasi)
* Batch selection (multi tahap)

---

# ✅ Summary

✔ Seleksi global (multi campaign)
✔ Ranking otomatis
✔ Fair & scalable
✔ Siap untuk sistem PPDB real-world

---

# 📊 Dashboard Summary

## Endpoint

```http
GET /api/admin/summary
```

## Response

```json
{
  "registration": {
    "total": 120,
    "verified": 80,
    "pending": 30,
    "rejected": 10
  },
  "payment": {
    "total": 120,
    "paid": 85
  }
}
```

---

# 👥 Registration Management

## 🟢 Get All Registrations

```http
GET /api/admin/registration
```

## Query Params (optional)

```http
?status=PENDING
?campaignId=uuid
?search=ikhsan
```

## Response

```json
[
  {
    "id": "reg-1",
    "namaLengkap": "Ikhsan Fahri",
    "level": "SMP",
    "status": "PENDING",
    "campaign": {
      "name": "Gelombang 1"
    }
  }
]
```

---

## 🔍 Get Registration Detail

```http
GET /api/admin/registration/:id
```

## Response

```json
{
  "id": "reg-1",
  "namaLengkap": "Ikhsan Fahri",
  "status": "PENDING",
  "campaign": {
    "name": "Gelombang 1"
  },
  "documents": [
    {
      "status": "APPROVED",
      "documentType": {
        "name": "Ijazah"
      }
    }
  ],
  "payments": [
    {
      "status": "PAID",
      "amount": 250000
    }
  ],
  "scores": [
    {
      "semester": 7,
      "value": 90,
      "subject": {
        "name": "Matematika"
      }
    }
  ]
}
```

---

# 📁 Document Monitoring

## 📊 Get Document Stats

```http
GET /api/admin/document/stats
```

## Response

```json
{
  "pending": 20,
  "approved": 70,
  "rejected": 10
}
```

---

# 💳 Payment Monitoring

## 📊 Get Payment Stats

```http
GET /api/admin/payment/stats
```

## Response

```json
{
  "pending": 10,
  "paid": 85,
  "failed": 5,
  "expired": 20
}
```

---

# 🔎 Filtering Example

```http
GET /api/admin/registration?status=VERIFIED&search=ikhsan
```

---

# ⚠️ Business Rules

* Data hanya bisa diakses oleh role admin
* Status registration:

  * PENDING
  * VERIFIED
  * REJECTED
* Payment status hanya valid dari webhook
* Document reject wajib memiliki note

---

# 🧠 Use Case Dashboard

Admin dashboard dapat menampilkan:

* 📊 Statistik total pendaftar
* 📈 Grafik pembayaran
* 📁 Status dokumen
* 👥 List siswa (filter + search)
* 📚 Nilai siswa

---