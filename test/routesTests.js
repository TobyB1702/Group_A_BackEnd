const routes = require("../routes.js");
const request = require("supertest");
const express = require("express");
const assert = require("assert");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

describe("Job roles testing", () => {
  it("/getJobRoles return list of roles", done => {
    request(app)
      .get("/getJobRoles")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {

        assert(response.body[0], {
          RoleID: 2,
          RoleName: 'Software Engineer',
          RoleSpec: 'link to spec',
          RoleSpecSummary: 'As a Trainee Software Engineer with Kainos, you will work on projects where you can make a real difference to people’s lives – the lives of people you know.',
          CapabilityName: 'Engineering',
          BandName: 'Trainee'
        })
        done();
      })
      .catch(err => done(err))

  })
})

describe("Job Families Route Testing", () => {
  it("/getJobFamilies return list of job families", done => {
    request(app)
      .get("/getJobFamilies")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert.deepStrictEqual(response.body[0], {
          CapabilityID: 1,
          JobFamilyID: 1,
          JobFamilyName: "Engineering Strategy and Planning",
        })
        done();
      })
      .catch(err => done(err))
  })
})

describe("Bands Route Testing", () => {
  it("/getBands return list of bands", done => {
    request(app)
      .get("/getBands")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert.deepStrictEqual(response.body[0], {
          BandID: 2,
          BandName: 'Apprentice',
          BandLevel: 8,
          Responsibilities: 'As a Apprentince in Kainos, you’ll be responsible for contributing to the development of high-quality solutions to delight our customers and impact the lives of users worldwide. ',
          CompetenciesID: 2
        })
        done();
      })
      .catch(err => done(err))
  })

})

describe("Capability and Job Family endpoint test", () => {
  it("/getCapabilityAndJobFamily return list of relations", done => {
    request(app)
      .get("/getCapabilityAndJobFamily")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert(response.body[0], {
          CapabilityID: 1,
          CapabilityName: 'Engineering',
          JobFamilyName: 'Engineering Strategy and Planning'
        })
        done();
      })
      .catch(err => done(err))

  })

})


describe("Training by band", () => {
  it("/getTrainingByBand return list of trainings by band ", done => {
    request(app)
    .get("/getTrainingByBand")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      assert(response.body[0], {
        BandID: 2,
        BandLevel: 1,
        TrainingType: 'Professional skills',
        BandName: 'Apprentice',
        TrainingName: 'Managing Your Career',
        TrainingLink: 'https://kainossoftwareltd.sharepoint.com/L%26D/SitePages/Managing-Your-Career(4).aspx'
      })
        done();

      })
      .catch(err => done(err))

  })
})

describe("Band Competencies testing", () => {
  it("/getBandCompetencies return list of bands", done => {
    request(app)
      .get("/getBandCompetencies")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert(response.body[0], {
          BandName: 'Trainee',
          BandLevel: 7,
          CompetenciesName: 'Communication & influence, Personal performance, Working with others, Setting direction development & accountability, Supporting & delivering strategy, Commerciality & risk'
        })
        done();
      })
      .catch(err => done(err))
  })
})

describe("Capability and Job Family endpoint test", () => {
  it("/getCapabilityAndJobFamily return list of relations", done => {
    request(app)
      .get("/getCapabilityAndJobFamily")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert(response.body[0], {
          CapabilityID: 1,
          CapabilityName: 'Engineering',
          JobFamilyName: 'Engineering Strategy and Planning'
        })
        done();
      })
      .catch(err => done(err))

  })

})

describe("Band Competencies testing", () => {
  it("/getBandCompetencies return list of bands", done => {
    request(app)
      .get("/getBandCompetencies")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert(response.body[0], {
          BandName: 'Trainee',
          BandLevel: 7,
          CompetenciesName: 'Communication & influence, Personal performance, Working with others, Setting direction development & accountability, Supporting & delivering strategy, Commerciality & risk'
        })
        done();
      })
      .catch(err => done(err))
  })
})


describe("Capability Route Testing", () => {
  it("/getCapabilities return list of job families", done => {
    request(app)
      .get("/getCapabilities")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {

        assert.deepStrictEqual(response.body[0], {
          CapabilityID: 1,
          CapabilityName: 'Engineering',
          CapabilityLeadID: 1
        })
        done();
      })
      .catch(err => done(err))
  })
})

