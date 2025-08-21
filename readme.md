# 🧱 Brickly – Real Estate Web App  

Brickly is a modern real estate platform where users can buy, rent, list, and explore properties with ease.  
It connects property seekers and property owners in one place, providing an interactive and seamless property discovery experience.  

---

## ✨ Features  

- 🔑 **User Authentication** – Secure login & profile management.  
- 🏠 **Property Listings** – Add, update, and manage properties across 4 categories:  
  - Apartment  
  - Condo  
  - House  
  - Land  
- 📌 **Buy or Rent** – Choose between *For Sale* or *For Rent*.  
- 🗺️ **Interactive Map (React Leaflet)** – Discover properties with precise pins using latitude & longitude.  
- 🔍 **Advanced Search & Filters** – Search by category, status, price range, and more.  
- 💾 **Save Properties** – Bookmark properties to user profile.  
- 💬 **In-App Messaging** – Chat directly with property owners.  

---

## 🛠️ Tech Stack  

### Frontend  
- React.js  
- React Router DOM  
- React Query (TanStack Query) – for server state & data fetching  
- React Leaflet (Maps)  
- Tailwind CSS / CSS  

### Backend  
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication & Authorization  
- REST API architecture  

### Other Tools  
- Cloudinary (image storage)  
- dotenv (env configs)  
- Bcrypt (password hashing)  
- Zod (validation)  

---

## ⚙️ Backend Overview  

The backend is built with **Node.js, Express.js, and MongoDB** and serves as the API layer for the frontend.  

### 🔗 API Modules  
- **Auth API** – Register, login, JWT auth.  
- **User API** – Profile, saved posts, listed properties.  
- **Property API** – Create, update, delete, search/filter properties.  
- **Saved Post API** – Save/unsave properties for later.  
- **Message/Chat API** – Messaging system between seeker & owner.  

### 🗄️ Models  
- `User.model.js` – Stores user credentials, profile data, saved posts.  
- `Post.model.js` – Main property listing (apartment, condo, house, land).  
- `PostDetails.model.js` – Extended property details (pricing, status, location).  
- `SavedPost.model.js` – Tracks user-saved properties.  
- `Message.model.js` – Stores individual chat messages.  
- `Chat.model.js` – Manages chat sessions between two users.  

---

## 🎨 Frontend Overview  

The frontend is built using **React.js (with Vite)**.  
It provides the user-facing interface for authentication, property browsing, and messaging, while fetching data from the backend APIs.  

### Key Libraries Used  
- **React Router DOM** → Handles navigation between pages (login, register, dashboard, etc.)  
- **React Query (TanStack Query)** → Efficient API data fetching & caching  
- **React Leaflet** → Interactive property maps  

### 🔗 Frontend Features  
- **Home Page** – Browse latest properties.  
- **Property Details** – View full details of a selected property.  
- **Map View (Leaflet)** – Interactive map with property pins.  
- **Search & Filters** – Filter properties by category, status, price, etc.  
- **User Dashboard** – Manage saved properties & listed properties.  
- **Chat System** – Message property owners in real-time.  

---

## 🚀 Getting Started  

### 📂 Project Structure  


bricky/
│── backend/       # Express.js + Node.js server
│── frontend/      # React.js client with React Query
│── README.md



### Prerequisites  
- Node.js (>= 16) 
- MongoDB  

---

### 🔧 Installation  

```bash
# Clone the repository
git clone https://github.com/adii4040/Brikly

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js (>= 16)  
- MongoDB  

### Installation  

```bash
# Clone the repository
git clone https://github.com/your-username/brickly.git

# Navigate to project folder
cd brickly
```

## 🖥️ Backend Setup

```bash
# Go to backend folder
cd Backend

# Install dependencies
npm install

# Create .env file and configure variables
MONGODB_URL=your_mongodb_connection_string
BASE_URL=your_backend_baseurl
PORT=your_port

ACCESS_TOKEN_SECRET_KEY=your_ACCESS_TOKEN_SECRET_KEY
REFRESH_TOKEN_SECRET_KEY=your_REFRESH_TOKEN_SECRET_KEY


CLOUDINARY_CLOUD_NAME=your_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=your_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=your_CLOUDINARY_API_SECRET


MAILTRAP_SMTP_HOST=your_MAILTRAP_SMTP_HOST
MAILTRAP_SMTP_PORT=your_MAILTRAP_SMTP_PORT
MAILTRAP_SMTP_USER=your_MAILTRAP_SMTP_USER
MAILTRAP_SMTP_PASS=your_MAILTRAP_SMTP_PASS

# Start backend server
npm run dev
```

## 🎨 Frontend Setup

```bash
# Open new terminal and go to frontend folder
cd Frontend

# Install dependencies
npm install

# Start frontend (Vite)
npm run dev
```


### 📌 Roadmap

-  Implement reviews & ratings

-  Add payment integration for rentals & purchases

-  Mobile app support
  
### 🤝 Contributing

Contributions are welcome! Fork the repo and create a PR for review.


### 📜 License

This project is licensed under the MIT License.