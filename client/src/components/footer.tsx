import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">에겐-테토 성격 분석</h3>
          <p className="text-neutral-400 mb-4">성격 유형을 이해하고 더 나은 관계를 만들어가세요</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
          <div className="text-neutral-500 text-sm">
            <p>참고: 나무위키 테토-에겐 성격 유형</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
