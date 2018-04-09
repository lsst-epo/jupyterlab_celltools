"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../style/index.css");
var widgets_1 = require("@phosphor/widgets");
var apputils_1 = require("@jupyterlab/apputils");
function hideCode() {
}
/**
 * Initialization data for the jupyterlab_hidecode extension.
 */
var extension = {
    id: 'jupyterlab_hidecode',
    autoStart: true,
    requires: [apputils_1.ICommandPalette],
    activate: function (app, palette) {
        console.log('JupyterLab extension Hide The Code is activated!');
        console.log('ICommandPalette:', palette);
        // Create a single widget
        var widget = new widgets_1.Widget();
        widget.id = 'hidecode-jupyterlab';
        widget.title.label = 'tab title';
        widget.title.closable = true;
        // Add an application command
        var command = 'hidecode:hidecode';
        app.commands.addCommand(command, {
            label: 'Hide The Code',
            execute: function () {
                console.log('Success!');
                hideCode();
            }
        });
        // Add the command to the palette.
        palette.addItem({ command: command, category: 'Extensions' });
    }
};
exports.default = extension;
