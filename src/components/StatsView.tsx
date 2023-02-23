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
	const [timestamp, setTimestamp] = useState<number>();

	const toggleDay = (dayStr: string) => () =>
		setDay(day !== dayStr ? dayStr : "");

	const toggleTime = (clickedTime: number) => () =>
		setTimestamp(timestamp !== clickedTime ? clickedTime : undefined);

	const daysList = Object.keys(userStats || {});

	return (
		<div className="flex flex-col">
			<div className="mb-4 text-center">
				<UserSelector
					user={user}
					usersList={profilesList}
					changeUser={changeUser}
				/>
			</div>

			{userStats &&
				daysList
					.sort()
					.reverse()
					.map((dayStr) => (
						<div key={dayStr} className="flex flex-col">
							<button
								type="button"
								className="my-px rounded bg-green-400 p-1 text-center text-xs font-bold hover:opacity-75"
								onClick={toggleDay(dayStr)}
							>
								{dayStr}
							</button>
							<div
								className={`flex flex-col${dayStr !== day ? " hidden" : ""}`}
							>
								{userStats[dayStr].map((data, i) => (
									<div key={i} className="flex flex-col">
										{data.timestamp && (
											<button
												className="mx-1 my-px rounded bg-gray-200 p-1 text-xs text-black"
												onClick={toggleTime(data.timestamp)}
											>
												{new Date(data.timestamp)
													.toLocaleTimeString()
													.toLowerCase()}
											</button>
										)}
										<div
											className={`mx-1 py-2 shadow${
												timestamp !== data.timestamp ? " hidden" : ""
											}`}
										>
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
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
		</div>
	);
}
