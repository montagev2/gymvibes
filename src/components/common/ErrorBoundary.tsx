import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TitanForge Error Caught in Boundary:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-void flex flex-col items-center justify-center p-6 text-center text-white font-display">
          <div className="bg-cyber border border-volt/30 rounded-3xl p-8 max-w-md w-full shadow-volt-glow">
            <div className="text-5xl mb-4">⚡</div>
            <h2 className="text-2xl font-black text-volt tracking-wider uppercase mb-2">
              TITANFORGE 3D
            </h2>
            <p className="text-sm font-semibold text-gray-300 mb-2">
              GLITCH OVERRIDDEN
            </p>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              A temporary WebGL or application interruption occurred. Tap below to reload fresh 3D assets.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="w-full py-3.5 px-6 rounded-xl bg-volt text-black font-black text-sm uppercase tracking-wider shadow-volt-glow hover:bg-volt/90 transition-all cursor-pointer"
            >
              🔄 Refresh Experience
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
