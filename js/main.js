// Smooth Scroll for Navigation
// const btn = document.getElementById("scrollToTopBtn");

// window.addEventListener("scroll", () => {
//   const scrollTop =
//     document.documentElement.scrollTop || document.body.scrollTop;
//   const windowHeight = window.innerHeight;
//   const scrollHeight = document.documentElement.scrollHeight;
//   const distanceToBottom = scrollHeight - (scrollTop + windowHeight);

//   if (distanceToBottom < 300) {
//     btn.classList.add("show");
//   } else {
//     btn.classList.remove("show");
//   }
// });

// btn.addEventListener("click", () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// });

/**
 * Hàm tạo hiệu ứng đếm số từ 0 đến giá trị đích
 */
function animateStats() {
  // Lấy tất cả các phần tử số cần đếm
  const statElements = document.querySelectorAll(".stat-number");

  // Nếu không có phần tử nào thì thoát hàm
  if (!statElements.length) return;

  // Cấu hình cho Intersection Observer
  const options = {
    threshold: 0.5, // Kích hoạt khi 50% phần tử hiển thị
    rootMargin: "0px 0px -50px 0px", // Dịch chuyển vùng quan sát xuống 50px
  };

  // Tạo observer để theo dõi khi phần tử xuất hiện
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Chỉ xử lý khi phần tử hiển thị trong viewport
      if (entry.isIntersecting) {
        const stat = entry.target;
        const targetValue = +stat.dataset.count; // Lấy giá trị đích từ data-count
        const duration = 2000; // Thời gian đếm (2 giây)
        const startTime = performance.now(); // Thời điểm bắt đầu

        // Hàm đệ quy để cập nhật giá trị
        const animate = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1); // Tiến trình từ 0-1
          const currentValue = Math.floor(progress * targetValue); // Tính giá trị hiện tại

          // Hiển thị số có định dạng (thêm dấu phân cách hàng nghìn)
          stat.textContent = new Intl.NumberFormat().format(currentValue);

          // Tiếp tục đếm nếu chưa đạt giá trị đích
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Đảm bảo hiển thị chính xác giá trị cuối cùng
            stat.textContent = new Intl.NumberFormat().format(targetValue);
          }
        };

        // Bắt đầu animation
        requestAnimationFrame(animate);
        // Ngừng quan sát phần tử này sau khi kích hoạt
        observer.unobserve(stat);
      }
    });
  }, options);

  // Bắt đầu quan sát tất cả các phần tử số
  statElements.forEach((stat) => observer.observe(stat));
}

// Khởi chạy khi trang web tải xong
document.addEventListener("DOMContentLoaded", animateStats);

// Menu Toggle
const toggleBtn = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
});

// Auto close menu when clicking any link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleBtn.classList.remove("active");
    navbar.classList.remove("active");
  });
});
// Menu Toggle
