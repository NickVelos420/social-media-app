import Router from "next/router";
import { useCookies } from "../hooks/useCookies";

export const logout = (cookieName: string) => {
	useCookies(cookieName, undefined, 0, false, false, false, true);
	Router.push("/login");
};
