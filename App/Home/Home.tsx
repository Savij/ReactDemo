import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import styles from './Home.Styles';
import ToDoList from '../Components/ToDoList/ToDoList';
import { IToDo } from '../Models/IToDo';

interface IState {
    toDoList?: IToDo[];
    currentToDo?: string;
}

export default class Home extends React.Component<{}, IState> {

    public componentWillMount() {
        this.setState({
            toDoList: [] as IToDo[],
            currentToDo: ''
        });
    }

    private baddAddToDo(newItem: IToDo) {
        this.state.toDoList.push(newItem); // WRONG!
        this.setState({ currentToDo: '' });
    }

    private goodAddToDo(newItem: IToDo) {
        const newList = [...this.state.toDoList];
        newList.push(newItem);
        this.setState({
            toDoList: newList,
            currentToDo: ''
        })
    }

    public render() {
        return <div>
            <div className="container">
                <div className={`row ${css(styles.rowPad)}`}>
                    <div className="col-lg-12">
                        <input type="text" value={this.state.currentToDo}
                            onChange={(evt) => this.setState({ currentToDo: (evt.target as HTMLInputElement).value })} />
                        <span>
                            <input type="button" className={`btn btn-success ${css(styles.addButton)}`} value="Add ToDo" onClick={() =>
                                this.goodAddToDo({
                                    id: this.state.toDoList.length,
                                    toDo: this.state.currentToDo
                                } as IToDo)} />
                        </span>
                    </div>
                </div>
                <div className={`row ${css(styles.rowPad)}`}>
                    <div className="col-lg-12">
                        <ToDoList toDos={this.state.toDoList} />
                    </div>
                </div>
            </div>
        </div>
    }
}