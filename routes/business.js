const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const Service = require("../models/Service");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//** */ POST Business Data?   TESTED! */
router.post("/create", (req, res, next) => {
  const { name, adminId, email, start, finish, location } = req.body;

  Business.findOne({ admin: adminId }).then((foundBusiness) => {
    if (foundBusiness) {
      res.json({
        message:
          "You already have a business created, greed is a daaaaaangerous thingy!",
      });
    } else {
      const aNewBusiness = new Business({
        admin: adminId,
        name: name,
        email: email,
        start: start,
        finish: finish,
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
    .then((foundBusiness) => {
      res.json({ foundBusiness: foundBusiness });
    })
    .catch((error) => {
      res.json(error);
    });
});
//** */ PUT Business Data? TESTED!*/
router.put("/edit-business-data/:businessId", (req, res, next) => {
  const businessId = req.params.businessId;
  const { name, email, location, start, finish } = req.body;
  Business.findByIdAndUpdate(
    businessId,
    {
      name: name,
      email: email,
      location: location,
      start: start,
      finish: finish,
    },
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

  Business.find({ admin: businessOwnerId }).then((foundBusiness) => {
    console.log("this is the foundbusiness", foundBusiness);
    Service.create({
      business: foundBusiness[0]._id,
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
});
//** GET SERVICES TESTED!*/
router.get("/get-services/:businessOwnerId", (req, res, next) => {
  const businessOwnerId = req.params.businessOwnerId;
  Business.find({ admin: businessOwnerId }).then((foundBusiness) => {
    // console.log(
    //   "this is the found business from GET SERVICES: ",
    //   foundBusiness[0]
    // );
    Service.find({ business: foundBusiness[0]._id })
      .then((foundServices) => {
        res.json({ foundServices: foundServices });
      })
      .catch((error) => {
        res.json(error);
      });
  });
});

router.get("/get-single-service/:serviceId", (req, res, next) => {
  const serviceId = req.params.serviceId;
  Service.findById(serviceId).then((foundService) => {
    res.json({ foundService: foundService });
  });
});

//** PUT SERVICES TESTED!*/
router.put("/edit-service/:serviceId", (req, res, next) => {
  const serviceId = req.params.serviceId;
  const { name, description, image, duration, cost } = req.body;
  Service.findByIdAndUpdate(
    serviceId,
    {
      name: name,
      description: description,
      image: image,
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

//** POST STAFF MEMEBER TESTED!*/

router.post("/add-employee/:businessAdminId", (req, res, next) => {
  const businessAdminId = req.params.businessAdminId;
  const { firstName, lastName, username, password, email } = req.body;

  User.findOne({ username: username }).then((foundUser) => {
    if (foundUser) {
      res.json({ message: "username already exists, please choose another" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewEmployee = new User({
        username: username,
        password: hashPass,
        firstName: firstName,
        lastName: lastName,
        email: email,
        type: "employee",
      });

      aNewEmployee
        .save()
        .then(() => {
          Business.findOneAndUpdate(
            { admin: businessAdminId },
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

//** GET STAFF MEMEBERS TESTED!*/

router.get("/staff-members/:businessAdminId", (req, res, next) => {
  const businessAdminId = req.params.businessAdminId;
  Business.find({ admin: businessAdminId })
    .populate("employees")
    .then((foundBusiness) => {
      console.log(foundBusiness[0].employees);
      res.json({ foundStaffMembers: foundBusiness[0].employees });
    });
});
//** PUT STAFF MEMEBER*/
router.put("/edit-employee/:employeeId", (req, res, next) => {
  const employeeId = req.params.employeeId;
  const { firstName, lastName, username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  User.findByIdAndUpdate(
    employeeId,
    {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashPass,
    },
    { new: true }
  ).then((updatedEmployee) => {
    res.json({ updatedEmployee: updatedEmployee });
  });
});
//** DELETE STAFF MEMEBER TESTED!*/

router.delete("/delete-employee/:employeeId", (req, res, next) => {
  const employeeId = req.params.employeeId;

  User.findByIdAndDelete(employeeId)
    .then((updatedEmployee) => {
      res.json("employee deleted");
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
