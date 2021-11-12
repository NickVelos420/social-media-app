import { ChangeEvent, FC, useEffect, useState } from "react";
import { getUsersFromSomeOfTheFirstUsernameChars } from "../utils/social";
import Link from "next/link";

const Search: FC = () => {
	const [username, setUsername] = useState("");
	const [usersArray, setUsersArray] = useState<{ id: string; username: string }[]>([]);

	const updateUsername = async (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	useEffect(() => {
		(async () => {
			if (!username.trim()) return setUsersArray([]);

			const users = await getUsersFromSomeOfTheFirstUsernameChars(username);

			console.log(users);

			if (!users) return null;

			setUsersArray(users);
		})();
	}, [username]);

	console.log(username);
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
					onChange={updateUsername}
				/>
			</div>
			{usersArray.map(({ username, id }) => {
				return (
					<div>
						<Link key={id} href={`/u/${id}?`}>
							<a>@{username}</a>
						</Link>
					</div>
				);
			})}
		</>
	);
};

export default Search;
