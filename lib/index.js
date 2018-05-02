"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../style/index.css");
var widgets_1 = require("@phosphor/widgets");
var apputils_1 = require("@jupyterlab/apputils");
var notebook_1 = require("@jupyterlab/notebook");
var NOTEBOOK = "foundational.ipynb";
/**
 * Initialization data for the jupyterlab_hidecode extension.
 */
var extension = {
    id: 'jupyterlab_hidecode',
    autoStart: true,
    requires: [apputils_1.ICommandPalette, notebook_1.INotebookTracker],
    activate: function (app, palette, tracker) {
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
                app.commands.execute('notebook:hide-all-cell-code');
            }
        });
        // Add the command to the palette.
        palette.addItem({ command: command, category: 'Extensions' });
        // Add an event listener that grabs notebooks by name(for now) and hides the code.
        document.addEventListener("click", function (event) {
            var target = event.target;
            if (String(target.innerHTML) || String(tracker.currentWidget.title.label) == NOTEBOOK) {
                setTimeout(function () { app.commands.execute('hidecode:hidecode'); }, 200);
            }
        });
        setTimeout(function () { document.body.click(); }, 100);
    }
};
exports.default = extension;
