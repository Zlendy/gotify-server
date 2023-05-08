import IconButton from '@material-ui/core/IconButton';
import Copy from '@material-ui/icons/FileCopyOutlined';
import { inject, Stores } from '../inject'
import React, { Component } from 'react';
import { observer } from 'mobx-react';

interface IProps {
  content: string
}

@observer
class CopyToClipboard extends Component<IProps & Stores<'snackManager'>> {


  public render() {
    const { snackManager, content } = this.props

    return (
      <IconButton
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(content);
            snackManager.snack('Copied to clipboard');
          } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            snackManager.snack('Failed to copy to clipboard');
          }
        }}
        className="copy"
        title="Copy to clipboard" >
        <Copy />
      </IconButton>
    );
  }

}

export default inject('snackManager')(CopyToClipboard);
