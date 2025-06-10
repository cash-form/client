export default function CreditPolicyGuide() {
  return (
    <section className="bg-background  text-foreground p-6">
      <h2 className="text-lg font-bold  mb-4">크레딧 안내</h2>

      <ul className="space-y-2  mb-4">
        <li>• 1크레딧 = 1원</li>
        <li>• 1,000크레딧 단위로 충전 및 출금 가능</li>
        <li>• 이벤트 크레딧 제외 소멸 없음</li>
        <li>• 이벤트 크레딧은 각 이벤트마다 소멸 시점 확인 필요</li>
      </ul>

      <div className="text-sm text-gray-500">
        * 출금 요청 시 실시간으로 출금되오나, 최대 24시간까지 소요될 수
        있습니다.
      </div>
    </section>
  );
}
