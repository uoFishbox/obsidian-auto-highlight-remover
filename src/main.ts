import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

interface AutoEmphasisRemovalSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: AutoEmphasisRemovalSettings = {
	mySetting: "default",
};

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
class AutoEmphasisRemovalSettingTab extends PluginSettingTab {
	plugin: AutoEmphasisRemoval;

	constructor(app: App, plugin: AutoEmphasisRemoval) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
