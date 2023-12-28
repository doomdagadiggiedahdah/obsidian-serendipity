import { Plugin} from 'obsidian';

export default class MyPlugin extends Plugin {
    onload() {
        this.addCommand({
            id: 'open-note-without-link',
            name: 'Open Note Without Link',
            callback: () => {
                this.openRandomNoteWithoutLink();
            }
        });
    }

    async openRandomNoteWithoutLink() {
        const allNotes = this.app.vault.getMarkdownFiles();
        let notesWithoutLinks = [];

        for (const note of allNotes) {
            try {
                const content = await this.app.vault.read(note);
                if (!this.containsLink(content)) {
                    notesWithoutLinks.push(note);
                }
            } catch (error) {
                console.error('Error reading file:', note.path, error);
            }
        }

        // Randomly select a note from the list of notes without links
        if (notesWithoutLinks.length > 0) {
            const randomNote = notesWithoutLinks[Math.floor(Math.random() * notesWithoutLinks.length)];
            this.app.workspace.activeLeaf.openFile(randomNote);
        } else {
            console.log('No notes without links found.');
        }
    }

    containsLink(content) {
        // Regular expression to find Markdown links
        const linkRegex = /\[.*?\]\(.*?\)|\[\[.*?\]\]/;
        return linkRegex.test(content);
    }

}

