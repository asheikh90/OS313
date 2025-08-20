// Analytics utility - stub for future implementation
export const track = (event, payload = {}) => {
  // For now, just log to console
  console.log('Analytics Event:', event, payload)
  
  // Future: Send to analytics service
  // analytics.track(event, payload)
}

// Predefined events
export const EVENTS = {
  CTA_CLICK: 'os313_cta_click',
  LANE_SELECTED: 'os313_lane_selected',
  WAITLIST_SUBMITTED: 'os313_waitlist_submitted',
  CHATBOT_OPENED: 'os313_chatbot_opened',
  CHATBOT_CLOSED: 'os313_chatbot_closed'
}
