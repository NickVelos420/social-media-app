import { FC } from "react";
import Main from "../components/Main";
import { useCookies } from "../hooks/useCookies";

const index: FC = () => {
	return (
		<>
			<Main setCookie={useCookies} getCookies={useCookies} />
		</>
	);
};
export default index;
