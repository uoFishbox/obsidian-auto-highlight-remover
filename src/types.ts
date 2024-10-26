export type cursorPositionPreference = "afterHighlight" | "endOfLine";

export interface Settings {
	clearHighlightsAfterDelay: boolean;
	clearHighlightsDelaySeconds: number;
	clearHighlightsOnEdit: boolean;
	cursorPositionPreference: cursorPositionPreference;
	enableMobileFocus: boolean;
}
