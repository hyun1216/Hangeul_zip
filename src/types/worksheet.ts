export type CategoryType = 'sun' | 'moon' | 'star' | 'space';

export interface CategoryMeta {
  id: CategoryType;
  name: string;
  stepName: string;
  badge: string;
  icon: string;
  summary: string;
  description: string;
  accentColor: string;
  activeBg: string;
}

export interface ParentGuideContent {
  targetGoal: string;
  phonicsTip: string; // 핵심 파닉스 교육 팁 (예: ㄱ(그) + ㅏ(아) = 가(그아))
  stepByStep: {
    step: number;
    title: string;
    description: string;
    parentDialogue: string; // "엄마/아빠가 이렇게 말해주세요"
  }[];
  praiseTip: string; // 아이 맞춤 칭찬 가이드
  cautions?: string[]; // 흔히 하는 실수 및 주의점
}

export interface WorksheetItem {
  id: string;
  categoryId: CategoryType;
  week: number;
  title: string;
  subTitle: string;
  description: string;
  thumbnailUrl: string;
  pdfDownloadUrl: string;
  pageCount: number;
  isFree: boolean;
  tags: string[];
  parentGuide: ParentGuideContent;
  createdAt?: string;
}
