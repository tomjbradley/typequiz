export interface QuizMetadata {
	_id: string;
	name: string;
	description?: string;
	userId: string;
}

export type Memoranda = string[];

export type Quiz = QuizMetadata & {
	memoranda: Memoranda;
}

