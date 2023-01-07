import type { Profiles } from "../types";
import UserSelector from "./UserSelector";

type Props = {
	user?: string;
	profiles: Profiles;
	changeUser: React.Dispatch<React.SetStateAction<string>>;
};

export default function StatsView({ user, profiles, changeUser }: Props) {
	const profilesList = Object.keys(profiles || {});

	return (
		<div className="flex flex-col justify-center gap-4">
			<UserSelector
				user={user}
				usersList={profilesList}
				changeUser={changeUser}
			/>
		</div>
	);
}
