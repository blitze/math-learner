import React from "react";
import logo from "./logo.svg";

import {
	defaultGameData,
	GAME_STATUS,
	// incorrectOptions,
	// RandomItem,
	// successOptions,
	// updateStats,
	viewOptions,
} from "../utils";
// import { FaPlay, FaStop } from "react-icons/fa";
import type { GameData, Profiles } from "../types";
import SettingsView from "./Settings";
import ProfilesView from "./Profiles";
// import GameStats from "./GameStats";
// import Countdown from "react-countdown";
import UsersView from "./UsersView";
import Game from "./Game";
import { useLocalStorage } from "usehooks-ts";
import StatsView from "./StatsView";
import Feedback from "./Feedback";

function App(): JSX.Element {
	const [user, setUser] = React.useState("");
	const [profiles, setProfiles] = useLocalStorage<Profiles>("profiles", {});
	const [view, setView] = React.useState("Game");
	const [gameData, setGameData] = React.useState<GameData>(defaultGameData);

	const settings = profiles && profiles[user];
	const usersList = Object.keys(profiles);

	React.useEffect(() => {
		if (!usersList.length) {
			setView("Profiles");
		} else if (view !== "Profiles") {
			if (!user) {
				if (usersList.length === 1) {
					setUser(() => usersList[0]);
				} else {
					setView("Users");
				}
			} else if (!settings.operations.length || !settings.baseNums.length) {
				setView("Settings");
			}
		}
	}, [settings, view, usersList, user]);

	const changeView = (view: string) => () => setView(view);

	const changeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setGameData(() => {
			setUser(e.target.value);
			return defaultGameData;
		});
	};

	const selectUser = (user: string) =>
		setView(() => {
			setUser(user);
			return "Game";
		});

	const updateProfiles = (profiles: Profiles) => {
		setProfiles(profiles);
		setUser(Object.keys(profiles).pop() as string);
	};

	return (
		<div className="flex h-screen w-screen items-center">
			<div className="m-auto flex w-full flex-col md:max-w-lg">
				<div className="relative mt-16 flex flex-col rounded-lg bg-zinc-600 shadow-lg shadow-cyan-600">
					{user && usersList.length > 1 && (
						<div className="absolute -top-8 right-4">
							<select value={user} onChange={changeUser}>
								{usersList.map((user) => (
									<option key={user} value={user}>
										{user}
									</option>
								))}
							</select>
						</div>
					)}
					<div className="absolute -top-24 z-10 mx-auto flex w-48 justify-center rounded-full bg-zinc-600 p-4 text-white">
						<img
							src={logo}
							className={
								"h-40 w-40 rounded-full bg-yellow-200" +
								(gameData.status === GAME_STATUS.STARTED && " animate-spin")
							}
							alt="logo"
						/>
					</div>
					{/* Score */}
					<div className="mt-2 flex h-8 content-center items-center justify-end px-3 text-right text-sm font-bold text-white">
						{gameData.status !== GAME_STATUS.NOT_STARTED && (
							<>
								<div className="flex gap-3">
									{/* {timer} */}
									<span>
										Your Score: {gameData.score} (
										{gameData.score
											? (
													(gameData.score / ((gameData.count - 1) * 10)) *
													100
											  ).toFixed(1)
											: 0}
										%)
									</span>
								</div>
								<Feedback
									key={
										gameData.status === GAME_STATUS.STARTED
											? Math.random()
											: undefined
									}
									isCorrect={gameData.isCorrect}
								/>
							</>
						)}
					</div>
					<div className="relative1 m-2 rounded bg-white p-4 pt-16">
						{view === "Users" ? (
							<UsersView
								users={usersList}
								selectUser={selectUser}
								changeView={changeView}
							/>
						) : view === "Stats" ? (
							<StatsView user={user} profiles={profiles} changeUser={setUser} />
						) : view === "Profiles" ? (
							<ProfilesView
								profiles={profiles}
								updateProfiles={updateProfiles}
							/>
						) : view === "Settings" ? (
							<SettingsView
								user={user}
								profiles={profiles}
								changeUser={setUser}
								changeSettings={setProfiles}
							/>
						) : (
							<Game
								key={user}
								user={user}
								settings={settings}
								gameData={gameData}
								updateGameData={setGameData}
							/>
						)}
					</div>
				</div>
				<div className="flex w-full justify-end gap-0.5 pr-3">
					{viewOptions.map((option) => (
						<button
							key={option}
							type="button"
							className={`z-10 rounded-b-md bg-zinc-600 px-2 pb-1 text-sm text-white${
								view !== option ? " opacity-60" : ""
							}`}
							onClick={changeView(option)}
						>
							{option}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;