# Movie Search Application 🎬

A modern, responsive movie search application built with React, TypeScript, and Tailwind CSS. Search for movies, view details, and save your favorites!

## Features ✨

- 🔍 Search movies with real-time results
- 🎥 View detailed movie information
- ⭐ Save favorite movies
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 🔄 Infinite scroll pagination
- 🎯 Type filtering (Movies, Series, Episodes)

## Tech Stack 🛠️

- React 19
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Heroicons

## Prerequisites 📋

- Node.js (v14 or higher)
- npm or yarn

## Installation 🚀

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-search-app.git
cd movie-search-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OMDB API key:
```
VITE_OMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure 📁

```
movie-search-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── App.tsx        # Main application component
│   └── index.tsx      # Entry point
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Deployment 🌐

The application is deployed on Netlify. To deploy your own version:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set up environment variables in Netlify:
   - `VITE_OMDB_API_KEY`: Your OMDB API key

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- OMDB API for movie data
- React and TypeScript communities
- Tailwind CSS for styling
