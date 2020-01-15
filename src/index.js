import $fp from "lodash/fp";

$(() => {
  const onModalShow = (e) => {
    const $modal = $($fp.get('target', e));
    const $modalBody = $modal.find('.modal-body');

    const getDeviceWidth = () => {
      return window.innerWidth || document.documentElement.clientWidth;
    };

    const initializeModal = $fp.curry(($modalBody, deviceWidth) => {
      const modalBodyMaxWidth = 500;
      const modalXMargin = 8;
      const borderSize = 1; // border 크기

      const width = deviceWidth >= modalBodyMaxWidth
        ? modalBodyMaxWidth - borderSize * 2
        : deviceWidth - modalXMargin * 2 - borderSize * 2;
      const height = deviceWidth >= modalBodyMaxWidth
        ? 444 // daum postcode pc 기본높이
        : 466; // daum postcode mobile 기본 높이

      $modalBody.css({
        width: `${width}px`,
        height: `${height}px`, // resize 반환값의 기본값
        'max-width': `${width + borderSize + modalXMargin}px`,
        overflow: 'hidden'
      });
    });

    const onComplete = (data) => { };
    const onResize = $fp.curry(($modalBody, borderSize, size) => {
      $modalBody.css({
        height: `${$fp.get('height', size) + (borderSize * 2)}`
      });
    })($modalBody, 1);

    new daum.Postcode({
      oncomplete: onComplete,
      onresize: onResize,
      width: '100%',
      height: '100%'
    }).embed($modalBody.get(0));

    const composer = $fp.pipe(
      getDeviceWidth,
      initializeModal($modalBody)
    );

    composer();
  };

  $("#example-modal").on("show.bs.modal", onModalShow);
});