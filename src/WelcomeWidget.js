import GObject from 'gi://GObject';
import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
const mainloop = imports.mainloop;

async function readClipboardText() {
	const display = Gdk.Display.get_default();
	const clipboard = display.get_clipboard();
	return new Promise((resolve, reject) => {
		clipboard.read_text_async(null, (source, result) => {
			try {
				const text = clipboard.read_text_finish(result);
				if (text) {
					console.log("Contenido del portapapeles: " + text);
					const formato = clipboard.get_formats();
					console.log("Formato: " + formato);
					resolve(text);
					return text;
				} else {
					console.log("El portapapeles está vacío");
					resolve(null);
				}
			} catch (error) {
				reject(error);
			}
		});
	});
}

export const WelcomeWidget = GObject.registerClass({
	GTypeName: 'FbrWelcomeWidget',
	CssName: 'welcome',
	Template: 'resource:///es/ruven/copymag/ui/WelcomeWidget.ui',
	Properties: {
		WelcomeText: GObject.ParamSpec.string(
			'welcome-text', // name
			'Welcome Text', // nick
			'The text displayed by the widget', // blurb
			GObject.ParamFlags.READWRITE, // flags
			'' // default value
		),
	},
	InternalChildren: ['welcomeLabel'],
}, class extends Gtk.Widget {
	get welcomeText() {
		// Return a default value if the text hasn't been set yet
		return this._welcomeText || '';
	}

	set welcomeText(value) {
		//value = "Ola ke ase";
		// Do nothing if the new value is the same as the old one
		if (this._welcomeText === value)
			return;
		// Store the value in an internal property
		this._welcomeText = value;
		// Hide the label if no text is set
		this._welcomeLabel.visible = !!value;
		// Notify that the value has changed
		this.notify('welcome-text');
	}

	onButtonClicked(_button) {
		readClipboardText();
	}
});
