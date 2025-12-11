import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  shouldUseDarkMode,
  getSunSchedule,
  initializeThemeByTime,
  getTimeUntilNextThemeChange,
  getThemeTransitionMessage,
} from "../theme-utils";

describe("theme-utils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("shouldUseDarkMode", () => {
    it("returns true at 7:00 PM (19:00)", () => {
      vi.setSystemTime(new Date("2024-01-01T19:00:00"));
      expect(shouldUseDarkMode()).toBe(true);
    });

    it("returns true at 8:00 PM (20:00)", () => {
      vi.setSystemTime(new Date("2024-01-01T20:00:00"));
      expect(shouldUseDarkMode()).toBe(true);
    });

    it("returns true at midnight (00:00)", () => {
      vi.setSystemTime(new Date("2024-01-01T00:00:00"));
      expect(shouldUseDarkMode()).toBe(true);
    });

    it("returns true at 6:00 AM (06:00)", () => {
      vi.setSystemTime(new Date("2024-01-01T06:00:00"));
      expect(shouldUseDarkMode()).toBe(true);
    });

    it("returns false at 7:00 AM (07:00)", () => {
      vi.setSystemTime(new Date("2024-01-01T07:00:00"));
      expect(shouldUseDarkMode()).toBe(false);
    });

    it("returns false at 8:00 AM (08:00)", () => {
      vi.setSystemTime(new Date("2024-01-01T08:00:00"));
      expect(shouldUseDarkMode()).toBe(false);
    });

    it("returns false at noon (12:00)", () => {
      vi.setSystemTime(new Date("2024-01-01T12:00:00"));
      expect(shouldUseDarkMode()).toBe(false);
    });

    it("returns false at 6:00 PM (18:00)", () => {
      vi.setSystemTime(new Date("2024-01-01T18:00:00"));
      expect(shouldUseDarkMode()).toBe(false);
    });

    it("returns false just before 7:00 PM (18:59)", () => {
      vi.setSystemTime(new Date("2024-01-01T18:59:00"));
      expect(shouldUseDarkMode()).toBe(false);
    });

    it("returns true just before 7:00 AM (06:59)", () => {
      vi.setSystemTime(new Date("2024-01-01T06:59:00"));
      expect(shouldUseDarkMode()).toBe(true);
    });

    it("dark mode is active from 19:00 to 6:59", () => {
      const darkHours = [19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];
      darkHours.forEach((hour) => {
        vi.setSystemTime(new Date(`2024-01-01T${hour.toString().padStart(2, "0")}:00:00`));
        expect(shouldUseDarkMode()).toBe(true);
      });
    });

    it("light mode is active from 7:00 to 18:59", () => {
      const lightHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
      lightHours.forEach((hour) => {
        vi.setSystemTime(new Date(`2024-01-01T${hour.toString().padStart(2, "0")}:00:00`));
        expect(shouldUseDarkMode()).toBe(false);
      });
    });
  });

  describe("getSunSchedule", () => {
    it("returns default sunrise and sunset times", () => {
      const schedule = getSunSchedule();
      expect(schedule).toEqual({
        sunrise: 7,
        sunset: 19,
      });
    });

    it("returns same times regardless of location (default implementation)", () => {
      const schedule1 = getSunSchedule(40.7128, -74.006); // New York
      const schedule2 = getSunSchedule(51.5074, -0.1278); // London
      const schedule3 = getSunSchedule(-33.8688, 151.2093); // Sydney

      expect(schedule1).toEqual(schedule2);
      expect(schedule2).toEqual(schedule3);
    });

    it("returns numeric hours", () => {
      const { sunrise, sunset } = getSunSchedule();
      expect(typeof sunrise).toBe("number");
      expect(typeof sunset).toBe("number");
    });

    it("returns valid hour values (0-23)", () => {
      const { sunrise, sunset } = getSunSchedule();
      expect(sunrise).toBeGreaterThanOrEqual(0);
      expect(sunrise).toBeLessThan(24);
      expect(sunset).toBeGreaterThanOrEqual(0);
      expect(sunset).toBeLessThan(24);
    });

    it("sunset is later than sunrise", () => {
      const { sunrise, sunset } = getSunSchedule();
      expect(sunset).toBeGreaterThan(sunrise);
    });

    it("handles undefined coordinates", () => {
      const schedule = getSunSchedule(undefined, undefined);
      expect(schedule).toEqual({
        sunrise: 7,
        sunset: 19,
      });
    });
  });

  describe("initializeThemeByTime", () => {
    it("returns 'dark' during night hours", () => {
      vi.setSystemTime(new Date("2024-01-01T22:00:00"));
      expect(initializeThemeByTime()).toBe("dark");
    });

    it("returns 'light' during day hours", () => {
      vi.setSystemTime(new Date("2024-01-01T14:00:00"));
      expect(initializeThemeByTime()).toBe("light");
    });

    it("returns 'dark' at midnight", () => {
      vi.setSystemTime(new Date("2024-01-01T00:00:00"));
      expect(initializeThemeByTime()).toBe("dark");
    });

    it("returns 'light' at noon", () => {
      vi.setSystemTime(new Date("2024-01-01T12:00:00"));
      expect(initializeThemeByTime()).toBe("light");
    });

    it("returns 'dark' at 7:00 PM", () => {
      vi.setSystemTime(new Date("2024-01-01T19:00:00"));
      expect(initializeThemeByTime()).toBe("dark");
    });

    it("returns 'light' at 7:00 AM", () => {
      vi.setSystemTime(new Date("2024-01-01T07:00:00"));
      expect(initializeThemeByTime()).toBe("light");
    });

    it("returns 'dark' at 6:59 AM", () => {
      vi.setSystemTime(new Date("2024-01-01T06:59:00"));
      expect(initializeThemeByTime()).toBe("dark");
    });

    it("returns 'light' at 18:59 PM", () => {
      vi.setSystemTime(new Date("2024-01-01T18:59:00"));
      expect(initializeThemeByTime()).toBe("light");
    });
  });

  describe("getTimeUntilNextThemeChange", () => {
    it("calculates time until 7 AM from midnight", () => {
      vi.setSystemTime(new Date("2024-01-01T00:00:00"));
      const milliseconds = getTimeUntilNextThemeChange();
      const hours = milliseconds / (1000 * 60 * 60);
      expect(hours).toBe(7);
    });

    it("calculates time until 7 PM from 7 AM", () => {
      vi.setSystemTime(new Date("2024-01-01T07:00:00"));
      const milliseconds = getTimeUntilNextThemeChange();
      const hours = milliseconds / (1000 * 60 * 60);
      expect(hours).toBe(12);
    });

    it("calculates time until 7 AM from 7 PM", () => {
      vi.setSystemTime(new Date("2024-01-01T19:00:00"));
      const milliseconds = getTimeUntilNextThemeChange();
      const hours = milliseconds / (1000 * 60 * 60);
      expect(hours).toBe(12);
    });

    it("calculates time until 7 PM from noon", () => {
      vi.setSystemTime(new Date("2024-01-01T12:00:00"));
      const milliseconds = getTimeUntilNextThemeChange();
      const hours = milliseconds / (1000 * 60 * 60);
      expect(hours).toBe(7);
    });

    it("calculates time until 7 AM from 3 AM", () => {
      vi.setSystemTime(new Date("2024-01-01T03:00:00"));
      const milliseconds = getTimeUntilNextThemeChange();
      const hours = milliseconds / (1000 * 60 * 60);
      expect(hours).toBe(4);
    });

    it("accounts for minutes and seconds", () => {
      vi.setSystemTime(new Date("2024-01-01T06:30:30")); // 6:30:30 AM
      const milliseconds = getTimeUntilNextThemeChange();
      const totalSeconds = milliseconds / 1000;
      // 29 minutes and 30 seconds until 7:00 AM
      expect(totalSeconds).toBe(29 * 60 + 30);
    });

    it("returns positive number", () => {
      vi.setSystemTime(new Date("2024-01-01T12:00:00"));
      const milliseconds = getTimeUntilNextThemeChange();
      expect(milliseconds).toBeGreaterThan(0);
    });

    it("returns value in milliseconds", () => {
      vi.setSystemTime(new Date("2024-01-01T18:00:00")); // 1 hour until 7 PM
      const milliseconds = getTimeUntilNextThemeChange();
      expect(milliseconds).toBe(60 * 60 * 1000); // 1 hour in milliseconds
    });

    it("handles transition from day to night", () => {
      vi.setSystemTime(new Date("2024-01-01T18:45:00")); // 15 minutes until 7 PM
      const milliseconds = getTimeUntilNextThemeChange();
      expect(milliseconds).toBe(15 * 60 * 1000);
    });

    it("handles transition from night to day", () => {
      vi.setSystemTime(new Date("2024-01-01T06:45:00")); // 15 minutes until 7 AM
      const milliseconds = getTimeUntilNextThemeChange();
      expect(milliseconds).toBe(15 * 60 * 1000);
    });

    it("handles time just before midnight", () => {
      vi.setSystemTime(new Date("2024-01-01T23:30:00"));
      const milliseconds = getTimeUntilNextThemeChange();
      const hours = milliseconds / (1000 * 60 * 60);
      expect(hours).toBe(7.5); // 7 hours 30 minutes until 7 AM
    });

    it("never returns negative value", () => {
      const testTimes = [
        "00:00:00",
        "06:59:59",
        "07:00:00",
        "12:00:00",
        "18:59:59",
        "19:00:00",
        "23:59:59",
      ];

      testTimes.forEach((time) => {
        vi.setSystemTime(new Date(`2024-01-01T${time}`));
        const milliseconds = getTimeUntilNextThemeChange();
        expect(milliseconds).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("getThemeTransitionMessage", () => {
    it("returns dark mode message when isDarkMode is true", () => {
      const message = getThemeTransitionMessage(true);
      expect(message).toBe("Switching to dark mode for comfortable nighttime viewing");
    });

    it("returns light mode message when isDarkMode is false", () => {
      const message = getThemeTransitionMessage(false);
      expect(message).toBe("Switching to light mode for daytime clarity");
    });

    it("returns string for true", () => {
      const message = getThemeTransitionMessage(true);
      expect(typeof message).toBe("string");
      expect(message.length).toBeGreaterThan(0);
    });

    it("returns string for false", () => {
      const message = getThemeTransitionMessage(false);
      expect(typeof message).toBe("string");
      expect(message.length).toBeGreaterThan(0);
    });

    it("dark mode message contains 'dark mode'", () => {
      const message = getThemeTransitionMessage(true);
      expect(message.toLowerCase()).toContain("dark mode");
    });

    it("light mode message contains 'light mode'", () => {
      const message = getThemeTransitionMessage(false);
      expect(message.toLowerCase()).toContain("light mode");
    });

    it("messages are different for dark and light modes", () => {
      const darkMessage = getThemeTransitionMessage(true);
      const lightMessage = getThemeTransitionMessage(false);
      expect(darkMessage).not.toBe(lightMessage);
    });
  });

  describe("Real-World Scenarios", () => {
    it("handles typical morning transition (6:30 AM to 7:00 AM)", () => {
      vi.setSystemTime(new Date("2024-01-01T06:30:00"));

      expect(shouldUseDarkMode()).toBe(true);
      expect(initializeThemeByTime()).toBe("dark");

      const timeUntilChange = getTimeUntilNextThemeChange();
      expect(timeUntilChange).toBe(30 * 60 * 1000); // 30 minutes

      // Fast forward to 7:00 AM
      vi.setSystemTime(new Date("2024-01-01T07:00:00"));

      expect(shouldUseDarkMode()).toBe(false);
      expect(initializeThemeByTime()).toBe("light");
    });

    it("handles typical evening transition (6:30 PM to 7:00 PM)", () => {
      vi.setSystemTime(new Date("2024-01-01T18:30:00"));

      expect(shouldUseDarkMode()).toBe(false);
      expect(initializeThemeByTime()).toBe("light");

      const timeUntilChange = getTimeUntilNextThemeChange();
      expect(timeUntilChange).toBe(30 * 60 * 1000); // 30 minutes

      // Fast forward to 7:00 PM
      vi.setSystemTime(new Date("2024-01-01T19:00:00"));

      expect(shouldUseDarkMode()).toBe(true);
      expect(initializeThemeByTime()).toBe("dark");
    });

    it("provides user-friendly messages for transitions", () => {
      vi.setSystemTime(new Date("2024-01-01T06:50:00"));

      const darkMessage = getThemeTransitionMessage(shouldUseDarkMode());
      expect(darkMessage).toContain("dark mode");

      vi.setSystemTime(new Date("2024-01-01T07:10:00"));

      const lightMessage = getThemeTransitionMessage(shouldUseDarkMode());
      expect(lightMessage).toContain("light mode");
    });

    it("complete theme initialization flow", () => {
      // Morning
      vi.setSystemTime(new Date("2024-01-01T08:00:00"));
      const morningTheme = initializeThemeByTime();
      expect(morningTheme).toBe("light");
      expect(getThemeTransitionMessage(false)).toBe("Switching to light mode for daytime clarity");

      // Evening
      vi.setSystemTime(new Date("2024-01-01T20:00:00"));
      const eveningTheme = initializeThemeByTime();
      expect(eveningTheme).toBe("dark");
      expect(getThemeTransitionMessage(true)).toBe(
        "Switching to dark mode for comfortable nighttime viewing"
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles exact transition times consistently", () => {
      // Exactly 7:00 AM
      vi.setSystemTime(new Date("2024-01-01T07:00:00.000"));
      expect(shouldUseDarkMode()).toBe(false);

      // Exactly 7:00 PM
      vi.setSystemTime(new Date("2024-01-01T19:00:00.000"));
      expect(shouldUseDarkMode()).toBe(true);
    });

    it("handles leap year dates", () => {
      vi.setSystemTime(new Date("2024-02-29T12:00:00"));
      expect(shouldUseDarkMode()).toBe(false);
      expect(initializeThemeByTime()).toBe("light");
    });

    it("handles year boundary", () => {
      vi.setSystemTime(new Date("2024-12-31T23:59:59"));
      expect(shouldUseDarkMode()).toBe(true);

      vi.setSystemTime(new Date("2025-01-01T00:00:00"));
      expect(shouldUseDarkMode()).toBe(true);
    });

    it("handles different months", () => {
      const months = [1, 3, 6, 9, 12];
      months.forEach((month) => {
        vi.setSystemTime(new Date(`2024-${month.toString().padStart(2, "0")}-15T12:00:00`));
        expect(shouldUseDarkMode()).toBe(false);
      });
    });
  });
});
