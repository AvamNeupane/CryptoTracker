import React from 'react'; // This imports the React library itself
import ReactDOM from 'react-dom/client'; // This imports the client-specific API for ReactDOM in React 18+
import './index.css'; // Assuming you have an index.css file
import App from './App'; // This imports your main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root for React 18+
root.render(
  <React.StrictMode>
    <App /> {/* Use your App component */}
  </React.StrictMode>
);