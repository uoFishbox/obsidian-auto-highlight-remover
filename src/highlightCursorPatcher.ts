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
						const cursorPos = editor.getCursor();
						const newCursorPos = getCursorPosAtLineEnd(
							editor,
							cursorPos
						);

						setCursorPos(editor, newCursorPos);
						focusEditorOnMobile(plugin, editor);
					}

					return response;
				};
			},
		})
	);
};

function focusEditorOnMobile(plugin: EnhancedFocusHighlight, editor: Editor) {
	if (!plugin.isMobile) {
		return;
	}
	editor.focus();
}

function getCursorPosAtLineEnd(
	editor: Editor,
	currentCursorPos: EditorPosition
) {
	const line = editor.getLine(currentCursorPos.line);
	const lineLength = line.length;
	const newCursorPos = currentCursorPos;
	newCursorPos.ch = lineLength;
	return newCursorPos;
}

function setCursorPos(editor: Editor, newCursorPos: EditorPosition) {
	setTimeout(() => {
		editor.setCursor(newCursorPos);
	}, 10);
}
