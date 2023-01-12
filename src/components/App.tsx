import React, { useCallback } from "react";
import logo from "./logo.svg";

import {
	defaultGameData,
	GAME_STATUS,
	getPercentScore,
	viewOptions,
} from "../utils";
import type { GameData, Profiles } from "../types";
import SettingsView from "./Settings";
import ProfilesView from "./Profiles";
// import GameStats from "./GameStats";
import UsersView from "./UsersView";
import Game from "./Game";
import { useLocalStorage } from "usehooks-ts";
import StatsView from "./StatsView";
import Feedback from "./Feedback";
import ElapsedTime from "./ElapsedTime";

function App() {
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

	const changeView = (view: string) => () =>
		setView(() => {
			setGameData(defaultGameData);
			return view;
		});

	const changeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setGameData(() => {
			setUser(e.target.value);
			return defaultGameData;
		});
	};

	const selectUser = (user: string, view: string = "Game") =>
		setView(() => {
			setUser(user);
			return view;
		});

	const updateProfiles = (profiles: Profiles) => {
		setProfiles(profiles);
		setUser(Object.keys(profiles).pop() as string);
	};

	const setElapsedTime = useCallback(
		(time: number) => setGameData((prev) => ({ ...prev, elapsedTime: time })),
		[]
	);

	return (
		<div className="my-8 flex w-screen items-center md:my-20">
			<div className="mx-auto flex w-full flex-col md:max-w-2xl">
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
						<button onClick={changeView("Game")}>
							<img
								src={logo}
								className={
									"h-40 w-40 rounded-full bg-yellow-200" +
									(gameData.status === GAME_STATUS.STARTED && " animate-spin")
								}
								alt="logo"
							/>
						</button>
					</div>
					{/* Score */}
					<div className="mt-2 flex h-8 items-center justify-end px-3 text-center text-xs font-bold text-white">
						{view === "Game" && gameData.status !== GAME_STATUS.NOT_STARTED && (
							<>
								<div className="flex w-1/2 justify-between">
									<div className="flex flex-col">
										<span>Elapsed Time</span>
										<span>
											<ElapsedTime
												gameData={gameData}
												onStop={setElapsedTime}
											/>
										</span>
									</div>
									<div className="flex flex-col">
										<span>Your Score</span>
										<span>
											{gameData.score + gameData.bonus} (
											{getPercentScore(gameData.score, gameData.count)}%)
										</span>
									</div>
								</div>
								{gameData.status === GAME_STATUS.STARTED && view === "Game" && (
									<Feedback key={Math.random()} msgCode={gameData.msgCode} />
								)}
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
							<StatsView
								key={user}
								user={user}
								profiles={profiles}
								changeUser={setUser}
							/>
						) : view === "Profiles" ? (
							<ProfilesView
								profiles={profiles}
								updateProfiles={updateProfiles}
								navToUserView={selectUser}
							/>
						) : view === "Settings" ? (
							<SettingsView
								user={user}
								profiles={profiles}
								changeUser={setUser}
								changeSettings={setProfiles}
							/>
						) : settings && view === "Game" ? (
							<Game
								user={user}
								settings={settings}
								gameData={gameData}
								updateGameData={setGameData}
							/>
						) : (
							<p>Loading...</p>
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
