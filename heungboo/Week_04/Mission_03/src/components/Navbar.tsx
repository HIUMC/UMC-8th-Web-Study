const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md-fixed w-full z-10">
      <div className=""></div>
      <div className="flex items-center justify-between p-4 border-b-4">
        <div className="space-x-6 text-2xl text-red-500">돌려 돌려 LP 판</div>
        <div className="flex space-x-6">
          <div>로그인</div>
          <div>회원가입</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
