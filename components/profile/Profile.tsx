// add a useEffect to check if the user has a profile picture and change the
import { FC, useState } from "react";
import Image from "next/image";
const userDefaultImage = require("../../images/userDefaultImage.jpg");
const settingsGear = require("../../images/gearIcon.png");

const Profile: FC = () => {
	const [username, setUsername] = useState("");
	const [chatRooms, setChatRooms] = useState([]);

	// TODO: make a request to the backend to get the username

	return (
		<>
			<Image src={userDefaultImage} alt="Profile" height="100" width="100" />
			<div>Username</div>
			<label>
				<span>Settings</span>
				<Image src={settingsGear} />
			</label>
		</>
	);
};

export default Profile;
