import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-amber-200/70 bg-amber-100/40 py-8 px-4 text-center sm:px-6">
      <div className="mx-auto max-w-2xl space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-yellow-950">
          <span>☀️</span>
          <span>집에서한글 (Hangeul_zip)</span>
          <span>🌙</span>
        </div>
        <p className="text-xs text-amber-800/80 leading-relaxed">
          엄마, 아빠가 집에서 직접 가르치는 세상에서 가장 따뜻한 1:1 홈스쿨링 한글 솔루션.
          <br className="hidden sm:inline" /> 현재는 무료 배포 버전이며, 더 풍성한 교구재와 함께 정기구독 서비스로 찾아뵐 예정입니다.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-amber-200/50">
          <span>이용약관</span>
          <span>개인정보처리방침</span>
          <span>학습지 저작권 안내</span>
          <span>고객센터 & 제휴문의</span>
        </div>
        <p className="text-[10px] text-gray-400">
          © {new Date().getFullYear()} Hangeul_zip. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
