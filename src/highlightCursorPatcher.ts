import { around } from "monkey-around";
import { Editor, MarkdownView } from "obsidian";
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
						const newCursorPos = cursorPos;
						// get current line and set cursor to the end of the line
						const line = editor.getLine(cursorPos.line);
						const lineLength = line.length;
						newCursorPos.ch = lineLength;
						// set cursor to the end of the line
						setTimeout(() => {
							editor.setCursor(newCursorPos);
						}, 10);
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
