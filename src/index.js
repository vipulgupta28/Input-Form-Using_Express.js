const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get("/", (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required><br><br>
      
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required><br><br>
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br><br>
      
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, username, password } = req.body;

  // Prepare the data to store
  const userData = `Name: ${name}, Username: ${username}, Password: ${password}\n`;

  // Append data to a file
  fs.appendFile("data.txt", userData, (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).send("An error occurred while saving your data.");
    }
    res.send("Data saved successfully!");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
