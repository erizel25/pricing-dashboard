# 💰 Pricing Dashboard

A modern admin dashboard for managing products, ingredients, and pricing. Accurately track ingredient prices and calculate product costs in real-time to solve inaccurate pricing issues.

## 🎯 Problem Solved

✅ **Inaccurate Pricing** - Auto-calculate product costs based on current ingredient prices  
✅ **Outdated Prices** - Real-time ingredient price updates  
✅ **Poor Costing** - Transparent cost tracking with profit margin analysis  
✅ **Manual Errors** - Automated calculations eliminate human mistakes  

## ✨ Features

### 📊 Dashboard Overview
- Real-time statistics (products, ingredients, revenue, profit margin)
- Product profitability analysis with charts
- Revenue distribution visualization
- Cost vs Price comparison

### 📦 Product Management
- Add/Edit/Delete products
- Assign multiple ingredients with quantities
- **Auto-calculate product costs** based on ingredient prices
- Track profit margins in real-time
- Automatic updates when ingredient prices change

### 🥘 Ingredient Management
- Add/Edit/Delete ingredients
- Track ingredient prices by supplier
- Multiple unit types (kg, g, liter, ml, dozen, unit)
- Card and table views for easy browsing

### 🎨 User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout (mobile, tablet, desktop)
- Dark sidebar navigation
- Interactive charts (Recharts)
- Modal forms for data entry
- Light and intuitive workflow

## 🛠 Tech Stack

- **Frontend**: React 18.2
- **State Management**: Zustand (lightweight & fast)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite (fast development)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/erizel25/pricing-dashboard.git
cd pricing-dashboard
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000
```

## 📁 Project Structure

```
pricing-dashboard/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── Header.jsx          # Top header
│   │   ├── Modal.jsx           # Reusable modal
│   │   └── StatCard.jsx        # Statistics card
│   ├── pages/
│   │   ├── Dashboard.jsx       # Overview & charts
│   │   ├── Products.jsx        # Product CRUD
│   │   └── Ingredients.jsx     # Ingredient CRUD
│   ├── store/
│   │   └── store.js            # Zustand state management
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 💡 How It Works

### Adding a Product
1. Go to **Products** section
2. Click **Add Product**
3. Enter product name
4. Select ingredients and quantities
5. Set selling price
6. **System automatically calculates cost!**

### Managing Ingredients
1. Go to **Ingredients** section
2. Click **Add Ingredient**
3. Enter: name, price, unit, supplier
4. **All products automatically update!**

### Dashboard Insights
- View statistics at a glance
- Analyze profitability by product
- Monitor cost distribution
- Track revenue trends

## 📐 Cost Calculation Formula

```
Total Product Cost = Σ(Ingredient Price × Quantity)
Profit = Selling Price - Total Cost
Margin% = (Profit / Selling Price) × 100
```

## 🔄 Real-time Updates

When you update an ingredient price, ALL products using that ingredient automatically recalculate their costs. No manual updates needed!

## 📦 Build for Production

```bash
npm run build
```

Output files go to `dist/` directory ready for deployment.

## 🎯 Use Cases

- **Restaurants** - Menu item costing
- **Bakeries** - Recipe costing
- **Manufacturing** - Product cost analysis
- **Food Services** - Pricing optimization
- **Catering** - Event pricing

## 🚧 Future Enhancements

- [ ] Backend API (Node.js/Express)
- [ ] Database persistence (PostgreSQL)
- [ ] User authentication
- [ ] Price history tracking
- [ ] Bulk import/export (CSV)
- [ ] Role-based access
- [ ] Real-time notifications
- [ ] Mobile app

## 📄 License

MIT License - Free to use for your business!

## 🤝 Support

Found a bug? Have a feature request? Create an issue on GitHub!

---

**Built to solve real pricing problems** 💡
