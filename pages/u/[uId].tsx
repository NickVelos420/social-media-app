import { GetServerSideProps } from "next";
import React, { FC, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { redirectIfUserIsntLoggedIn } from "../../utils/redirectIfIsntLoggedIn";
import { useRouter } from "next/router";
import {
	checkIfUsersAreFriends,
	getSomeonesCredentialsById,
	rejectFriendRequest,
	sendFriendRequest,
} from "../../utils/social";
import { getUserObject } from "../../utils/auth";
import axios from "axios";
import NotFriendsProfile from "../../components/social/NotFriendsProfile";
import AreFriendsProfile from "../../components/social/AreFriendsProfile";

const uId: FC = props => {
	const [username, setUsername] = useState("");
	const [receiverId, setReceiverId] = useState("");
	const [error, setError] = useState("");
	const [successfulFriendRequest, setSuccessFriendRequest] = useState(false);
	const [senderId, setSenderId] = useState("");
	const [areUsersFriends, setAreUsersFriends] = useState<boolean | null>(null);

	const router = useRouter();

	const { uId } = router.query;

	//! Sets receiverId and username state
	useEffect(() => {
		(async () => {
			if (typeof uId !== "string") return null;

			const res = await getSomeonesCredentialsById(uId);
			setUsername(res.username);
			setReceiverId(res.id);
		})();
	}, [uId]);

	//! Check if users are friends and sets state
	useEffect(() => {
		if (senderId && receiverId) {
			(async () => {
				try {
					const res = await checkIfUsersAreFriends(senderId, receiverId);

					if (res === null) return setError("An error occurred, try again later");

					return res === false ? setAreUsersFriends(false) : setAreUsersFriends(true);
				} catch (error) {
					console.log(error);
					setError("An error occurred, try again later");
				}
			})();
		} else return;
	}, [senderId, receiverId]);

	//! Sets senderId state
	useEffect(() => {
		// @ts-ignore
		if (!props?.user)
			return setError(
				"An error occurred while sending friend request.Try again if the error persists there might be a problem with the cookies please try logging in again and then send the friend request"
			);

		// @ts-ignore
		setSenderId(props?.user?.id);
	}, []);

	const sendFriendRequestToUser = async () => {
		try {
			const res = await sendFriendRequest(senderId, receiverId);

			if (res === "Created") {
				setSuccessFriendRequest(true);
				setError("");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const declineFriendRequest = async () => {
		try {
			const senderUserObj = await getUserObject();

			if (!senderUserObj)
				return setError(
					"An error occurred while sending friend request.Try again if the error persists there might be a problem with the cookies please try logging in again and then send the friend request"
				);

			const res = await rejectFriendRequest(senderId, receiverId);

			if (res === "OK") {
				setSuccessFriendRequest(false);
				setError("");
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (senderId && receiverId) {
		if (areUsersFriends === true) {
			return (
				<Layout title={`${username} Profile`}>
					<AreFriendsProfile username={username} />
				</Layout>
			);
		} else if (areUsersFriends === false) {
			return (
				<Layout title={`${username} Profile`}>
					<NotFriendsProfile
						username={username}
						receiverId={receiverId}
						senderId={senderId}
						sendFriendRequest={sendFriendRequestToUser}
						declineFriendRequest={declineFriendRequest}
						successfulFriendRequest={successfulFriendRequest}
					/>
				</Layout>
			);
		}
	}

	return null;
};

export const getServerSideProps: GetServerSideProps = redirectIfUserIsntLoggedIn;

export default uId;
