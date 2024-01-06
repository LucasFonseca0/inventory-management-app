// submitButton.jsx
import React from 'react';
import Button from 'react-bootstrap/Button';

function SubmitButton({ onClick, children }) {
  return (
    <>
    <Button as="input" type="submit" value={children} onClick={onClick}/>{' '}
    </>
  );
}

export default SubmitButton;

