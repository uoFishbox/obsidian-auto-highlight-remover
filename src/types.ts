export type cursorPositionPreference =
	| "afterHighlight"
	| "endOfLine"
	| "default";

export interface Settings {
	clearHighlightsAfterDelay: boolean;
	clearHighlightsDelaySeconds: number;
	clearHighlightsOnEdit: boolean;
	cursorPosition: cursorPositionPreference;
	enableMobileFocus: boolean;
}
