import React, { useState } from 'react';

const TermsAndConditionsDialog = ({ onAccept, onCancel }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleAccept = () => {
    setIsOpen(false);
    onAccept();
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  return (
    <div className="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <h2>Terms and Conditions</h2>
      <p>By clicking 'Accept', you agree to our terms and conditions.</p>
      <div>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TermsAndConditionsDialog;
