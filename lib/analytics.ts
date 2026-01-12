// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for PUPCL website
export const trackProgramView = (programTitle: string, category: string) => {
  event({
    action: 'view_program',
    category: 'Programs',
    label: `${category} - ${programTitle}`,
  });
};

export const trackGalleryView = (category: string) => {
  event({
    action: 'view_gallery',
    category: 'Gallery',
    label: category,
  });
};

export const trackSearch = (query: string, section: string) => {
  event({
    action: 'search',
    category: 'Search',
    label: `${section} - ${query}`,
  });
};

export const trackContactForm = (success: boolean) => {
  event({
    action: success ? 'contact_form_success' : 'contact_form_error',
    category: 'Contact',
    label: success ? 'Form submitted successfully' : 'Form submission failed',
  });
};

export const trackProgramRegistration = (programTitle: string) => {
  event({
    action: 'program_registration_click',
    category: 'Programs',
    label: programTitle,
  });
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}