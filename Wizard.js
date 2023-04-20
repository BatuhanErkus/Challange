import React from 'react';
import { makeStyles } from '@mui/styles';
import SignaturePad from 'signature_pad';

const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    width: '100%',
    height: '300px',
    margin: '20px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
}));

function SignatureWizard({ onSubmit }) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [pin, setPin] = React.useState('');
  const [signaturePad, setSignaturePad] = React.useState(null);

  React.useEffect(() => {
    const canvas = document.getElementById('signature-canvas');
    if (canvas) {
      const pad = new SignaturePad(canvas);
      setSignaturePad(pad);
    }
  }, []);
  

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePinChange(event) {
    setPin(event.target.value);
  }

  function handleClear() {
    if (signaturePad) {
      signaturePad.clear();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name && pin === '1337' && signaturePad) {
      const signatureData = signaturePad.toDataURL();
      onSubmit({ name, signatureData });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="pin">PIN:</label>
        <input type="password" id="pin" value={pin} onChange={handlePinChange} />
      </div>
      <div className={classes.canvasContainer}>
        <canvas id="signature-canvas" />
      </div>
      <div>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default SignatureWizard;
