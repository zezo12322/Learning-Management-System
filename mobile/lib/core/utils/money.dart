/// Money conversion for course prices.
///
/// The platform stores and transports course prices as an **integer number of
/// piastres** (1/100 EGP) — `Course.price` is an `Int` in
/// `dataconnect/schema/schema.gql`, and `POST /payments/checkout` takes
/// `amountCents` in the same unit. Nothing in the API ever carries pounds.
///
/// The app, on the other hand, works in **pounds** everywhere above the data
/// layer: a `CourseEntity.price` of `49.0` means 49 EGP, and that is what gets
/// rendered next to the currency label.
///
/// So there is exactly one conversion point in each direction, and both live
/// here:
///
/// * [egpFromPiastres] — call it where a value first crosses out of Data
///   Connect or the REST API into a model.
/// * [piastresFromEgp] — call it where a value is about to be sent to the
///   payment endpoint.
///
/// Doing it anywhere else is what produced the 100x bug this file exists to
/// prevent: the raw piastre value was rendered as pounds *and* multiplied by
/// 100 again on the way to Paymob, so a 49 EGP course displayed as 4,900.00 EGP
/// and charged 4,900 EGP.
library;

/// Piastres (as stored by the API) -> pounds (as used by the UI).
double egpFromPiastres(num piastres) => piastres / 100;

/// Pounds (as used by the UI) -> piastres (as required by the payment API).
///
/// Rounded rather than truncated: `49.99 * 100` is `4998.999...` in binary
/// floating point, and truncation would silently undercharge by a piastre.
int piastresFromEgp(double egp) => (egp * 100).round();
