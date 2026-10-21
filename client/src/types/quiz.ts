export interface QuizMetadata {
	name: string;
	description?: string;
}

export type Memoranda = string[];

export type Quiz = QuizMetadata & {
	_id: string;
	memoranda: Memoranda;
}

