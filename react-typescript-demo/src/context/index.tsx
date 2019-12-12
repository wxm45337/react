
import React from 'react'
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';
import MainTemplate from '../home/main-template'

// 一个使用到ThemedButton组件的中间组件
function Toolbar(props: any) {
    return (
      <ThemedButton onClick={props.changeTheme}>
        Change Theme
      </ThemedButton>
    );
  }

interface State {
    theme: any
}
interface Props{
  match: any
}

export default class Theme extends React.Component<Props, State>{
    toggleTheme: Function;
    componentDidMount() {
      console.log(this.props.match.params);
    }
    constructor(props: any) {
        super(props);
        this.state = {
          theme: themes.light,
        };
    
        this.toggleTheme = () => {
          this.setState(state => ({
            theme:
              state.theme === themes.dark
                ? themes.light
                : themes.dark,
          }));
        };
    }
    
    render() {
        // ThemedButton 位于 ThemeProvider 内
        // 在外部使用时使用来自 state 里面的 theme
        // 默认 dark theme
        return (
          <MainTemplate>
            <ThemeContext.Provider value={this.state.theme}>
              <Toolbar changeTheme={this.toggleTheme} />
            </ThemeContext.Provider>
            <div>-----------------------------</div>
            <div>
              <ThemedButton />
            </div>
          </MainTemplate>
        );
    }
}