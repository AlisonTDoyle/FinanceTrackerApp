import { Injectable } from '@angular/core';

// Capture gtag
declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  // Properties

  // Constuctors
  constructor() { }

  // Methods
  private trackEvent(eventName: string, eventDetails: string, eventCategory: string) {
    // Create event info object
    let eventInfo = {
      'event_category': eventCategory,
      'event_label': eventName,
      'value': eventDetails
    }

    // Send event to Google Analytics
    gtag('event', eventName, eventInfo)
  }
}
