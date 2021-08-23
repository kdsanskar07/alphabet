const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/compilerdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err && console.error(err);
    console.log("Successfully connected to MongoDB: compilerdb");
  }
);

const { generateFile } = require("./utills/generateFile");
const { addJobToQueue } = require("./jobQueue");
const Job = require('./src/models/Jobs')

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ hello: "world!" });
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  let job;

  try {
    // need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code);
    // write into DB
    const job = await new Job({ language, filepath }).save();
    const jobId = job["_id"];
    addJobToQueue(jobId);
    res.status(201).json({ jobId });
  } catch (err) {
      console.error(err);
  }
});

app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  try{
    const job = await Job.findById(jobId);
    return res.status(200).json({ success: true, job });
  }catch(err){
    return res.status(400).json({ success: false, error: "couldn't find job" });
  }

});

app.listen(5000,err => {
  if(err) {
    console.log('Cannot listen server');
  }
  console.log("Server is running on port 5000.");
});