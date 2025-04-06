// Analytics storage keys
const REFERRAL_VISITS_KEY = 'referral_visits';
const REFERRAL_DONATIONS_KEY = 'referral_donations';
const REFERRAL_HISTORY_KEY = 'referral_history';

// Initialize analytics in localStorage if not exists
const initializeAnalytics = () => {
  if (!localStorage.getItem(REFERRAL_VISITS_KEY)) {
    localStorage.setItem(REFERRAL_VISITS_KEY, JSON.stringify({}));
  }
  if (!localStorage.getItem(REFERRAL_DONATIONS_KEY)) {
    localStorage.setItem(REFERRAL_DONATIONS_KEY, JSON.stringify({}));
  }
  if (!localStorage.getItem(REFERRAL_HISTORY_KEY)) {
    localStorage.setItem(REFERRAL_HISTORY_KEY, JSON.stringify({}));
  }
};

// Track a referral visit with timestamp and user info
export const trackReferralVisit = (staffId) => {
  initializeAnalytics();
  const visits = JSON.parse(localStorage.getItem(REFERRAL_VISITS_KEY));
  const history = JSON.parse(localStorage.getItem(REFERRAL_HISTORY_KEY));
  
  // Update visit count
  visits[staffId] = (visits[staffId] || 0) + 1;
  
  // Add visit to history
  if (!history[staffId]) {
    history[staffId] = { visits: [], donations: [] };
  }
  
  history[staffId].visits.push({
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    platform: navigator.platform
  });

  localStorage.setItem(REFERRAL_VISITS_KEY, JSON.stringify(visits));
  localStorage.setItem(REFERRAL_HISTORY_KEY, JSON.stringify(history));
};

// Track a donation from a referral with detailed information
export const trackReferralDonation = (staffId, amount, paymentMethod, donationType) => {
  initializeAnalytics();
  const donations = JSON.parse(localStorage.getItem(REFERRAL_DONATIONS_KEY));
  const history = JSON.parse(localStorage.getItem(REFERRAL_HISTORY_KEY));
  
  if (!donations[staffId]) {
    donations[staffId] = {
      count: 0,
      total: 0,
      byMethod: {},
      byType: {}
    };
  }

  // Update donation counts and totals
  donations[staffId].count += 1;
  donations[staffId].total += Number(amount);
  
  // Track by payment method
  donations[staffId].byMethod[paymentMethod] = (donations[staffId].byMethod[paymentMethod] || 0) + 1;
  
  // Track by donation type (one-time vs recurring)
  donations[staffId].byType[donationType] = (donations[staffId].byType[donationType] || 0) + 1;

  // Add to history
  if (!history[staffId]) {
    history[staffId] = { visits: [], donations: [] };
  }

  history[staffId].donations.push({
    timestamp: new Date().toISOString(),
    amount: Number(amount),
    paymentMethod,
    donationType
  });

  localStorage.setItem(REFERRAL_DONATIONS_KEY, JSON.stringify(donations));
  localStorage.setItem(REFERRAL_HISTORY_KEY, JSON.stringify(history));

  // Send notification via Telegram
  const message = `New donation through staff referral:
Staff: ${staffId}
Amount: $${amount}
Payment Method: ${paymentMethod}
Type: ${donationType}`;
  
  sendMessage(message);
};

// Get analytics for a specific staff member with detailed breakdown
export const getStaffAnalytics = (staffId) => {
  initializeAnalytics();
  const visits = JSON.parse(localStorage.getItem(REFERRAL_VISITS_KEY))[staffId] || 0;
  const donations = JSON.parse(localStorage.getItem(REFERRAL_DONATIONS_KEY))[staffId] || {
    count: 0,
    total: 0,
    byMethod: {},
    byType: {}
  };
  const history = JSON.parse(localStorage.getItem(REFERRAL_HISTORY_KEY))[staffId] || {
    visits: [],
    donations: []
  };

  return {
    visits,
    donations,
    history
  };
};

// Get analytics for all staff members
export const getAllStaffAnalytics = () => {
  initializeAnalytics();
  const visits = JSON.parse(localStorage.getItem(REFERRAL_VISITS_KEY));
  const donations = JSON.parse(localStorage.getItem(REFERRAL_DONATIONS_KEY));
  const history = JSON.parse(localStorage.getItem(REFERRAL_HISTORY_KEY));
  return { visits, donations, history };
};

// Clear analytics data (useful for testing)
export const clearAnalytics = () => {
  localStorage.removeItem(REFERRAL_VISITS_KEY);
  localStorage.removeItem(REFERRAL_DONATIONS_KEY);
  localStorage.removeItem(REFERRAL_HISTORY_KEY);
  initializeAnalytics();
}; 