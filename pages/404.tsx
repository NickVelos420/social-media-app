import { FC } from "react";
import Link from "next/link";

const Custom404: FC = () => {
	return (
		<div>
			<h1>hello why are you here this page doesn't exist</h1>
			<Link href="/">
				<button>Home</button>
			</Link>
		</div>
	);
};

export default Custom404;
