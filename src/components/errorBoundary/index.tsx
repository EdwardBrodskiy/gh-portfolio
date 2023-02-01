import React, { ReactNode } from 'react'

type Props = { children: ReactNode }

export class ErrorBoundary extends React.Component<Props, { hasError: boolean; error?: Error }> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: undefined }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {}

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>{this.state.error?.message}</h1>
    }

    return this.props.children
  }
}
