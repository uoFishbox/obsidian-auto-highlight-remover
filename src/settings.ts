import { App, PluginSettingTab, Setting } from "obsidian";
import AutoHighlightRemoval from "./main";

export interface AutoEmphasisRemovalSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: AutoEmphasisRemovalSettings = {
	mySetting: "default",
};

export class AutoHighlightRemovalSettingTab extends PluginSettingTab {
	plugin: AutoHighlightRemoval;

	constructor(app: App, plugin: AutoHighlightRemoval) {
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
