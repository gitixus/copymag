import 'gi://Gdk?version=4.0';
import 'gi://Gtk?version=4.0';

import { Application } from './Application.js';

export function main(argv) {
	console.log("Nombre de la aplicación: " + pkg.name);
	return new Application({ 'application-id': pkg.name }).run(argv);
}



