import { Editor, Plugin } from "obsidian";
import {
	hasHighlighInEditor,
	removeHighlightFromEditor,
} from "./removeHighlight";
import {
	AutoHighlightRemovalSettings,
	AutoHighlightRemovalSettingTab,
	DEFAULT_SETTINGS,
} from "./settings";

export default class AutoHighlightRemoval extends Plugin {
	settings!: AutoHighlightRemovalSettings;

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
