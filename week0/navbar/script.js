const themeToggle = document.getElementById("themeToggle");
const themeMenu = document.getElementById("themeMenu");

// 드롭다운 토글
themeToggle.addEventListener("click", () => {
  themeMenu.classList.toggle("show");
});

// 테마 변경 함수
function setTheme(mode) {
  document.body.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode); // 설정 저장

  if (mode === "light") {
    themeToggle.textContent = "🌞";
  } else if (mode === "dark") {
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "🖥️"; // 시스템 기본값
  }
}

// 저장된 테마 불러오기
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

// 화면 클릭 시 메뉴 닫기
document.addEventListener("click", (event) => {
  if (
    !themeToggle.contains(event.target) &&
    !themeMenu.contains(event.target)
  ) {
    themeMenu.classList.remove("show");
  }
});
