import axios from "axios";
import { getAuth } from "firebase/auth";

const fetchAllUserDoc = async () => {
  const user = await getAuth().currentUser;
  const result = [];

  const medistaff = await axios.get(
    "http://localhost:4001/get_document_all/medistaff/"
  );

  const patient = await axios.get(
    "http://localhost:4001/get_document_all/patient/"
  );

  result.push(medistaff.data.docs);
  result.push(patient.data.docs);

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
