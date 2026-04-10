const express = require("express");
const router = express.Router();
const person = require("./../models/person");

//Post route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contain the person

    //create a new person document using the database
    const newPerson = new person(data);

    //save the new person in the databaese
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;

    if (["chef", "manager", "waiter"].includes(workType)) {
      const response = await person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalide work type" });
    }
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const upadatedPersonData = req.body;

    const response = await person.findByIdAndUpdate(
      personId,
      upadatedPersonData,
      {
        new: true, // Return the updated validation
        runValidators: true,
      },
    );

    if (!response) {
      return res.status(404).json({ error: "Person data noot found" });
    }

    console.log("data Updated");
    res.status(200).json(response);
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person data noot found" });
    }

    console.log("Data Delete");
    res.status(200).json({ message: "person Data delete Successfull" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
