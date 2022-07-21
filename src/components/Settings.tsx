import React from "react";
import { Settings } from "../types";
import { baseNumOptions, modeOptions } from "../utils";

function toggleOnOff(
	checked: boolean,
	value: string | number,
	prev: (string | number)[]
) {
	return checked ? [...prev, value] : prev.filter((m) => m !== value);
}

type Props = {
	settings: Settings;
	onChange: React.Dispatch<React.SetStateAction<Settings>>;
};

function SettingsView({ settings, onChange }: Props): JSX.Element {
	const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		onChange((prev) => ({
			...prev,
			modes: toggleOnOff(checked, value, prev.modes) as string[],
		}));
	};

	const handleMultipleChoiceChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		onChange((prev) => ({
			...prev,
			multipleChoice: e.target.value === "1" ? true : false,
		}));
	};

	const handleBaseNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		onChange((prev) => ({
			...prev,
			baseNums: toggleOnOff(checked, +value, prev.baseNums) as number[],
		}));
	};

	const handleMaxNumChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		onChange((prev) => ({ ...prev, maxNum: +e.target.value }));

	const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		onChange((prev) => ({ ...prev, timer: e.target.value }));

	const handleMaxTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
		onChange((prev) => ({ ...prev, maxTime: +e.target.value }));

	return (
		<fieldset className="mt-4 flex h-full flex-col gap-4 overflow-y-auto">
			<div className="flex gap-4 text-left">
				<label className="w-1/3 text-right font-bold">Mode:</label>
				<div className="grid grid-cols-2 gap-4">
					{modeOptions.map((mode) => (
						<label key={mode}>
							<input
								type="checkbox"
								className="mr-1"
								value={mode}
								checked={settings.modes.includes(mode)}
								onChange={handleModeChange}
							/>
							{mode}
						</label>
					))}
				</div>
			</div>
			<div className="flex gap-4 text-left">
				<label className="w-1/3 text-right font-bold">Multiple choice?</label>
				<div className="flex gap-4">
					<label>
						<input
							type="radio"
							name="multipleChoice"
							value={1}
							checked={settings.multipleChoice}
							onChange={handleMultipleChoiceChange}
						/>{" "}
						Yes
					</label>
					<label>
						<input
							type="radio"
							name="multipleChoice"
							value={0}
							checked={!settings.multipleChoice}
							onChange={handleMultipleChoiceChange}
						/>{" "}
						No
					</label>
				</div>
			</div>
			<div className="flex gap-4 text-left">
				<label className="w-1/3 text-right font-bold">Base number:</label>
				<div className="grid grid-cols-4 gap-3">
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
			<div className="flex gap-4 text-left">
				<label className="w-1/3 text-right font-bold">Max. Number:</label>

				<input
					type="number"
					className="w-20 border px-2"
					min="0"
					value={settings.maxNum}
					onChange={handleMaxNumChange}
				/>
			</div>
			<div className="flex gap-4 text-left">
				<label className="font-bolder w-1/3 text-right">Timer:</label>
				<div className="flex flex-col gap-2">
					<label>
						<input
							type="radio"
							name="timer"
							value="none"
							checked={settings.timer === "none"}
							className="mr-1"
							onChange={handleTimerChange}
						/>
						None
					</label>
					<div className="flex flex-col gap-1">
						<label>
							<input
								type="radio"
								name="timer"
								value="speedTest"
								className="mr-1"
								checked={settings.timer === "speedTest"}
								onChange={handleTimerChange}
							/>
							Speed test
							{settings.timer === "speedTest" && (
								<span>
									{" "}
									for
									<select
										className="mx-1"
										value={settings.maxTime}
										onChange={handleMaxTimeChange}
									>
										{Array.from(Array(7).keys())
											.slice(1)
											.map((x) => (
												<option key={x} value={x}>
													{x}
												</option>
											))}
									</select>
									minute(s)
								</span>
							)}
						</label>
					</div>
				</div>
			</div>
		</fieldset>
	);
}

export default SettingsView;
