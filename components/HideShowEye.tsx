import { FC, MouseEventHandler } from "react";
import Head from "next/head";

interface PropTypes {
	inputType: "password" | "text";
	onClick: MouseEventHandler;
}

const HideShowEye: FC<PropTypes> = ({ inputType, onClick }) => {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
					integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</Head>
			{inputType === "password" ? (
				<i className="fa fa-eye" onClick={onClick} />
			) : (
				<i className="fa fa-eye-slash" onClick={onClick} />
			)}
		</>
	);
};

export default HideShowEye;
