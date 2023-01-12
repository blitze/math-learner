import { useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import type { Profiles, StoredUserStats } from "../types";
import SessionStats from "./SessionStats";
import UserSelector from "./UserSelector";

type Props = {
	user: string;
	profiles: Profiles;
	changeUser: React.Dispatch<React.SetStateAction<string>>;
};

export default function StatsView({ user, profiles, changeUser }: Props) {
	const profilesList = Object.keys(profiles || {});
	const userStats = useReadLocalStorage<StoredUserStats>(user);
	const [day, setDay] = useState<string>();

	const toggleDay = (dayStr: string) => () =>
		setDay(day !== dayStr ? dayStr : "");

	return (
		<div className="flex flex-col justify-center gap-4">
			<UserSelector
				user={user}
				usersList={profilesList}
				changeUser={changeUser}
			/>

			{Object.entries(userStats || {}).map(([dayStr, entries]) => (
				<div key={dayStr}>
					<button
						type="button"
						className="w-full rounded bg-green-400 p-1 text-center text-xs font-bold hover:opacity-75"
						onClick={toggleDay(dayStr)}
					>
						{dayStr}
					</button>
					<div
						className={`flex flex-col gap-4 border-b pb-3${
							dayStr !== day ? " hidden" : ""
						}`}
					>
						{entries.map((data, i) => (
							<div key={i} className="py-2 shadow">
								<SessionStats
									count={data.count}
									attempted={data.attempted}
									score={data.score}
									mostInARow={data.mostInARow}
									elapsedTime={data.elapsedTime}
									bonus={data.bonus}
									stats={data.stats}
									mode={data.mode}
									timer={data.timer}
									maxTime={data.maxTime}
									timestamp={data.timestamp}
								/>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
