import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import SubmitButton from "../submitButton/submitButton";
import { Link, useNavigate } from "react-router-dom";
import getAllStocks from "../../services/getAllStocks.service";

import styles from "./navbar.module.css";

function NavBar(props) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [stockList, setStocksList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [firstSuggestion, setFirstSuggestion] = useState(null); 

  const LogoutService = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const stocks = await getAllStocks();
      setStocksList(stocks);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (suggestions.length > 0) {
      setFirstSuggestion(suggestions[0]);
    }
  }, [suggestions]);

  const theme = {
    input: "form-control me-2",
    suggestionsList: styles.listGroup,
    suggestionsContainer: styles.suggestionsContainer,
    suggestion: styles.listGroupItem,
    suggestionHighlighted: "active",
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : stockList.filter(
          (stock) =>
            stock.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <Link to={`/stock/${suggestion._id}`} className={styles.suggestion}>
      {suggestion.name}
    </Link>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search",
    value,
    onChange: onChange,
  };

  const handleSearchClick = () => {
    if (firstSuggestion) {
      navigate(`/stock/${firstSuggestion._id}`);
    }
  };

  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <NavDropdown
              title={props.UserName}
              id={`offcanvasNavbarDropdown-expand-${expand}`}
              style={{ fontWeight: "500" }}
            >
              <NavDropdown.Item onClick={LogoutService}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {props.UserName}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/createNewStock">Create Stock</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Autosuggest
                    theme={theme}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                  />
                  <SubmitButton onClick={handleSearchClick}>
                    search
                  </SubmitButton>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;
