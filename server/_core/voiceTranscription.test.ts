import { describe, expect, it } from "vitest";
import { getFileExtension } from "./voiceTranscription";

describe("voiceTranscription", () => {
  describe("getFileExtension", () => {
    it("should return 'webm' for 'audio/webm'", () => {
      expect(getFileExtension("audio/webm")).toBe("webm");
    });

    it("should return 'mp3' for 'audio/mp3'", () => {
      expect(getFileExtension("audio/mp3")).toBe("mp3");
    });

    it("should return 'mp3' for 'audio/mpeg'", () => {
      expect(getFileExtension("audio/mpeg")).toBe("mp3");
    });

    it("should return 'wav' for 'audio/wav'", () => {
      expect(getFileExtension("audio/wav")).toBe("wav");
    });

    it("should return 'wav' for 'audio/wave'", () => {
      expect(getFileExtension("audio/wave")).toBe("wav");
    });

    it("should return 'ogg' for 'audio/ogg'", () => {
      expect(getFileExtension("audio/ogg")).toBe("ogg");
    });

    it("should return 'm4a' for 'audio/m4a'", () => {
      expect(getFileExtension("audio/m4a")).toBe("m4a");
    });

    it("should return 'm4a' for 'audio/mp4'", () => {
      expect(getFileExtension("audio/mp4")).toBe("m4a");
    });

    it("should return 'audio' for unknown MIME types", () => {
      expect(getFileExtension("application/pdf")).toBe("audio");
      expect(getFileExtension("image/png")).toBe("audio");
      expect(getFileExtension("")).toBe("audio");
    });
  });
});
