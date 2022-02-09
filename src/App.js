import "./App.css"

import { Box, Grid } from "@mui/material";
import { useState } from "react";
// A function to make requests to our Workers API using a query
const getImages = async (query) => {
  // The base URL for our API
  const url = "https://serverless-api.alex1863.workers.dev";

  const resp = await fetch(url, {
    // Send a POST request
    method: "POST",
    // With a JSON-stringified body containing the query from our input
    body: JSON.stringify({ query }),
    // Set the `Content-type` header so our API knows that the request is sending JSON
    headers: { "Content-type": "application/json" },
  });
  return resp.json();
};

function App() {
  // Store the query that we'll search for in a simple useState hook
  const [query, setQuery] = useState("");
  // Store the array of images from the API in an array
  const [images, setImages] = useState([]);
  // When the search button is clicked, make a request to the API
  // and set the response from it as our images array
  const search = async () => {
    const results = await getImages(query);
    setImages(results);
  };

  const updateQuery = (evt) => setQuery(evt.target.value);

  return (
    <div className="App">
      {/* <Container> */}
      <Box
        margin="20px 20px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <input
          id="query"
          type="text"
          onChange={updateQuery}
          placeholder="Search query"
        ></input>
        <button onClick={search}>Search</button>
      </Box>
      <Grid xs='auto'>
        <Box>
        {images.map((image) => (
            <a href={image.link} key={image.id}>
              <img src={image.image}></img>
            </a>
        ))}
        </Box>
      </Grid>
      {/* </Container> */}
    </div>
  );
}

export default App;
