import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
import GObject from 'gi://GObject';

import './WelcomeWidget.js';
import { Window } from './Window.js';


export const Application = GObject.registerClass({
	GTypeName: 'FbrApplication'
}, class extends Gtk.Application {
	vfunc_startup() {
		super.vfunc_startup();
	}
	vfunc_activate() {
		const window = new Window({ application: this });
		window.present();
	}
});
