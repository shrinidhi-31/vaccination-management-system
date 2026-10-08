# Vaccination Management System

A comprehensive, full-stack vaccination management platform designed to streamline appointment booking, real-time inventory management, healthcare administrative operations, and automated dose reminders. Built with **Next.js**, **Tailwind CSS**, and **Supabase**.

---

## 🚀 Key Features & Responsibilities

### 👨‍💻 Member 1: Core Integration & Patient Experience ([@shrinidhi-31](https://github.com/shrinidhi-31))
* **Landing Page & Authentication:** Intuitive home landing page with Supabase Auth integration (Login/Register).
* **Patient Dashboard:** Centralized view for active appointments, personal medical details, and digital records.
* **End-to-End Booking Flow:** Seamless step-by-step appointment scheduling, slot selection, and booking confirmation.
* **Vaccination History & Records:** View past vaccinations and access downloadable/viewable digital certificates.
* **Core Integration:** Master branch management, merging, and continuous integration of all project modules.

### 👨‍💻 Member 2: Admin & Healthcare Dashboard ([@sanchitkalyane4-oss](https://github.com/sanchitkalyane4-oss))
* **Metrics & Analytics Overview:** Live counter cards tracking Total Patients, Today's Appointments, Completed Vaccinations, and Pending Requests.
* **Appointment Management:** Daily schedule view with status filtering (`Scheduled`, `Completed`, `Cancelled`).
* **Inventory Tracking:** Real-time vaccine stock monitors and low-stock indicators.
* **Patient Records:** Searchable database of historical patient vaccinations and status updates.

### 👨‍💻 Member 3: Supabase Architecture & Data Layer ([@swaroop-khan](https://github.com/swaroop-khan))
* **Database Design:** Scalable relational schema across 7 tables (`users`, `patients`, `vaccines`, `centers`, `slots`, `appointments`, `vaccination_records`).
* **Security & RLS:** Granular PostgreSQL Row Level Security policies ensuring strict user data isolation.
* **Automation:** Automated database triggers synchronizing `auth.users` with public profiles.
* **Data Layer (`appointmentService.js`):** Modular asynchronous abstraction layer providing CRUD methods for vaccines, centers, slots, bookings, and inventory updates.

### 👨‍💻 Member 4: Center Finder & Smart Dose Reminder ([@vshrivastava176-png](https://github.com/vshrivastava176-png))
* **Vaccination Center Finder:** Interactive location-based center search displaying operational hours, available vaccines, and real-time slot capacities.
* **Smart Dose Reminder:** In-app notification system tracking multi-dose schedules (e.g., Dose 1 ✅ → Dose 2 countdown triggers) to encourage timely immunization.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (React), Tailwind CSS
* **Backend as a Service:** Supabase (PostgreSQL, Supabase Auth, REST API)
* **State & Data Fetching:** Asynchronous JavaScript Service Client (`@supabase/supabase-js`)
* **Version Control:** Git & GitHub

---

## 🗄️ Database Architecture

The system relies on a relational architecture powered by PostgreSQL on Supabase:

[ auth.users ]
      │
      ▼ (Trigger)
  [ users ] ◄───────┐
      │             │
      ▼             │ (Administered By)
  [ patients ]      │
      │             │
      ▼             │
[ appointments ] ───┼──► [ vaccination_records ]
   │      │         │
   │      └─► [ vaccines ]
   │
   └────────► [ slots ] ──► [ centers ]

### Table Overview:
1. **`users`**: Core profile data (Role: `patient`, `admin`, `staff`).
2. **`patients`**: Extended patient details (DOB, Gender, Government ID).
3. **`vaccines`**: Vaccine catalog, dosage rules, and current stock levels.
4. **`centers`**: Vaccination center locations, operating status, and contacts.
5. **`slots`**: Time slots, dates, and maximum capacity limits per center.
6. **`appointments`**: Patient booking records, dose numbers, and statuses.
7. **`vaccination_records`**: Completed vaccination verification and certificate metadata.

---

## ⚙️ Getting Started

### 1. Prerequisites
* Node.js v18.x or higher
* npm or yarn

### 2. Clone the Repository
    git clone https://github.com/shrinidhi-31/vaccination-management-system.git
    cd vaccination-management-system

### 3. Install Dependencies
    npm install

### 4. Configure Environment Variables
Create a `.env.local` file in the root project directory and add your Supabase credentials:

    NEXT_PUBLIC_SUPABASE_URL=https://xpnqbowddgxcxgqnanua.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

### 5. Run the Development Server
    npm run dev

Open http://localhost:3000 in your browser to view the application.

---

## 🧪 Testing the API Connection

To verify that the database and Supabase REST endpoints are online, run the following cURL command in your terminal:

    curl.exe -i "https://xpnqbowddgxcxgqnanua.supabase.co/rest/v1/vaccines?select=*" -H "apikey: YOUR_ANON_KEY" -H "Authorization: Bearer YOUR_ANON_KEY"
