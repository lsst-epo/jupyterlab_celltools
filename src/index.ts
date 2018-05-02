import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';

import {
  Widget
} from '@phosphor/widgets';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  INotebookTracker 
} from '@jupyterlab/notebook';


const NOTEBOOK = "foundational.ipynb";

/**
 * Initialization data for the jupyterlab_hidecode extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_hidecode',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker],
  activate: (app: JupyterLab, palette: ICommandPalette, tracker: INotebookTracker) => {
  console.log('JupyterLab extension Hide The Code is activated!');
  console.log('ICommandPalette:', palette);
        
    // Create a single widget
    let widget: Widget = new Widget();
    widget.id = 'hidecode-jupyterlab';
    widget.title.label = 'tab title';
    widget.title.closable = true;

  
    // Add an application command
    const command: string = 'hidecode:hidecode';
    app.commands.addCommand(command, {
        label: 'Hide The Code',
        execute: () => {
          console.log('Success!');
          app.commands.execute('notebook:hide-all-cell-code');          
        }
      });
      // Add the command to the palette.
      palette.addItem({command, category: 'Extensions'});


      // Add an event listener that grabs notebooks by name(for now) and hides the code.
      document.addEventListener("click", function(event) {
        var target = <HTMLElement> event.target;
          if (String(target.innerHTML) || String(tracker.currentWidget.title.label) == NOTEBOOK) {
            setTimeout(function() { app.commands.execute('hidecode:hidecode')}, 200);
          }
        });
      setTimeout(function() { document.body.click();}, 100);
    }  
};

export default extension;
