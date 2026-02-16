/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

 /*!
 * Hux Blog v1.6.0 (http://startbootstrap.com)
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0 
 */

// Tooltip Init
// Unuse by Hux since V1.6: Titles now display by default so there is no need for tooltip
// $(function() {
//     $("[data-toggle='tooltip']").tooltip();
// });


// make all images responsive
/* 
 * Unuse by Hux
 * actually only Portfolio-Pages can't use it and only post-img need it.
 * so I modify the _layout/post and CSS to make post-img responsive!
 */
// $(function() {
//  $("img").addClass("img-responsive");
// });

// responsive tables
$(document).ready(function() {
    $("table").wrap("<div class='table-responsive'></div>");
    $("table").addClass("table");
});

// responsive embed videos
$(document).ready(function() {
    $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
    $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height(),
            bannerHeight  = $('.intro-header .container').height();     
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop(),
                    $catalog = $('.side-catalog');

                //check if user is scrolling up by mouse or keyborad
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;


                //adjust the appearance of side-catalog
                $catalog.show()
                if (currentTop > (bannerHeight + 41)) {
                    $catalog.addClass('fixed')
                } else {
                    $catalog.removeClass('fixed')
                }
            });
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//   // 遍历所有 <pre><code> 代码块
//   const codeBlocks = document.querySelectorAll('pre > code');
//   codeBlocks.forEach((codeBlock) => {
//     const pre = codeBlock.parentElement;
    
//     // 1. 创建复制按钮（仅图标，无默认文字）
//     const copyBtn = document.createElement('button');
//     copyBtn.className = 'code-copy-btn';
//     copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    
//     // 2. 插入 GitHub 原版 SVG 图标 + 隐藏的 copied! 文字
//     copyBtn.innerHTML = `
//       <!-- copied! 文字（默认隐藏） -->
//       <span class="copied-text">copied!</span>
//       <!-- 复制图标（默认显示） -->
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="octicon octicon-clippy">
//         <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
//         <path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
//       </svg>
//       <!-- 成功图标（默认隐藏） -->
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="octicon octicon-check">
//         <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
//       </svg>
//     `;
    
//     // 3. 插入按钮到 <pre> 容器
//     pre.appendChild(copyBtn);
    
//     // 4. 绑定复制事件（兼容 GitHub 交互逻辑）
//     copyBtn.addEventListener('click', async () => {
//       try {
//         const codeText = codeBlock.textContent.trim();
        
//         // 优先使用 Clipboard API（现代浏览器）
//         if (navigator.clipboard) {
//           await navigator.clipboard.writeText(codeText);
//         } else {
//           // 兼容旧浏览器：临时 textarea
//           const textarea = document.createElement('textarea');
//           textarea.value = codeText;
//           textarea.style.position = 'absolute';
//           textarea.style.left = '-9999px';
//           document.body.appendChild(textarea);
//           textarea.select();
//           document.execCommand('copy');
//           document.body.removeChild(textarea);
//         }
        
//         // 切换为「copied!」成功状态
//         copyBtn.classList.add('copied');
//         copyBtn.setAttribute('aria-label', 'Copied!');
        
//         // 2 秒后恢复原状（和 GitHub 时长一致）
//         setTimeout(() => {
//           copyBtn.classList.remove('copied');
//           copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
//         }, 2000);
//       } catch (err) {
//         console.error('复制失败:', err);
//         // 失败态（可选：保持 GitHub 极简，仅控制台报错）
//         copyBtn.setAttribute('aria-label', 'Copy failed');
//         setTimeout(() => {
//           copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
//         }, 2000);
//       }
//     });
//   });
// });


document.addEventListener('DOMContentLoaded', () => {
  // 遍历所有包含代码的 pre 容器（兼容带行号/无行号场景）
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach((pre) => {
    // 1. 精准定位 .rouge-code 容器（核心：只取纯代码区域）
    const rougeCode = pre.querySelector('.rouge-code');
    if (!rougeCode) return; // 无代码区域则跳过
    
    // 2. 提取 .rouge-code 内的纯文本（排除行号）
    const getPureCodeText = () => {
      // 先尝试取 .rouge-code 内的 code 标签文本（标准结构）
      const codeEl = rougeCode.querySelector('code');
      if (codeEl) {
        return codeEl.textContent.trimEnd(); // 保留代码格式，仅去掉末尾多余空格
      }
      // 兼容无 code 标签的情况，直接取 .rouge-code 文本
      return rougeCode.textContent.trimEnd();
    };

    // 3. 创建复制按钮（样式不变，复用 GitHub 风格）
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    copyBtn.innerHTML = `
      <span class="copied-text">copied!</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="octicon octicon-clippy">
        <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
        <path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="octicon octicon-check">
        <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
      </svg>
    `;

    // 4. 插入按钮到 pre 容器（确保按钮在代码块右上角）
    pre.appendChild(copyBtn);

    // 5. 绑定复制事件（仅复制 .rouge-code 内的纯代码）
    copyBtn.addEventListener('click', async () => {
      try {
        const pureCode = getPureCodeText(); // 关键：只取纯代码，排除行号
        if (!pureCode) {
          copyBtn.setAttribute('aria-label', 'No code to copy');
          setTimeout(() => {
            copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
          }, 2000);
          return;
        }

        // 复制纯代码到剪贴板（兼容新旧浏览器）
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(pureCode);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = pureCode;
          textarea.style.position = 'absolute';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        // 切换成功态
        copyBtn.classList.add('copied');
        copyBtn.setAttribute('aria-label', 'Copied!');

        // 2 秒后恢复默认态
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        }, 2000);
      } catch (err) {
        console.error('复制失败:', err);
        copyBtn.setAttribute('aria-label', 'Copy failed');
        setTimeout(() => {
          copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        }, 2000);
      }
    });
  });
});