import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import styles from "./ToDoList.Styles";
import { IToDo } from '../../Models/IToDo';

interface IProps {
    toDos: IToDo[];
}

export default class ToDoList extends React.Component<IProps, {}> {
    public render() {
        return <div>
            <div className="container">
                <div className={`row ${css(styles.rowPad)}`}>
                    <div className="col-lg-12">
                        {
                            this.props.toDos && this.props.toDos.length > 0 && <ul>
                                {
                                    this.props.toDos.map(toDo => {
                                        return <li key={toDo.id}>{toDo.toDo}</li>
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}