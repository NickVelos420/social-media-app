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

//! check if users are friends
export const checkIfUsersAreFriends = async (user1Id: string, user2Id: string) => {
	try {
		const res = await axios.post(`http://localhost:4000/check-if-users-are-friends`, {
			user1Id,
			user2Id,
		});

		return res.data;
	} catch (err) {
		console.log(err);
		return null;
	}
};