import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/primary_button.dart';
import 'package:optimatech_lms/features/quiz/presentation/manager/quiz_cubit.dart';
import 'package:optimatech_lms/features/quiz/presentation/manager/quiz_state.dart';

/// Arguments for [QuizView]. The screen needs both the course and the quiz id.
/// NOTE: there is no student-facing endpoint to discover a lecture's quizId yet
/// (documented backend blocker in mobile/MISSING_SCREENS_SPEC.md). The entry
/// point that opens this screen must obtain the quizId once that endpoint lands.
class QuizViewArgs {
  final String courseId;
  final String quizId;
  const QuizViewArgs({required this.courseId, required this.quizId});
}

class QuizView extends StatelessWidget {
  final QuizViewArgs args;
  const QuizView({super.key, required this.args});

  static const String routeName = '/quiz';

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<QuizCubit>()..start(args.courseId, args.quizId),
      child: const _QuizScaffold(),
    );
  }
}

class _QuizScaffold extends StatelessWidget {
  const _QuizScaffold();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('quiz.title'.tr())),
      body: SafeArea(
        child: BlocBuilder<QuizCubit, QuizState>(
          builder: (context, state) {
            if (state is QuizLoading || state is QuizInitial) {
              return const Center(child: CircularProgressIndicator());
            }
            if (state is QuizError) {
              return _ErrorContent(
                message: state.message,
                onRetry: () => context.read<QuizCubit>().retry(),
              );
            }
            if (state is QuizFinished) {
              return _ResultContent(
                result: state.result,
                onBack: () => Navigator.of(context).pop(),
              );
            }
            if (state is QuizTaking) {
              if (state.quiz.questions.isEmpty) {
                return Center(
                  child: Padding(
                    padding: EdgeInsets.all(24.w),
                    child: Text(
                      'quiz.empty'.tr(),
                      textAlign: TextAlign.center,
                      style: context.textTheme.bodyLarge,
                    ),
                  ),
                );
              }
              return _TakingContent(state: state);
            }
            return const SizedBox.shrink();
          },
        ),
      ),
    );
  }
}

class _TakingContent extends StatelessWidget {
  const _TakingContent({required this.state});

  final QuizTaking state;

  @override
  Widget build(BuildContext context) {
    final cubit = context.read<QuizCubit>();
    final total = state.quiz.questions.length;
    final question = state.quiz.questions[state.currentIndex];
    final selected = state.answers[question.id];

    return Column(
      children: [
        // Progress header
        Padding(
          padding: EdgeInsets.fromLTRB(20.w, 16.h, 20.w, 8.h),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'quiz.question_of'.tr(args: ['${state.currentIndex + 1}', '$total']),
                    style: context.textTheme.labelLarge,
                  ),
                  Text(
                    'quiz.answered'.tr(args: ['${state.answeredCount}', '$total']),
                    style: context.textTheme.labelMedium?.copyWith(
                      color: context.theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
              Gap(8.h),
              ClipRRect(
                borderRadius: BorderRadius.circular(8.r),
                child: LinearProgressIndicator(
                  value: total == 0 ? 0 : (state.currentIndex + 1) / total,
                  minHeight: 6.h,
                  backgroundColor: context.theme.colorScheme.surfaceContainerHighest,
                ),
              ),
            ],
          ),
        ),
        // Question + options
        Expanded(
          child: ListView(
            padding: EdgeInsets.fromLTRB(20.w, 12.h, 20.w, 12.h),
            children: [
              Text(
                question.questionText,
                style: context.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
              ),
              Gap(6.h),
              Text(
                'quiz.points'.tr(args: ['${question.points}']),
                style: context.textTheme.labelSmall?.copyWith(
                  color: context.theme.colorScheme.onSurfaceVariant,
                ),
              ),
              Gap(18.h),
              ...question.options.map(
                (o) => _OptionTile(
                  text: o.text,
                  selected: selected == o.id,
                  onTap: state.isFinishing
                      ? null
                      : () => cubit.selectOption(question.id, o.id),
                ),
              ),
            ],
          ),
        ),
        // Bottom navigation
        _BottomBar(state: state),
      ],
    );
  }
}

class _OptionTile extends StatelessWidget {
  const _OptionTile({required this.text, required this.selected, this.onTap});

