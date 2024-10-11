import { Editor, Plugin } from "obsidian";
import {
	hasHighlighInEditor,
	removeHighlightFromEditor,
} from "./removeHighlight";

export default class AutoHighlightRemoval extends Plugin {
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
