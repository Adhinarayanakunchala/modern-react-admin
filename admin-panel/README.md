# Modern React Admin Panel

A modern, responsive React admin panel built with TypeScript, Tailwind CSS, and Framer Motion. Features multiple themes, advanced animations, and a comprehensive dashboard for managing products, users, orders, and more.

## 🚀 Features

- **Modern UI Design**: Built with shadcn/ui components and Tailwind CSS
- **Multiple Themes**: Light, Dark, Green, and System themes
- **Smooth Animations**: Framer Motion animations throughout the application
- **Responsive Design**: Fully responsive and mobile-friendly
- **State Management**: Zustand for efficient state management
- **Data Fetching**: TanStack Query for server state management
- **TypeScript**: Full TypeScript support for type safety
- **Modular Architecture**: Clean, scalable component structure

## 🎨 UI Components

- **shadcn/ui**: Modern, accessible UI components
- **Aceternity UI**: Beautiful animations and effects
- **Lucide React**: Consistent icon system
- **Tailwind CSS**: Utility-first CSS framework

## 📱 Pages & Features

### Authentication
- **Login Page**: Modern login form with animations
- **Forgot Password**: Password reset functionality
- **Demo Credentials**: `admin@example.com` / `password`

### Dashboard
- **Overview Statistics**: Revenue, users, orders, products
- **Charts**: Revenue trends and analytics
- **Recent Orders**: Quick view of latest orders
- **Real-time Updates**: Live dashboard indicators

### Product Management
- **Products**: Add, edit, delete products
- **Categories**: Manage product categories
- **Subcategories**: Organize products with subcategories
- **Inventory**: Track stock levels and SKUs

### User Management
- **Users**: Manage user accounts and permissions
- **Roles**: Admin and user role management
- **Activity**: Track user activities

### Order Management
- **Orders**: View and manage customer orders
- **Status Updates**: Change order status
- **Payment Tracking**: Monitor payment status

### Content Management
- **Banners**: Manage promotional banners
- **Settings**: Configure application settings

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Aceternity UI
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod

## 🎯 Theme System

The admin panel supports multiple themes:

- **Light**: Clean, bright interface
- **Dark**: Dark mode for low-light environments
- **Green**: Nature-inspired green theme
- **System**: Automatically matches system preference

Themes can be switched from the header dropdown menu.

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_APP_NAME=Admin Panel
```

### Customization

#### Colors
Modify theme colors in `src/index.css`:

```css
:root {
  --primary: your-primary-color;
  --secondary: your-secondary-color;
  /* ... */
}
```

#### Components
All UI components are in `src/components/ui/` and can be customized as needed.

## 📱 Responsive Design

The admin panel is fully responsive with:
- **Mobile**: Optimized sidebar and navigation
- **Tablet**: Adaptive layouts
- **Desktop**: Full-featured experience

## 🎨 Animations

Framer Motion animations include:
- **Page Transitions**: Smooth page changes
- **Component Animations**: Fade-in, slide-in effects
- **Hover Effects**: Interactive hover states
- **Loading States**: Skeleton loaders and spinners

## 🔐 Authentication

The authentication system includes:
- **Login Form**: Email/password authentication
- **Forgot Password**: Password reset flow
- **Session Management**: Persistent login state
- **Protected Routes**: Route-level authentication

## 📊 Data Management

### Mock Data
The application includes comprehensive mock data for:
- Products with categories and subcategories
- Users with different roles
- Orders with various statuses
- Banners and promotional content

### API Integration
To integrate with a real API:

1. **Update store actions** in `src/store/`
2. **Add API endpoints** in `src/lib/api.ts`
3. **Configure TanStack Query** hooks

## 🎛️ State Management

### Zustand Stores
- **Auth Store**: User authentication state
- **Theme Store**: Theme preferences
- **UI Store**: UI state (sidebar, filters, view modes)

### TanStack Query
- Server state management
- Caching and synchronization
- Background updates
- Optimistic updates

## 🚀 Deployment

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Deploy
The built files in `dist/` can be deployed to any static hosting service.

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── Layout.tsx     # Main layout component
│   ├── Sidebar.tsx    # Navigation sidebar
│   └── Header.tsx     # Top header
├── pages/             # Page components
├── store/             # Zustand stores
├── lib/               # Utilities and helpers
├── types/             # TypeScript types
└── hooks/             # Custom React hooks
```

## 🎯 Features Roadmap

### Implemented ✅
- [x] Authentication system
- [x] Theme switching
- [x] Responsive design
- [x] Basic navigation
- [x] Dashboard overview
- [x] Animation system

### Coming Soon 🚧
- [ ] Advanced product management
- [ ] Real-time notifications
- [ ] Advanced filters and search
- [ ] Export functionality
- [ ] Charts and analytics
- [ ] File upload system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Aceternity UI](https://ui.aceternity.com/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for icons
