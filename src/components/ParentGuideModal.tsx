'use client';

import React, { useEffect } from 'react';
import { WorksheetItem } from '@/types/worksheet';
import { X, Sparkles, MessageCircle, Heart, AlertTriangle, Target, BookmarkCheck } from 'lucide-react';

interface ParentGuideModalProps {
  worksheet: WorksheetItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ParentGuideModal({
  worksheet,
  isOpen,
  onClose,
}: ParentGuideModalProps) {
  // ESC 키로 닫기 및 배경 스크롤 방지
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !worksheet) return null;

  const { parentGuide } = worksheet;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 bg-yellow-950/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Bottom Sheet 형태의 모달 바디 (모바일: 하단 시트 / 태블릿·PC: 라운드 팝업) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl max-h-[92vh] sm:max-h-[85vh] flex flex-col rounded-t-[32px] sm:rounded-[32px] bg-yellow-50 border border-amber-200/90 shadow-2xl animate-slide-up overflow-hidden"
      >
        {/* 모바일 상단 바텀시트 핸들 바 */}
        <div className="flex w-full items-center justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1.5 w-12 rounded-full bg-amber-300" />
        </div>

        {/* 모달 헤더 */}
        <div className="relative flex items-start justify-between border-b border-amber-200/60 bg-amber-100/60 px-5 py-4 sm:px-6">
          <div className="pr-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-black text-white">
                {worksheet.week}주차
              </span>
              <span className="text-xs font-bold text-amber-800">
                👩‍🏫 모바일 1:1 부모 해설 가이드
              </span>
            </div>
            <h3 className="mt-1.5 text-lg font-black text-yellow-950 sm:text-xl leading-snug">
              {worksheet.title}
            </h3>
          </div>

          {/* 우측 상단 닫기 버튼 */}
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-amber-800 shadow-sm transition hover:bg-amber-200 hover:text-amber-950 active:scale-90"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 본문 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 space-y-5">
          {/* 1. 이번 주 학습 목표 */}
          <div className="rounded-2xl border border-amber-200 bg-white/90 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <Target className="h-4 w-4 text-amber-600" />
              <span>이번 주 교육 목표</span>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-yellow-950 leading-relaxed">
              {parentGuide.targetGoal}
            </p>
          </div>

          {/* 2. 핵심 파닉스 지도 팁 (골든 박스) */}
          <div className="rounded-2xl border-2 border-amber-400 bg-amber-100 p-4.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
              <Sparkles className="h-4 w-4 text-amber-600 animate-spin-slow" />
              <span>부모님 필독! 소릿값 파닉스 비법</span>
            </div>
            <p className="mt-2 text-sm font-bold text-amber-950 leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-200">
              {parentGuide.phonicsTip}
            </p>
          </div>

          {/* 3. 단계별 놀이 지도 및 부모 대화 예시 */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-1.5 text-sm font-black text-amber-900">
              <BookmarkCheck className="h-4 w-4 text-amber-600" />
              <span>이렇게 가르쳐 주세요 (단계별 지도법)</span>
            </h4>

            <div className="space-y-3">
              {parentGuide.stepByStep.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-amber-200/80 bg-white/95 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-xs font-black text-amber-900">
                      {step.step}
                    </span>
                    <span className="text-sm font-bold text-yellow-950">
                      {step.title}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* 부모가 건네는 말풍선 가이드 */}
                  <div className="mt-2.5 rounded-xl bg-amber-50/90 p-3 border border-amber-200/60">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
                      <MessageCircle className="h-3 w-3 text-amber-600" />
                      <span>엄마·아빠의 말풍선:</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-amber-950 italic">
                      {step.parentDialogue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. 아이 맞춤 칭찬 가이드 */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
              <span>오늘의 칭찬 한마디</span>
            </div>
            <p className="mt-1.5 text-xs sm:text-sm font-semibold text-rose-950 leading-relaxed">
              {parentGuide.praiseTip}
            </p>
          </div>

          {/* 5. 주의사항 및 흔한 실수 */}
          {parentGuide.cautions && parentGuide.cautions.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>선생님이 알려주는 주의사항</span>
              </div>
              <ul className="mt-2 list-disc pl-4 text-xs text-amber-900/90 space-y-1">
                {parentGuide.cautions.map((caution, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {caution}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 모달 하단 닫기 버튼 바 */}
        <div className="border-t border-amber-200/80 bg-white/90 p-4 sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl bg-amber-400 py-3 text-center text-sm font-black text-yellow-950 shadow-sm transition-all hover:bg-amber-300 active:scale-98"
          >
            해설지 닫기 (학습 이어하기)
          </button>
        </div>
      </div>
    </div>
  );
}
