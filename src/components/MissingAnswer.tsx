import { useMemo } from "react";
import { RandomItem } from "../utils";

interface FormElements extends HTMLFormControlsCollection {
	answer: HTMLInputElement;
}

interface InputAnswerFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

type Props = {
	value?: number;
	missingIndex: number;
	eqParts: number[];
	opSymbol: string;
	checkAnswer: (input: number) => void;
};

const letters = ["𝒷", "𝒳", "p", "q", "r", "𝒴"];

export default function MissingAnswer({
	value,
	missingIndex,
	eqParts,
	opSymbol,
	checkAnswer,
}: Props) {
	const symbols = [opSymbol, <span>=</span>];
	const l = useMemo(() => RandomItem(letters), []);

	const handleSubmit = (e: React.FormEvent<InputAnswerFormElement>) => {
		e.preventDefault();
		const input = +e.currentTarget.elements.answer.value.trim();
		if (input) {
			checkAnswer(input);
			e.currentTarget.elements.answer.value = "";
		}
	};

	return (
		<form className="flex flex-col gap-6 text-2xl" onSubmit={handleSubmit}>
			<p className="text-sm italic text-gray-400">What is {l}?</p>
			<div className="flex w-auto gap-4">
				{eqParts.map((p, i) => (
					<div key={i} className="flex items-center gap-4">
						<>
							{i === missingIndex ? (
								<input
									id="answer"
									type="text"
									placeholder={value ? value.toString() : l}
									disabled={!!value}
									autoComplete="off"
									autoFocus
									className="font-bolder h-12 w-14 rounded border text-center"
								/>
							) : (
								<span>{p}</span>
							)}
							<span>{symbols[i]}</span>
						</>
					</div>
				))}
			</div>
			<button
				type="submit"
				disabled={!!value}
				className="w-full self-center rounded bg-green-500 py-2 text-sm text-white shadow disabled:opacity-60"
			>
				Submit
			</button>
		</form>
	);
}
