import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import CreateItemService from "../../../services/createItem.service";

export default function NewItem({ stockData, setStockData, setloading }) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [itemValues, setItemValues] = useState({});

  useEffect(() => {
    const initialValues = {};
    stockData.itemModel.forEach((model) => {
      initialValues[model.key] = "";
    });
    setItemValues(initialValues);
  }, [stockData]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateItem = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      //create the item in DB
      setloading(true);
      const ItemCreated = await CreateItemService(stockData._id, itemValues);
      setloading(false);
      if (ItemCreated) {
        setStockData(ItemCreated.data);
      }

      handleClose();
    }
    setValidated(true);
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Create New Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Item</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleCreateItem}>
          <Modal.Body>
            {stockData.itemModel.map((model, j) => (
              <Form.Group key={j}>
                <Form.Label>{model.key}</Form.Label>
                {model.type === "boolean" ? (
                  <Form.Select
                    required
                    onChange={(e) => {
                      setItemValues((previousState) => ({
                        ...previousState,
                        [model.key]: e.target.value === "true",
                      }));
                    }}
                  >
                    <option value="">Select...</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </Form.Select>
                ) : (
                  <Form.Control
                    required
                    type={model.type}
                    onChange={(e) => {
                      if (model.type == "number") {
                        setItemValues((previousState) => ({
                          ...previousState,
                          [model.key]: Number(e.target.value),
                        }));
                      } else {
                        setItemValues((previousState) => ({
                          ...previousState,
                          [model.key]: String(e.target.value),
                        }));
                      }
                    }}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  Please enter a value.
                </Form.Control.Feedback>
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" formNoValidate>
              Create Item
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
