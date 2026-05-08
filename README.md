# ☕ Ped's Cafe - Premium Coffee & Food Ordering System

Ped's Cafe is a modern, high-performance web application designed for a seamless coffee and food ordering experience. Built with a **Menu-First approach**, this platform prioritizes speed, aesthetics, and user conversion.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

---

## 🚀 Key Features

- **Menu-First Experience:** Instant access to categories and best-selling products from the landing page.
- **Transactional Flow:** Add items to cart and checkout in seconds.
- **Loyalty Program:** Built-in point tracking (e.g., 500 points for 1 free coffee).
- **Flexible Ordering:** Choose between "Dine In" or "Take Away".
- **Real-time Updates:** Order status tracking integrated with Supabase.
- **Admin Dashboard:** Full management of menu items, categories, and order history.
- **Premium UI/UX:** Smooth animations with Framer Motion and a curated color palette.

---

## 🛠️ Tech Stack

- **Frontend:** React.js + TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS
- **State Management:** React Context API (Cart & Auth)
- **Database & Auth:** Supabase
- **Icons:** Lucide React
- **Animations:** Framer Motion

---

## 📂 Project Structure

```text
src/
├── api/          # Supabase services (Menu, Orders, Auth)
├── components/   # Reusable UI components (Buttons, Modals, Cards)
├── lib/          # Context providers & Supabase client
├── pages/        # Main route components (Home, Menu, Admin, Auth)
├── sections/     # Modular page sections (Hero, FeaturedMenu, InfoBanner)
└── types/        # TypeScript interfaces
```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cafe-ped.git
   cd cafe-ped
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy the `.env.example` file to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🗄️ Database Setup (Supabase)

To make the app functional, ensure your Supabase project has the following tables:
- `products`: (id, name, description, price, category, image_url, isPopular, rating)
- `orders`: (id, user_id, status, total_price, order_type, items)
- `profiles`: (id, full_name, points, email)

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ for Ped's Cafe Community.**
