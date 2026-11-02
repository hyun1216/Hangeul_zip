'use client';

import React from 'react';
import { Sparkles, User, Heart } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  onOpenAuthModal: () => void;
  onLogout?: () => void;
}

export default function Header({
  isLoggedIn,
  onOpenAuthModal,
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-amber-100 bg-yellow-50/90 backdrop-blur-md">
      {/* 상단 서브 공지 뱃지 바 */}
      <div className="bg-amber-100/60 py-1.5 px-4 text-center text-xs font-medium text-amber-800 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
        <span>현재 모든 단계 학습지 무료 다운로드 오픈 이벤트 진행 중!</span>
        <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" />
      </div>

      <div className="flex items-center justify-between px-4 py-3.5 sm:px-6">
        {/* 서비스 로고 및 타이틀 */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 via-amber-300 to-yellow-200 shadow-sm border border-amber-200">
            <span className="text-2xl select-none" role="img" aria-label="해와 달">
              ☀️
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-yellow-950 sm:text-xl">
                집에서한글
              </span>
              <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                Hangeul_zip
              </span>
            </div>
            <p className="text-[11px] font-medium text-amber-700/80">
              엄마아빠와 아이가 함께하는 따뜻한 파닉스 홈스쿨링
            </p>
          </div>
        </div>

        {/* 유저 영역 (로그인 / 마이페이지) */}
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-semibold text-amber-900 sm:inline">
                새싹학부모님 반가워요!
              </span>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-amber-800 transition hover:bg-amber-100"
              >
                <User className="h-3.5 w-3.5 text-amber-700" />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="group flex items-center gap-1.5 rounded-full bg-amber-400/90 px-3.5 py-1.5 text-xs font-bold text-yellow-950 shadow-sm transition-all hover:bg-amber-400 hover:shadow active:scale-95"
            >
              <span>간편 로그인</span>
              <span className="text-[10px] opacity-70 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
