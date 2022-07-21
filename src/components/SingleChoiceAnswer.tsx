import React from "react";

type Props = {
	checkAnswer: (answer: number) => void;
};

function SingleChoiceAnswer({ checkAnswer }: Props) {
	const [answer, setAnswer] = React.useState<string>("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setAnswer(e.target.value);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		checkAnswer(+answer);
	};

	return (
		<form className="flex gap-2" onSubmit={handleSubmit}>
			<input
				type="text"
				className="w-16 rounded border px-2"
				value={answer}
				onChange={handleInputChange}
			/>
			<button
				type="submit"
				className="w-full rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
			>
				Submit
			</button>
		</form>
	);
}

export default SingleChoiceAnswer;
