import * as React from 'react';
import ChildComponent from '../ChildComponent/ChildComponent';

interface IState {
    message?: string;
    color?: string;
}

export default class ParentComponent extends React.Component<{}, IState> {

    public componentWillMount() {
        this.setState({ message: "Im the default value!" });
    }

    public render() {
        return (
            <div>
                <div>{this.state.message}</div>
                <ChildComponent childMessage={this.state.message}
                    onMessageChanged={(newMessage) => {
                        this.setState({ message: newMessage })
                    } }
                    />
            </div>)
    }
}