import React from 'react';

class BasePage extends React.Component {

    render() {
        return (
            <div className="wrapper big-bg">
                {this.props.children}
            </div>
        );
    }

}

export default BasePage;
