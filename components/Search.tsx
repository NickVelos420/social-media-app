import { FC, useEffect, useState } from "react";
import { getUsersFromSomeOfTheFirstUsernameChars } from "../utils/social";
import Link from "next/link";
import Image from "next/image";
import loading from "../images/loading.gif";

const Search: FC = () => {
	const [username, setUsername] = useState("");
	const [usersArray, setUsersArray] = useState<{ id: string; username: string }[]>([]);
	const [typing, setTyping] = useState(false);

	//* got the code from
	//* https://dev.to/przemwo/how-to-execute-a-function-only-after-the-user-stops-typing-beh
	//* It just makes the req when the user has stopped typing
	useEffect(() => {
		if (username) setTyping(true);
		else setTyping(false);
		const timeoutId = setTimeout(async () => {
			if (!username.trim()) return setUsersArray([]);

			const users = await getUsersFromSomeOfTheFirstUsernameChars(username);

			setTyping(false);

			if (!users) {
				setUsersArray([{ id: "", username: "" }]);
				return null;
			}

			setUsersArray(users);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [username]);

	return (
		<>
			<div className="input-group">
				<span className="input-group-text" id="basic-addon1">
					@
				</span>
				<input
					type="text"
					className="form-control"
					placeholder="Username"
					onChange={e => {
						setUsername(e.target.value);
					}}
				/>
			</div>
			<div>
				{typing ? (
					<div>
						<Image src={loading} />
					</div>
				) : (
					usersArray.map(({ username, id }) => {
						if (!username && !id && usersArray.length === 1) {
							return (
								<div>
									<span>Wow such empty!</span>
								</div>
							);
						}
						return (
							<div>
								<Link key={id} href={`/u/${id}?`}>
									<a>@{username}</a>
								</Link>
							</div>
						);
					})
				)}
			</div>
		</>
	);
};

export default Search;
