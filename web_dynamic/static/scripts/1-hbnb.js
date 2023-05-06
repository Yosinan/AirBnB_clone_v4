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
});
