import * as React from 'react';

interface IProps {
    childMessage: string;
    onMessageChanged(newMessage: string): void;
}

interface IState {
    message?: string
}

export default class ChildComponent extends React.Component<IProps, IState> {

    public componentWillMount() {
        this.setState({ message: this.props.childMessage });
    }

    public render() {

        return (
            <div>
                <input type="text" value={this.state.message} onChange={(evt) =>
                    this.setState({ message: (evt.target as HTMLInputElement).value })} />
                <input type="button" value="Submit"
                    onClick={() => { this.props.onMessageChanged(this.state.message) } } />
            </div>)
    }
}