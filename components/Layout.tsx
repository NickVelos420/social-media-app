import { FC } from "react";
import Head from "next/head";

interface propTypes {
	title: string;
}

const Layout: FC<propTypes> = ({ children, title }) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			{children}
		</div>
	);
};

export default Layout;
