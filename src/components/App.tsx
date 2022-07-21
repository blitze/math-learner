import React from "react";
import logo from "./logo.svg";
import Problem from "./problem";
import {
	incorrectOptions,
	RandomItem,
	successOptions,
	updateStats,
	viewOptions,
} from "../utils";
import { FaPlay, FaStop } from "react-icons/fa";
import { Settings, Stats } from "../types";
import SettingsView from "./Settings";
import GameStats from "./GameStats";
import Countdown from "react-countdown";

const defaultSettings = {
	modes: [],
	baseNums: [],
	maxNum: 12,
	timer: "none",
	maxTime: 1,
	multipleChoice: true,
};

function App(): JSX.Element {
	const [settings, setSettings] = React.useState<Settings>(defaultSettings);
	const [score, setScore] = React.useState({ count: 0, points: 0 });
	const [attempts, setAttempts] = React.useState(0);
	const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(false);
	const [newProblem, setNewProblem] = React.useState(false);
	const [showMessage, setShowMessage] = React.useState(false);
	const [showAnswer, setShowAnswer] = React.useState(false);
	const [started, setStarted] = React.useState(false);
	const [stats, setStats] = React.useState<Stats>({});
	const [view, setView] = React.useState(() =>
		settings.baseNums.length > 0 ? "Game" : "Settings"
	);

	React.useEffect(() => {
		setShowMessage(!!attempts);

		if (attempts > 1 && !isCorrectAnswer) {
			setShowAnswer(true);
		}

		setTimeout(() => {
			setShowMessage(false);

			if (attempts > 1 || isCorrectAnswer) {
				setNewProblem((prev) => {
					setAttempts(0);
					setShowAnswer(false);
					setIsCorrectAnswer(false);
					setScore((prev) => ({
						count: prev.count + 1,
						points: isCorrectAnswer ? prev.points + 10 / attempts : prev.points,
					}));
					return !prev;
				});
			}
		}, 1000);
	}, [attempts, isCorrectAnswer]);

	const start = () => {
		setScore({ count: 0, points: 0 });
		setNewProblem((prev) => !prev);
		setStarted(true);
		setStats({});
	};

	const stop = () => {
		setAttempts(0);
		setIsCorrectAnswer(false);
		setStarted(false);
	};

	const changeView = (view: string) => () => setView(view);

	const timer = React.useMemo(() => {
		return settings.timer === "speedTest" && started ? (
			<Countdown
				date={Date.now() + settings.maxTime * 60000}
				onComplete={stop}
			/>
		) : null;
	}, [settings.timer, settings.maxTime, started]);

	let problemRef = React.useRef(newProblem);
	const handleAnswer = React.useCallback(
		(mode: string, problem: string, baseNum: number, isCorrect: boolean) => {
			if (newProblem !== problemRef.current) {
				setStats((prev) =>
					updateStats(prev, mode, problem, baseNum, isCorrect)
				);
				problemRef.current = newProblem;
			}

			setIsCorrectAnswer(isCorrect);
			setAttempts((prev) => prev + 1);
		},
		[newProblem]
	);

	return (
		<div className="h-screen w-screen">
			<div className="flex h-full flex-col items-center justify-center text-center">
				<div className="relative rounded-t-lg bg-zinc-600 shadow-lg shadow-cyan-600">
					<div className="absolute -top-24 z-10 mx-auto flex w-48 justify-center rounded-full bg-zinc-600 p-4 text-white">
						<img
							src={logo}
							className={
								"h-40 w-40 rounded-full bg-yellow-200" +
								(started && " animate-spin")
							}
							alt="logo"
						/>
					</div>
					<div className="flex h-12 content-center items-center justify-end px-3 text-right text-sm font-bold text-white">
						{started && (
							<div className="flex gap-3">
								{timer}
								<span>
									Your Score: {score.points} (
									{score.points
										? ((score.points / (score.count * 10)) * 100).toFixed(1)
										: 0}
									%)
								</span>
							</div>
						)}
					</div>
					<div className="relative m-3 mt-0 h-60 w-[500px] rounded-t-lg bg-white py-10 px-4">
						{view === "Game" ? (
							<>
								{showMessage && (
									<div className="absolute top-3 right-3 text-sm font-bold text-white">
										{isCorrectAnswer ? (
											<p className="rounded-sm bg-green-500/70 px-2 py-1">
												{RandomItem(successOptions)}
											</p>
										) : (
											<p className="rounded-sm bg-red-500 px-2 py-1">
												{RandomItem(incorrectOptions)}
											</p>
										)}
									</div>
								)}
								<div className="flex flex-col gap-6">
									<div className="flex-1">
										{started ? (
											<Problem
												settings={settings}
												onAnswer={handleAnswer}
												showAnswer={showAnswer}
												newProblem={newProblem}
											/>
										) : Object.keys(stats).length === 0 ? (
											<p>Welcome to the math game!</p>
										) : (
											<div className="mx-auto h-32 overflow-y-auto pr-2">
												<GameStats data={stats} />
											</div>
										)}
									</div>
									<div className="flex justify-end text-2xl">
										{started ? (
											<button
												type="button"
												className="flex items-center gap-1 hover:opacity-90"
												onClick={stop}
											>
												<FaStop />
												Stop
											</button>
										) : (
											<button
												type="button"
												className="flex items-center gap-1 text-green-600 hover:opacity-90"
												onClick={start}
											>
												<FaPlay />
												Start
											</button>
										)}
									</div>
								</div>
							</>
						) : (
							<SettingsView settings={settings} onChange={setSettings} />
						)}
					</div>
				</div>
				<div className="flex w-[500px] justify-end gap-0.5">
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
