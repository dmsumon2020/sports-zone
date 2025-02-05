# EquiSports - Sports Equipment Online Store

This is an online store for sports accessories where customers can look at, buy, and review different items like sports gear and clothing for various sports. The website will have user login and tools to manage products.

## 🔗 Live URL

[Sports Zone (SPA))](https://cool-quokka-4b3e33.netlify.app/)

---

## 🚀 Technologies Used

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Authentication
- **Hosting:** Netlify (Client-side), Vercel (Server-side)
- **Additional Libraries:** Lottie React, React Awesome Reveal, React Tooltip

---

## 📸 Screenshot

_(Attach a clean screenshot of the project here)_

---

## 🌟 Core Features

- **User Authentication**: Secure login and registration via Firebase, supporting Google Sign-in.
- **Product Management**: Users can add, update, and delete sports equipment.
- **Dynamic Sorting**: Sort products by price (ascending/descending).
- **Private Routes**: Secured access to user-specific pages.
- **Interactive UI**: Dark/light theme toggle and engaging animations.
- **Detailed Product View**: View and purchase sports equipment with customization options.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Error Handling**: Custom 404 page and sweet alert notifications.

---

## 📦 Dependencies

- **React Router Dom**: For routing
- **Firebase**: For authentication
- **Express.js**: Backend framework
- **MongoDB**: Database
- **React Toastify / SweetAlert**: User notifications
- **Lottie React / React Awesome Reveal**: Animations
- **React Tooltip**: Enhanced tooltips

---

## 🛠️ How to Run the Project Locally

### 📌 Prerequisites:

- Install [Node.js](https://nodejs.org/) (Ensure latest LTS version)
- Install [MongoDB](https://www.mongodb.com/try/download/community)
- Clone this repository

### 🚀 Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dmsumon2020/sports-zone.git
   cd sports-zone
   ```

2. **Set up the client-side:**

   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Set up the server-side:**

   ```bash
   cd server
   npm install
   npm run start
   ```

4. **Environment Variables:**

   - Create a `.env` file in the root directory.
   - Add your MongoDB URI and Firebase credentials:
     ```plaintext
     MONGO_URI=your_mongodb_connection_string
     FIREBASE_API_KEY=your_firebase_api_key
     ```

5. **Access the project in your browser:**
   Open [http://localhost:5173](http://localhost:5173) to view the client-side.

---

## 📚 Additional Resources

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [Firebase Authentication](https://firebase.google.com/docs/auth/web/start)
- [Tailwind CSS](https://tailwindcss.com/docs)

Happy coding! 🚀
