import { Editor, Plugin } from "obsidian";
import {
	AutoEmphasisRemovalSettings as AutoHighlightRemovalSettings,
	AutoHighlightRemovalSettingTab,
	DEFAULT_SETTINGS,
} from "./settings";

export default class AutoHighlightRemoval extends Plugin {
	settings!: AutoHighlightRemovalSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "test-command",
			name: "test command",
			editorCallback: (editor: Editor) => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
		});

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
}
