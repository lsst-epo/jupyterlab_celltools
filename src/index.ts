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

/**
 * Initialization data for the jupyterlab_hidecode extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_hidecode',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
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
    }  
};

export default extension;
