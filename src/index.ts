import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  INotebookTracker
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
    // If the notebook isn't loaded by the time we get run,
    // reschedule us to run again.
    if (tracker.currentWidget == null) {
        setTimeout(executeActions, 100);
        return;
    }

    // Active cell number.
    tracker.currentWidget.notebook.activeCellIndex = 0;

    for (var i = 0; i < tracker.currentWidget.model.cells.length; i++) {

        if (tracker.currentWidget.notebook.activeCell.model.metadata.get("hideCode") == "true") {
          app.commands.execute('notebook:hide-cell-code');   
        } 
        else if (tracker.currentWidget.notebook.activeCell.model.metadata.get("readOnly") == "true") {
          // sets CSS pointer-events to none and cursor to default to make cell read only. 
          tracker.currentWidget.notebook.activeCell.node.style.pointerEvents = "none";
          tracker.currentWidget.notebook.activeCell.node.style.cursor = "default";
        }
        tracker.currentWidget.notebook.activeCellIndex++;
      }     
    }

  // If the notebook changes, it runs. 
  tracker.currentChanged.connect(() => { 
     setTimeout(executeActions, 100);
  });

  // When we open a notebook, it runs.
  tracker.widgetAdded.connect(() => {
     setTimeout(executeActions, 100);
  });

  // Runs on pageload if notebook is already open
  setTimeout(executeActions, 100);

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
