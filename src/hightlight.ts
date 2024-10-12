import { Editor } from "obsidian";

export function removeHighlightFromEditor(editorView: Editor) {
	editorView.removeHighlights("is-flashing");
}

export function hasHighlighInEditor(editorView: Editor) {
	return editorView.hasHighlight("is-flashing");
}
