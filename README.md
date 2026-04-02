# Learning Management System (LMS)

A comprehensive frontend platform that connects learners and instructors, enabling course creation, enrollment, and management with role-based access control.

## Overview

This platform allows instructors to offer courses (free or paid) and learners to enroll and start learning. Administrators manage and monitor the entire application.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Form Management:** TanStack Form
- **Validation:** Zod
- **Authentication:** Better-Auth

## Features

### Authentication & Authorization

- **Registration:** Users can register as **learner** or **instructor** roles (admin is pre-seeded in backend)
- **Authentication:** Only verified email addresses can authenticate
- **Authorization:** Role-based access control with public routes available

### Course Management

- **Categories:** Admin-only CRUD operations; accessible to all users for viewing
- **Courses, Modules & Lectures:** Admin-only CRUD operations; accessible to all users for viewing

### Learning Features

- **Enrollment:** Learners can enroll in each course once
- **Payment:** Stripe integration - learners must complete payment to finalize enrollment
- **Favorites:** Learners can save courses to favorites for later enrollment
- **Reviews:** Learners can leave reviews after course completion

### Additional Features

- **Email Service:** Backend email functionality for:
  - OTP verification
  - Password reset
  - Invoice PDF delivery
- **Search:** Search courses by title, description, or category name
- **Filtering:** Filter courses by category title
- **Dashboard:** Role-based dashboard layout with:
  - Proxy file execution on every dashboard access
  - Protected dashboards requiring role-specific access

## Getting Started

### Prerequisites

- Node.js (latest LTS version)
- npm or yarn or pnpm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd learning-management-system
```
