"""
7, 77, 777, 7777, ... 수열의 분석
"""

# 수열의 패턴 분석
# 7 = 7
# 77 = 70 + 7 = 7 * 11
# 777 = 700 + 70 + 7 = 7 * 111
# 7777 = 7000 + 700 + 70 + 7 = 7 * 1111

# 일반항 공식
# n번째 항: a_n = 7 * (10^n - 1) / 9
# 왜냐하면 111...1 (n개의 1) = (10^n - 1) / 9

def nth_term(n):
    """n번째 항을 계산"""
    return 7 * (10**n - 1) // 9

def sum_of_series(n):
    """처음 n개 항의 합을 계산"""
    # S_n = Σ(i=1 to n) 7 * (10^i - 1) / 9
    # = 7/9 * Σ(i=1 to n) (10^i - 1)
    # = 7/9 * [Σ(i=1 to n) 10^i - n]
    # = 7/9 * [10(10^n - 1)/(10-1) - n]
    # = 7/9 * [10(10^n - 1)/9 - n]
    
    sum_val = 0
    for i in range(1, n+1):
        sum_val += 7 * (10**i - 1) // 9
    return sum_val

def sum_formula(n):
    """합 공식을 직접 사용"""
    # S_n = 7/81 * [10^(n+1) - 9n - 10]
    return (7 * (10**(n+1) - 9*n - 10)) // 81

# 처음 몇 항 확인
print("수열의 처음 10개 항:")
for i in range(1, 11):
    print(f"a_{i} = {nth_term(i)}")

print("\n부분합 (처음 n개 항의 합):")
for n in range(1, 11):
    sum_iter = sum_of_series(n)
    sum_form = sum_formula(n)
    print(f"S_{n} = {sum_iter} (반복계산) = {sum_form} (공식)")

print("\n=== 수학적 분석 ===")
print("일반항: a_n = 7 × (10^n - 1) / 9")
print("부분합: S_n = 7/81 × [10^(n+1) - 9n - 10]")
print("\n무한급수의 발산:")
print("lim(n→∞) a_n = lim(n→∞) 7×(10^n - 1)/9 = ∞")
print("따라서 이 급수는 발산하며, 무한대로 수렴하지 않습니다.")
print("\n각 항이 무한대로 커지므로 급수의 합도 무한대로 발산합니다.")