describe("Add role post Route Testing", () => {
  it("/addRole will successfully add a role", done => {
    request(app)
      .post("/addRole")
      .send({
        RoleName: 'TestRole',
        RoleSpec: 'TestLink',
        JobFamilyID: '1',
        BandID: '9'
      })
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        return response.body;
      })
      .then((id) => {
        request(app)
          .post("/deleteRole")
          .send({
            RoleID: id
          })
          .set('Accept', 'application/json')
          .expect("Content-Type", /json/)
          .expect(200)
          .then(response => {
            done();
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
  })
})

describe("Edit role post Route Testing", () => {
  it("/editRole will successfully add and then edit a role and then delete it", done => {
    request(app)
      .post("/addRole")
      .send({
        RoleName: 'TestRole',
        RoleSpec: 'TestLink',
        RoleSpecSummary: 'TestSummary',
        JobFamilyID: '1',
        BandID: '9'
      })
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        return response.body;
      })
      .then((id) => {
        request(app)
          .put("/editRole/"+id)
          .send({
            RoleName: 'EditedRole',
            RoleSpec: 'EditedLink',
            RoleSpecSummary: 'EditedSummary',
            JobFamilyID: '1',
            BandID: '5'
          })
          .set('Accept', 'application/json')
          .expect("Content-Type", /json/)
          .expect(200)
          .then(response => {
            return id;
          }).then((id) => {
            request(app)
              .post("/deleteRole")
              .send({
                RoleID: id
              })
              .set('Accept', 'application/json')
              .expect("Content-Type", /json/)
              .expect(200)
              .then(response => {
                done();
              })
              .catch(err => done(err))
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
  })
})

describe("Add band post Route Testing", () => {
  it("/addBand will successfully add a role", done => {
    request(app)
      .post("/addBand")
      .send({
        BandName: 'TestBand',
        BandLevel: 1,
        CompetencyID: 1,
        Responsibilities: 'Test Responsibility'
      })
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        return response.body;
      })
      .then((id) => {
        request(app)
          .post("/deleteBand")
          .send({
            BandID: id
          })
          .set('Accept', 'application/json')
          .expect("Content-Type", /json/)
          .expect(200)
          .then(response => {
            done();
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
  })
})


describe("Band responsibilites testing", () => {
  it("/getBandResponsibilities return list of band responsibities", done=> {
    request(app)
    .get("/getBandResponsibilities")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      assert(response.body[0], {
        BandID: 2,
        BandName: 'Apprentice',
        BandLevel: '8',
        Responsibilities: 'As a Apprentince in Kainos, you’ll be responsible for contributing to the development of high-quality solutions to delight our customers and impact the lives of users worldwide. ',
      })
      done();
    })
    .catch(err => done(err))

  })
})

describe("Capability Leads testing", () => {
  it("/getCapabilityLeads return list of Capability leads", done=> {
    request(app)
    .get("/getCapabilityLeads")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      assert(response.body[0], {
        CapabilityLeadID: 1,
        CapabilityLeadName: 'Aislinn McBride',
        CapabilityLeadPhoto: 'url',
        CapabilityLeadMessage: 'Capability Lead message',
        CapabilityID: '1',
        CapabilityName: 'Engineering'
      })
      done();
    })
    .catch(err => done(err))

  })
})

describe("Add Capability post Route Testing", () => {
  it("/addCapability will successfully add a Capability", done => {
    request(app)
      .post("/addCapability")
      .send({
        CapabilityName: 'TestCapability',
        CapabilityLeadID: 1
      })
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        return response.body;
      })
      .then((id) => {
        request(app)
          .post("/deleteCapability")
          .send({
            CapabilityID: id
          })
          .set('Accept', 'application/json')
          .expect("Content-Type", /json/)
          .expect(200)
          .then(response => {
            done();
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
  })
})

describe("Edit Capability post Route Testing", () => {
  it("/editCapability will successfully add then edit a Capability and then delete it", done => {
    request(app)
      .post("/addCapability")
      .send({
        CapabilityName: 'TestCapability',
        CapabilityID: '9'
      })
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        return response.body;
      })
      .then((id) => {
        request(app)
          .put("/editCapability/"+id)
          .send({
            CapabilityName: 'EditedCapability',
            CapabilityID: '5'
          })
          .set('Accept', 'application/json')
          .expect("Content-Type", /json/)
          .expect(200)
          .then(response => {
            return id;
          }).then((id) => {
            request(app)
              .post("/deleteCapability")
              .send({
                CapabilityID: id
              })
              .set('Accept', 'application/json')
              .expect("Content-Type", /json/)
              .expect(200)
              .then(response => {
                done();
              })
              .catch(err => done(err))
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
  })
})

describe("Add Job Family Route Testing", () => {
  it("/addJobFamily will successfully add a Job Family", done => {
    request(app)
      .post("/addNewJobFamily")
      .send({
        JobFamilyName: "Unit test",
        CapabilityID: "1"
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        return response.body;
      })
      .then((id) => {
        console.log(id.insertId);
        request(app)
          .post("/deleteJobFamily")
          .send({
            JobFamilyID: id.insertId
          })
          .set('Accept', 'application/json')
          .expect("Content-Type", /json/)
          .expect(200)
          .then(response => {
            done();
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
  })
})
