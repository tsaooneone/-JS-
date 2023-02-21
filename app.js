// 先找到最外層
const carousel = document.querySelector(".carousel");
// 再找裡面的元素，才不會從document等級抓，才不會抓到其他相同class的元素
const slides = carousel.querySelectorAll(".slide");
const track = carousel.querySelector(".slide-track");
const nextBtn = carousel.querySelector(".next-btn");
const prevBtn = carousel.querySelector(".prev-btn");
const navigator = carousel.querySelector(".navigator");
const indicators = navigator.querySelectorAll(".indicator");

// 預設開頭為0
let currentIndex = 0;
// console.log(carousel);
function setupSlides() {
    const w = track.clientWidth; //取得元素寬度

    // 展開5張圖片
    slides.forEach((slide, i) => {
        slide.style.left = `${i * w}px`;
    });
    updateNavigatorButtons(currentIndex);
}
function moveSlide(index) {
    const w = track.clientWidth;
    track.style.transform = `translateX(-${index * w}px)`;
    updateNavigatorButtons(index);
    updateIndicator(index);
}
function updateNavigatorButtons(index) {
    if (index === 0) {
        // 如果是0代表在頭 所以往前的按鈕要隱藏
        prevBtn.classList.add("hide");
        nextBtn.classList.remove("hide");
    } else if (index === slides.length -1) {
        // 如果在最後 往後的按鈕要隱藏
        nextBtn.classList.add("hide");
        prevBtn.classList.remove("hide");
    } else {
        // 在中間的話兩個箭頭都要顯示出來
        prevBtn.classList.remove("hide");
        nextBtn.classList.remove("hide");
    }
}

function updateIndicator(index) {
    indicators.forEach(indicator => {
        if(Number(indicator.dataset.index) === index) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });
}

nextBtn.addEventListener("click", () => {
    currentIndex++;
    moveSlide(currentIndex);
});

prevBtn.addEventListener("click", () => {
    currentIndex--;
    moveSlide(currentIndex);
});

navigator.addEventListener("click", (e) => {
    if(e.target.matches("button")) {
        // 如果點擊到的是(matches()方法)符合button元素執行以下
        const dot = e.target;
        // 抓取到Html上data的資料，取得索引值
        const dotIndex = Number(dot.dataset.index);
        moveSlide(dotIndex);
    }
});

setupSlides();
