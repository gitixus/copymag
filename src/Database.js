import Gda from 'gi://Gda';
import GLib from 'gi://GLib'

export const Database = class {
    constructor(filename) {
        this._filename = GLib.build_filenamev([GLib.get_home_dir(), ".config", "copymag", filename]);
        this.connection = new Gda.Connection({
            provider: Gda.Config.get_provider("SQLite"),
            cnc_string: `DB_DIR=${GLib.get_home_dir()}/.config/copymag;DB_NAME=${copymag}`
        });
        this.init();
    }

    init() {
        this.connection.open(null);
        const sql = "CREATE TABLE IF NOT EXISTS clipboard (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp INTEGER, type VARCHAR, content VARCHAR);";
        const statement = this.connection.create_statement(sql);
        statement.execute_statement();
    }

    close() {
        this.connection.close();
    }

    insertText(text) {
        const statement = this.connection.create_statement(`INSERT INTO clipboard (column_name) VALUES ('${text}')`);
        statement.execute();
    }
};