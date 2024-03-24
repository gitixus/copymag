import GObject from 'gi://GObject';
import Gtk from 'gi://Gtk';

export const WelcomeWidget = GObject.registerClass({
	GTypeName: 'FbrWelcomeWidget',
	Template: 'resource:///es/ruven/copymag/ui/WelcomeWidget.ui'
}, class extends Gtk.Widget {});

