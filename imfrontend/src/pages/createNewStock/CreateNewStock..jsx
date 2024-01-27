import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import styles from "./createNewStock.module.css";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import CreateStockService from "../../services/createStock.service";
import { useNavigate } from "react-router-dom";

function CreateStockForm() {
  const [stockName, setStockName] = useState("");
  const [columns, setColumns] = useState([{ key: "", type: "" }]);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleStockNameChange = (event) => {
    setStockName(event.target.value);
  };

  const handleColumnNameChange = (index) => (event) => {
    const newColumns = [...columns];
    newColumns[index].key = event.target.value;
    setColumns(newColumns);
  };

  const handleColumnTypeChange = (index) => (event) => {
    const newColumns = [...columns];
    newColumns[index].type = event.target.value;
    setColumns(newColumns);
  };

  const handleAddColumn = () => {
    setColumns([...columns, { key: "", type: "" }]);
  };

  const handleRemoveColumn = (index) => () => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const columnObject = columns.reduce((obj, column) => {
        obj[column.key] = column.type;
        return obj;
      }, {});
      const StockCreated = await CreateStockService({
        name: stockName,
        itemModel: [...columns],
      });

      if (StockCreated) {
        navigate("/");
      }
    }

    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className={styles.createNewStock}
    >
      <Form.Group controlId="stockName">
        <Form.Label className={styles.formLabel}>
          <h1>Stock Name</h1>
        </Form.Label>
        <Form.Control
          required
          type="text"
          value={stockName}
          onChange={handleStockNameChange}
          placeholder="Enter stock name"
          className={styles.formControl}
        />
        <Form.Control.Feedback type="invalid">
          Please enter the stock name.
        </Form.Control.Feedback>
      </Form.Group>

      {columns.map((column, index) => (
        <InputGroup className={`mb-3 ${styles.inputGroup}`} key={index}>
          <InputGroup.Text>Column {index + 1}</InputGroup.Text>
          <Form.Control
            required
            type="text"
            value={column.key}
            onChange={handleColumnNameChange(index)}
            placeholder="Enter column name"
          />
          <Form.Control.Feedback type="invalid">
            Please enter the column name.
          </Form.Control.Feedback>
          <Form.Control
            as="select"
            value={column.type}
            onChange={handleColumnTypeChange(index)}
            required
          >
            <option value="">Select column type</option>
            <option value="string">Text (string)</option>
            <option value="number">Number (number)</option>
            <option value="boolean">Boolean (boolean)</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select the column type.
          </Form.Control.Feedback>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemoveColumn(index)}
          >
            Remove column
          </Button>
        </InputGroup>
      ))}

      <Button variant="primary" type="button" onClick={handleAddColumn}>
        Add column
      </Button>

      <Button variant="success" type="submit" className="mt-3">
        Create stock
      </Button>
      <h2 className={styles.StockExample}>Stock Example:</h2>
      <Table striped bordered hover className={`mt-3 ${styles.table}`}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={styles.tableTh}>
                {column.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns.map((column, index) => (
              <td key={index} className={styles.tableTd}>
                {column.type === "string" ? (
                  "xxxxxx"
                ) : column.type === "number" ? (
                  "000"
                ) : column.type === "boolean" ? (
                  <AiOutlineCheck />
                ) : (
                  ""
                )}
              </td>
            ))}
          </tr>
          <tr>
            {columns.map((column, index) => (
              <td key={index}>
                {column.type === "string" ? (
                  "xxxxxx"
                ) : column.type === "number" ? (
                  "000"
                ) : column.type === "boolean" ? (
                  <AiOutlineClose />
                ) : (
                  ""
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Form>
  );
}

export default CreateStockForm;
