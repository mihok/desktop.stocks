import React, { Component } from 'react';

import './styles.scss';

interface InlineProps {
  active?: boolean;

  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;

  onActivated?: () => void;
  onDeactivated?: () => void;

  onCommand?: (command: string) => void;
  onSearch?: (query: string) => void;
  onQuit?: () => void;
  onSet?: (key: string, value: string) => void;

  barClassNames?: '';
  inputClassNames?: '';

  status?: () => React.ReactNode;

  commands?: { };
}

type Props = InlineProps;

type State = {
  active: boolean;
  keyDown: boolean;
  keys: Array<string>;
  value: string;
  commands: { [command: string]: (argv: Array<string>, argc: number) => void }
};

export const DEFAULT_COMMANDS = {
  'q': function DefaultQuitShorthand (argv: Array<string>, argc: number) { console.log('QUIT', this, arguments) },
  'set': function DefaultSet (argv: Array<string>, argc: number) { console.log('SET'); },
};

export enum CommandType {
  Exec = 'EXECUTE_CMD',
  Search = 'SEARCH_CMD',
}

export class VimBar extends Component<Props, State> {
  state: State = {
    active: false,
    keyDown: false,
    keys: [],
    value: '',
    commands: DEFAULT_COMMANDS,
  }

  private input = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    this.state.active = props.active as boolean;
    this.state.commands = props.commands ? Object.assign({}, DEFAULT_COMMANDS, props.commands) : DEFAULT_COMMANDS;
  }

  handleCommand () {
    const { value, commands } = this.state;
    const { onCommand } = this.props;

    let type: CommandType = CommandType.Exec;
    const argv = value.slice(1).split(' ');
    const command = argv[0];
    

    // What type of command is it?
    if (value[0] === ':') {
      // Execution Command
      type = CommandType.Exec
    } else if (value[0] === '/') {
      // Search Command
      type = CommandType.Search
    }


    if (type === CommandType.Exec && commands.hasOwnProperty(command)) {
      commands[command].call(undefined, argv, argv.length);
    } else {
      if (type === CommandType.Exec && command.length > 1) {
        console.error('ERROR', `Not a command: ${value}`);
      }
    }  

    this.setState({
      active: false,
      value: '',
    });

    if (onCommand) {
      onCommand(value);
    }
  }

  handleInput (event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      value: event.currentTarget.value,
    });
  }

  handleKeyDown (event: KeyboardEvent) {
    const { active, keys } = this.state;
    const { onKeyDown } = this.props;
 
    const newKeys = new Set([ ...keys, event.key]);
    this.setState({
      keyDown: true,
      keys: [...newKeys],
    });

    console.log('KEY_DOWN', newKeys); 

    if ((!active && keys.includes('Shift') && event.key === ':')
        || (!active && !keys.length && event.key === '/')) {
      this.setState({
        active: true,
      }, () => {
        this.input!.current!.focus();
      });
    }
 
    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  handleKeyUp (event: KeyboardEvent) {
    const { onKeyUp } = this.props;
    const { active, keys } = this.state;

    const updatedKeys = new Set([...keys]);

    updatedKeys.delete(event.key);

    this.setState({
      keyDown: false,
      keys: [...updatedKeys],
    });

    console.log('KEY_UP');

    if (active) {
      if (keys.includes('Enter')) {
        this.handleCommand();
      }
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  renderStatus () {
    const { status } = this.props;

    return status ? status : (
      <span>STATUS</span>
    );
  }

  renderInput () {
    const { value } = this.state;
    const { inputClassNames } = this.props;

    return (
      <input
        id="vim_input"
        type="text"
        className={inputClassNames}
        placeholder="Type a command or ? to see the available commands"
        onChange={this.handleInput.bind(this)}
        value={value}
        ref={this.input}
      />
    );
  }

  render () {
    const { active } = this.state;
    const { barClassNames } = this.props;
    const renderedBar = active
      ? this.renderInput()
      : this.renderStatus();

    let classNames: Array<string> = barClassNames ? [barClassNames] : [];

    if (active) {
      classNames.push('active');
    }

    return (
      <nav className={classNames.join(' ')}>
        {renderedBar}
      </nav>
    );
  }
};

export default VimBar;
