# 🎬 MovieSearch App

A modern, responsive movie search application built with React, TypeScript, and Tailwind CSS. Search for movies, view details, and manage your favorites with a beautiful dark mode interface.

![MovieSearch App](https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80)

## ✨ Features

- 🔍 Search movies and TV shows
- 🎥 View detailed movie information
- ⭐ Add movies to favorites
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 📊 Movie recommendations
- 🎞️ Trending series section
- 📅 New releases section
- ⭐ Top-rated movies section

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- React Router (for navigation)
- Axios (for API calls)
- Heroicons (for icons)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-search-app.git
cd movie-search-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OMDB API key:
```env
REACT_APP_OMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 📦 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## 🎨 Features in Detail

### Search Functionality
- Search for movies and TV shows
- Filter results by type (movie, series, episode)
- Pagination support
- Real-time search results

### Movie Details
- Comprehensive movie information
- IMDb rating
- Plot summary
- Cast and crew
- Release date
- Runtime
- Genre information

### Favorites Management
- Add/remove movies to favorites
- Persistent storage using localStorage
- Easy access to favorite movies

### UI/UX Features
- Smooth animations and transitions
- Responsive design for all devices
- Dark/Light mode support
- Loading states and error handling
- Beautiful gradients and modern design

## 🧩 Project Structure

```
movie-search-app/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── MovieCard.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── MovieDetails.tsx
│   │   └── Favorites.tsx
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_OMDB_API_KEY=your_api_key_here
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Mobile devices
- Tablets
- Desktop computers
- Large screens

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Watchlist feature
- [ ] Movie reviews and ratings
- [ ] Advanced filtering options
- [ ] Movie recommendations based on favorites
- [ ] Social sharing features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created by **Bhavya code**

---

Made with ❤️ using React, TypeScript, and Tailwind CSS 