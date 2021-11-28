import { FC } from "react";

interface PropTypes {
	username: string;
	receiverId: string;
	senderId: string;
	successfulFriendRequest: boolean;
	sendFriendRequest: () => void;
	declineFriendRequest: () => void;
}

const NotFriendsProfile: FC<PropTypes> = ({
	username,
	successfulFriendRequest,
	receiverId,
	senderId,
	sendFriendRequest,
	declineFriendRequest,
}) => {
	return (
		<div>
			<br />
			{username}
			<br />
			{!successfulFriendRequest ? (
				<button onClick={sendFriendRequest}>Add Friend</button>
			) : (
				<button onClick={declineFriendRequest}>Decline Sending Friend Request</button>
			)}
		</div>
	);
};

export default NotFriendsProfile;
