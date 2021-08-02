import { FC } from "react";
import Register from "./Register";
import styles from "../styles/forReactComponents/main.module.scss";

interface propTypes {
	setCookie: (key: string, value: any, expirationDate: any) => string;
}

const Main: FC<propTypes> = ({ setCookie }) => {
	return (
		<div className={styles.body}>
			<Register setCookie={setCookie} />
		</div>
	);
};

export default Main;
