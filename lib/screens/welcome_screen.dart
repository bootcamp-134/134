import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../widgets/brand_mark.dart';
import '../widgets/primary_button.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  void _openLogin(BuildContext context) {
    Navigator.of(context).pushNamed('/login');
  }

  void _openRegistration(BuildContext context) {
    Navigator.of(context).pushNamed('/register');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(24, 28, 24, 24),
              child: Center(
                child: ConstrainedBox(
                  constraints: BoxConstraints(
                    maxWidth: 520,
                    minHeight: constraints.maxHeight > 52
                        ? constraints.maxHeight - 52
                        : 0.0,
                  ),
                  child: IntrinsicHeight(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const Spacer(flex: 2),
                        const Align(child: BrandMark(size: 98)),
                        const SizedBox(height: 30),
                        Text(
                          'BereketAI',
                          textAlign: TextAlign.center,
                          style: theme.textTheme.displaySmall,
                        ),
                        const SizedBox(height: 14),
                        Text(
                          'Evdeki malzemeleri değerlendir, bütçeni koru, israfı azalt.',
                          textAlign: TextAlign.center,
                          style: theme.textTheme.bodyLarge,
                        ),
                        const SizedBox(height: 34),
                        const _BenefitRow(
                          icon: Icons.inventory_2_outlined,
                          text: 'Kilerindekileri önce değerlendir',
                        ),
                        const SizedBox(height: 12),
                        const _BenefitRow(
                          icon: Icons.savings_outlined,
                          text: 'Bütçene uygun tarifler keşfet',
                        ),
                        const SizedBox(height: 12),
                        const _BenefitRow(
                          icon: Icons.recycling_rounded,
                          text: 'Gıda israfını birlikte azalt',
                        ),
                        const Spacer(flex: 3),
                        PrimaryButton(
                          key: const Key('welcome-login-button'),
                          label: 'Giriş Yap',
                          icon: Icons.arrow_forward_rounded,
                          onPressed: () => _openLogin(context),
                        ),
                        const SizedBox(height: 12),
                        SizedBox(
                          height: 56,
                          child: OutlinedButton(
                            onPressed: () => _openRegistration(context),
                            style: OutlinedButton.styleFrom(
                              foregroundColor: AppColors.forest,
                              side: const BorderSide(color: AppColors.outline),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18),
                              ),
                              textStyle: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            child: const Text('Kayıt Ol'),
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          'Devam ederek kullanım koşullarını ve gizlilik politikasını kabul etmiş olursun.',
                          textAlign: TextAlign.center,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: AppColors.mutedInk,
                            height: 1.4,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

class _BenefitRow extends StatelessWidget {
  final IconData icon;
  final String text;

  const _BenefitRow({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 13),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.78),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.outline),
      ),
      child: Row(
        children: [
          Container(
            width: 38,
            height: 38,
            decoration: const BoxDecoration(
              color: AppColors.sage,
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: AppColors.forest, size: 20),
          ),
          const SizedBox(width: 13),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                color: AppColors.ink,
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
