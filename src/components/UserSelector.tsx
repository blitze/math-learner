type Props = {
	user?: string;
	usersList: string[];
	changeUser: React.Dispatch<React.SetStateAction<string>>;
};

export default function UserSelector({ user, usersList, changeUser }: Props) {
	const changeProfile = (e: React.ChangeEvent<HTMLSelectElement>) => {
		changeUser(e.currentTarget.value);
	};

	return !!usersList.length ? (
		<select
			className="mx-auto w-auto rounded border p-1"
			value={user}
			onChange={changeProfile}
		>
			{usersList.map((p) => (
				<option key={p} value={p}>
					{p}
				</option>
			))}
		</select>
	) : (
		<div className="my-10 text-center font-bold">
			You will need to create at least one user profile
		</div>
	);
}
