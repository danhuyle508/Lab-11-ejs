'use strict';

$('.selectBook').on('click', function() {
  const id = $(this).data('isbn');
  console.log($(`#${id}`));
  $(`#${id}`).removeClass('hide-me');
});
