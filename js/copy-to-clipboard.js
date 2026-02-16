// === 代码块复制功能 ===
document.addEventListener('DOMContentLoaded', function() {
  // 1. 遍历所有代码块，插入复制按钮 DOM
  const highlightBlocks = document.querySelectorAll('.highlight');
  highlightBlocks.forEach(block => {
    // 跳过已插入按钮的代码块
    if (block.querySelector('.zeroclipboard-container')) return;

    // 构建复制按钮 DOM（复用提供的 SVG）
    const copyContainer = document.createElement('div');
    copyContainer.className = 'zeroclipboard-container';
    copyContainer.innerHTML = `
      <button aria-label="Copy" class="ClipboardButton btn btn-invisible js-clipboard-copy m-2 p-0 d-flex flex-justify-center flex-items-center" data-copy-feedback="Copied!" tabindex="0" role="button">
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon">
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check js-clipboard-check-icon color-fg-success d-none">
          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
        </svg>
      </button>
    `;
    block.appendChild(copyContainer);

    // 2. 绑定复制事件
    const copyBtn = copyContainer.querySelector('.js-clipboard-copy');
    copyBtn.addEventListener('click', function() {
      // 获取代码块文本内容
      const codeContent = block.querySelector('pre')?.textContent || '';
      if (!codeContent) return;

      // 写入剪贴板
      navigator.clipboard.writeText(codeContent).then(() => {
        // 切换成功状态
        copyBtn.classList.add('copied');
        // 显示反馈提示（可选：添加文字提示）
        copyBtn.setAttribute('aria-label', copyBtn.dataset.copyFeedback);
        // 3 秒后恢复初始状态
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.setAttribute('aria-label', 'Copy');
        }, 3000);
      }).catch(err => {
        console.error('复制失败:', err);
        copyBtn.setAttribute('aria-label', 'Copy failed!');
      });
    });
  });
});