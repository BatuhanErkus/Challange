import React, { useState } from 'react';

function Wizard(props) {
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
    const pin = formData.pin; // Get the pin from the form data
    // Send the form data to the backend
    fetch(`/api/saveWizardData?pin=${pin}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error('Invalid PIN'); // Throw an error if the PIN is incorrect
        }
        return response.json();
      })
      .then(data => {
        props.setWizardData(data);
        if (pin === '1337') {
          props.setPdfUrl(data.url); // Set the PDF URL only if the PIN is correct
        }
      })
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
