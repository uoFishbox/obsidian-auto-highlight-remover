import { Editor, Platform, Plugin } from "obsidian";
import { applyFocusHighlightPatch } from "./highlightCursorPatcher";
import {
	hasHighlighInEditor,
	removeHighlightFromEditor,
} from "./highlightHandler";

export default class EnhancedFocusHighlight extends Plugin {
	isMobile = false;

	async onload() {
		this.isMobile = Platform.isMobileApp || Platform.isMobile;
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
