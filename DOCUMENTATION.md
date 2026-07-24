# HealthOrbit – Complete Platform Documentation & Guides

## 1. System Architecture Documentation

### Overview
HealthOrbit is a decentralized, secure clinical ledger portal engineered with a full-stack architecture (Express TypeScript server + React 19 SPA frontend with Vite and Tailwind CSS v4). It enforces zero-trust patient-governed data sharing, cryptographic permissioning, and HIPAA-compliant audit trails.

```
+-----------------------------------------------------------------------+
|                          React 19 Frontend Client                      |
| (Patient Dashboard | Doctor Portal | Admin Console | Emergency View)   |
+----------------------------------+------------------------------------+
                                   | HTTP / REST (JWT Auth)
                                   v
+-----------------------------------------------------------------------+
|                       Express TypeScript Server                       |
|  - JWT Middleware & RBAC Router                                      |
|  - Health Record Vault Manager                                       |
|  - Access Request State Machine                                       |
|  - Immutable HIPAA Audit Log Engine                                  |
|  - AI Assistant Handler (Gemini Pro Integration)                     |
+----------------------------------+------------------------------------+
                                   | Read/Write Operations
                                   v
+-----------------------------------------------------------------------+
|                     Persistent JSON Storage Engine                     |
|  - Users Registry                                                     |
|  - Patient Profiles & Emergency Matrices                              |
|  - Doctor Licensing & Hospital Affiliations                           |
|  - Medical Records Metadata & AES Storage Paths                        |
|  - Audit Ledger                                                     |
+-----------------------------------------------------------------------+
```

### Core Architectural Principles
1. **Patient Data Sovereignty**: Patients retain absolute authority over their medical records. Access to sensitive diagnostic records requires explicit patient consent.
2. **Role-Based Access Control (RBAC)**: Strict segregation between Patient, Doctor, and Admin roles.
3. **Emergency Lifesaving View**: Unauthenticated, rate-limited emergency card retrieval designed for EMTs and First Responders using unique emergency keys.
4. **Physician License Whitelisting**: Administrators verify state licenses and hospital affiliations before granting doctors clinical authority.
5. **Immutable Compliance Auditing**: Every data fetch, record creation, access request, and credential approval is logged with timestamp, user ID, role, and client IP address.

---

## 2. Folder Structure Documentation

```
healthorbit/
├── .env.example                # Template for production environment variables
├── .gitignore                  # Git exclusion rules
├── README.md                   # Platform overview and build instructions
├── DOCUMENTATION.md            # Comprehensive architecture, API & user manuals
├── index.html                  # HTML entry point with meta tags & viewport setup
├── metadata.json               # Application metadata and major capabilities
├── package.json                # Dependencies, scripts, and build triggers
├── server.ts                   # Express server entry point & REST API endpoints
├── server-db.ts                # Persistent JSON storage engine & seed data
├── tsconfig.json               # TypeScript compiler config
├── vite.config.ts              # Vite bundler & Tailwind CSS v4 plugin setup
└── src/
    ├── main.tsx                # Client entry point
    ├── App.tsx                 # Root React component & global route switcher
    ├── index.css               # Global CSS & Tailwind CSS v4 directives
    ├── api.ts                  # Axios/Fetch API client wrapper for backend routes
    ├── types.ts                # TypeScript interface & type declarations
    ├── components/             # Shared UI components & Layouts
    │   ├── Sidebar.tsx         # Responsive navigation sidebar
    │   ├── Breadcrumbs.tsx     # Contextual navigation breadcrumbs
    │   ├── PatientDashboard.tsx# Patient portal entry point
    │   ├── DoctorDashboard.tsx # Doctor portal entry point
    │   ├── AdminDashboard.tsx  # Admin portal entry point
    │   ├── EmergencyCard.tsx   # First Responder emergency card modal
    │   └── ui/                 # Reusable atomic UI components (Buttons, GlassCards, Modals)
    └── pages/                  # Page modules categorized by portal domain
        ├── admin/              # Admin console modules (Overview, Verification, Analytics, etc.)
        ├── doctor/             # Doctor portal modules (Patient lookup, Requests, Prescriptions)
        └── patient/            # Patient portal modules (Timeline, Records, Permissions, AI Assistant)
```

