import Gtk from 'gi://Gtk';
import GObject from 'gi://GObject';

export const Application = GObject.registerClass({
	GTypeName: 'Application'
}, class extends Gtk.Application {
	vfunc_activate() {
		const window = new Gtk.ApplicationWindow({ application: this });
		const label = new Gtk.Label({ label: '¡Aloha, mundo!' });
		window.child = label;
		window.present();
	}
});
