export default function heroSlider() {
  const d = document;

  const $mainImg = d.querySelector('.slide');
  const $thumbnails = d.querySelectorAll('.slider__thumb');

  let currentIndex = 0;
  let interval;

  const updateMainImg = (index) => {
    $mainImg.classList.remove('fade-in');

    // Add a nice fade effect in the transition between images
    setTimeout(() => {
      $mainImg.src = $thumbnails[index].src;
      $mainImg.classList.add('fade-in');
    }, 400);

    $thumbnails.forEach((thumb) => thumb.classList.remove('active'));
    $thumbnails[index].classList.add('active');
  };

  const StartAutoSlide = () => {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % $thumbnails.length;
      updateMainImg(currentIndex);
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(interval);
    StartAutoSlide();
  };

  // Add event listener for every thumbnail to change the main image
  $thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      currentIndex = index;
      updateMainImg(currentIndex);
      stopAutoSlide();
    });
  });

  updateMainImg(currentIndex);
  StartAutoSlide();
}
