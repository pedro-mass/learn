import { ChromeMessage, Sender } from '../types'

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: (msg: string) => void
) => {
  console.log('[content.js]. Message received', {
    message,
    sender,
  })

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === 'Hello from React'
  ) {
    response('Hello from content.js')
  }

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === 'delete logo'
  ) {
    const logo = document.getElementById('hplogo')
    logo?.parentElement?.removeChild(logo)
    response('logo deleted')
  }
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
