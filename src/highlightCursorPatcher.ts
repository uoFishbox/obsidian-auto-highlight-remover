import { around } from "monkey-around";
import { Editor, EditorPosition, MarkdownView } from "obsidian";
import EnhancedFocusHighlight from "./main";

export const applyFocusHighlightPatch = (plugin: EnhancedFocusHighlight) => {
	// Register to be unloaded when the plugin is unloaded
	plugin.register(
		around(MarkdownView.prototype, {
			setEphemeralState(original) {
				return async function (this: MarkdownView, state) {
					const response = await original.call(this, state);
					const editor =
						plugin.app.workspace.getActiveViewOfType(
							MarkdownView
						)?.editor;
					const isHighlighting = editor?.hasHighlight("is-flashing");
					if (editor && isHighlighting) {
						// const isCursorAtEndOfHighlight = true;

						if (
							plugin.settings.cursorPositionPreference ===
							"endOfLine"
						) {
							setCursorToLineEnd(editor);
						} else if (
							plugin.settings.cursorPositionPreference ===
							"afterHighlight"
						) {
							// It seems that one of these will be returned, but not enough confirmation.
							const highlightInfoFromMatches =
								state.match?.matches;
							const highlightInfoFromLine = state.line;

							if (highlightInfoFromMatches) {
								setCursorFromMatches(
									editor,
									highlightInfoFromMatches
								);
							}
							// if highlightInfoFromLine is not undefined. note that 0 is a valid line number
							if (highlightInfoFromLine !== undefined) {
								setCursorFromLine(
									editor,
									highlightInfoFromLine
								);
							}
						}

						focusEditorOnMobile(plugin, editor);
					}

					return response;
				};
			},
		})
	);
};

function focusEditorOnMobile(plugin: EnhancedFocusHighlight, editor: Editor) {
	if (plugin.isMobile && plugin.settings.enableMobileFocus) {
		editor.focus();
	}
}

function getCursorPosAtLineEnd(
	editor: Editor,
	currentCursorPos: EditorPosition
) {
	const lineText = editor.getLine(currentCursorPos.line);
	const lineLength = lineText.length;
	const newCursorPos = currentCursorPos;
	newCursorPos.ch = lineLength;
	return newCursorPos;
}

function setCursorToLineEnd(editor: Editor) {
	const cursorPos = editor.getCursor();
	const newCursorPos = getCursorPosAtLineEnd(editor, cursorPos);
	setCursorPos(editor, newCursorPos);
}

function setCursorFromLine(editor: Editor, line: number) {
	const lineText = editor.getLine(line);

	const position = {
		line,
		ch: lineText.length,
	} as EditorPosition;
	setCursorPos(editor, position);
}

function setCursorFromMatches(editor: Editor, matches: match[]) {
	const firstMatchOffset = matches[0][1];
	setCursorPos(editor, editor.offsetToPos(firstMatchOffset));
}

function setCursorPos(editor: Editor, newCursorPos: EditorPosition) {
	setTimeout(() => {
		editor.setCursor(newCursorPos);
	}, 10);
}

type match = [number, number];
