# Challenge


# Setup your Node.js backend:
Install Node.js and create a new Node.js project which is called server.js.
Install the required packages, such as express, body-parser, and cors.
Define the REST API endpoints that the React app will use to communicate with the backend.

# Setup your React JS application:
Install React JS and create a new React project using create-react-app.
Install MUI and other necessary packages.
Create the necessary React components.

# Displaying the PDF document:
Use a PDF viewer library like react-pdf to display the PDF document.
Fetch the PDF document from the backend using the REST API endpoint.

# Implementing the signature wizard:
Create a form that collects the user's name and PIN (1337 default).
On form submission, send a POST request to the backend to collect the signature.
Use a library like react-signature-canvas to allow the user to draw their signature.

# Connect the React app to the backend:
Use the fetch API to make HTTP requests to the REST API endpoints defined in the backend.
Handle the responses from the backend and update the React components accordingly.

Start the React project by running the following command in your terminal:

npm start

This will start the React project and now we can see the PDF viewer and signature wizard in our browser.
