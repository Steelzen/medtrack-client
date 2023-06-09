import axios from "axios";

const fetchAllUser = async () => {
  const result = await axios.get("http://localhost:4001/get_all_users/");
  return result;
};

const fetchAllUserDoc = async () => {
  const result = [];

  const medistaff = await axios.get(
    "http://localhost:4001/get_document_all/medistaff/"
  );

  const patient = await axios.get(
    "http://localhost:4001/get_document_all/patient/"
  );

  medistaff.data.docs.forEach((doc) => {
    result.push(doc);
  });
  patient.data.docs.forEach((doc) => {
    result.push(doc);
  });

  return result;
};

const fetachAllMedistaffDoc = async () => {
  const result = await axios.get(
    "http://localhost:4001/get_document_all/medistaff/"
  );

  return result.data.docs;
};

const fetchAllPatientDoc = async () => {
  const result = await axios.get(
    "http://localhost:4001/get_document_all/patient/"
  );

  return result.data.docs;
};

const fetchPatientList = async (userID) => {
  const result = await axios.get(
    `http://localhost:4001/register_patient_list/patient_list/${userID}/patient_list/`
  );

  return result.data;
};

const fetchMedicationList = async () => {
  const result = await axios.get(
    "http://localhost:4001/get_document_all/medication/"
  );

  return result.data.docs;
};

export {
  fetchAllUser,
  fetchAllUserDoc,
  fetachAllMedistaffDoc,
  fetchAllPatientDoc,
  fetchPatientList,
  fetchMedicationList,
};
