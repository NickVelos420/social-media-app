import { FC } from "react";

interface PropTypes {
	username: string;
	declineFR: () => void;
}

const HasSentFRProfile: FC<PropTypes> = ({ username, declineFR }) => {
	return (
		<div>
			<span>{username}</span>
			<br />
			<button onClick={declineFR}>decline</button>
		</div>
	);
};

export default HasSentFRProfile;
