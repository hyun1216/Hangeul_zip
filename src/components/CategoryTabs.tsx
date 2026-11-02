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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === selectedCategory;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex flex-col items-center justify-center rounded-3xl p-4 sm:p-5 text-center transition-all duration-200 ${
                isActive
                  ? 'bg-amber-100 border-2 border-amber-400 shadow-sm scale-[1.02] z-10'
                  : 'bg-white hover:bg-amber-50/50 border border-amber-200/80 shadow-sm text-gray-500 hover:border-amber-300'
              }`}
            >
              {/* 활성 인디케이터 점 */}
              {isActive && (
                <span className="absolute -top-1.5 right-3 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              )}

              {/* 아이콘 */}
              <div
                className={`mb-2 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl text-2xl sm:text-3xl transition-transform duration-200 ${
                  isActive
                    ? 'bg-white shadow-sm scale-105'
                    : 'bg-amber-50 group-hover:scale-105'
                }`}
              >
                <span>{cat.icon}</span>
              </div>

              {/* 단계명 및 반 이름 */}
              <span className={`text-xs font-semibold tracking-wide ${isActive ? 'text-amber-800' : 'text-gray-400'}`}>
                {cat.stepName}
              </span>
              <h3 className={`mt-0.5 text-base sm:text-lg font-black ${isActive ? 'text-amber-950' : 'text-gray-800'}`}>
                {cat.name}
              </h3>

              {/* 요약 키워드 */}
              <span
                className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors ${
                  isActive
                    ? 'bg-amber-200 text-amber-950'
                    : 'bg-amber-50 border border-amber-200/60 text-amber-800'
                }`}
              >
                {cat.summary}
              </span>
            </button>
          );
        })}
      </div>

      {/* 현재 선택된 카테고리의 설명 배너 (단색 파스텔 옐로우) */}
      <div className="mt-4 sm:mt-5 rounded-3xl border border-amber-200/90 bg-amber-100/70 p-5 sm:p-6 text-center shadow-sm">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-amber-300 px-3.5 py-1 text-xs font-bold text-amber-900 shadow-sm">
          <span>{currentCategory.icon}</span>
          <span>{currentCategory.name}의 교육 목표</span>
        </div>
        <p className="mt-2 text-sm sm:text-base font-black text-amber-950">
          {currentCategory.description}
        </p>
      </div>
    </section>
  );
}
