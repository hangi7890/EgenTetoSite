import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent("에겐-테토 성격 분석 - 호르몬 기반 성격 유형 테스트");
  const shareDescription = encodeURIComponent("나만의 성격 유형을 찾아보고 궁합을 확인해보세요!");

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const handleInstagramShare = () => {
    // 인스타그램은 웹에서 직접 공유 API가 없어서 클립보드에 링크 복사
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('링크가 클립보드에 복사되었습니다! 인스타그램에서 붙여넣기 하세요.');
    });
  };

  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">에겐-테토 성격 분석</h3>
          <p className="text-neutral-400 mb-4">성격 유형을 이해하고 더 나은 관계를 만들어가세요</p>
          <div className="flex justify-center space-x-6 mb-8">
            <button 
              onClick={handleFacebookShare}
              className="text-neutral-400 hover:text-white transition-colors"
              title="페이스북으로 공유하기"
            >
              <Facebook className="h-6 w-6" />
            </button>
            <button 
              onClick={handleTwitterShare}
              className="text-neutral-400 hover:text-white transition-colors"
              title="트위터로 공유하기"
            >
              <Twitter className="h-6 w-6" />
            </button>
            <button 
              onClick={handleInstagramShare}
              className="text-neutral-400 hover:text-white transition-colors"
              title="링크 복사하기"
            >
              <Instagram className="h-6 w-6" />
            </button>
          </div>
          <div className="text-neutral-500 text-sm">
            <p>참고: 나무위키 테토-에겐 성격 유형</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
