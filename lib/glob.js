class Glob {
  constructor (glob) {
    this.glob = this.sanitize(glob)

    // If not a glob pattern then just match the string.
    if (!this.glob.includes('*')) {
      this.regexp = new RegExp(`.*${this.glob}.*`, 'u')
      return
    }

    this.regexp = new RegExp(`^${this.glob}$`, 'u')
  }

  sanitize (glob) {
    return glob
      .replace(/\\/g, '\\\\')
      .replace(/\//g, '\\/')
      .replace(/\?/g, '([^\\/])')
      .replace(/\./g, '\\.')
      .replace(/\*\*/g, '.+')
      .replace(/\*/g, '([^\\/]*)')
  }

  toString () {
    return this.glob
  }

  [Symbol.search] (s) {
    return s.search(this.regexp)
  }

  [Symbol.match] (s) {
    return s.match(this.regexp)
  }

  [Symbol.replace] (s, replacement) {
    return s.replace(this.regexp, replacement)
  }

  [Symbol.replaceAll] (s, replacement) {
    return s.replaceAll(this.regexp, replacement)
  }
}
module.exports = Glob
