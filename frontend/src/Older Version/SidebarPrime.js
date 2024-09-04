import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom"; // Import Link
import {
  UserOutlined,
  CarryOutOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  DollarCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    console.log("Sidebar collapsed:", collapsed); // Check the state update
  };

  return (
    <div
      className="sidebar-main"
      style={{ width: collapsed ? "80px" : "200px", transition: "width 0.3s" }}
    >
      <div
        className="logo-sidebar"
        style={{ padding: collapsed ? "10px" : "20px" }}
      >
        {" "}
        {/* Adjust padding for collapsed state */}
        {/* {collapsed ? (
          <span>
            DAPUR<br />MATE
          </span>
        ) : (
          "DAPUR MATE"
        )} */}
        <img
          src="/dapurmateLogo.png"
          alt="Logo"
          style={{
            width: collapsed ? "40px" : "120px", // Adjust size here
            height: "auto",
            transition: "width 0.3s",
          }}
        />
      </div>

      <div className="menu-wrapper">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          inlineCollapsed={collapsed} // Ensure this prop works as expected
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<CarryOutOutlined />}>
            <Link to="/inventory">Inventory Tracker</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
            <Link to="/shopping-list">Shopping List</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ProfileOutlined />}>
            <Link to="/recipe">Recipe Database</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<DollarCircleOutlined />}>
            <Link to="/price-comparison">Price Comparison</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            <Link to="/">Logout</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div
        className="sidebar-footer-button"
        style={{ textAlign: "center", marginTop: "auto" }}
      >
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
