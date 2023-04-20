import React, { useState } from 'react';

function Wizard() {
  const [formData, setFormData] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Send the form data to the backend
    fetch('http://localhost:5000/api/saveWizardData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Pin:
        <input type="password" name="pin" value={formData.pin} onChange={handleInputChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Wizard;
