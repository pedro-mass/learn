import src from './image.png'
import './content.css'

console.log('starting')

const html = `
<div class="crx">
  <h1>Made with</h1>
  <img src=${chrome.runtime.getURL(src)}>
</div>
`

const doc = new DOMParser().parseFromString(html, 'text/html')
// document.body.append(doc.body.firstElementChild)
document.body.append(doc.body.firstChild)

console.log({msg: 'done', element: doc.body.firstElementChild, doc})