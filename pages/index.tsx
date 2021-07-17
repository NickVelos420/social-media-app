import { FC, useState, useEffect } from "react";
import Main from "../components/Main";
import { useCookies } from "../hooks/useCookies";

const index: FC = () => {
	return (
		<>
			<Main setCookie={useCookies} />
		</>
	);
};

export default index;
