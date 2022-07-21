import React from "react";
import { Stats } from "../types";

type Props = {
	data: Stats;
};

function GameStats({ data }: Props) {
	return (
		<>
			<h2 className="mb-4 font-bold">Game Stats</h2>
			<div className="grid grid-cols-2 gap-3">
				{Object.keys(data)
					.sort()
					.map((operator) =>
						Object.entries(data[operator]).map(([baseNum, problems]) => (
							<div
								key={baseNum}
								className="flex flex-col gap-2 rounded-lg bg-slate-100 p-4"
							>
								<h5 className="font-bold">{`${operator} by ${baseNum}`}</h5>
								<ol className="text-xs">
									{Object.entries(problems).map(([problem, stats]) => (
										<li
											key={problem}
											className="flex flex-auto items-center justify-start justify-items-start gap-2"
										>
											<span>{problem}</span>
											<span className="flex-grow border-b border-dashed border-gray-500"></span>
											<span>
												({stats.correct}/{stats.correct + stats.incorrect}){" "}
												{(
													(stats.correct / (stats.correct + stats.incorrect)) *
													100
												).toFixed(1)}
												%
											</span>
										</li>
									))}
								</ol>
							</div>
						))
					)}
			</div>
		</>
	);
}

export default GameStats;
