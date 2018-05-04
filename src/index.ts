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
    // Active cell Number.
    tracker.currentWidget.notebook.activeCellIndex = 0;
    
    for (var i = 0; i < tracker.currentWidget.model.cells.length -1; i++) {
      // checks metadata and executes 
        if (tracker.currentWidget.notebook.activeCell.model.metadata.get("hideCode") == "true") {
          app.commands.execute('notebook:hide-cell-code');   
        } 
        tracker.currentWidget.notebook.activeCellIndex++;
      }     
    }


  tracker.currentChanged.connect(() => { 
     setTimeout(executeActions, 100);
  });
  setTimeout(executeActions, 1000); 
  }

}

export default extension;
