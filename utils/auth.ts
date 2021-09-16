import Router from "next/router";
import { useCookies } from "../hooks/useCookies";

export const logout = (cookieName: string) => {
	useCookies({ name: cookieName, deleteCookie: true });
	Router.push("/login");
};
