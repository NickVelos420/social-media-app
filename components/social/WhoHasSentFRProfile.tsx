import { FC } from "react";
import AreFriendsProfile from "./AreFriendsProfile";
import HasSentFRProfile from "./HasSentFRProfile";

interface PropTypes {
	whoSentRequest: -1 | 0 | 1;
	username: string;
	declineFR: () => void;
	acceptFR: () => void;
	successfullyAcceptedFR: null | boolean;
}

const WhoHasSentFRProfile: FC<PropTypes> = ({
	whoSentRequest,
	username,
	declineFR,
	acceptFR,
	successfullyAcceptedFR,
}) => {
	if (successfullyAcceptedFR === true) {
		return (
			<>
				<AreFriendsProfile username={username} />
			</>
		);
	}

	if (whoSentRequest === -1) {
		return <>hi</>;
	} else if (whoSentRequest === 0) {
		return (
			<>
				<HasSentFRProfile username={username} declineFR={declineFR} />
			</>
		);
	} else if (whoSentRequest === 1) {
		return (
			<>
				<span>{username}</span>
				<br />
				<button onClick={acceptFR}>accept</button>
				<button onClick={declineFR}>reject</button>
			</>
		);
	}
	return <>An error occurred, try again later.</>;
};
export default WhoHasSentFRProfile;
