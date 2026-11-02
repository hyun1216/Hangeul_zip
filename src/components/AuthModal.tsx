'use client';

import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  triggerActionName?: string; // 예: "아이용 학습지 다운로드" or "부모 해설지 보기"
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  triggerActionName = '학습지 다운로드 및 해설지 보기',
}: AuthModalProps) {
  if (!isOpen) return null;

  const handleOAuthLogin = async (provider: 'google' | 'kakao') => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
          },
        });
        if (error) {
          console.error('Supabase OAuth Error:', error.message);
          alert(`소셜 로그인 진행 중 오류가 발생했습니다: ${error.message}`);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Supabase 환경변수 미등록 시 개발용 즉시 로그인 처리
      alert(`[개발 모드] ${provider === 'kakao' ? '카카오' : '구글'} 간편 로그인이 성공적으로 처리되었습니다!`);
      onLoginSuccess();
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl animate-slide-up text-center relative"
      >
        {/* 상단 닫기 X 버튼 */}
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
        >
          <X className="h-4 w-4 stroke-[2.5]" />
        </button>

        {/* 귀여운 캐릭터/이모지 뱃지 (포인트 영역) */}
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 border border-amber-200 text-3xl">
          <span role="img" aria-label="반짝이는 별">
            ⭐
          </span>
        </div>

        {/* 헤드라인 문구 */}
        <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-900 mb-2">
          <Sparkles className="h-3 w-3 text-amber-600" />
          <span>3초 간편 시작</span>
        </div>

        <h3 className="text-xl font-black text-slate-900">
          로그인 후 이용할 수 있어요!
        </h3>
        <p className="mt-2 text-xs font-normal text-slate-600 leading-relaxed">
          <strong className="text-amber-800 font-bold">[{triggerActionName}]</strong>
          은 회원 전용 무료 혜택입니다. 가입 즉시 모든 단계 PDF와 부모 해설지를 무제한으로 보실 수 있어요.
        </p>

        {/* 소셜 로그인 버튼 모음 */}
        <div className="mt-6 space-y-2.5">
          {/* 카카오 로그인 */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('kakao')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEE500] py-3.5 px-4 text-xs sm:text-sm font-extrabold text-[#191919] shadow-sm transition hover:brightness-95 active:scale-[0.98]"
          >
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3C6.477 3 2 6.477 2 10.772c0 2.76 1.83 5.176 4.604 6.544l-.946 3.486c-.085.313.25.568.513.393l4.133-2.735c.553.076 1.118.117 1.696.117 5.523 0 10-3.477 10-7.772S17.523 3 12 3z" />
            </svg>
            <span>카카오로 3초 만에 시작하기</span>
          </button>

          {/* 구글 로그인 */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white py-3.5 px-4 text-xs sm:text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.67-5.17 3.67-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.26v3.15C3.25 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.39-1.5-.39-2.24s.14-1.52.39-2.24V6.61H1.26C.46 8.23 0 10.06 0 12s.46 3.77 1.26 5.39l4.01-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.25 2.64 1.26 6.61l4.01 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            <span>Google 계정으로 시작하기</span>
          </button>
        </div>

        {/* 둘러보기 버튼 */}
        <div className="mt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 underline underline-offset-4 hover:text-slate-800 transition"
          >
            로그인 없이 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
}
