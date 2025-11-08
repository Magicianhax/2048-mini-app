import { useEffect, useState } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import Game2048 from './components/Game2048'
import './App.css'

function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // Wait for the app to fully load and SDK to be available
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // Call ready() to hide splash screen if SDK is available
        // This works both in Farcaster and for testing
        if (sdk?.actions?.ready) {
          await sdk.actions.ready()
          console.log('SDK ready() called successfully')
        }
        setIsReady(true)
      } catch (error) {
        console.error('Failed to initialize SDK:', error)
        // Still show the game even if SDK fails (for testing outside Farcaster)
        setIsReady(true)
      }
    }

    initializeSDK()
  }, [])

  if (!isReady) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading 2048...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Game2048 />
    </div>
  )
}

export default App

