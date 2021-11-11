const express = require("express");
const router = express.Router();

const Business = require("../models/Business");
const Appointment = require("../models/Appointment");

//** GET all appointments for the business*/

router.get("/appointments/:adminId", (req, res, next) => {
  const adminId = req.params.adminId;
  Business.find({ admin: adminId }).then((foundBusinesses) => {
    // res.json({ foundBusinesses: foundBusinesses });
    Appointment.find({ business: foundBusinesses[0]._id })
      .populate("service")
      .populate("employee")
      .then((foundAppointments) => {
        let appointments = foundAppointments.map((app) => {
          return {
            id: app._id,
            date: app.date,
            start: app.start,
            duration: app.duration,
            service: app.service.name,
            cost: app.service.cost,
            client: {
              firstName: app.client.firstName,
              lastName: app.client.lastName,
            },
          };
        });
        res.json({ appointments: appointments });
      });
  });
});

//** POST APPOINTMENT */
//** GET APPOINTMENT */
//** PUT APPOINTMENT */
//** DELETE APPONTMENT */

router.delete("/delete-appointment/:appId", (req, res, next) => {
  const appId = req.params.appId;
  Appointment.findByIdAndDelete(appId).then((response) => {
    res.json({ message: "appointment deleted" });
  });
});

module.exports = router;
