// 스크롤하면 네비게이션 바에 그림자 표시
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

// 화면에 들어오는 요소를 부드럽게 나타내기
const revealTargets = document.querySelectorAll("section h2, .feature, .menu-item, .visit p");
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => observer.observe(el));

// 현재 시간 기준 영업 상태 표시 (평일 08–21시, 주말 10–22시)
function updateOpenStatus() {
  const now = new Date();
  const day = now.getDay();
  const isWeekend = day === 0 || day === 6;
  const [open, close] = isWeekend ? [10, 22] : [8, 21];
  const hour = now.getHours() + now.getMinutes() / 60;
  const isOpen = hour >= open && hour < close;

  const status = document.getElementById("open-status");
  status.textContent = isOpen ? "지금 영업 중이에요 ☕" : "지금은 영업 시간이 아니에요";
  status.className = isOpen ? "open-status open" : "open-status closed";
}

updateOpenStatus();
setInterval(updateOpenStatus, 60 * 1000);
