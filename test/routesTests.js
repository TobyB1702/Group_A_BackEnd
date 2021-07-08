const routes = require("../routes.js");
const request = require("supertest");
const express = require("express");
const assert = require("assert")
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

describe("Job roles testing", () => {
  it("/getJobRoles return list of roles", done=> {
    request(app)
    .get("/getJobRoles")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      console.log(response.body)
      
      assert(response.body[0], {
        RoleID: 2,
        RoleName: 'Software Engineer',
        RoleSpec: 'link to spec',
        CapabilityName: 'Engineering',
        BandName: 'Trainee'
      })
      done();
    })
    .catch(err => done(err))
  
  })

})

describe("Training by band", () => {
  it("/getTrainingByBand return list of trainings by band ", done=> {
    request(app)
    .get("/getTrainingByBand")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      console.log(response.body)
      
      assert(response.body[0], {
        BandID: 1,
        TrainingType: 'Professional skills',
        BandName: 'Trainee',
        TrainingName: 'Training name',
        TrainingLink: 'training link'
      })
      done();
    })
    .catch(err => done(err))
  
  })

})

