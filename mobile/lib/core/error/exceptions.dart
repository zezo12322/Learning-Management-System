class ServerException implements Exception {
  final String message;
  const ServerException({required this.message});

  @override
  String toString() => message;
}

class CustomExceptions implements Exception {
  final String message;
  const CustomExceptions({required this.message});

  @override
  String toString() => message;
}

class NetworkException implements Exception {
  final String message;
  const NetworkException({required this.message});

  @override
  String toString() => message;
}

class UnauthorizedException implements Exception {
  final String message;
  const UnauthorizedException({required this.message});

  @override
  String toString() => message;
}

class ValidationException implements Exception {
  final String message;
  const ValidationException({required this.message});

  @override
  String toString() => message;
}

class CacheException implements Exception {
  final String message;
  const CacheException({required this.message});

  @override
  String toString() => message;
}