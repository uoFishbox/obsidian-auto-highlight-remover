import { Editor, Plugin } from "obsidian";
import { applyFocusHighlightPatch } from "./highlightCursorPatcher";
import {
	hasHighlighInEditor,
	removeHighlightFromEditor,
} from "./highlightHandler";

export default class EnhancedFocusHighlight extends Plugin {
	async onload() {
		this.registerEvent(
			this.app.workspace.on("editor-change", this.removeHighlightIfNeeded)
		);
		this.applyObsidianPatch();
	}

	onunload() {}

	private applyObsidianPatch() {
		this.app.workspace.onLayoutReady(() => {
			applyFocusHighlightPatch(this);
			console.log("Patch applied");
		});
	}

	removeHighlightIfNeeded(editor: Editor) {
		if (hasHighlighInEditor(editor)) {
			removeHighlightFromEditor(editor);
		}
	}
}
