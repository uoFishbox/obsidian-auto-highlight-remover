import { App, PluginSettingTab, Setting } from "obsidian";
import EnhancedFocusHighlight from "./main";
import { Settings, cursorPositionPreference } from "./types";

export const DEFAULT_SETTINGS: Settings = {
	clearHighlightsOnEdit: true,
	cursorPositionPreference: "endOfLine",
	enableMobileFocus: true,
};

export class EnhancedFocusHighlightSettingTab extends PluginSettingTab {
	plugin: EnhancedFocusHighlight;

	constructor(app: App, plugin: EnhancedFocusHighlight) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		new Setting(containerEl)
			.setName("Clear highlights when editing")
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.clearHighlightsOnEdit)
					.onChange((value) => {
						this.plugin.settings.clearHighlightsOnEdit = value;
						this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("Cursor position after focus")
			.addDropdown((dropdown) => {
				dropdown.addOption(
					"afterHighlight",
					"Immediately after the highlight"
				);
				dropdown
					.addOption("endOfLine", "End of line")
					.setValue(this.plugin.settings.cursorPositionPreference)
					.onChange((value: string) => {
						this.plugin.settings.cursorPositionPreference =
							value as cursorPositionPreference;
						this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("On mobile: focus on editor after highlighting")
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.enableMobileFocus)
					.onChange((value) => {
						this.plugin.settings.enableMobileFocus = value;
						this.plugin.saveSettings();
					});
			});
	}
}
