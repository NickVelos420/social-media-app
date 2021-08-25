import { FC } from "react";
import Layout from "../components/Layout";
import Main from "../components/Main";
import { useCookies } from "../hooks/useCookies";

const index: FC = () => {
	return (
		<Layout title="Name of the website">
			<Main setCookie={useCookies} getCookies={useCookies} />
		</Layout>
	);
};
export default index;
