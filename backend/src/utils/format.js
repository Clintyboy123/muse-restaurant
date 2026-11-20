// Small text helpers shared by the email notifications.
exports.formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

exports.SIGNATURE = 'Muse Restaurant\n182 Main Road, Walmer, Gqeberha\n+27 (0)41 582 1937  |  info@muserestaurant.co.za';
