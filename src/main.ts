import { Editor, Platform, Plugin } from "obsidian";
import { applyFocusHighlightPatch } from "./highlightCursorPatcher";
import {
	hasHighlighInEditor,
	removeHighlightFromEditor,
} from "./highlightHandler";

import { DEFAULT_SETTINGS, EnhancedFocusHighlightSettingTab } from "./settings";
import { EnhancedFocusHighlightSettings } from "./types";

export default class EnhancedFocusHighlight extends Plugin {
	isMobile = false;
	settings!: EnhancedFocusHighlightSettings;

	async onload() {
		await this.loadSettings();
		this.isMobile = Platform.isMobileApp || Platform.isMobile;
		this.registerEvent(
			this.app.workspace.on(
				"editor-change",
				this.removeHighlightIfNeeded.bind(this)
			)
		);
		this.applyObsidianPatch();
		this.addSettingTab(
			new EnhancedFocusHighlightSettingTab(this.app, this)
		);
	}

	onunload() {}

	private applyObsidianPatch() {
		this.app.workspace.onLayoutReady(() => {
			applyFocusHighlightPatch(this);
		});
	}

	private removeHighlightIfNeeded(editor: Editor) {
		if (
			hasHighlighInEditor(editor) &&
			this.settings.clearHighlightsOnEdit
		) {
			removeHighlightFromEditor(editor);
		}
	}

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
