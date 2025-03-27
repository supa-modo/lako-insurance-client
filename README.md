# Senior Insurance Policy Analysis System Frontend

This is the frontend for the Senior Insurance Policy Analysis and Comparison System. It provides a user-friendly interface for comparing insurance plans and generating reports.

## Features

- Public interface for insurance plan comparison
- Interactive results page with policy details
- PDF report generation and download
- Admin dashboard for managing the system
- Responsive design for mobile and desktop

## Technologies Used

- React 19 with TypeScript
- Vite for fast development and optimized builds
- Redux Toolkit for state management
- React Router for navigation
- React Hook Form for form handling and validation
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API requests

## Prerequisites

- Node.js 16+
- Backend API (see the server directory)

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd kola-client
npm install
```

### Configuration

Create a `.env` file with the following variables:

```
VITE_API_URL=http://localhost:5000/api
```

### Development

Start the development server:

```bash
npm run dev
```

### Building for Production

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable components
│   ├── layout/       # Layout components
│   └── ...
├── pages/            # Page components
│   ├── public/       # Public-facing pages
│   └── admin/        # Admin pages
├── services/         # API services
├── store/            # Redux store
├── mockData/         # Temporary mock data
├── App.tsx           # Main App component
└── main.jsx          # Entry point
```

## Public Pages

- **Home** (`/`): Landing page with information about the service
- **Comparison** (`/compare`): Form to input user details for insurance comparison
- **Results** (`/results/:id`): Shows comparison results and policy details

## Admin Pages

- **Login** (`/admin`): Admin login page
- **Dashboard** (`/admin/dashboard`): Admin dashboard for managing the system

## Admin Credentials

For testing, you can use the following credentials:

- Email: `admin@kolainsurance.com`
- Password: `admin123`

## License

This project is licensed under the MIT License.
