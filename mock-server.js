const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 8008;

app.use(express.json());
app.use(cors("*"));

// Path to the JSON file
const dataFilePath = path.join(__dirname, "db.json");

// Helper function to read data from the file
const readDataFromFile = () => {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  }
  return {};
};

// Helper function to write data to the file
const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.use(express.static(path.join(__dirname, "public")));

// Get the data
app.get("/api/", (req, res) => {
  let mockData = readDataFromFile();
  res.json(mockData);
});
app.get("/api/cameras", (req, res) => {
  let mockData = readDataFromFile();
  const result = mockData?.cameras?.map?.((cam) => {
    delete cam.linecrossPolicy;
    return cam;
  });

  res.json({ cameras: result });
});

// Get Line crosses policy
app.get("/api/cameras/:id", (req, res) => {
  let mockData = readDataFromFile();
  const id = req.params.id;
  //linecrossPolicy
  const index = mockData.cameras.findIndex(
    (item) => item.camera.cameraId === id
  );
  const result = mockData.cameras[index];
  res.status(200).json({ linecrossPolicy: result.linecrossPolicy });
});

// Update policy
app.post("/api/cameras", (req, res) => {
  let mockData = readDataFromFile();
  const id = req.body.cameraId;
  const newPolicy = req.body.linecrossPolicy;

  console.log("new policy", newPolicy);
  const index = mockData.cameras.findIndex(
    (item) => item.camera.cameraId === id
  );
  let currentCamera = mockData.cameras[index];
  currentCamera.linecrossPolicy = newPolicy;
  writeDataToFile(mockData);
  res.json({ ok: true });
});

// Delete an item
// app.delete("/api/item/:id", (req, res) => {
//   let mockData = readDataFromFile();
//   const id = req.params.id;
//   mockData.items = mockData.items.filter((item) => item.id !== id);
//   writeDataToFile(mockData);
//   res.status(204).send();
// });

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
