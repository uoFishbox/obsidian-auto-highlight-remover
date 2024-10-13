import { Editor, Plugin } from "obsidian";
import {
	hasHighlighInEditor,
	removeHighlightFromEditor,
} from "./highlightHandler";
import { applyFocusHighlightPatch } from "./highlightPatcher";

export default class BetterFocusHighlight extends Plugin {
	async onload() {
		this.registerEvent(
			this.app.workspace.on("editor-change", this.removeHighlightIfNeeded)
		);
	}

	onunload() {}

	removeHighlightIfNeeded(editor: Editor) {
		if (hasHighlighInEditor(editor)) {
			removeHighlightFromEditor(editor);
		}
	}
}
