interface FormElements extends HTMLFormControlsCollection {
	answer: HTMLInputElement;
}

interface InputAnswerFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

type Props = {
	value?: number;
	checkAnswer: (input: number) => void;
};

export default function InputAnswer({ value, checkAnswer }: Props) {
	const handleSubmit = (e: React.FormEvent<InputAnswerFormElement>) => {
		e.preventDefault();
		checkAnswer(+e.currentTarget.elements.answer.value.trim());
		e.currentTarget.elements.answer.value = "";
	};

	return value ? (
		<>value</>
	) : (
		<form className="flex h-10 items-center" onSubmit={handleSubmit}>
			<input
				type="text"
				id="answer"
				className="h-full w-16 rounded-l border px-2"
			/>
			<button
				type="submit"
				className="h-full rounded-r bg-green-500 px-2 text-sm text-white"
			>
				Submit
			</button>
		</form>
	);
}
