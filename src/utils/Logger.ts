class Logger {
  static info(...args: any[]) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[INFO]:", ...args);
    }
  }

  static warn(...args: any[]) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[WARN]:", ...args);
    }
  }

  static error(...args: any[]) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ERROR]:", ...args);
    }
  }
}

export { Logger };
