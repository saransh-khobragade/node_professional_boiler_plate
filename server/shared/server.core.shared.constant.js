function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

//response message format

define("init_time", "watchdog_init");
define("corr_id", "watchdog_cr_id");
define("url_path", "watchdog_path");