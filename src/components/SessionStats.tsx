import { useState } from "react";
import Timecode from "react-timecode";
import type { StoredGameStats } from "../types";
import { TIMERS, getPercentScore, TRANS_TIMERS } from "../utils";

export default function SessionStats({ ...props }: StoredGameStats) {
	const [showDetails, setShowDetails] = useState(false);
	const {
		attempted,
		bonus,
		count,
		elapsedTime,
		maxTime,
		mode,
		mostInARow,
		score,
		stats,
		timer,
		maxQuestions,
	} = props;

	const toggleDetails = () => setShowDetails((prev) => !prev);

	return (
		<>
			<div className="flex w-full flex-col gap-1 text-xs">
				<div className="my-2 grid items-start gap-4 px-3 sm:grid-cols-2 md:gap-8">
					<table className="table-auto md:table-fixed">
						<tbody>
							<tr>
								<td className="pr-2 text-right font-semibold">Total Score:</td>
								<td>
									{bonus + score} ({getPercentScore(score, count, maxQuestions)}
									%)
								</td>
							</tr>
							<tr>
								<td className="pr-2 text-right font-semibold">
									Attempted Questions:
								</td>
								<td>
									{attempted} / {maxQuestions || count}
								</td>
							</tr>
							<tr>
								<td className="pr-2 text-right font-semibold">
									Most in a row:
								</td>
								<td>{mostInARow}</td>
							</tr>
							<tr>
								<td className="pr-2 text-right font-semibold">Bonus Points:</td>
								<td>{bonus}</td>
							</tr>
							<tr>
								<td className="pr-2 text-right font-semibold">Time Taken:</td>
								<td>
									<Timecode time={elapsedTime} />
								</td>
							</tr>
							<tr>
								<td className="pr-2 text-right font-semibold">
									Ave. time per question:
								</td>
								<td>
									<Timecode
										time={count ? elapsedTime / count : (maxTime || 0) * 1000}
									/>
								</td>
							</tr>
						</tbody>
					</table>
					<table className="table-auto md:table-fixed">
						<tbody>
							<tr>
								<td className="pr-2 text-right font-semibold">Mode:</td>
								<td>{mode}</td>
							</tr>
							<tr>
								<td className="pr-2 text-right font-semibold">Timer:</td>
								<td>{TRANS_TIMERS[timer]}</td>
							</tr>
							{timer === TIMERS.SPEED_DRILL && (
								<tr>
									<td className="pr-2 text-right font-semibold">Max. Time:</td>
									<td>
										<Timecode time={maxTime * 60000} />
									</td>
								</tr>
							)}
							{timer === TIMERS.FLASH_DRILL && (
								<tr>
									<td className="pr-2 text-right font-semibold">
										Time per question:
									</td>
									<td>
										<Timecode time={maxTime * 1000} />
									</td>
								</tr>
							)}
							{!!maxQuestions && (
								<tr>
									<td className="pr-2 text-right font-semibold">
										Max. questions:
									</td>
									<td>{maxQuestions}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{!!Object.keys(stats).length && (
					<button
						type="button"
						className="text-blue-500"
						onClick={toggleDetails}
					>
						Details
					</button>
				)}
			</div>
			{showDetails && (
				<div className="flex max-h-72 flex-col gap-5 overflow-y-auto">
					{Object.keys(stats)
						.sort()
						.map((operator) => (
							<div key={operator} className="flex flex-col gap-3 pt-2">
								<h2 className="text-center font-bold text-gray-300">
									{operator}
								</h2>
								<div className="grid grid-cols-2 gap-2">
									{Object.entries(stats[operator]).map(
										([baseNum, problems]) => (
											<div
												key={baseNum}
												className="flex flex-col gap-2 rounded-lg bg-slate-100 p-4"
											>
												<h2 className="text-sm font-bold">{`By ${baseNum}`}</h2>
												<ol className="text-xs">
													{Object.entries(problems).map(([problem, stats]) => {
														const percent =
															(stats.correct /
																(stats.correct + stats.incorrect)) *
															100;
														const textColor =
															percent < 90
																? " text-red-400"
																: percent < 70
																? " font-bolder text-red-900"
																: "";

														return (
															<li
																key={problem}
																className={`flex flex-auto items-center${textColor} justify-start justify-items-start gap-2 truncate`}
															>
																<span>{problem}</span>
																<span className="flex-grow border-b border-dashed border-gray-500"></span>
																<span>
																	({stats.correct}/
																	{stats.correct + stats.incorrect}){" "}
																	{percent.toFixed(1)}%
																</span>
															</li>
														);
													})}
												</ol>
											</div>
										)
									)}
								</div>
							</div>
						))}
				</div>
			)}
		</>
	);
}
