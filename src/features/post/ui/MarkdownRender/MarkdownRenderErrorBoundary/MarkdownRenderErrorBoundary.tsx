import React from 'react';

type ErrorBoundaryProps = {
  onError: () => void;
  hasTagError: boolean;
  children: React.ReactNode;
};

class MarkdownRenderErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });

    this.props.onError();
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.hasTagError && !this.props.hasTagError) {
      this.setState({
        hasError: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>HTML 태그 파싱 실패</div>;
    }

    return this.props.children;
  }
}

export default MarkdownRenderErrorBoundary;
