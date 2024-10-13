export type cursorPositionPreference = "afterHighlight" | "endOfLine";

export interface Settings {
	cursorPositionPreference: cursorPositionPreference;
	enableMobileFocus: boolean;
}
