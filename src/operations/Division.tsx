import { useMemo } from "react";
import type { Settings } from "../types";
import {
	answerModes,
	randomAnswerGenerator,
	RandomItem,
	RandomNumber,
} from "../utils";

export default function Division(settings: Settings) {
	return useMemo(() => {
		const missingIndex = RandomNumber(0, 2);
		const num2 = RandomItem<number>(settings.baseNums);
		const maxNum = RandomNumber(
			missingIndex !== 1 ? num2 - 1 : num2,
			settings.maxNum.Division
		);
		const answer = Math.floor(maxNum / num2);
		const num1 = num2 * answer;
		const multiOptions =
			settings.mode === answerModes.MULTICHOICE
				? randomAnswerGenerator(answer)
				: [];

		return {
			num1,
			num2,
			answer,
			multiOptions,
			missingIndex,
			baseNum: num2,
			opSymbol: "÷",
			op: "Division",
		};
	}, [settings]);
}
