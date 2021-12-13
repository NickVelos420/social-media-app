import axios from "axios";
import { getUserObject } from "./auth";

export const getUsersFromSomeOfTheFirstUsernameChars = async (firstUsernameChars: string) => {
	try {
		const res = await axios.get(
			`http://localhost:4000/get-users-from-some-of-the-first-username-chars?firstUsernameChars=${firstUsernameChars}`
		);
		console.log(firstUsernameChars);
		if (!res.data) {
			return { id: undefined, username: undefined };
		}

		return res.data;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const getSomeonesCredentialsById = async (id: string) => {
	try {
		const user = await axios.get(`http://localhost:4000/get-user-by-id?id=${id}`);

		if (!user.data) {
			return null;
		}

		return user.data;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const sendFriendRequest = async (senderId: string, receiverId: string) => {
	try {
		const res = await axios.post(`http://localhost:4000/send-friend-request`, {
			senderId,
			receiverId,
		});

		if (!res.data) {
			return null;
		}

		return res.data;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const rejectFriendRequest = async (senderId: string, receiverId: string) => {
	try {
		const res = await axios.delete(`http://localhost:4000/reject-friend-request`, {
			data: {
				senderId,
				receiverId,
			},
		});

		if (!res.data) {
			return null;
		}

		return res.data;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const acceptFriendRequest = async (senderId: string, receiverId: string) => {
	try {
		const res = await axios.put(`http://localhost:4000/accept-friend-request`, {
			senderId,
			receiverId,
		});

		if (!res.data) return null;
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getAllFriendRequests = async () => {
	try {
		const userObj = await getUserObject();

		if (!userObj) return null;

		const res = await axios.get(
			`http://localhost:4000/get-all-friend-requests?userId=${userObj.id}`
		);

		if (!res.data) {
			return null;
		}

		return res.data;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const checkIfUsersAreFriendsAndIfHasSentFR = async (user1Id: string, user2Id: string) => {
	interface IHasSent_FR_Obj {
		hasSentRequest: boolean;
		whoSentRequest: number;
	}

	try {
		const areFriendsRes = await axios.post(`http://localhost:4000/check-if-users-are-friends`, {
			user1Id,
			user2Id,
		});

		if (areFriendsRes.data) return { areFriends: areFriendsRes.data, hasSentFriendRequest: false };

		const hasSentFR = await axios.get(
			`http://localhost:4000/check-if-user-has-sent-friend-request?senderId=${user1Id}&receiverId=${user2Id}`
		);

		if (hasSentFR && !areFriendsRes.data)
			return { areFriends: areFriendsRes.data, hasSent_FR_Obj: hasSentFR.data as IHasSent_FR_Obj };

		return null;
	} catch (err) {
		console.log(err);
		return null;
	}
};
