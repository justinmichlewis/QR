// Require expresssls
const express = require("express");
const app = express();
const PORT = 3030;
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const axios = require("axios");

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const devices = [
  {
    id: 1,
    name: "Jane Doe",
    org: " ",
    active: "false",
    assigned: "false",
  },
  {
    id: 2,
    name: "John Doe",
    org: "Org2",
    active: "true",
    assigned: "true",
  },
];

// NEW - Add CORS headers - see https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/create", (req, res) => {
  // Create a device
});
app.get("/devices", (req, res) => {
  try {
    res.status(200).json({
      devices,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve all devices",
    });
  }
});
//GET DEVICE
app.get("/devices/:deviceID", (req, res) => {
  const id = parseInt(req.params.deviceID).toString();
  console.log(id);
  try {
    getUserFromDB(id);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve device",
    });
  }
});

//UPDATE DEVICE
app.put("/devices/:deviceID", (req, res) => {
  console.log(req.body);
  try {
    const id = parseInt(req.params.deviceID);
    let device = devices.find((device) => device.id === id);
    if (!device) {
      return res.status(404).json({
        message: "device not found",
      });
    }
    const deviceIDX = devices.indexOf(device);
    devices[deviceIDX].name = req.body.name || devices[deviceIDX].name;
    devices[deviceIDX].org = req.body.org || devices[deviceIDX].org;
    devices[deviceIDX].active = req.body.active || devices[deviceIDX].active;
    devices[deviceIDX].assigned =
      req.body.assigned || devices[deviceIDX].assigned;
    res.status(200).json({
      message: "Successfully updated device",
      device,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve device",
    });
  }
});
app.delete("/delete/:deviceID", (req, res) => {
  // Delete a device by ID
});
app.delete("/devices", (req, res) => {
  // Delete all devices
});

//Use to inteface witih MondgoDB
getUserFromDB = async (deviceId) => {
  const axios = require("axios");
  let data = JSON.stringify({
    collection: "Device_Data_Collection",
    database: "Device_Data",
    dataSource: "Cluster0",
    filter: {
      id: deviceId,
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://data.mongodb-api.com/app/data-lkdot/endpoint/data/v1/action/findOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "6fTAvYQKf4fjqpQLVg8kD6tuyoECEiyQ7JE8zVWJPdYRR3yNyzbDUs94TsEGR4lO",
    },
    data: data,
  };
  await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
