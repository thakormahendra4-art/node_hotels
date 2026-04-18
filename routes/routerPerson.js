const express = require("express");
const router = express.Router();
const person = require("./../models/person");
const {jwtAuthMiddleware,generateToken} = require("./../jwt")

router.get("/", async (req, res) => {
  try {
    const data = await person.find();   // ✅ get all users from DB
     console.log("Data Here");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


//Post route to add a person
router.post("/signup",async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contain the person

    //create a new person document using the database
    const newPerson = new person(data);

    //save the new person in the databaese
    const response = await newPerson.save();
    console.log("data saved");
    const payload = {
      id : response.id,
      username : response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload)
    console.log("Token is:",token);
    res.status(200).json({response:response,token:token});

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// login route
router.post("/login",async (req,res) =>{
    try{
        // Extract username and password from request body
        const {username,password} = req.body

        // Find user by username
        const user = await person.findOne({username:username})

        //If user does not exist or password does not match
        if(!user || !(await user.comparePassword(password))){
          return res.status(401).json({error: "Invalid username or password"})
        }

      //generate token
      const payload ={
        id : user.id,
        username : user.username
      }
      const token = generateToken(payload)

      //return token as response
      res.json({token})
    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
})

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


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
