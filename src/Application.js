import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import GObject from 'gi://GObject';
import Gio from 'gi://Gio';

import './WelcomeWidget.js';
import { Window } from './Window.js';
import { Save } from './Save.js';

export const Application = GObject.registerClass({
	GTypeName: 'FbrApplication'
}, class extends Adw.Application {

	constructor() {
		super({application_id: 'es.ruven.copymag', flags: Gio.ApplicationFlags.FLAGS_NONE});

		//Acción exit
		const quit_action = new Gio.SimpleAction({name: 'quit'});
			quit_action.connect('activate', action => {
			this.quit();
		});
		this.add_action(quit_action);
		this.set_accels_for_action('app.quit', ['<primary>q']);

		//Acerca de
		const show_about_action = new Gio.SimpleAction({name: 'about'});
		show_about_action.connect('activate', action => {
			let aboutParams = {
				authors: [
				  'Rubén Parra y David Parra'
				],
				version: '0.1.0 Alpha',
				program_name: 'Copymag',
				license: 'Software Libre - GPLv3. https://www.gnu.org/licenses/gpl-3.0.txt',
				//logo: pkg.name,
				transient_for: this.active_window,
				modal: true,
			};
			const aboutDialog = new Gtk.AboutDialog(aboutParams);
			aboutDialog.present();
		});
		this.add_action(show_about_action);

		//Preferencias
		const show_preferences_action = new Gio.SimpleAction({name: 'preferences'});
		this.add_action(show_preferences_action);
	}

	vfunc_startup() {
		super.vfunc_startup();
	}
	vfunc_activate() {
		const window = new Window({ application: this });
		window.present();
	}
});

//Execute the clipboard read and save.
Save();
