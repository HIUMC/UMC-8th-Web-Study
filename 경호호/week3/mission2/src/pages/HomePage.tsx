const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">영화 정보 서비스</h1>
      <p className="text-xl mb-8">
        최신 영화 정보와 다양한 영화 카테고리를 제공하는 서비스입니다.
      </p>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">이용 방법</h2>
        <ul className="text-left text-lg space-y-3">
          <li>• <strong>인기 영화</strong>: 현재 인기 있는 영화 목록을 확인하세요.</li>
          <li>• <strong>개봉 예정</strong>: 곧 개봉할 영화들을 미리 살펴보세요.</li>
          <li>• <strong>평점 높은</strong>: 높은 평점을 받은 영화들을 찾아보세요.</li>
          <li>• <strong>상영 중</strong>: 현재 상영 중인 영화를 확인하세요.</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage; 