import { around } from "monkey-around";
import { MarkdownView, Platform } from "obsidian";
import EnhancedFocusHighlight from "./main";

export const applyFocusHighlightPatch = (plugin: EnhancedFocusHighlight) => {
	const isMobile = Platform.isMobileApp || Platform.isMobile;
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
					// if mobile, focus the editor
					if (isMobile && editor) {
						editor.focus();
					}

					return response;
				};
			},
		})
	);
};
