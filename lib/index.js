"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../style/index.css");
var apputils_1 = require("@jupyterlab/apputils");
var notebook_1 = require("@jupyterlab/notebook");
/**
 * Initialization data for the jupyterlab_hidecode extension.
 */
var extension = {
    id: 'jupyterlab_hidecode',
    autoStart: true,
    requires: [apputils_1.ICommandPalette, notebook_1.INotebookTracker],
    activate: function (app, palette, tracker) {
        console.log('JupyterLab extension Hide The Code is activated!');
        function executeActions() {
            var cellMetadata = tracker.currentWidget.notebook.activeCell.model.metadata;
            var cellCSS = tracker.currentWidget.notebook.activeCell.node.style;
            // Active cell number.
            tracker.currentWidget.notebook.activeCellIndex = 0;
            for (var i = 0; i < tracker.currentWidget.model.cells.length - 1; i++) {
                if (cellMetadata.get("hideCode") == "true") {
                    app.commands.execute('notebook:hide-cell-code');
                }
                else if (cellMetadata.get("readOnly") == "true") {
                    // sets CSS pointer-events to none and cursor to default to make cell read only. 
                    cellCSS.pointerEvents = "none";
                    cellCSS.cursor = "default";
                }
                tracker.currentWidget.notebook.activeCellIndex++;
            }
        }
        // If the notebook changes, it runs. 
        tracker.currentChanged.connect(function () {
            setTimeout(executeActions, 100);
        });
        // Runs on pageload if notebook is already open
        setTimeout(executeActions, 200);
        // Add an application command
        var command = 'hidecode:hidecode';
        app.commands.addCommand(command, {
            label: 'Hide The Code',
            execute: function () {
                executeActions();
            }
        });
        // Add the command to the palette.
        palette.addItem({ command: command, category: 'Extensions' });
    }
};
exports.default = extension;
