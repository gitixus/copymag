import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';

export const Save = function () {
    async function readClipboardText() {
        const display = Gdk.Display.get_default();
        const clipboard = display.get_clipboard();
        return new Promise((resolve, reject) => {
            clipboard.read_text_async(null, (source, result) => {
                try {
                    const text = clipboard.read_text_finish(result);
                    if (text) {
                        resolve(text);
                    } else {
                        resolve(null);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    Gtk.init();

    async function main() {
        const display = Gdk.Display.get_default();
        const clipboard = display.get_clipboard();
        let lastText = null;

        //Use a timeout to periodically check the clipboard
        const intervalId = setInterval(async () => {
            try {
                const text = await readClipboardText();
                if (text !== lastText) {
                    lastText = text;
                    if (text) {
                        console.log('Contenido del portapapeles:', text);
                    } else {
                        console.log('El portapapeles está vacío');
                    }
                }
            } catch (error) {
                console.error('Error al leer el portapapeles:', error);
            }
        }, 1000);
    }

    main().catch((error) => {
        console.error('Error en la función main:', error);
    });
}