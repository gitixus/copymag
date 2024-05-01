import Gda from 'gi://Gda';
import GLib from 'gi://GLib';

export const Database = class {
    constructor(filename) {
        this._filename = GLib.build_filenamev([GLib.get_user_config_dir(), "copymag", filename]);
        this.connection = new Gda.Connection({
            provider: Gda.Config.get_provider("SQLite"),
            cnc_string: `DB_DIR=${GLib.get_user_config_dir()};DB_NAME=${filename}`
        });
        this.init();
    }

    init() {
        try {
            this.connection.open();
            const sql = "CREATE TABLE IF NOT EXISTS clipboard (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp INTEGER, type VARCHAR, content VARCHAR);";
            this.connection.execute_non_select_command(sql);
        } catch (error) {
            console.error("Error al inicializar la base de datos:", error);
        } finally {
            this.connection.close();
        }
    }

    insertText(text) {
        try {
            this.connection.open();
            let sql = `INSERT INTO clipboard (content, timestamp) values('${text}', ${Date.now()})`;
            this.connection.execute_non_select_command(sql);
        } catch (error) {
            console.error("Error al insertar texto en la base de datos:", error);
        } finally {
            this.connection.close();
        }
    }

    getAll() {
        try {
            this.connection.open();
            let sql = "SELECT timestamp, content FROM clipboard";
            let dataModel = this.connection.execute_select_command(sql);
            let iter = dataModel.create_iter();
            let iguales = [];
            while (iter.move_next()) {
                let timestamp = iter.get_value_at(0);
                let content = iter.get_value_at(1);
                iguales.push({ timestamp, content });
            }
            console.log(iguales);
        } catch (error) {
            console.error("Error al obtener datos de la base de datos:", error);
            return [];
        } finally {
            this.connection.close();
        }
    }
};
