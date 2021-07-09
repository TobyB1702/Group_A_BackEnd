const mysql = require('mysql')

const express = require("express");
const cors = require('cors');
const app = express()
const dbconfig = require('./dbconfig.js')

const util = require('util')

const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function wrapDB(dbconfig) {
    const pool = mysql.createPool(dbconfig)
    return {
        query(sql, args) {
            return util.promisify(pool.query)
                .call(pool, sql, args)
        },
        release() {
            return util.promisify(pool.releaseConnection)
                .call(pool)
        }
    }
}

const db = wrapDB(dbconfig);

exports.getJobRoles = async () => {
    let response = await db.query('SELECT RoleID, RoleName, RoleSpec, CapabilityName, BandName FROM JobRoleDatabase.Role JOIN JobFamily USING (JobFamilyID) JOIN Capability USING (CapabilityID) JOIN Band USING (BandID);')
    return response;
}

exports.getJobFamilies = async () => {
    let response = await db.query('SELECT * FROM JobFamily;')
    return response;
}


exports.getBandResponsibilities = async () => {
    let response = await db.query('SELECT BandID, BandName, BandLevel, Responsibilities FROM JobRoleDatabase.Band');
    return response;
  }



exports.getCapabilityAndJobFamily = async () => {
  let response = await db.query('SELECT CapabilityName, JobFamilyName FROM JobRoleDatabase.Capability JOIN JobFamily USING (CapabilityID);')
  return response;
}



exports.getTraingByBand = async() => {
    let response = await db.query('Select BandID, BandLevel, TrainingType,  BandName, TrainingName, TrainingLink FROM JobRoleDatabase.Band Join Training Using (TrainingID);')
}

exports.getCapabilities= async () => {
    let response = await db.query('SELECT * FROM Capability;')
    return response
}
exports.getBands = async () => {
    let response = await db.query('SELECT * FROM Band;')
    return response;
}

exports.getTraingByBand = async () => {
    let response = await db.query('Select BandID, TrainingType,  BandName, TrainingName, TrainingLink FROM JobRoleDatabase.Band Join Training Using (TrainingID);')

    return response;
}
exports.getJobRolesSpecifications = async (name) => {
    console.log(name);
    let results = await db.query(`SELECT RoleName, RoleSpec FROM JobRoleDatabase.Role where RoleName = '${name}' `)
    return results;

}

exports.getBandCompetencies = async () => {
    let result = await db.query('SELECT BandName, BandLevel, CompetenciesName FROM Band JOIN Competencies USING (CompetenciesID);');
    return result;
}

exports.addRole = async (Role) => {
    let results = await db.query('INSERT INTO Role SET ?', Role);
    return results.insertId;
}

exports.deleteRole = async (id) => {
    let results = await db.query('DELETE FROM Role WHERE RoleID = ?', id);
    return results;
}
