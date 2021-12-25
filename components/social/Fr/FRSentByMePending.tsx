import { FC } from "react";

interface PropTypes {
	declineFR: (id: string) => void;
	friendRequests: { username: string; id: string }[];
}

const FRSentByMePending: FC<PropTypes> = ({ declineFR, friendRequests }) => {
	return (
		<>
			{friendRequests.map(fr => (
				<div key={fr.id}>
					{console.log(fr)}
					<span className="">{fr.username}</span>
					<button className="btn btn-danger" onClick={() => declineFR(fr.id)}>
						Reject
					</button>
				</div>
			))}
		</>
	);
};

export default FRSentByMePending;
