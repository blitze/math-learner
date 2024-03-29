import React from "react";
import type { Profiles } from "../types";
import {
	answerModes,
	baseNumOptions,
	operationOptions,
	TIMERS,
} from "../utils";
import UserSelector from "./UserSelector";

function toggleOnOff(
	checked: boolean,
	value: string | number,
	prev: (string | number)[]
) {
	return checked ? [...prev, value] : prev.filter((m) => m !== value);
}

type Props = {
	user?: string;
	profiles: Profiles;
	changeUser: React.Dispatch<React.SetStateAction<string>>;
	changeSettings: React.Dispatch<React.SetStateAction<Profiles>>;
};

function SettingsView({
	user,
	profiles,
	changeUser,
	changeSettings,
}: Props): JSX.Element {
	const handleOperationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		user &&
			changeSettings((prev) => ({
				...prev,
				[user]: {
					...prev[user],
					operations: toggleOnOff(
						checked,
						value,
						prev[user].operations
					) as string[],
				},
			}));
	};

	const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		user &&
			changeSettings((prev) => ({
				...prev,
				[user]: {
					...prev[user],
					mode: e.target.value,
				},
			}));
	};

	const handleBaseNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		user &&
			changeSettings((prev) => ({
				...prev,
				[user]: {
					...prev[user],
					baseNums: toggleOnOff(
						checked,
						+value,
						prev[user].baseNums
					) as number[],
				},
			}));
	};

	const handleMaxNumChange =
		(mode: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
			user &&
			changeSettings((prev) => ({
				...prev,
				[user]: {
					...prev[user],
					maxNum: {
						...prev[user].maxNum,
						[mode]: +e.target.value,
					},
				},
			}));

	const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		user &&
		changeSettings((prev) => ({
			...prev,
			[user]: { ...prev[user], timer: +e.target.value },
		}));

	const handleMaxTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
		user &&
		changeSettings((prev) => ({
			...prev,
			[user]: { ...prev[user], maxTime: +e.target.value },
		}));

	const handleMaxQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		user &&
		changeSettings((prev) => ({
			...prev,
			[user]: { ...prev[user], maxQuestions: +e.target.value },
		}));

	const handleNegativeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		user &&
		changeSettings((prev) => ({
			...prev,
			[user]: { ...prev[user], negatives: e.target.checked },
		}));

	const profilesList = Object.keys(profiles || {});
	const settings = profiles && user && profiles[user];

	return (
		<div className="flex flex-col justify-center gap-4">
			<UserSelector
				user={user}
				usersList={profilesList}
				changeUser={changeUser}
			/>
			{settings && (
				<fieldset className="mt-4 flex h-full flex-col gap-4 overflow-y-auto">
					<div className="flex gap-4 border-t pt-4 text-left">
						<label className="w-1/3 text-right font-bold">Mode</label>
						<div className="flex flex-col gap-2">
							{Object.keys(answerModes).map((mode) => {
								const value = answerModes[mode as keyof typeof answerModes];
								return (
									<label key={mode}>
										<input
											type="radio"
											value={value}
											checked={settings.mode === value}
											onChange={handleModeChange}
										/>{" "}
										{value}
									</label>
								);
							})}
						</div>
					</div>
					<div className="flex gap-4 border-t pt-4 text-left">
						<label className="font-bolder w-1/3 text-right font-bold">
							Timer:
						</label>
						<div className="flex flex-col gap-2">
							<label>
								<input
									type="radio"
									name="timer"
									value={TIMERS.NONE}
									checked={!settings.timer}
									className="mr-1"
									onChange={handleTimerChange}
								/>
								None
							</label>
							<div className="flex flex-col gap-1">
								<label className="flex items-center gap-1">
									<input
										type="radio"
										name="timer"
										value={TIMERS.SPEED_DRILL}
										checked={settings.timer === TIMERS.SPEED_DRILL}
										onChange={handleTimerChange}
									/>
									Speed drill
									{settings.timer === TIMERS.SPEED_DRILL && (
										<>
											<span>for</span>
											<select
												value={settings.maxTime}
												onChange={handleMaxTimeChange}
											>
												{Array.from(Array(11).keys())
													.slice(1)
													.map((x) => (
														<option key={x} value={x}>
															{x}
														</option>
													))}
											</select>
											<span>min(s)</span>
										</>
									)}
								</label>
							</div>
							<div className="flex flex-col gap-1">
								<label className="flex items-center gap-1">
									<input
										type="radio"
										name="timer"
										value={TIMERS.FLASH_DRILL}
										checked={settings.timer === TIMERS.FLASH_DRILL}
										onChange={handleTimerChange}
									/>
									Focus drill
									{settings.timer === TIMERS.FLASH_DRILL && (
										<>
											<span>for</span>
											<select
												value={settings.maxTime}
												onChange={handleMaxTimeChange}
											>
												{Array.from(Array(11).keys())
													.slice(3)
													.map((x) => (
														<option key={x} value={x}>
															{x}
														</option>
													))}
											</select>
											<span>secs / question</span>
										</>
									)}
								</label>
							</div>
						</div>
					</div>
					<div className="flex gap-4 border-t text-left">
						<label className="w-1/3 text-right font-bold">Operation:</label>
						<div className="flex flex-col gap-2">
							<div className="pr-4 text-right font-bold">Max.</div>
							{operationOptions.map((operation) => {
								const checked = settings.operations.includes(operation);
								return (
									<div key={operation} className="flex gap-4">
										<label key={operation} className="w-2/3 truncate">
											<input
												type="checkbox"
												className="mr-1"
												value={operation}
												checked={checked}
												onChange={handleOperationsChange}
											/>
											{operation}
										</label>
										{checked && (
											<input
												type="number"
												className="w-16 border px-2"
												min="0"
												value={
													settings.maxNum[
														operation as keyof (typeof settings)["maxNum"]
													]
												}
												onChange={handleMaxNumChange(operation)}
											/>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<div className="flex gap-4 border-t pt-4 text-left">
						<label className="w-1/3 text-right font-bold">Base number:</label>
						<div className="grid grid-cols-5 gap-3">
							{baseNumOptions.map((num: number) => (
								<label key={num}>
									<input
										type="checkbox"
										className="mr-1"
										value={num}
										checked={settings.baseNums.includes(num)}
										onChange={handleBaseNumChange}
									/>
									{num}
								</label>
							))}
						</div>
					</div>
					<div className="flex gap-4 border-t pt-4 text-left">
						<label className="w-1/3 text-right font-bold">
							Max. Questions:
						</label>
						<input
							type="number"
							className="w-16 border px-2"
							defaultValue={settings.maxQuestions}
							onChange={handleMaxQuestionsChange}
							min="0"
						/>
					</div>
					<div className="flex items-start gap-4 border-t pt-4 text-left">
						<label className="flex w-1/3 flex-col text-right font-bold">
							Allow Negative?
							<span className="text-xs text-gray-300">(Subtraction only)</span>
						</label>
						<input
							type="checkbox"
							className="mt-2"
							checked={settings.negatives}
							onChange={handleNegativeChange}
						/>
					</div>
				</fieldset>
			)}
		</div>
	);
}

export default SettingsView;
