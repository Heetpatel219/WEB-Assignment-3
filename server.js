/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Heet Hiteshbhai Patel Student ID: 144924222 Date: 11-03-2024
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Route for the about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Route for /lego/sets
app.get("/lego/sets", (req, res) => {
  const theme = req.query.theme;

  // Handle theme parameter
  if (theme) {
    // Filter sets based on the theme
    const filteredSets = yourLegoData.filter((set) => set.theme.toLowerCase() === theme.toLowerCase());

    // Respond with filtered sets or 404 if no sets found
    if (filteredSets.length > 0) {
      res.json(filteredSets);
    } else {
      res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    }
  } else {
    // Respond with all sets or 404 if an error occurs
    res.json(yourLegoData);
  }
});

// Route for /lego/sets/:setId
app.get("/lego/sets/:setId", (req, res) => {
  const setId = req.params.setId;

  // Find the set with the given setNum
  const foundSet = yourLegoData.find((set) => set.set_num === setId);

  // Respond with the set or 404 if not found
  if (foundSet) {
    res.json(foundSet);
  } else {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  }
});

// Route for handling 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