  final String text;
  final bool selected;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final scheme = context.theme.colorScheme;
    return Padding(
      padding: EdgeInsets.only(bottom: 12.h),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14.r),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 14.h),
          decoration: BoxDecoration(
            color: selected ? scheme.primary.withOpacity(0.08) : scheme.surface,
            borderRadius: BorderRadius.circular(14.r),
            border: Border.all(
              color: selected ? scheme.primary : scheme.outlineVariant,
              width: selected ? 1.6 : 1,
            ),
          ),
          child: Row(
            children: [
              Icon(
                selected ? Icons.radio_button_checked : Icons.radio_button_unchecked,
                color: selected ? scheme.primary : scheme.onSurfaceVariant,
                size: 22.r,
              ),
              Gap(12.w),
              Expanded(
                child: Text(text, style: context.textTheme.bodyMedium),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _BottomBar extends StatelessWidget {
  const _BottomBar({required this.state});

  final QuizTaking state;

  @override
  Widget build(BuildContext context) {
    final cubit = context.read<QuizCubit>();
    return Padding(
      padding: EdgeInsets.fromLTRB(20.w, 8.h, 20.w, 16.h),
      child: Row(
        children: [
          if (state.currentIndex > 0)
            Expanded(
              child: OutlinedButton(
                onPressed: state.isFinishing ? null : () => cubit.previous(),
                child: Text('quiz.previous'.tr()),
              ),
            ),
          if (state.currentIndex > 0) Gap(12.w),
          Expanded(
            child: state.isLastQuestion
                ? PrimaryButton(
                    text: 'quiz.finish'.tr(),
                    isLoading: state.isFinishing,
                    onPressed: () => cubit.finish(),
                  )
                : PrimaryButton(
                    text: 'quiz.next'.tr(),
                    onPressed: () => cubit.next(),
                  ),
          ),
        ],
      ),
    );
  }
}

class _ErrorContent extends StatelessWidget {
  const _ErrorContent({required this.message, required this.onRetry});

  final String message;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(24.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.error_outline, size: 48.r, color: context.theme.colorScheme.error),
            Gap(16.h),
            Text(
              'quiz.error_title'.tr(),
              style: context.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
            ),
            Gap(8.h),
            Text(
              message,
              textAlign: TextAlign.center,
              style: context.textTheme.bodySmall?.copyWith(
                color: context.theme.colorScheme.onSurfaceVariant,
              ),
            ),
            Gap(24.h),
            PrimaryButton(text: 'common.retry'.tr(), onPressed: onRetry),
          ],
        ),
      ),
    );
  }
}

class _ResultContent extends StatelessWidget {
  const _ResultContent({required this.result, required this.onBack});

  final dynamic result; // QuizResultModel
  final VoidCallback onBack;

  @override
  Widget build(BuildContext context) {
    final scheme = context.theme.colorScheme;
    final passed = result.passed as bool;
    final color = passed ? scheme.primary : scheme.error;
    final score = (result.score as double);
    final maxScore = (result.maxScore as double);
    String fmt(double v) => v == v.roundToDouble() ? v.toInt().toString() : v.toStringAsFixed(1);

    return SingleChildScrollView(
      padding: EdgeInsets.fromLTRB(24.w, 40.h, 24.w, 24.h),
      child: Column(
        children: [
          Container(
            width: 96.r,
            height: 96.r,
            decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle),
            child: Icon(
              passed ? Icons.emoji_events_outlined : Icons.replay_outlined,
              size: 48.r,
              color: color,
            ),
          ),
          Gap(20.h),
          Text(
            'quiz.result_title'.tr(),
            style: context.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
          Gap(8.h),
          Text(
            'quiz.score_of'.tr(args: [fmt(score), fmt(maxScore)]),
            style: context.textTheme.headlineMedium?.copyWith(color: color, fontWeight: FontWeight.bold),
          ),
          Gap(6.h),
          Text(
            passed ? 'quiz.passed'.tr() : 'quiz.failed'.tr(),
            style: context.textTheme.titleMedium?.copyWith(color: color),
          ),
          Gap(32.h),
          PrimaryButton(text: 'quiz.back'.tr(), onPressed: onBack),
        ],
      ),
    );
  }
}
