import Gtk from 'gi://Gtk';
import GObject from 'gi://GObject';

import './WelcomeWidget.js';
import { Window } from './Window.js';


export const Application = GObject.registerClass({
	GTypeName: 'FbrApplication'
}, class extends Gtk.Application {
	vfunc_activate() {
		const window = new Window({ application: this });
		window.present();
	}
});
