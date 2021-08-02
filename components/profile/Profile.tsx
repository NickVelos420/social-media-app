// add a useEffect to check if the user has a profile picture and change the src
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useCookies } from "../../hooks/useCookies";
const userDefaultImage = require("../../images/userDefaultImage.jpg");
const settingsGear = require("../../images/gearIcon.png");

interface User {
	_id: string;
	id: string;
	username: string;
	email: string;
	password: string;
	__v: number;
}

const userCookie = useCookies(false, false, false, true)?.user;

const Profile: FC = props => {
	const [username, setUsername] = useState("");
	const [chatRooms, setChatRooms] = useState(["chat room"]);
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		if (userCookie) {
			const userCookieJSON: User = JSON.parse(userCookie);

			return setUsername(userCookieJSON.username);
		}
	}, []);

	return (
		<div>
			<div>
				<Image src={userDefaultImage} alt="Profile" height="100" width="100" />
			</div>
			<div className="username">Username</div>
			<label htmlFor="settings">
				<span>Settings</span>
			</label>

			<a id="settings" href="/loggedIn/profile/settings">
				<Image src={settingsGear} height="100" width="100" alt="settings gear" />
			</a>
			{chatRooms.map(chatRoom => (
				<div key="hey">{chatRoom}</div>
			))}
			{username}
		</div>
	);
};

export default Profile;
