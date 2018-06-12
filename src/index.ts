import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  INotebookTracker,
  NotebookActions
} from '@jupyterlab/notebook';

/**
 * Initialization data for the jupyterlab_hidecode extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_hidecode',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (app: JupyterLab, palette: ICommandPalette, tracker: INotebookTracker) => {
   console.log('JupyterLab extension Hide The Code is activated!');


   function executeActions() {
    // If the notebook or kernel isn't loaded by the time we get run,
    // reschedule us to run again.
    if (tracker.currentWidget == null || !tracker.currentWidget.session.isReady) {
        console.log('Not ready to hide the code yet.');
        setTimeout(executeActions, 100);
        return;
    }

    // If there's just one cell, the notebook is still loading.
    var numCells = tracker.currentWidget.model.cells.length;
    if (numCells == 1) {
        console.log('Only one cell, notebook is still loading.');
        setTimeout(executeActions, 100);
        return;
    }

    // Active cell number.
    console.log('Hiding the code for cells:', numCells);

    tracker.currentWidget.notebook.activeCellIndex = 0;

    for (var i = 0; i < numCells; i++) {

        if (tracker.currentWidget.notebook.activeCell.model.metadata.get("hideCode") == "true") {
          app.commands.execute('notebook:hide-cell-code');
        } 
        if (tracker.currentWidget.notebook.activeCell.model.metadata.get("readOnly") == "true") {
          // sets CSS pointer-events to none and cursor to default to make cell read only. 
          tracker.currentWidget.notebook.activeCell.node.style.pointerEvents = "none";
          tracker.currentWidget.notebook.activeCell.node.style.cursor = "default";
        }
        if (tracker.currentWidget.notebook.activeCell.model.metadata.get("autoRun") == "true") {
          // NotebookActions.run will run the currently active cell, so this is implictly using
          // the activeCellIndex to pick which cell to run in the notebook.  The session refers
          // to which python kernel to use to run the cell.
          NotebookActions.run(tracker.currentWidget.notebook, tracker.currentWidget.session);
        }
        tracker.currentWidget.notebook.activeCellIndex++;
      }     
    }

  // When open a notebook is opened, it runs.
  tracker.widgetAdded.connect(() => {
     setTimeout(executeActions, 100);
  });

  // Add an application command
    const command: string = 'hidecode:hidecode';
    app.commands.addCommand(command, {
        label: 'Hide The Code',
        execute: () => {
         executeActions() 
        }
      });
      // Add the command to the palette.
      palette.addItem({command, category: 'Extensions'});

  }
}

export default extension;