---

## 3. API Documentation

### Authentication & User Endpoints
- `POST /api/auth/login`: Authenticates user credentials and returns a JWT token along with user profile metadata.
- `POST /api/auth/register`: Registers a new patient or doctor account with default role assignments.
- `GET /api/auth/me`: Validates session token and returns the active user context.

### Patient & Medical Record Endpoints
- `GET /api/patients/:userId`: Fetches patient profile, emergency contact matrix, and health metrics.
- `PUT /api/patients/:userId`: Updates patient profile, allergies, chronic conditions, and emergency contact details.
- `GET /api/records/:userId`: Retrieves all medical reports owned by or accessible to the user.
- `POST /api/records`: Ingests a new medical record (lab report, scan, prescription) into the ledger.
- `DELETE /api/records/:recordId`: Soft-deletes or revokes a medical record entry.

### Doctor & Access Request Endpoints
- `GET /api/doctors`: Lists registered physicians and their verification status.
- `POST /api/access-requests`: Physician submits a formal access request for a patient's medical records.
- `PUT /api/access-requests/:requestId`: Patient approves, rejects, or revokes a physician access request.

### Emergency Endpoints
- `GET /api/emergency/:emergencyKey`: Retrieves emergency critical data (Blood group, allergies, emergency contacts) without requiring authentication.

### Admin & Compliance Endpoints
- `GET /api/admin/data`: Aggregates platform statistics, pending doctor verifications, patient lists, and audit logs.
- `PUT /api/admin/verify-doctor`: Admin verifies or revokes a physician's medical license.
- `POST /api/admin/hospitals`: Whitelists a new partner hospital or clinic network.
- `GET /api/admin/audit-logs`: Retrieves immutable HIPAA audit logs with CSV export support.

---

## 4. User Guides

### Patient User Guide
1. **Logging In**: Access your account using your email and password.
2. **Medical Timeline**: View all past consultations, lab reports, and prescriptions sorted chronologically.
3. **Uploading Reports**: Click "Upload Record", select category (Lab Report, Scan, Prescription), attach the file, and set sensitivity level.
4. **Managing Permissions**: Navigate to "Access Permissions" to view active doctor access requests. Click "Approve" or "Deny" to grant or revoke clinical viewing rights.
5. **Emergency Key Setup**: Generate your unique Emergency QR/Key and configure emergency contacts, blood group, and allergy list for first responders.
6. **AI Health Assistant**: Chat with HealthOrbit AI for preliminary report summaries and wellness guidance.

### Doctor User Guide
1. **Verification**: Upon registration, submit your state medical license number and affiliated hospital. An admin will review and approve your clinical authority.
2. **Patient Lookup**: Search for patients by ID or name to request medical record viewing clearance.
3. **Access Requests**: Submit access requests specifying reason and required duration. Once approved by the patient, access records under "Active Clearances".
4. **Prescription Management**: Issue digital prescriptions with dosage, frequency, and duration directly to the patient's record ledger.

### Admin User Guide
1. **Executive Overview**: Monitor network growth, pending doctor approvals, and platform health KPIs.
2. **Doctor Verification Console**: Audit physician state license numbers and hospital affiliations before clicking "Approve License".
3. **Hospital Network Whitelist**: Register and manage partner medical facilities.
4. **Audit Trail Inspection**: Review real-time HIPAA compliance logs detailing all user operations, with filtering by role, action, or date, and CSV export.

---

## 5. Deployment & Maintenance Guide

### Deployment Steps
1. Set environment variables in `.env`:
   - `PORT=3000`
   - `NODE_ENV=production`
   - `JWT_SECRET=<your-random-32-char-secret>`
   - `GEMINI_API_KEY=<your-gemini-api-key>`
2. Execute production build:
   ```bash
   npm run build
   ```
3. Launch server:
   ```bash
   npm run start
   ```

### Maintenance Procedures
- **Database Backup**: Periodic automated backups of `db.json` or external database engine.
- **Log Rotation**: Ensure audit logs are archived to cold storage periodically.
- **Security Audit**: Regularly rotate `JWT_SECRET` and verify CORS origin restrictions.
