import React, { Component } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "../../types/TaskTypes";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong 😢</h2>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
