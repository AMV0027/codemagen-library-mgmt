# Library Management System
## Deployed Link 🔗: https://codemagen-lib-mgmt-amv.vercel.app/
## Summary
The Library Management System is a web application designed to manage and organize a collection of books. It allows users to search, filter, and manage books efficiently. The application is built with modern web technologies to ensure a seamless and responsive user experience.

## Tech Stack
- **Frontend Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: SCSS, Bootstrap, React-Bootstrap
- **Form Handling**: React Hook Form
- **Data Generation**: Faker.js (for generating fake book data during testing)
- **Build Tool**: Vite
- **Package Manager**: npm

## Created Functions Using Redux
The application leverages Redux Toolkit for state management. Below are the key functions implemented:

1. **CreateBookReducer**:
   - `loadMyBooks`
   - `addMyBook`
   - `removeMyBook`
   - `updateMyBook`
   - `setSelectedBook`
   - `clearSelectedBook`

2. **LikedBooksReducer**:
   - `loadLikedBooks`
   - `addLikedBook`
   - `removeLikedBook`

3. **LoaderReducer**:
   - `loadBooks`

4. **PageNumberReducer**:
   - `nextPage`
   - `beforePage`
   - `resetPage`

5. **SearchReducer**:
   - `setSearch`
   - `setFilter`
   - `setCategory`
   - `setYear`

## Project Features
- **Search Functionality**: Users can search for books by title or author.
- **Filter Options**: Filter books by category and publication year.
- **Responsive Design**: Ensures a seamless experience across devices.
- **Dynamic Data Handling**: Fetches and displays book data dynamically.
- **State Management**: Efficiently manages application state using Redux Toolkit.
- **Form Handling**: Simplified form creation and validation using React Hook Form.
- **Fake Data Generation**: Uses Faker.js to generate fake book data for testing purposes.

## How to Run
1. Clone the repository.
2. Navigate to the `library-mgmt` directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm run dev`.
5. Open the application in your browser at `http://localhost:3000`.

## Folder Structure
- **src/components**: Contains reusable UI components. Each component has its own SCSS file for styling within its folder.
- **src/features**: Includes Redux slices for state management.
- **src/pages**: Contains page-level components. Each page component has its own SCSS file for styling within its folder.
- **src/assets**: Stores static assets like images and icons.
- **src/styles**: SCSS files for global styling and shared styles.

For more details, refer to the source code and comments within the project.
