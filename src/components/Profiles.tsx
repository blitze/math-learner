import { Profiles } from "../types";
import { capitalize, defaultSettings } from "../utils";

interface FormElements extends HTMLFormControlsCollection {
	profileNameInput: HTMLInputElement;
}

interface ProfileNameFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

type Props = {
	profiles?: Profiles;
	updateProfiles: (profiles:Profiles) => void;
};

export default function UserProfiles({ profiles, updateProfiles }: Props) {
	const addToProfiles = (e: React.FormEvent<ProfileNameFormElement>) => {
		e.preventDefault();
		const name = e.currentTarget.elements.profileNameInput.value.trim();
		e.currentTarget.elements.profileNameInput.value = "";

		if (name) {
			updateProfiles({ ...profiles, [capitalize(name)]: defaultSettings });
		}
	};

	return (
		<div className="flex flex-col justify-items-center gap-4">
			<form
				className="mx-auto flex w-auto items-center"
				onSubmit={addToProfiles}
			>
				<input
					type="text"
					id="profileNameInput"
					className="rounded-md rounded-r-none border border-r-0 p-1 text-sm"
				/>
				<button
					type="submit"
					className="font-bolder rounded-md rounded-l-none border bg-green-600 py-1 px-2 text-sm text-white hover:opacity-80"
				>
					Add Profile
				</button>
			</form>
			<div className="mt-5 flex flex-col">
				<ul className="flex flex-col gap-2">
					{Object.keys(profiles || {}).map((name) => (
						<li key={name} className="flex justify-between rounded p-2 shadow">
							{name}
							<div className="flex gap-1">
								<button type="button" className="">
									Edit
								</button>
								<button type="button" className="">
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
