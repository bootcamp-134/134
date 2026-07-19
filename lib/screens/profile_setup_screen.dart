import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../widgets/brand_mark.dart';
import '../widgets/primary_button.dart';

class ProfileSetupScreen extends StatelessWidget {
  const ProfileSetupScreen({super.key});

  void _continueToRecipes(BuildContext context) {
    Navigator.of(context).pushReplacementNamed('/what-should-i-eat');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        surfaceTintColor: Colors.transparent,
        automaticallyImplyLeading: false,
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Çıkış'),
          ),
          const SizedBox(width: 10),
        ],
      ),
      body: SafeArea(
        top: false,
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(24, 12, 24, 30),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 520),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Align(child: BrandMark(size: 72)),
                  const SizedBox(height: 26),
                  Text(
                    'Seni biraz tanıyalım',
                    textAlign: TextAlign.center,
                    style: theme.textTheme.headlineMedium,
                  ),
                  const SizedBox(height: 10),
                  Text(
                    'BereketAI önerilerini evine, bütçene ve tercihlerine göre kişiselleştirecek.',
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodyLarge,
                  ),
                  const SizedBox(height: 30),
                  const _SetupStep(
                    number: '1',
                    icon: Icons.person_outline_rounded,
                    title: 'Kişisel bilgiler',
                    description: 'Ad, yaş ve temel bilgiler',
                    isActive: true,
                  ),
                  const SizedBox(height: 12),
                  const _SetupStep(
                    number: '2',
                    icon: Icons.groups_outlined,
                    title: 'Hane bilgileri',
                    description: 'Kişi sayısı ve öğün düzeni',
                  ),
                  const SizedBox(height: 12),
                  const _SetupStep(
                    number: '3',
                    icon: Icons.tune_rounded,
                    title: 'Bütçe ve tercihler',
                    description: 'Bütçe, alerjiler ve beslenme şekli',
                  ),
                  const SizedBox(height: 32),
                  PrimaryButton(
                    key: const Key('open-what-should-i-eat-button'),
                    label: 'Tariflerini Keşfet',
                    icon: Icons.arrow_forward_rounded,
                    onPressed: () => _continueToRecipes(context),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _SetupStep extends StatelessWidget {
  final String number;
  final IconData icon;
  final String title;
  final String description;
  final bool isActive;

  const _SetupStep({
    required this.number,
    required this.icon,
    required this.title,
    required this.description,
    this.isActive = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isActive ? AppColors.sage : Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: isActive ? AppColors.leaf : AppColors.outline,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 42,
            height: 42,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: isActive ? AppColors.forest : AppColors.cream,
              shape: BoxShape.circle,
            ),
            child: Text(
              number,
              style: TextStyle(
                color: isActive ? Colors.white : AppColors.forest,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
          const SizedBox(width: 14),
          Icon(icon, color: AppColors.forest, size: 24),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: AppColors.ink,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  description,
                  style: const TextStyle(
                    color: AppColors.mutedInk,
                    fontSize: 13,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
