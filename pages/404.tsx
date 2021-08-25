import { FC } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const Custom404: FC = () => {
	return (
		<Layout title="Page Doesn't exist">
			<h1>hello why are you here this page doesn't exist</h1>
			<Link href="/">
				<button>Home</button>
			</Link>
		</Layout>
	);
};

export default Custom404;
