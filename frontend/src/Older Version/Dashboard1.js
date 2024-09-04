import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

import ShoppingListPreview from "../Components/Homepage/ShoppingListPreview";
import "../../Styles/Dashboard.css";
import Introduction from "./Introduction1";
import InventoryPreview from "../Components/Homepage/InventoryPreview";
import RecipePreview from "./RecipePreview1";


const Dashboard = () => {
  // Inventory
  const [allItems, setAllItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [expiredItems, setExpiredItems] = useState([]);

  const handleFetchComplete = (items) => {
    setAllItems(items);
    setLowStockItems(
      items.filter((item) => item.quantity < item.optimalStockLevel)
    );
    setExpiredItems(
      items.filter((item) => new Date(item.expirationDate) < new Date())
    );
  };

  const navigate = useNavigate();

  const goToInventory = () => {
    navigate("/inventory"); // Go to inventory page
  };

  const goToShoppingList = () => {
    navigate("/shoppinglist"); // Go to shopping list
  };

  const goToComparePrices = () => {
    navigate("/price-comparison"); // Go to prices
  };

  return (
    <Container className="my-4">
      {/* Welcome Card */}
      <Introduction />

      {/* Inventory and Alerts Section */}
      <Row>
        {/* Inventory */}
        <InventoryPreview onFetchComplete={handleFetchComplete} />

        {/* Total Inventory */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header
              className="card-header"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="View all items in your pantry."
            >
              Total Inventory
            </Card.Header>
            <Card.Body className="inventory-card totalinv">
              <p>{allItems.length} items</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Low Stock Alerts */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Track items that are running low in your pantry."
            >
              Low Stock Alerts
            </Card.Header>
            <Card.Body className="inventory-card danger">
              <p>{lowStockItems.length} items</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Expiration Alerts */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Stay informed about items that are expiring soon."
            >
              Expiration Alerts
            </Card.Header>
            <Card.Body className="inventory-card warning">
              <p>{expiredItems.length} items</p>
            </Card.Body>
          </Card>
        </Col>

        {/* View Details Button */}
        <Col md={12} className="text-center">
          <Button className="view-details-button" variant="primary" size="lg" onClick={goToInventory}>
            View Details
          </Button>
        </Col>
      </Row>

      {/* Shopping List Section */}
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header
              className="text-center card-title"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Keep track of what you need to buy."
            >
              Current Shopping List
            </Card.Header>
            <Card.Body>
              <ShoppingListPreview />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="d-flex justify-content-center align-items-center">
              <Button
                className="mb-3"
                variant="success"
                size="md"
                onClick={goToShoppingList}
              >
                Add Items to Shopping List
              </Button>
              <Button variant="success" size="md" onClick={goToShoppingList}>
                Edit Shopping List
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recipe Section */}
      <Row>
        <Col md={12}>
          <RecipePreview />
        </Col>
        
      </Row>

      {/* Price Comparison Section */}
      <Row>
        <Col md={12}>
          <Card className="card">
            <Card.Header
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Find the best deals for your groceries across different stores."
              className="text-center card-header"
            >
              Price Comparison Summary
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Find the best deals for your groceries across different stores.
                Save money with real-time price comparisons!
              </Card.Text>
              <Button
                variant="primary"
                className="mt-2"
                onClick={goToComparePrices}
              >
                Compare Prices
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
