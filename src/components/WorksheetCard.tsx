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
    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-amber-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md">
      <div className="flex flex-col">
        {/* 썸네일 영역: 단색 파스텔 옐로우 크림 배경, 절대좌표 뱃지 충돌 완벽 해결 */}
        <div className="relative mb-5 flex h-48 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-amber-50/70 border border-amber-200/60">
          {/* 상단 좌측: 주차 & 무료 뱃지 (확실한 absolute) */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
              {worksheet.week}주차
            </span>
            {worksheet.isFree ? (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="h-3 w-3" />
                무료 배포
              </span>
            ) : (
              <span className="rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                구독 전용
              </span>
            )}
          </div>

          {/* 상단 우측: 분량 뱃지 (확실한 absolute) */}
          <div className="absolute top-3 right-3 z-10 rounded-full bg-white border border-amber-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900 shadow-sm">
            {worksheet.pageCount}P 분량
          </div>

          {/* 썸네일 중앙: 책 아이콘 및 서브타이틀 (상하 뱃지와 겹치지 않는 안전 여백) */}
          <div className="flex flex-col items-center text-center px-4 py-2">
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white shadow-sm border border-amber-200 text-3xl mb-1.5 transition-transform duration-200 group-hover:scale-105">
              <span role="img" aria-label="책 아이콘">
                📖
              </span>
            </div>
            <p className="text-xs font-bold text-amber-950 line-clamp-1 max-w-[200px]">
              {worksheet.subTitle}
            </p>
          </div>

          {/* 하단: 태그 뱃지 (확실한 absolute 배치) */}
          <div className="absolute bottom-3 inset-x-0 z-10 flex flex-wrap items-center justify-center gap-1 px-3">
            {worksheet.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="rounded-md bg-white border border-amber-200 px-2 py-0.5 text-[10px] font-medium text-amber-800 shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 텍스트 영역: 주차 및 제목 (고정 최소 높이로 카드 간 정렬 유지) */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{worksheet.week}주차 코스</span>
          </div>
          <h4 className="mt-1.5 text-lg font-black text-gray-900 leading-snug min-h-[3.25rem] flex items-start">
            {worksheet.title}
          </h4>
          <p className="mt-1 text-xs sm:text-sm font-normal text-gray-600 line-clamp-2 leading-relaxed min-h-[3.75rem]">
            {worksheet.description}
          </p>
        </div>
      </div>

      {/* 버튼 액션 영역: 하단 일직선 정렬 */}
      <div className="space-y-2.5 pt-4 border-t border-amber-100">
        {/* [👶 아이용 학습지 다운로드] 핵심 포인트 버튼 (노랑빛) */}
        <button
          type="button"
          onClick={() => onDownload(worksheet)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 py-3.5 px-4 text-xs sm:text-sm font-black text-amber-950 shadow-sm transition-all hover:bg-amber-300 active:scale-[0.98]"
        >
          <FileDown className="h-4 w-4 text-amber-950 stroke-[2.5]" />
          <span>👶 아이용 학습지 다운로드 (PDF)</span>
        </button>

        {/* [👩‍🏫 부모 해설지 보기] 버튼 */}
        <button
          type="button"
          onClick={() => onOpenGuide(worksheet)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-amber-200 bg-white py-3 px-4 text-xs sm:text-sm font-bold text-amber-900 transition-all hover:bg-amber-50 active:scale-[0.98]"
        >
          <BookOpen className="h-4 w-4 text-amber-700 stroke-[2.2]" />
          <span>👩‍🏫 부모 해설지 보기</span>
        </button>
      </div>
    </article>
  );
}
