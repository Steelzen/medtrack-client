import axios from "axios";

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

export { fetchAllUserDoc, fetachAllMedistaffDoc, fetchAllPatientDoc };
