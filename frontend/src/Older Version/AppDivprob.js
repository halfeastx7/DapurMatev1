import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import LandingPage from "../Components/LandingPage";
import Login from "../Components/Login/Login";
import Inventory from "../Components/Inventory/Inventory";
import ForgotPassword from "../Components/Login/ForgotPassword";
import ResetPassword from "../Components/Login/ResetPassword";
import VerificationSuccess from "../Components/Login/VerificationSuccess";
import VerifyYourEmail from "../Components/Login/VerifyYourEmail";
import PriceComparison from "../Components/PriceComparison/PriceComparison";
import { ShopListWrapper } from "../Components/ShoppingList/ShopListWrapper";
import Recipe from "../Components/Recipe/Recipe";
import RecipeDetail from "../Components/Recipe/RecipeDetail";
import AddRecipe from "../Components/Recipe/AddRecipe";
import Dashboard from "../Components/Homepage/Dashboard";
import Footer from "../Components/LandingPage/Footer";
// SidebarWrapper component to handle sidebar display logic
import './Styles/Recipe.css';
import './Styles/RecipeDetail.css';
import './Styles/AddRecipe.css';
function SidebarWrapper({ children }) {
  const location = useLocation();

  // Define the routes that should display the sidebar
  const sidebarRoutes = [
    "/inventory",
    "/price-comparison",
    "/recipe",
    "/recipe/:id",
    "/add-recipe",
    "/shopping-list",
    "/dashboard",
  ];

  // Check if the current path should show the sidebar
  const shouldShowSidebar = sidebarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="App">
      {/* Conditionally render the Sidebar based on the route */}
      {shouldShowSidebar && <Sidebar />}
      <div className={`content ${shouldShowSidebar ? 'content-sidebar' : 'content-full'}`}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SidebarWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/verify-email" element={<VerifyYourEmail />} />
          <Route path="/verify-success" element={<VerificationSuccess />} />
          <Route path="/verify/:token" element={<VerificationSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/price-comparison" element={<PriceComparison />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/shopping-list" element={<ShopListWrapper />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more routes here as needed */}
        </Routes>
      </SidebarWrapper>
      <Footer />
    </Router>
  );
}

export default App;
