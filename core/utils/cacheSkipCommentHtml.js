
/**
 * 对html注释缓存 恢复处理
 */
module.exports = {
  /**
   * 暂存html注释对象
   */
  skipCommentCache: {},
  /**
   * 先去掉html的注释 暂存注释
   */
  stash(sourceCode, options) {
    this.skipCommentCache = {}
    let startNo = 0;
    let endNo = 0;
    let contentNo = 0;
    sourceCode = sourceCode.replace(new RegExp('(<!--\\s*?(skip-i18n-start)\\s*?-->)|(<!--\\s*?(skip-i18n-end)\\s*?-->)', 'gim'), (math, commentStart, start, commentEnd, end) => {
      let value = '';
      if (start) {
        const key = `<%%_skip_i18n_start_comment_html_${startNo++}%%>`;
        this.skipCommentCache[key] = math;
        return key;
      }
      if (end) {
        const key = `<%%_skip_i18n_end_comment_html_${endNo++}%%>`;
        this.skipCommentCache[key] = math;
        return key;
      }
      return value;
    });

    sourceCode = sourceCode.replace(new RegExp(`<%%_skip_i18n_start_comment_html_([\\d]+)%%>[\\s\\S]*?<%%_skip_i18n_end_comment_html_([\\d]+)%%>`, 'gim'), (math) => {
      const key = `<%%_skip_i18n_content_comment_html_${contentNo++}%%>`;
      this.skipCommentCache[key] = math;
      return key;
    })

    return sourceCode
  },
  /**
   * 恢复之前删除的注释
   */
  restore(sourceCode, options) {
    sourceCode = sourceCode.replace(new RegExp(`(<%%_skip_i18n_content_comment_html_([\\d]+)%%>)`, 'gim'), (math) => {
      return this.skipCommentCache[math];
    })
    sourceCode = sourceCode.replace(new RegExp(`(<%%_skip_i18n_start_comment_html_[\\d]+%%>)|(<%%_skip_i18n_end_comment_html_[\\d]+%%>)`, 'gim'), (math, start, end) => {
      if (start || end) {
        return this.skipCommentCache[start || end]
      }
      return '';
    })
    this.commentsCache = {} // 清除缓存
    return sourceCode
  }
}