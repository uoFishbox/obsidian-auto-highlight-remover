import { App, PluginSettingTab, Setting } from "obsidian";
import EnhancedFocusHighlight from "./main";
import { Settings, cursorPositionPreference } from "./types";

export const DEFAULT_SETTINGS: Settings = {
	clearHighlightsAfterDelay: false,
	clearHighlightsDelaySeconds: 1.5,
	clearHighlightsOnEdit: true,
	cursorPosition: "endOfLine",
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

		if (this.plugin.isMobile) {
			new Setting(containerEl)
				.setName("On mobile: Focus on editor after highlighting")
				.setDesc(
					"By default in Obsidian mobile, after highlighting text, the editor does not receive focus. When this setting is enabled, the editor will receive focus after highlighting text on mobile as well."
				)
				.addToggle((toggle) => {
					toggle
						.setValue(this.plugin.settings.enableMobileFocus)
						.onChange(async (value) => {
							this.plugin.settings.enableMobileFocus = value;
							await this.plugin.saveSettings();
							this.display();
						});
				});
		}

		if (!this.plugin.isMobile || this.plugin.settings.enableMobileFocus) {
			new Setting(containerEl)
				.setName("Cursor position after focus")
				.addDropdown((dropdown) => {
					dropdown
						.addOption(
							"afterHighlight",
							"Immediately after the highlight"
						)
						.addOption("endOfLine", "End of line")
						.addOption("default", "Default (no change)")
						.setValue(this.plugin.settings.cursorPosition)
						.onChange(async (value: string) => {
							this.plugin.settings.cursorPosition =
								value as cursorPositionPreference;
							await this.plugin.saveSettings();
						});
				});
		}

		new Setting(containerEl)
			.setName("Clear highlights when editing")
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.clearHighlightsOnEdit)
					.onChange(async (value) => {
						this.plugin.settings.clearHighlightsOnEdit = value;
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName("Clear highlights after a certain period of time")
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.clearHighlightsAfterDelay)
					.onChange(async (value) => {
						this.plugin.settings.clearHighlightsAfterDelay = value;
						await this.plugin.saveSettings();
						this.display();
					});
			});

		if (this.plugin.settings.clearHighlightsAfterDelay) {
			new Setting(containerEl)
				.setName("Delay before clearing highlights (seconds)")
				.addText((text) => {
					text.setPlaceholder("1.5")
						.setValue(
							this.plugin.settings.clearHighlightsDelaySeconds.toString()
						)
						.onChange(async (value) => {
							const numValue = parseFloat(value);
							if (!isNaN(numValue)) {
								this.plugin.settings.clearHighlightsDelaySeconds =
									numValue;
								await this.plugin.saveSettings();
							}
						});
				});
		}
	}
}
