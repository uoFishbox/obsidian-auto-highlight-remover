import { Plugin } from "obsidian";
import {
	AutoEmphasisRemovalSettingTab,
	AutoEmphasisRemovalSettings,
	DEFAULT_SETTINGS,
} from "./settings";

export default class AutoEmphasisRemoval extends Plugin {
	settings!: AutoEmphasisRemovalSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AutoEmphasisRemovalSettingTab(this.app, this));
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
