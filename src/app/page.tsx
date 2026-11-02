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

  // Supabase 데이터 패칭 연동 구조 (실제 DB 구성 시 자동 로드, 미설정 시 더미 데이터 fallback)
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

  // 학습지 PDF 다운로드 클릭 처리 (로그인 유도 연동)
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
    <div className="flex min-h-screen flex-col bg-slate-50">
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

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 space-y-8">
        {/* 깔끔한 솔리드 화이트 히어로 소개 섹션 (그라데이션 제거, 텍스트 가독성 최우선) */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-200 px-3.5 py-1 text-xs font-bold text-amber-900 mb-3 shadow-sm">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>엄마표·아빠표 한글 파닉스 첫걸음</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl leading-tight">
            비싼 학습지 대신, <br className="sm:hidden" />
            <span className="text-amber-800 underline decoration-amber-300 decoration-wavy decoration-2">
              집에서 하루 15분
            </span>{' '}
            놀이하듯 배워요!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
            아이에게는 인쇄해서 쓰는 흥미진진한 <strong className="text-slate-800 font-semibold">프린트 학습지(PDF)</strong>를, <br className="hidden sm:inline" />
            부모님에게는 스마트폰으로 보면서 바로 가르치는 <strong className="text-slate-800 font-semibold">1:1 모바일 해설지</strong>를 드려요.
          </p>

          {/* 서비스 3대 핵심 특징 카드 */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 text-left">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-200">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 border border-amber-200 text-amber-800">
                <BookMarked className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">소릿값 파닉스 교육</h4>
                <p className="text-[11px] text-slate-500">ㄱ(그)+ㅏ(아)=가 원리</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-200">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 border border-amber-200 text-amber-800">
                <Printer className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">A4 무제한 프린트</h4>
                <p className="text-[11px] text-slate-500">고화질 PDF 즉시 출력</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-200">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 border border-amber-200 text-amber-800">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">모바일 부모 해설지</h4>
                <p className="text-[11px] text-slate-500">대화 예시·칭찬 팁 제공</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: 4단계 카테고리 탭 네비게이션 */}
        <section>
          <div className="mb-3 flex items-center justify-between px-1">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <span>단계별 커리큘럼 선택</span>
            </h2>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              현재: {activeCategoryMeta.badge}
            </span>
          </div>

          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        </section>

        {/* Step 2: 학습지 카드 그리드 리스트 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-base font-black text-slate-900 sm:text-lg">
                {activeCategoryMeta.name} 학습지 모음
              </h3>
              <p className="text-xs font-normal text-slate-500">
                아이의 성향과 속도에 맞춰 한 주에 한 장씩 천천히 즐겨보세요.
              </p>
            </div>
            <span className="rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-900">
              총 {filteredWorksheets.length}권의 학습지
            </span>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
              <p className="mt-3 text-xs font-bold text-slate-700">학습지를 불러오고 있어요...</p>
            </div>
          ) : filteredWorksheets.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-sm font-medium text-slate-500">
                해당 단계의 새로운 학습지가 곧 발행될 예정입니다! ✨
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Step 3: 부모 해설지 Bottom Sheet 모달창 */}
      <ParentGuideModal
        worksheet={selectedGuideWorksheet}
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Step 5: 로그인 유도 모달창 */}
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
