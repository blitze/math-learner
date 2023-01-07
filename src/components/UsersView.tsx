type Props = {
	users: string[];
	selectUser: (user: string) => void;
	changeView: (user: string) => () => void;
};

const UsersView = ({ users, selectUser, changeView }: Props) => {
	const handleUserClick = (user: string) => () => selectUser(user);
	return (
		<div className="mx-auto mb-16 flex max-w-md flex-col gap-4 text-center">
			<p className="font-bold">Who's playing?</p>
			<div className="flex justify-center gap-4">
				{users.map((user) => (
					<button
						key={user}
						className="h-20 w-28 truncate rounded border bg-gray-500 text-center text-white hover:opacity-75"
						onClick={handleUserClick(user)}
					>
						{user}
					</button>
				))}
				<button
					className="h-20 w-28 truncate rounded border bg-gray-300 text-center"
					onClick={changeView("Profiles")}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default UsersView;
