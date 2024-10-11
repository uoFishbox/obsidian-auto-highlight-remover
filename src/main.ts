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
		await this.loadSettings();
		this.registerEvent(
			this.app.workspace.on("editor-change", this.handleHilightState)
		);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AutoHighlightRemovalSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	handleHilightState(editor: Editor) {
		if (hasHighlighInEditor(editor)) {
			removeHighlightFromEditor(editor);
			// console.log("highlight removed");
		}
	}
}
