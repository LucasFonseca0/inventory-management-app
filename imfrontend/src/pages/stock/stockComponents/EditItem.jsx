import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import DeleteItemService from "../../../services/deleteItem.service";
import ModifyItemService from "../../../services/modifyItem.service";

export default function EditItem({
  item,
  setCurrentItem,
  stockData,
  setShow,
  show,
  setloading,
  setStockData,
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemChanges, setItemChanges] = useState({ ...item, id: undefined });

  //to close the model
  const handleClose = () => {
    setCurrentItem(null);
    setShow(false);
  };
  //to delete the Item
  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };
  //to confirm the delete
  const handleConfirmDelete = async () => {
    setloading(true);
    const newStock = await DeleteItemService(stockData._id, item.id);
    if (newStock) setStockData(newStock.data);
    setloading(false);
    setShowDeleteConfirmation(false);
    handleClose();
  };
  //to update the item
  const handleSaveChanges = async () => {
    setloading(true);
    const stockChanged = await ModifyItemService(
      stockData._id,
      item.id,
      itemChanges
    );

    setloading(false);
    if (stockChanged) setStockData(stockChanged.data);
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit item </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {stockData.itemModel.map((model, j) => (
            <Form.Group key={j}>
              <Form.Label>{model.key}</Form.Label>
              {model.type === "boolean" ? (
                //if Model type == boolean
                <Form.Select
                  defaultValue={item[model.key]}
                  onChange={(e) => {
                    setItemChanges((previousState) => ({
                      ...previousState,
                      [model.key]: e.target.value === "false" ? false : true,
                    }));
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              ) : (
                //if if Model type != boolean
                <Form.Control
                  type={model.type}
                  defaultValue={item[model.key]}
                  onChange={(e) => {
                    if (model.type == "number") {
                      setItemChanges((previousState) => ({
                        ...previousState,
                        [model.key]: Number(e.target.value),
                      }));
                    } else {
                      setItemChanges((previousState) => ({
                        ...previousState,
                        [model.key]: String(e.target.value),
                      }));
                    }
                  }}
                />
              )}
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete Item
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* confirm delete model: */}
      {showDeleteConfirmation && (
        <Modal
          show={showDeleteConfirmation}
          onHide={() => setShowDeleteConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              No
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
