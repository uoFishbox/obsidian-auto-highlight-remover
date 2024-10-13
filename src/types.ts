export type cursorPositionPreference = "afterHighlight" | "endOfLine";

export interface Settings {
	clearHighlightsOnEdit: boolean;
	cursorPositionPreference: cursorPositionPreference;
	enableMobileFocus: boolean;
}
