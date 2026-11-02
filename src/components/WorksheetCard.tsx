'use client';

import React from 'react';
import { WorksheetItem } from '@/types/worksheet';
import { FileDown, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface WorksheetCardProps {
  worksheet: WorksheetItem;
  onDownload: (worksheet: WorksheetItem) => void;
  onOpenGuide: (worksheet: WorksheetItem) => void;
}

export default function WorksheetCard({
  worksheet,
  onDownload,
  onOpenGuide,
}: WorksheetCardProps) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-200/70 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md">
      <div>
        {/* 썸네일 그래픽 영역 */}
        <div className="relative mb-4 flex h-44 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-yellow-100/60 to-orange-50 border border-amber-100">
          {/* 장식용 파스텔 동그라미들 */}
          <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-amber-200/30 blur-sm pointer-events-none" />
          <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-yellow-200/40 blur-sm pointer-events-none" />

          {/* 주차 & 무료 뱃지 */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="rounded-full bg-amber-500/90 px-3 py-1 text-xs font-black text-white shadow-sm">
              {worksheet.week}주차
            </span>
            {worksheet.isFree ? (
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                <CheckCircle2 className="h-3 w-3" />
                무료 배포
              </span>
            ) : (
              <span className="rounded-full bg-yellow-200 px-2 py-0.5 text-[11px] font-bold text-yellow-900">
                구독 전용
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 shadow-sm">
            {worksheet.pageCount}P 분량
          </div>

          {/* 썸네일 중앙 시각 일러스트 표현 */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-amber-100 text-3xl mb-2 group-hover:scale-110 transition-transform">
              <span role="img" aria-label="책 아이콘">
                📖
              </span>
            </div>
            <p className="text-xs font-bold text-amber-800/90 line-clamp-1">
              {worksheet.subTitle}
            </p>
          </div>

          {/* 하단 태그 */}
          <div className="absolute bottom-2.5 flex flex-wrap gap-1 px-3 justify-center">
            {worksheet.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-medium text-amber-700 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 텍스트 영역: 주차 및 제목 */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{worksheet.week}주차 코스</span>
          </div>
          <h4 className="mt-1 text-base font-extrabold text-yellow-950 sm:text-lg leading-snug">
            {worksheet.title}
          </h4>
          <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {worksheet.description}
          </p>
        </div>
      </div>

      {/* 버튼 액션 영역 */}
      <div className="space-y-2 pt-2 border-t border-amber-100/70">
        {/* [👶 아이용 학습지 다운로드] 버튼 */}
        <button
          type="button"
          onClick={() => onDownload(worksheet)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 py-3 px-4 text-xs sm:text-sm font-black text-yellow-950 shadow-sm transition-all hover:bg-amber-300 active:scale-98"
        >
          <FileDown className="h-4 w-4 text-yellow-950 stroke-[2.5]" />
          <span>👶 아이용 학습지 다운로드 (PDF)</span>
        </button>

        {/* [👩‍🏫 부모 해설지 보기] 버튼 */}
        <button
          type="button"
          onClick={() => onOpenGuide(worksheet)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50/70 py-2.5 px-4 text-xs sm:text-sm font-bold text-amber-900 transition-all hover:bg-amber-100 active:scale-98"
        >
          <BookOpen className="h-4 w-4 text-amber-700 stroke-[2.2]" />
          <span>👩‍🏫 부모 해설지 보기</span>
        </button>
      </div>
    </article>
  );
}
