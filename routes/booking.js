const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const Service = require("../models/Service");
const User = require("../models/User");
const Appointment = require("../models/Appointment");

const sendGridMail = require("@sendgrid/mail");

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/book-appointment/:businessId", (req, res, next) => {
  const businessId = req.params.businessId;
  const {
    duration,
    date,
    start,
    clientFirstName,
    clientLastName,
    clientPhoneNumber,
    clientEmail,
    chosenEmployee,
    chosenService,
  } = req.body;

  const newAppointment = new Appointment({
    business: businessId,
    employee: chosenEmployee,
    duration: duration,
    date: date,
    start: start,
    service: chosenService,
    client: {
      firstName: clientFirstName,
      lastName: clientLastName,
      phone: clientPhoneNumber,
      email: clientEmail,
    },
  });

  const bookingMessage = {
    to: clientEmail,
    from: "bookitgmbh@gmail.com",
    subject: "booking confirmation",
    text: `thank you, your booking has been confirmed for ${date} at ${start}'o clock`,
    html: `<h1>Booking confirmed!</h1>
            <p>Thank you for your booking!</p>
            <p>To cancel your appointment, please click the link below:</p>
            <a href="${process.env.SENDGRID_APP_CANCEL_API}${newAppointment._id}">Cancel Appointment</a>
            `,
  };

  newAppointment
    .save()
    .then(
      res.json({ message: "new appointment created", newApp: newAppointment })
    )
    .then(
      sendGridMail.send(bookingMessage).then((response) => {
        console.log("email has been sent");
      })
    )
    .catch((error) => {
      res.json({ error: error });
    });
});

//**GET ALL APPOINTMENTS OF EMPLOYEE */

router.get("/get-all-appointments/:employeeId", (req, res, next) => {
  const employeeId = req.params.employeeId;
  Appointment.find({ employee: employeeId }).then((foundAppointments) => {
    res.json({ foundAppointments: foundAppointments });
  });
});
router.get(
  "/get-all-appointments/:employeeId/:selectedDate",
  (req, res, next) => {
    const employeeId = req.params.employeeId;
    const selectedDate = req.params.selectedDate;
    Appointment.find({ employee: employeeId, date: selectedDate }).then(
      (foundAppointments) => {
        res.json({ foundAppointments: foundAppointments });
      }
    );
  }
);

//**GET SERVICES USING BUSINESS-ID */

router.get("/get-services/:businessId", (req, res, next) => {
  const businessId = req.params.businessId;
  Business.findById(businessId).then((foundBusiness) => {
    // console.log(
    //   "this is the found business from GET SERVICES: ",
    //   foundBusiness
    // );
    Service.find({ business: foundBusiness._id })
      .then((foundServices) => {
        res.json({ foundServices: foundServices });
      })
      .catch((error) => {
        res.json(error);
      });
  });
});

//** GET EMPLOYEES USING BUSINESS ID */

router.get("/employees/:businessId", (req, res, next) => {
  const businessId = req.params.businessId;
  Business.findById(businessId)
    .populate("employees")
    .then((foundBusiness) => {
      console.log(foundBusiness.employees);
      res.json({ foundStaffMembers: foundBusiness.employees });
    });
});

//**GET BUSINESS DATA */

router.get("/get-business-data/:businessId", (req, res, next) => {
  Business.findById(req.params.businessId)
    .then((foundBusiness) => {
      res.json({ foundBusiness: foundBusiness });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
