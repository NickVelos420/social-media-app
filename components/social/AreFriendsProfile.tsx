import { FC } from "react";

interface PropTypes {
	username: string;
}

const AreFriendsProfile: FC<PropTypes> = ({ username }) => {
	return <div>{username}</div>;
};

export default AreFriendsProfile;
