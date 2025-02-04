import {Component} from "react";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    render() {
        if(this.state.hasError === true)
            return <p>Something went wrong!</p>;
        return this.props.children;
    }
}