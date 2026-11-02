import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '집에서한글 (Hangeul_zip) | 아이와 함께하는 따뜻한 홈스쿨링',
  description:
    '유아·초등 아이를 둔 부모님을 위한 수준별 무료 한글 학습지(PDF)와 모바일 1:1 부모 해설지. 해님반, 달님반, 별님반, 우주반 단계별 파닉스 교육!',
  keywords: ['집에서한글', '한글학습지', '유아한글', '부모해설지', '한글파닉스', '프린트학습지'],
  openGraph: {
    title: '집에서한글 (Hangeul_zip) - 부모와 아이가 행복한 홈스쿨링',
    description: '수준별 한글 학습지 PDF 다운로드 & 모바일 부모 전용 해설 가이드',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fffbeb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-yellow-50 text-yellow-900 antialiased selection:bg-amber-200 selection:text-amber-900">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col shadow-sm sm:border-x sm:border-amber-100/70">
          {children}
        </div>
      </body>
    </html>
  );
}
