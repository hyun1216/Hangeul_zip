'use client';

import React from 'react';
import { CATEGORIES } from '@/data/worksheets';
import { CategoryType } from '@/types/worksheet';

interface CategoryTabsProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export default function CategoryTabs({
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <section className="w-full">
      {/* 4단계 탭 버튼 리스트 */}
      <div className="grid grid-cols-2 gap-2.5 p-1 sm:grid-cols-4 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === selectedCategory;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex flex-col items-center justify-center rounded-3xl p-3.5 sm:p-4 text-center transition-all duration-200 ${
                isActive
                  ? 'bg-amber-100 shadow-sm ring-2 ring-amber-400 scale-[1.02] z-10'
                  : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {/* 활성 표시 귀여운 점 인디케이터 */}
              {isActive && (
                <span className="absolute -top-1.5 right-3 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              )}

              {/* 아이콘 */}
              <div
                className={`mb-1.5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-transform duration-200 ${
                  isActive
                    ? 'bg-white shadow-sm scale-110'
                    : 'bg-slate-100 group-hover:scale-105'
                }`}
              >
                <span>{cat.icon}</span>
              </div>

              {/* 단계명 및 반 이름 */}
              <span className={`text-[11px] font-semibold tracking-wide ${isActive ? 'text-amber-800' : 'text-slate-400'}`}>
                {cat.stepName}
              </span>
              <h3 className={`text-base font-extrabold sm:text-lg ${isActive ? 'text-slate-900 font-black' : 'text-slate-700'}`}>
                {cat.name}
              </h3>

              {/* 요약 키워드 */}
              <span
                className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-200 text-amber-900 font-bold'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.summary}
              </span>
            </button>
          );
        })}
      </div>

      {/* 현재 선택된 카테고리의 설명 배너 (단색 포인트 배경) */}
      <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5 text-center shadow-sm">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800 shadow-sm">
          <span>{currentCategory.icon}</span>
          <span>{currentCategory.name}의 교육 목표</span>
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-800 sm:text-base">
          {currentCategory.description}
        </p>
      </div>
    </section>
  );
}
