const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const Service = require("../models/Service");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//** */ POST Business Data?   TESTED! */
router.post("/create", (req, res, next) => {
  const {
    name,
    adminId,
    email,
    //employees: employees,
    location,
  } = req.body;

  Business.findOne({ name: name }).then((foundBusiness) => {
    if (foundBusiness) {
      res.json({
        message:
          "Another business already exists with this name, please choose another!",
      });
    } else {
      const aNewBusiness = new Business({
        admin: adminId,
        name: name,
        email: email,
        //employees: [],
        location: location,
      });

      aNewBusiness
        .save()
        .then(() => {
          res.json({
            message: "Business created, happy days!",
            business: aNewBusiness,
          });
        })
        .catch((error) => {
          res.json({ error: error });
        });
    }
  });
});
//** */ GET Business Data? TESTED! */
router.get("/get-business-data/:adminId", (req, res, next) => {
  Business.find({ admin: req.params.adminId })
    .then((foundBusinesses) => {
      res.json({ foundBusinesses: foundBusinesses });
    })
    .catch((error) => {
      res.json(error);
    });
});
//** */ PUT Business Data? TESTED!*/
router.put("/edit-business-data/:businessId", (req, res, next) => {
  const businessId = req.params.businessId;
  const { name, email, location } = req.body;
  Business.findByIdAndUpdate(
    businessId,
    { name: name, email: email, location: location },
    { new: true }
  )
    .then((updatedBusiness) => {
      res.json({ updatedBusiness: updatedBusiness });
    })
    .catch((error) => {
      res.json(error);
    });
});

//** */ DELETE Business Data? TESTED!*/
router.delete("/delete-business/:businessId", (req, res, next) => {
  const businessId = req.params.businessId;
  Business.findByIdAndDelete(businessId).then((result) => {
    res.json(result).catch((error) => {
      res.json(error);
    });
  });
});

//** POST SERVICES TESTED!*/
router.post("/add-service/:businessOwnerId", (req, res, next) => {
  const businessOwnerId = req.params.businessOwnerId;
  const {
    name,
    description,
    //image: image,
    duration,
    cost,
  } = req.body;

  Service.create({
    business: businessOwnerId,
    name: name,
    description: description,
    duration: duration,
    cost: cost,
  }).then((result) => {
    res.json(result).catch((error) => {
      res.json(error);
    });
  });
});
//** GET SERVICES TESTED!*/
router.get("/get-services/:businessId", (req, res, next) => {
  const businessId = req.params.businessId;
  Service.find({ business: businessId })
    .then((foundServices) => {
      res.json({ foundServices: foundServices });
    })
    .catch((error) => {
      res.json(error);
    });
});

//** PUT SERVICES TESTED!*/
router.put("/edit-service/:serviceId", (req, res, next) => {
  const serviceId = req.params.serviceId;
  const {
    name,
    description,
    //image,
    duration,
    cost,
  } = req.body;
  Service.findByIdAndUpdate(
    serviceId,
    {
      name: name,
      description: description,
      //image: image,
      duration: duration,
      cost: cost,
    },
    { new: true }
  )
    .then((updatedService) => {
      res.json({ updatedService: updatedService });
    })
    .catch((error) => {
      res.json(error);
    });
});

//** DELETE SERVICE TESTED!*/
router.delete("/delete-service/:serviceId", (req, res, next) => {
  const serviceId = req.params.serviceId;
  Service.findByIdAndDelete(serviceId).then((result) => {
    res.json(result).catch((error) => {
      res.json(error);
    });
  });
});

//** POST STAFF MEMEBER */

router.post("/add-employee/:businessId", (req, res, next) => {
  const businessId = req.params.businessId;
  const { username, password } = req.body;

  User.findOne({ username: username }).then((foundUser) => {
    if (foundUser) {
      res.json({ message: "username already exists, please choose another" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewEmployee = new User({
        username: username,
        password: hashPass,
        type: "employee",
      });

      aNewEmployee
        .save()
        .then(() => {
          Business.findByIdAndUpdate(
            { _id: businessId },
            { $push: { employees: aNewEmployee.id } },
            { new: true }
          ).then((res) => {
            res.json("this is from the business update promise");
          });
        })
        .then(
          res.json({
            message: "employee registered!",
            employee: aNewEmployee,
          })
        )
        .catch((error) => {
          res.json(error);
        });
    }
  });
});

// PersonModel.update(
//   { _id: person._id },
//   { $push: { friends: friend } },
//   done
// );

//** GET STAFF MEMEBER */
//** PUT STAFF MEMEBER*/
//** DELETE STAFF MEMEBER*/

module.exports = router;
