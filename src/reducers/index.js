import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import quotes from "./quote";
export default combineReducers({
  authedUser,
  users,
  questions,
  quotes,
});
