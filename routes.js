const express = require('express');
const router = express.Router()
const cors = require('cors');
const dbconnection = require('./dbconnection.js');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use(cors());

const { JWT, JWTscopes } = require('./jwt')
const jwksRsa = require('jwks-rsa');

const checkJwt = JWT({
    secret:  jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:`https://dev-lager9zv.us.auth0.com/.well-known/jwks.json`
    }),
    audience: `http://my.api:50001`,
    issuer: [`https://dev-lager9zv.us.auth0.com/`],
    algorithms: ['RS256']
});

const checkScopes = JWTscopes(['read:secured']);
const adminCheckScopes = JWTscopes(['read:secured', 'write:secured'], {checkAllScopes: true})

router.get("/", (req, res) => {
    res.json({ hello: "world" });
});

router.get("/getJobRoles", checkJwt, checkScopes, async (req, res) => {
    res.json(await dbconnection.getJobRoles());
})

router.get("/getJobFamilies", async (req, res) => {
    res.json(await dbconnection.getJobFamilies());
})

router.get("/getCapabilities", async (req, res) => {
    res.json(await dbconnection.getCapabilities());
})

router.get("/getBands", async (req, res) => {
    res.json(await dbconnection.getBands());
})

router.get("/getBandResponsibilities", async (req, res) => {
    res.json(await dbconnection.getBandResponsibilities());
})

router.get("/getCapabilityAndJobFamily", async (req, res) => {
    res.json(await dbconnection.getCapabilityAndJobFamily());
})

router.get("/getTrainingByBand", async (req, res) => {
    res.json(await dbconnection.getTraingByBand())
})

router.get("/getBandCompetencies", async (req, res) => {
    res.json(await dbconnection.getBandCompetencies());
})

router.get("/getTrainings", async (req, res) => {
    res.json(await dbconnection.getTrainings())
})

router.get("/getCompetencies", async (req, res) => {
    res.json(await dbconnection.getCompetencies());
})

router.get("/getCapabilityLeads", async (req, res) => {
    res.json(await dbconnection.getCapabilityLeads());
})

router.get("/getRoleWithCapabilityID/:id", async (req, res) => {
    res.json(await dbconnection.getRoleWithCapabilityID(req.params.id));
})

router.post("/addRole", async (req, res) => {
    let result;
    if (req.body.RoleName === "" || req.body.RoleSpec === "" || req.body.JobFamilyID === "" || req.body.BandID === "" || req.body.RoleSpecSummary === "") {
        result = {error: "Empty inputs"}
    } else {
        result = await dbconnection.addRole(req.body);
    }
    res.json(result);
})

router.put("/editRole/:id", async (req, res) => {
    let result;
    if (req.body.RoleName === "" || req.body.RoleSpec === "" || req.body.JobFamilyID === "" || req.body.BandID === "" || req.body.RoleSpecSummary === "") {
        result = {error: "Empty inputs"}
    } else {
        result = await dbconnection.editRole(req.body, req.params.id);
    }
    res.json(result);
})

router.post("/deleteRole", async (req, res) => {
    let result = await dbconnection.deleteRole(req.body.RoleID);
    res.json(result);
})

router.post("/addNewJobFamily", async (req, res) => {
  let result;
  if (req.body.JobFamilyName === "" || req.body.CapabilityID === "") {
      result = "Bad request"
  } else {
      result = await dbconnection.addJobFamily(req.body);
  }
  res.json(result);
})

router.post("/deleteJobFamily", async (req, res) => {
   let result;
   result = await dbconnection.deleteJobFamily(req.body.JobFamilyID);
   res.json(result);
})

router.post("/deleteBand", async (req, res) => {
    let result = await dbconnection.deleteBand(req.body.BandID);1
    res.json(result);
})

router.post("/addBand", async (req, res) => {
    let result;
    let insertId;
    if (req.body.BandName === "" || req.body.BandLevel === "" || req.body.CompetencyID === "" || req.body.Responsibilities === "") {
        result = "Bad request"
        console.log("bad request")
    } else {
        console.log("Adding Band")
        insertId = await dbconnection.addBand(
            {
                BandName: req.body.BandName,
                BandLevel: req.body.BandLevel,
                CompetenciesID: req.body.CompetencyID,
                Responsibilities: req.body.Responsibilities
            });
        if (req.body.TrainingsList) {
        for (let TrainingID of req.body.TrainingsList) {
            result = await dbconnection.addBandTraining(TrainingID, insertId);
        }
    }
    }
    res.json(insertId);
})

router.post("/addCapability", async (req, res) => {
    let result;
    if (req.body.CapabilityName === "" || req.body.CapabilityLeadID === "") {
        result = "Bad request"
    } else {
        result = await dbconnection.addCapability(req.body);
    }
    res.json(result);
})

router.post("/deleteCapability", async (req, res) => {
    let result = await dbconnection.deleteCapability(req.body.CapabilityID);
    res.json(result);
})

module.exports = router;
