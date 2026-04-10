# Urban Rental Frontend

A modern React-based frontend application for the Urban Rental car reservation system, built with Vite and Bootstrap 5.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Car Reservations**: Browse and book available vehicles
- **Reservation Management**: View and manage your current and past reservations
- **Admin Panel**: User and vehicle management interface
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Real-time Updates**: Dynamic content rendering with React Context

## 🛠️ Tech Stack

| Technology | Version |
|------------|---------|
| React | ^19.2.0 |
| React DOM | ^19.2.0 |
| React Router DOM | ^7.13.1 |
| Bootstrap | ^5.3.8 |
| React Bootstrap | ^2.10.10 |
| Vite | ^7.3.1 |

## 📁 Project Structure

```
urbanRental-front/
├── src/
│   ├── assets/              # Static assets (images)
│   │   ├── BackgroundPic.png
│   │   └── urbanRentalLogo.png
│   ├── components/          # Reusable UI components
│   │   ├── Card.jsx         # Card display component
│   │   ├── CarTable.jsx     # Table for displaying cars
│   │   ├── Gomb.jsx         # Button component (Hungarian: gomb)
│   │   ├── InputMezo.jsx    # Input field component (Hungarian: inputmező)
│   │   ├── ModalInput.jsx   # Modal with input form
│   │   ├── NavBar.jsx       # Navigation bar component
│   │   └── UserTable.jsx    # Table for displaying users
│   ├── context/             # React Context providers
│   │   └── AuthContext.jsx  # Authentication state management
│   ├── Pages/               # Page components
│   │   ├── Admin.jsx        # Admin dashboard page
│   │   ├── Home.jsx         # Landing/home page
│   │   ├── Login.jsx        # User login page
│   │   ├── MyReservations.jsx #User own reservations
│   │   ├── Register.jsx     # User registration page
│   │   └── ReservationDetail.jsx
│   └── main.jsx             # Application entry point
├── index.html               # HTML template
└── package.json             # Project dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd urbanRental-front
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To check code quality with ESLint:

```bash
npm run lint
```

## 📖 Available Pages

| Page | Description |
|------|-------------|
| `/` | Home/Landing page |
| `/login` | User authentication login |
| `/register` | New user registration |
| `/reservations` | View and manage your reservations |
| `/reservation/:id` | Detailed view of a specific reservation |
| `/admin` | Administrative dashboard |

## 🔌 Backend Integration

This frontend connects to the Urban Rental backend API. Ensure the backend server is running for full functionality.

## 🎨 Design Notes

- Uses Bootstrap 5 for responsive styling
- Custom React components for consistent UI patterns
- Context API for authentication state management
- React Router DOM v7 for navigation

## 📝 Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run lint` | Run ESLint code quality checks |
| `npm run preview` | Preview production build locally |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Urban Rental Development Team

---

*Built with Vite and React*