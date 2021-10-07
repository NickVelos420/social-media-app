import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/forReactComponents/Layout.module.scss";

interface propTypes {
	title: string;
}

const Layout: FC<propTypes> = ({ children, title }) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<nav className={`${styles.nav}`}>
				<Link href="/profile/settings">
					<button>settings</button>
				</Link>
				<Link href="/profile">
					<img
						src={`https://avatars.dicebear.com/api/pixel-art-neutral/${String.fromCharCode(
							Math.floor(Math.random() * 90)
						)}.svg`}
						height="30"
						width="30"
						className={`${styles.profilePicture}`}
					/>
				</Link>
			</nav>
			{children}
			<style jsx global>
				{`
					body {
						margin: 0;
					}
				`}
			</style>
		</div>
	);
};

export default Layout;
