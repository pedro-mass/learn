import { useEffect, useState } from 'react'
import logo from './logo.svg'
import { ChromeMessage, Sender } from './types'
import './App.css'

function getCurrentTab(): Promise<chrome.tabs.Tab> {
  const queryInfo: chrome.tabs.QueryInfo = {
    active: true,
    currentWindow: true,
  }

  if (!chrome.tabs) {
    return Promise.reject(new Error('chrome.tabs is not available'))
  }

  return new Promise(resolve => {
    chrome.tabs.query(queryInfo, tabs => {
      resolve(tabs[0])
    })
  })
}

function getCurrentTabId(): Promise<number | undefined> {
  return getCurrentTab().then(tab => {
    return tab.id
  })
}

export async function sendMessage<T = unknown>(
  message: object
): Promise<T | undefined> {
  /**
   * We can't use "chrome.runtime.sendMessage" for sending messages from React.
   * For sending messages from React we need to specify which tab to send it to.
   */
  const currentTabId = await getCurrentTabId()
  if (!currentTabId) {
    return
  }

  return new Promise(resolve => {
    /**
     * Sends a single message to the content script(s) in the specified tab,
     * with an optional callback to run when a response is sent back.
     *
     * The runtime.onMessage event is fired in each content script running
     * in the specified tab for the current extension.
     */
    chrome.tabs.sendMessage(currentTabId, message, (response, ...rest) => {
      console.log({ message, response, rest })
      return resolve(response)
    })
  })
}

export default function App() {
  const [url, setUrl] = useState<string>('')
  const [responseFromContent, setResponseFromContent] = useState<string>('')

  /**
   * Get current URL
   */
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true }

    chrome.tabs &&
      chrome.tabs.query(queryInfo, tabs => {
        const url = tabs[0].url ?? ''
        setUrl(url)
      })
  }, [])

  /**
   * Send message to the content script
   */
  const sendTestMessage = async () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: 'Hello from React',
    }

    const response = await sendMessage<string>(message)
    setResponseFromContent(response ?? '')
  }

  const sendRemoveMessage = async () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: 'delete logo',
    }

    const response = await sendMessage<string>(message)
    setResponseFromContent(response ?? '')
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>URL:</p>
        <p>{url}</p>
        <button onClick={sendTestMessage}>SEND MESSAGE</button>
        <button onClick={sendRemoveMessage}>Remove logo</button>
        <p>Response from content:</p>
        <p>{responseFromContent}</p>
      </header>
    </div>
  )
}
