import { useMemo } from "react";
import type { Settings } from "../types";
import {
	answerModes,
	NumericSort,
	randomAnswerGenerator,
	RandomItem,
	RandomNumber,
	Shuffle,
} from "../utils";

export default function Multiplication(settings: Settings) {
	return useMemo(() => {
		const missingIndex = RandomNumber(0, 2);
		const [num1, num2] = Shuffle([
			RandomItem<number>(settings.baseNums),
			RandomNumber(missingIndex > 1 ? 0 : 1, settings.maxNum.Multiplication),
		]);
		const answer = num1 * num2;
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
			baseNum: NumericSort([num1, num2])[0],
			opSymbol: "×",
			op: "Multiplication",
		};
	}, [settings]);
}
