import Adw from 'gi://Adw';
import GObject from 'gi://GObject';

import './WelcomeWidget.js';
import { Window } from './Window.js';
import { Save } from './Save.js';

export const Application = GObject.registerClass({
	GTypeName: 'FbrApplication'
}, class extends Adw.Application {
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
