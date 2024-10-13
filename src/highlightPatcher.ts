import { around } from "monkey-around";
import { MarkdownView } from "obsidian";
import BetterFocusHighlight from "./main";

export const applyFocusHighlightPatch = (plugin: BetterFocusHighlight) => {
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
						const newCursorPos = cursorPos;
						// get current line and set cursor to the end of the line
						const line = editor.getLine(cursorPos.line);
						const lineLength = line.length;
						newCursorPos.ch = lineLength;
						// set cursor to the end of the line
						setTimeout(() => {
							editor.setCursor(newCursorPos);
						}, 10);
					}
					return response;
				};
			},
		})
	);
};
