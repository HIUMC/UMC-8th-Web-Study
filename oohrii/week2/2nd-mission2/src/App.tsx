import { useTheme } from './context/ThemeContext';
import './App.css'

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`w-full h-full flex flex-col ${
      isDarkMode 
        ? 'bg-[#1a1a1a] text-white' 
        : 'bg-white text-black'
    }`}>
      {/* 상단 네비게이션 바 */}
      <nav className={`w-full h-32 flex items-center justify-end px-8 ${
        isDarkMode 
          ? 'bg-[#111111]' 
          : 'bg-gray-100'
      }`}>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isDarkMode
              ? 'bg-white text-black hover:bg-gray-100'
              : 'bg-black text-white hover:bg-gray-900'
          }`}
        >
          {isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        </button>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {isDarkMode ? '다크모드' : '라이트모드'}
          </h2>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-200' : 'text-gray-600'
          }`}>
            현재 {isDarkMode ? '다크' : '라이트'} 테마를 사용중입니다
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
