/* ===========================================================
 * sw-registration.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * Register service worker.
 * Modified by YummyHe
 * ========================================================== */

// SW Version Upgrade Ref: <https://youtu.be/Gb9uI67tqV0>

function handleRegistration(registration){
  console.log('Service Worker Registered. ', registration)
  /**
   * ServiceWorkerRegistration.onupdatefound
   * The service worker registration's installing worker changes.
   */
  registration.onupdatefound = (e) => {
    const installingWorker = registration.installing;
    installingWorker.onstatechange = (e) => {
      if (installingWorker.state !== 'installed') return;
      if (navigator.serviceWorker.controller) {
        console.log('SW is updated');
      } else {
        console.log('A Visit without previous SW');
        createSnackbar({
          message: '访问过的页面可离线访问。',
          duration: 5000
        })
      }
    };
  }
}

if(navigator.serviceWorker){
  // For security reasons, a service worker can only control the pages
  // that are in the same directory level or below it. That's why we put sw.js at ROOT level.
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => handleRegistration(registration))
    .catch((error) => {console.log('ServiceWorker registration failed: ', error)})

  // register message receiver
  // https://dbwriteups.wordpress.com/2015/11/16/service-workers-part-3-communication-between-sw-and-pages/
  navigator.serviceWorker.onmessage = (e) => {
    const data = e.data;
    if (data.command == "UPDATE_FOUND") {
      // 检查当前页面是否在30秒内已经触发过刷新
      const lastRefresh = sessionStorage.getItem('lastPageRefresh');
      const now = Date.now();
      if (lastRefresh && (now - parseInt(lastRefresh, 10) < 30000)) {
        console.log('Ignored update message (within 30s after last refresh)');
        return; // 30秒内，忽略本次更新信号
      }

      // 记录本次刷新开始的时间（立即记录，防止后续消息重复触发）
      sessionStorage.setItem('lastPageRefresh', now.toString());

      // 显示提示条（1秒后自动消失）
      createSnackbar({
        message: "内容更新，页面即将刷新...",
        duration: 1000   // 持续时间，单位毫秒
      });

      // 延迟2秒后刷新页面（确保用户看到提示）
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  };
}
