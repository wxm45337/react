import React from 'react'
import {ThemeContext} from './theme-context';

function ThemedButton(props: any) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button {...props} style={{backgroundColor: theme.background}}/>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemedButton;