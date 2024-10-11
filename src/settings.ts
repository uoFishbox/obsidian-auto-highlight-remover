import { App, PluginSettingTab, Setting } from "obsidian";
import AutoEmphasisRemoval from "./main";

export interface AutoEmphasisRemovalSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: AutoEmphasisRemovalSettings = {
	mySetting: "default",
};

export class AutoEmphasisRemovalSettingTab extends PluginSettingTab {
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
