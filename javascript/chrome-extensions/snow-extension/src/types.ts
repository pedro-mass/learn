// Popup or content script requesting the current status
interface SnowRequest {
  type: 'REQ_SNOW_STATUS'
}

// Background script broadcasting current status
interface SnowResponse {
  type: 'SNOW_STATUS'
  snowing: boolean
}

// Popup requesting background script for status change
interface SnowToggle {
  type: 'TOGGLE_SNOW'
  snowing: boolean
}

export type MessageType = SnowRequest | SnowResponse | SnowToggle
