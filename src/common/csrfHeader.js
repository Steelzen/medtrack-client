import getCookie from "./getCookie";
import axios from "axios";

const getCSRFHeader = () => {
  // Get the CSRF token from the cookie
  const csrftoken = getCookie("csrftoken");

  // Add the CSRF token to the axios headers
  axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

  const options = {
    headers: {
      "X-CSRFToken": csrftoken,
    },
    withCredentials: true,
  };

  return options;
};

export default getCSRFHeader;
