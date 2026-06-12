abstract class Failure {
  final String message;
  const Failure(this.message);
}

// Network & Server
class ServerFailure extends Failure {
  const ServerFailure(super.message);
}

class NetworkFailure extends Failure {
  const NetworkFailure(super.message);
}

// Auth
class UnauthorizedFailure extends Failure {
  const UnauthorizedFailure(super.message);
}

// Validation
class ValidationFailure extends Failure {
  const ValidationFailure(super.message);
}

// Cache / Local Storage
class CacheFailure extends Failure {
  const CacheFailure(super.message);
}