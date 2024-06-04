const ADVERTISEMENT = "Advertisement";
const USER = "User";
const COMMENT = "Comment";

const PLEASE_LOG_IN = `Please log in to access this resource`;
const PASSWORD_USERNAME_INCORRECT = "Password or username is incorrect";

const BASE_URL = "/api/v1";

const AUTH_URL = BASE_URL;
const ADVERTISEMENTS_URL = `${BASE_URL}/advertisements`;
const COMMENTS_URL = `${BASE_URL}/comments`;
const USERS_URL = `${BASE_URL}/users`;
const HEARTBEAT_URL = `${BASE_URL}/heartbeat`;

module.exports = {
  ADVERTISEMENT,
  COMMENT,
  PLEASE_LOG_IN,
  PASSWORD_USERNAME_INCORRECT,
  USER,
  AUTH_URL,
  ADVERTISEMENTS_URL,
  COMMENTS_URL,
  USERS_URL,
  HEARTBEAT_URL,
};
