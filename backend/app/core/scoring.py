import time

def calculate_composite_score(
    tests_passed: int,
    total_tests: int,
    start_time: float,
    attempts: int,
    is_submitted: bool
) -> float:

    if total_tests == 0:
        return 0.0

    score = 0.0

    # Base score (dominant factor)
    score += (tests_passed / total_tests) * 1_000_000

    # Completion bonus
    if is_submitted and tests_passed == total_tests:
        score += 5_000_000

    # Time penalty (max 15 mins cap)
    elapsed_time = time.time() - start_time
    time_penalty = min(elapsed_time, 900) * 1000
    score -= min(time_penalty, 5000)

    # Attempts penalty
    score -= attempts * 10

    return round(score, 4)