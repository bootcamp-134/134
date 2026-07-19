import '../models/login_credentials.dart';

abstract interface class AuthService {
  Future<AuthResult> signIn(LoginCredentials credentials);
}

class DemoAuthService implements AuthService {
  const DemoAuthService();

  @override
  Future<AuthResult> signIn(LoginCredentials credentials) async {
    await Future<void>.delayed(const Duration(milliseconds: 850));

    final isDemoAccount =
        credentials.identifier.toLowerCase() == 'demo@bereket.ai' &&
        credentials.password == 'bereket123';

    if (isDemoAccount) {
      return const AuthResult.success('Giriş başarılı.');
    }

    return const AuthResult.failure(
      'E-posta veya şifre hatalı. Bilgilerini kontrol edip tekrar dene.',
    );
  }
}
