import * as React from 'react';

import { Grid } from 'react-bootstrap';

export default class Settings extends React.Component<{}, {}> {
    public render() {
        return (
            <Grid fluid={ true }>
                Settings Contents
            </Grid>
        );
    }
}