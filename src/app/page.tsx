'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryTabs from '@/components/CategoryTabs';
import WorksheetCard from '@/components/WorksheetCard';
import ParentGuideModal from '@/components/ParentGuideModal';
import AuthModal from '@/components/AuthModal';
import { CATEGORIES, DUMMY_WORKSHEETS } from '@/data/worksheets';
import { CategoryType, WorksheetItem } from '@/types/worksheet';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { BookMarked, Smartphone, Printer, Star } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('sun');
  const [worksheets, setWorksheets] = useState<WorksheetItem[]>(DUMMY_WORKSHEETS);
  const [loading, setLoading] = useState<boolean>(false);

  // 부모 해설지 모달 상태
  const [selectedGuideWorksheet, setSelectedGuideWorksheet] = useState<WorksheetItem | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // 로그인 모달 및 사용자 상태
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authTriggerName, setAuthTriggerName] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Supabase 데이터 패칭 연동 구조
  useEffect(() => {
    async function loadWorksheets() {
      if (!isSupabaseConfigured || !supabase) {
        setWorksheets(DUMMY_WORKSHEETS);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('worksheets')
          .select('*')
          .order('week', { ascending: true });

        if (error) {
          console.warn('Supabase fetch failed, using fallback dummy data:', error.message);
          setWorksheets(DUMMY_WORKSHEETS);
        } else if (data && data.length > 0) {
          setWorksheets(data as WorksheetItem[]);
        } else {
          setWorksheets(DUMMY_WORKSHEETS);
        }
      } catch (err) {
        console.error('Error fetching worksheets:', err);
        setWorksheets(DUMMY_WORKSHEETS);
      } finally {
        setLoading(false);
      }
    }

    loadWorksheets();
  }, []);

  // 선택된 카테고리에 해당하는 학습지 필터링
  const filteredWorksheets = useMemo(() => {
    return worksheets.filter((ws) => ws.categoryId === selectedCategory);
  }, [worksheets, selectedCategory]);

  const activeCategoryMeta = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
  }, [selectedCategory]);

  // 학습지 PDF 다운로드 클릭 처리
  const handleDownload = (worksheet: WorksheetItem) => {
    if (!isLoggedIn) {
      setAuthTriggerName(`[${worksheet.title}] 아이용 학습지 다운로드`);
      setIsAuthOpen(true);
      return;
    }

    alert(`🎉 [${worksheet.title}] 학습지 PDF 다운로드를 시작합니다!\n집에서 A4 용지로 편하게 인쇄해 주세요.`);
  };

  // 부모 해설지 보기 클릭 처리
  const handleOpenGuide = (worksheet: WorksheetItem) => {
    setSelectedGuideWorksheet(worksheet);
    setIsGuideOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      {/* 글로벌 상단 헤더 */}
      <Header
        isLoggedIn={isLoggedIn}
        onOpenAuthModal={() => {
          setAuthTriggerName('회원 전용 서비스');
          setIsAuthOpen(true);
        }}
        onLogout={() => {
          setIsLoggedIn(false);
          alert('로그아웃 되었습니다.');
        }}
      />

      {/* 메인 콘텐츠 영역: max-w-screen-xl, mx-auto, 화면 중앙 정렬 */}
      <main className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col items-center px-4 py-8 sm:px-8 sm:py-10 space-y-10">
        {/* 메인 배너 (히어로 섹션): 중앙 정렬, bg-white, border-gray-200 */}
        <section className="flex w-full flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 text-center shadow-sm">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-200 px-4 py-1.5 text-xs font-bold text-amber-900 mb-4 shadow-sm">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span>엄마표·아빠표 한글 파닉스 첫걸음</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl leading-tight">
            비싼 학습지 대신, <br className="sm:hidden" />
            <span className="text-amber-700 underline decoration-amber-300 decoration-wavy decoration-2">
              집에서 하루 15분
            </span>{' '}
            놀이하듯 배워요!
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base font-normal text-gray-600 leading-relaxed">
            아이에게는 인쇄해서 쓰는 흥미진진한 <strong className="text-gray-900 font-bold">프린트 학습지(PDF)</strong>를, <br className="hidden sm:inline" />
            부모님에게는 스마트폰으로 보면서 바로 가르치는 <strong className="text-gray-900 font-bold">1:1 모바일 해설지</strong>를 드려요.
          </p>

          {/* 3개의 특징 카드 (grid-cols-1 md:grid-cols-3) */}
          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3 text-left">
            <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-200 shadow-sm transition hover:bg-gray-100/70">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 border border-amber-200 text-amber-800">
                <BookMarked className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900">소릿값 파닉스 교육</h4>
                <p className="mt-0.5 text-xs text-gray-500">ㄱ(그)+ㅏ(아)=가 원리</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-200 shadow-sm transition hover:bg-gray-100/70">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 border border-amber-200 text-amber-800">
                <Printer className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900">A4 무제한 프린트</h4>
                <p className="mt-0.5 text-xs text-gray-500">고화질 PDF 즉시 출력</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-5 border border-gray-200 shadow-sm transition hover:bg-gray-100/70">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 border border-amber-200 text-amber-800">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900">모바일 부모 해설지</h4>
                <p className="mt-0.5 text-xs text-gray-500">대화 예시·칭찬 팁 제공</p>
              </div>
            </div>
          </div>
        </section>

        {/* 단계별 탭 네비게이션 섹션 */}
        <section className="w-full space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
              <span>단계별 커리큘럼 선택</span>
            </h2>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">
              현재: {activeCategoryMeta.badge}
            </span>
          </div>

          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        </section>

        {/* 학습지 카드 그리드 리스트 (grid-cols-1 md:grid-cols-2 lg:grid-cols-3) */}
        <section className="w-full space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                {activeCategoryMeta.name} 학습지 모음
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-gray-500">
                아이의 성향과 속도에 맞춰 한 주에 한 장씩 천천히 즐겨보세요.
              </p>
            </div>
            <div>
              <span className="rounded-full bg-amber-100 border border-amber-200 px-3.5 py-1 text-xs font-bold text-amber-900">
                총 {filteredWorksheets.length}권의 학습지
              </span>
            </div>
          </div>

          {loading ? (
            <div className="w-full py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
              <p className="mt-3 text-xs font-bold text-gray-600">학습지를 불러오고 있어요...</p>
            </div>
          ) : filteredWorksheets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              {filteredWorksheets.map((worksheet) => (
                <WorksheetCard
                  key={worksheet.id}
                  worksheet={worksheet}
                  onDownload={handleDownload}
                  onOpenGuide={handleOpenGuide}
                />
              ))}
            </div>
          ) : (
            <div className="w-full rounded-3xl border border-dashed border-gray-300 bg-white p-14 text-center">
              <p className="text-sm font-semibold text-gray-500">
                해당 단계의 새로운 학습지가 곧 발행될 예정입니다! ✨
              </p>
            </div>
          )}
        </section>
      </main>

      {/* 부모 해설지 모달창 */}
      <ParentGuideModal
        worksheet={selectedGuideWorksheet}
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* 로그인 유도 모달창 */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={() => setIsLoggedIn(true)}
        triggerActionName={authTriggerName}
      />

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
