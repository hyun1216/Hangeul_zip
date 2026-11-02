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
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md">
      <div>
        {/* 썸네일 영역: 단색 솔리드 UI */}
        <div className="relative mb-5 flex h-48 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
          {/* 주차 & 무료 뱃지 */}
          <div className="relative z-10 absolute top-3 left-3 flex items-center gap-1.5">
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
              {worksheet.week}주차
            </span>
            {worksheet.isFree ? (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="h-3 w-3" />
                무료 배포
              </span>
            ) : (
              <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-[11px] font-bold text-gray-700">
                구독 전용
              </span>
            )}
          </div>

          <div className="relative z-10 absolute top-3 right-3 rounded-full bg-white border border-gray-200 px-2.5 py-0.5 text-[11px] font-semibold text-gray-700 shadow-sm">
            {worksheet.pageCount}P 분량
          </div>

          {/* 썸네일 중앙 일러스트 표현 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-200 text-3xl mb-2 transition-transform duration-200 group-hover:scale-105">
              <span role="img" aria-label="책 아이콘">
                📖
              </span>
            </div>
            <p className="text-xs font-bold text-gray-800 line-clamp-1">
              {worksheet.subTitle}
            </p>
          </div>

          {/* 하단 태그 */}
          <div className="relative z-10 absolute bottom-3 flex flex-wrap gap-1 px-3 justify-center">
            {worksheet.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="rounded-md bg-white border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600 shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 텍스트 영역: 주차 및 제목 (relative z-10, text-gray-900, text-gray-600) */}
        <div className="relative z-10 mb-5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{worksheet.week}주차 코스</span>
          </div>
          <h4 className="mt-1.5 text-lg font-black text-gray-900 leading-snug">
            {worksheet.title}
          </h4>
          <p className="mt-2 text-xs sm:text-sm font-normal text-gray-600 line-clamp-2 leading-relaxed">
            {worksheet.description}
          </p>
        </div>
      </div>

      {/* 버튼 액션 영역 */}
      <div className="relative z-10 space-y-2.5 pt-4 border-t border-gray-100">
        {/* [👶 아이용 학습지 다운로드] 핵심 포인트 버튼 */}
        <button
          type="button"
          onClick={() => onDownload(worksheet)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 py-3.5 px-4 text-xs sm:text-sm font-black text-gray-900 shadow-sm transition-all hover:bg-amber-300 active:scale-[0.98]"
        >
          <FileDown className="h-4 w-4 text-gray-900 stroke-[2.5]" />
          <span>👶 아이용 학습지 다운로드 (PDF)</span>
        </button>

        {/* [👩‍🏫 부모 해설지 보기] 버튼 */}
        <button
          type="button"
          onClick={() => onOpenGuide(worksheet)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 py-3 px-4 text-xs sm:text-sm font-bold text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900 active:scale-[0.98]"
        >
          <BookOpen className="h-4 w-4 text-gray-600 stroke-[2.2]" />
          <span>👩‍🏫 부모 해설지 보기</span>
        </button>
      </div>
    </article>
  );
}
