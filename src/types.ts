export type cursorPositionPreference =
	| "afterHighlight"
	| "endOfLine"
	| "default";

export interface EnhancedFocusHighlightSettings {
	clearHighlightsAfterDelay: boolean;
	clearHighlightsDelaySeconds: number;
	clearHighlightsOnEdit: boolean;
	cursorPosition: cursorPositionPreference;
	enableMobileFocus: boolean;
}

export type match = [number, number];
