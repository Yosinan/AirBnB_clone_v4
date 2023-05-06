$('document').ready(() => {
  const amenityFilt = {};
  $('.popover :checkbox').change(function () {
    const amenityId = this.getAttribute('data-id');
    const amenityName = this.getAttribute('data-name');
    if (this.checked) {
      amenityFilt[amenityName] = amenityId;
    } else {
      delete amenityFilt[amenityName];
    }
    $('.amenities h4').text(Object.keys(amenityFilt).sort().join(', '));
  });

  $.getJSON('http://127.0.0.1:5001/api/v1/status', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
