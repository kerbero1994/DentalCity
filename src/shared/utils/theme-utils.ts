/**
 * Theme utilities for dynamic theme switching based on time of day
 */

/**
 * Calculate if it should be dark mode based on current time
 * Dark mode: 7:00 PM to 7:00 AM
 */
export function shouldUseDarkMode(): boolean {
  const now = new Date();
  const hours = now.getHours();

  // Dark mode from 19:00 (7 PM) to 7:00 (7 AM)
  return hours >= 19 || hours < 7;
}

/**
 * Get sunset and sunrise times for better accuracy (optional enhancement)
 * This could be expanded to use actual sunset/sunrise times based on location
 */
export function getSunSchedule(
  _latitude?: number,
  _longitude?: number
): { sunrise: number; sunset: number } {
  // Default times if no location is provided
  // These can be adjusted based on season or actual solar calculations
  const defaultSunrise = 7; // 7 AM
  const defaultSunset = 19; // 7 PM

  // In a production app, you could use a library like SunCalc for accurate times
  // based on latitude/longitude and date

  return {
    sunrise: defaultSunrise,
    sunset: defaultSunset,
  };
}

/**
 * Initialize theme based on time of day
 * This should be called on app initialization
 */
export function initializeThemeByTime(): "light" | "dark" {
  return shouldUseDarkMode() ? "dark" : "light";
}

/**
 * Calculate time until next theme change
 * Useful for scheduling automatic theme updates
 */
export function getTimeUntilNextThemeChange(): number {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  let hoursUntilChange: number;

  if (hours >= 19 || hours < 7) {
    // Currently dark mode, calculate time until 7 AM
    if (hours >= 19) {
      hoursUntilChange = 24 - hours + 7;
    } else {
      hoursUntilChange = 7 - hours;
    }
  } else {
    // Currently light mode, calculate time until 7 PM
    hoursUntilChange = 19 - hours;
  }

  // Convert to milliseconds
  const totalMinutes = hoursUntilChange * 60 - minutes;
  const totalSeconds = totalMinutes * 60 - seconds;

  return Math.max(0, totalSeconds * 1000);
}

/**
 * Get a user-friendly theme transition message
 */
export function getThemeTransitionMessage(isDarkMode: boolean): string {
  if (isDarkMode) {
    return "Switching to dark mode for comfortable nighttime viewing";
  } else {
    return "Switching to light mode for daytime clarity";
  }
}
