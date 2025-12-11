import { describe, it, expect } from "vitest";
import { normalizePdfUrl } from "../pdf-url";

describe("normalizePdfUrl", () => {
  const EXPECTED_BASE = "https://sitimm-files.nyc3.digitaloceanspaces.com/";

  describe("Edge Cases", () => {
    it("returns empty string for undefined input", () => {
      expect(normalizePdfUrl(undefined)).toBe("");
    });

    it("returns empty string for empty string input", () => {
      expect(normalizePdfUrl("")).toBe("");
    });

    it("handles whitespace-only input", () => {
      // Whitespace-only input is trimmed to empty string, which returns ""
      expect(normalizePdfUrl("   ")).toBe("");
    });

    it("trims leading and trailing whitespace", () => {
      const result = normalizePdfUrl("  magazines/file.pdf  ");
      // Function trims whitespace before processing
      expect(result).toBe(`${EXPECTED_BASE}magazines/file.pdf`);
    });
  });

  describe("Already Normalized URLs", () => {
    it("returns already normalized HTTPS URL unchanged", () => {
      const url = "https://sitimm-files.nyc3.digitaloceanspaces.com/magazines/test.pdf";
      expect(normalizePdfUrl(url)).toBe(url);
    });

    it("returns already normalized HTTP URL unchanged", () => {
      const url = "http://sitimm-files.nyc3.digitaloceanspaces.com/bulletins/doc.pdf";
      expect(normalizePdfUrl(url)).toBe(url);
    });

    it("handles normalized URLs with nested paths", () => {
      const url = "https://sitimm-files.nyc3.digitaloceanspaces.com/folder/subfolder/file.pdf";
      expect(normalizePdfUrl(url)).toBe(url);
    });

    it("handles normalized URLs with query parameters", () => {
      const url = "https://sitimm-files.nyc3.digitaloceanspaces.com/file.pdf?version=1";
      expect(normalizePdfUrl(url)).toBe(url);
    });
  });

  describe("Wrong Format with Protocol", () => {
    it("converts wrong format HTTPS URL to correct format", () => {
      const input = "https://nyc3.digitaloceanspaces.com/sitimm-files/magazines/test.pdf";
      const expected = "https://sitimm-files.nyc3.digitaloceanspaces.com/magazines/test.pdf";
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("converts wrong format HTTP URL to correct format", () => {
      const input = "http://nyc3.digitaloceanspaces.com/sitimm-files/bulletins/doc.pdf";
      const expected = "http://sitimm-files.nyc3.digitaloceanspaces.com/bulletins/doc.pdf";
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles wrong format with nested paths", () => {
      const input = "https://nyc3.digitaloceanspaces.com/sitimm-files/folder/sub/file.pdf";
      const expected = "https://sitimm-files.nyc3.digitaloceanspaces.com/folder/sub/file.pdf";
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("does not modify if already in correct format", () => {
      const input = "https://sitimm-files.nyc3.digitaloceanspaces.com/test.pdf";
      expect(normalizePdfUrl(input)).toBe(input);
    });
  });

  describe("URLs Without Protocol", () => {
    it("adds protocol and normalizes path-only URL", () => {
      const input = "magazines/test.pdf";
      const expected = `${EXPECTED_BASE}magazines/test.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("adds protocol and normalizes path with leading slash", () => {
      const input = "/magazines/test.pdf";
      const expected = `${EXPECTED_BASE}magazines/test.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles nested paths without protocol", () => {
      const input = "folder/subfolder/deep/file.pdf";
      const expected = `${EXPECTED_BASE}folder/subfolder/deep/file.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles single file name", () => {
      const input = "document.pdf";
      const expected = `${EXPECTED_BASE}document.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });
  });

  describe("Malformed URLs Without Protocol", () => {
    it("extracts path from malformed URL without protocol", () => {
      const input = "nyc3.digitaloceanspaces.com/sitimm-files/magazines/test.pdf";
      const expected = `${EXPECTED_BASE}magazines/test.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("extracts path from malformed URL with leading slash", () => {
      const input = "/nyc3.digitaloceanspaces.com/sitimm-files/bulletins/doc.pdf";
      const expected = `${EXPECTED_BASE}bulletins/doc.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles URL starting with sitimm-files/", () => {
      const input = "sitimm-files/magazines/test.pdf";
      const expected = `${EXPECTED_BASE}magazines/test.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles URL starting with /sitimm-files/", () => {
      const input = "/sitimm-files/bulletins/doc.pdf";
      const expected = `${EXPECTED_BASE}bulletins/doc.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("extracts path from complex malformed URL", () => {
      const input = "nyc3.digitaloceanspaces.com/sitimm-files/folder/sub/deep/file.pdf";
      const expected = `${EXPECTED_BASE}folder/sub/deep/file.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });
  });

  describe("Real-World Examples", () => {
    it("normalizes magazine PDF URL", () => {
      const input = "/sitimm-files/magazines/revista-2024-01.pdf";
      const expected = `${EXPECTED_BASE}magazines/revista-2024-01.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("normalizes bulletin PDF URL", () => {
      const input = "bulletins/boletin-enero-2024.pdf";
      const expected = `${EXPECTED_BASE}bulletins/boletin-enero-2024.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles already correct full URL", () => {
      const input = "https://sitimm-files.nyc3.digitaloceanspaces.com/bulletins/latest.pdf";
      expect(normalizePdfUrl(input)).toBe(input);
    });

    it("fixes API response with wrong format", () => {
      const input = "https://nyc3.digitaloceanspaces.com/sitimm-files/docs/report.pdf";
      const expected = "https://sitimm-files.nyc3.digitaloceanspaces.com/docs/report.pdf";
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles PDF with special characters in filename", () => {
      const input = "magazines/revista-médica-2024.pdf";
      const expected = `${EXPECTED_BASE}magazines/revista-médica-2024.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles PDF with spaces in filename", () => {
      const input = "bulletins/boletín informativo.pdf";
      const expected = `${EXPECTED_BASE}bulletins/boletín informativo.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles deeply nested folder structure", () => {
      const input = "documents/2024/01/bulletins/regional/norte/file.pdf";
      const expected = `${EXPECTED_BASE}documents/2024/01/bulletins/regional/norte/file.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });
  });

  describe("Case Sensitivity", () => {
    it("handles HTTPS in uppercase", () => {
      const input = "HTTPS://sitimm-files.nyc3.digitaloceanspaces.com/test.pdf";
      expect(normalizePdfUrl(input)).toBe(input);
    });

    it("handles HTTP in uppercase", () => {
      const input = "HTTP://sitimm-files.nyc3.digitaloceanspaces.com/test.pdf";
      expect(normalizePdfUrl(input)).toBe(input);
    });

    it("handles mixed case protocol", () => {
      const input = "HtTpS://sitimm-files.nyc3.digitaloceanspaces.com/test.pdf";
      expect(normalizePdfUrl(input)).toBe(input);
    });
  });

  describe("File Extensions", () => {
    it("handles .PDF extension (uppercase)", () => {
      const input = "magazines/test.PDF";
      const expected = `${EXPECTED_BASE}magazines/test.PDF`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles files without extension", () => {
      const input = "documents/report";
      const expected = `${EXPECTED_BASE}documents/report`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });

    it("handles multiple dots in filename", () => {
      const input = "docs/report.final.v2.pdf";
      const expected = `${EXPECTED_BASE}docs/report.final.v2.pdf`;
      expect(normalizePdfUrl(input)).toBe(expected);
    });
  });
});
