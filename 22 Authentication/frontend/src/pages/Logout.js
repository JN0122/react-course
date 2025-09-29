import { redirect } from "react-router-dom";
import { clearToken } from "../util/auth";

export function action() {
  clearToken();
  return redirect("/");
}
