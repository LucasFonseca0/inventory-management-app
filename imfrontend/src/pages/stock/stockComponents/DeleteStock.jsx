import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import styles from "../Stock.module.css";
import DeleteStockService from "../../../services/deleteStock.service";
import { useNavigate  } from 'react-router-dom';





export default function DeleteStock({stockData,setloading}){   
     const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
     const [show, setShow] = useState(false);

     const navigate = useNavigate()
  
    //to close the model
    const handleClose = () => {

      setShow(false);
    };
    //to delete the Item
    const handleDelete = () => {
      setShowDeleteConfirmation(true);
    };
    //to confirm the delete
    const handleConfirmDelete = async () => {
      setloading(true);

    
      const stockDeleted  = await DeleteStockService(stockData._id)
        if(stockDeleted) navigate("/")

      setloading(false);
      setShowDeleteConfirmation(false);
      handleClose();
    };
  
    
    return (
      <>
       <Button variant="danger" onClick={setShow }   className={styles.DeleteStock}>
        Delete Stock
      </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Stock </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Delete the current Stock
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Delete Stock
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
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
            <Modal.Body style={{color: "red", fontWeight:"bolder"}}>Are you sure you want to delete this Stock? You will lose everything it contains.</Modal.Body>
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