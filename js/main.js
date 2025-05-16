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
  navbar.classList.toggle("active");
});

// Đóng menu khi click vào link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

// Đóng menu khi cuộn chuột (scroll)
window.addEventListener("scroll", () => {
  if (navbar.classList.contains("active")) {
    navbar.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const footer = document.querySelector("footer"); // Chọn phần footer của bạn

  // Kiểm tra vị trí footer để hiển thị nút
  function checkScroll() {
    // Vị trí hiện tại của scroll
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Chiều cao của toàn bộ trang
    const pageHeight = document.documentElement.scrollHeight;

    // Chiều cao của viewport
    const viewportHeight = window.innerHeight;

    // Vị trí bắt đầu của footer (tính từ top)
    const footerPosition = footer.offsetTop;

    // Hiển thị nút khi scroll xuống gần footer (cách footer 300px)
    if (scrollPosition + viewportHeight >= footerPosition - 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  // Sự kiện click cho nút scroll to top
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Theo dõi sự kiện scroll
  window.addEventListener("scroll", checkScroll);

  // Kiểm tra ngay khi load trang
  checkScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  const heroSwiper = new Swiper(".hero-swiper", {
    loop: true,
    autoplay: {
      delay: 5000, // tăng delay để người dùng có thời gian đọc
      disableOnInteraction: false,
    },
    effect: "slide",
    speed: 1000, // tăng lên để mượt hơn

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Optional: cải thiện AOS
  AOS.init({
    once: true,
    duration: 1000,
  });
});

function setFullHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
window.addEventListener("resize", setFullHeight);
window.addEventListener("load", setFullHeight);

document.addEventListener("DOMContentLoaded", function () {
  const aboutSwiper = new Swiper(".about-image-swiper", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    effect: "slide",
    speed: 800,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Thêm breakpoints cho mobile
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  });

  // Refresh AOS khi slide thay đổi
  aboutSwiper.on("slideChange", function () {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  });
});
