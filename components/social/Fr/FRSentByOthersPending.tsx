import { FC } from "react";

interface PropTypes {
	friendRequests: { username: string; id: string }[];
	rejectFR: (id: string) => void;
	acceptFR: (id: string) => void;
}

const FRSentByOthersPending: FC<PropTypes> = ({ friendRequests, rejectFR, acceptFR }) => {
	console.log(friendRequests);
	return (
		<>
			{friendRequests.map(fr => (
				<div key={fr.id}>
					{console.log(fr)}
					<span className="">{fr.username}</span>
					<button
						className="btn btn-primary"
						onClick={() => {
							acceptFR(fr.id);
						}}
					>
						Accept
					</button>
					<button className="btn btn-danger" onClick={() => rejectFR(fr.id)}>
						Reject
					</button>
				</div>
			))}
		</>
	);
};

export default FRSentByOthersPending;
