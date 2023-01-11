import { useMemo } from "react";
import type { Settings } from "../types";
import {
	answerModes,
	NumericSort,
	randomAnswerGenerator,
	RandomItem,
	RandomNumber,
} from "../utils";

export default function Subtraction(settings: Settings) {
	return useMemo(() => {
		let nums = [
			RandomItem<number>(settings.baseNums),
			RandomNumber(0, settings.maxNum.Subtraction),
		];

		if (!settings.negatives) {
			nums = NumericSort(nums, true);
		}

		const [num1, num2] = nums;
		const answer = num1 - num2;
		const multiOptions =
			settings.mode === answerModes.MULTICHOICE
				? randomAnswerGenerator(answer)
				: [];
		const missingIndex = RandomNumber(0, 2);

		return {
			num1,
			num2,
			answer,
			multiOptions,
			missingIndex,
			baseNum: NumericSort([num1, num2])[0],
			opSymbol: "–",
			op: "Subtraction",
		};
	}, [settings]);
}
