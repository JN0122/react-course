import { redirect } from "react-router-dom";
import { clearToken, clearTokenDuration } from "../util/auth";

export function action() {
  clearToken();
  clearTokenDuration();
  return redirect("/");
}
