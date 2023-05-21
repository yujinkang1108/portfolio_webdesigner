$(function(){ 
//로딩 페이지
/** 
 * load-page
 */
const loadCircle = '';
const loadPage = '';
const allPage = '';

abc = gsap.timeline({
  onComplete:function(){
    $('.load-page').remove();
  }
})
  abc
  .fromTo( '.load-page .circle', { scale: 1 }, { duration: 0.8, scale: 0.8, ease: "power1.inOut", yoyo: true, repeat: 3 } )
  .to( '.load-page', { duration: 1, opacity:0, ease: "power1.inOut" }, "-=1.5" )
  // .from( '.all-wrapper', { duration: 1.5, borderRadius: 30,scale: 0.95, ease: "power1.inOut" }, "-=1.5"  )

/**
   * 마우스 
   */
$('body').mousemove(function(e){
  xVal=e.clientX-15;
  yVal=e.clientY-15;
  // xVal=e.pageX;
  // console.log(xVal+'///'+yVal);

  gsap.to('.cursor-wrap',{
    x:xVal,
    y:yVal,
    stagger:0.01
  })
})

//nav
/** 
 * 열고 닫기
 */
const btnOpen = $('.header .btn-open');
const btnClose = $('.nav .btn-close');
const btnNav1= $('.nav .nav-item.about');
const btnNav2 = $('.nav .nav-item.project');
const btnNav3 = $('.nav .nav-item.contact');

btnOpen.on('click', () => {
  $('.nav').addClass('on')
  $('body').addClass('scale');
  // allMotion.play();
});
btnClose.on('click', () => {
  $('.nav').removeClass('on')
});

/**
 * nav-item 클릭시 해당 섹션으로 이동 
 */
projectPos = $('.sc-project').offset().top;
aboutPos = $('.sc-visual').offset().top;
contactPos = $('.sc-contact').offset().top;

$(btnNav1).click(function(e){
  e.preventDefault();
  gsap.to(window, {duration: 2, scrollTo:".sc-visual"});
})
$(btnNav2).click(function(e){
  e.preventDefault();
  gsap.to(window, {duration: 2, scrollTo:".sc-project"});
})
$(btnNav3).click(function(e){
  e.preventDefault();
  gsap.to(window, {duration: 2, scrollTo:".sc-contact"});
})

/**
 * nav-item 호버시 언더라인 스타일
 */
$('.nav .nav-item').hover(function(){
  $('.nav-item a').addClass('on')
},function(){
  $('.nav-item a').removeClass('on')
})

//헤더
/**
 * header eyeball
 */
document.querySelector('body').addEventListener('mousemove',eyeball);

function eyeball(){
 const eye = document.querySelectorAll('.eye');
 eye.forEach(function(eye){
   let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
   let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);

   let radian = Math.atan2(event.screenX - x,event.screenY - y);   let rotation = (radian * (180 / Math.PI) * -1) + 270;
   eye.style.transform = "rotate("+rotation+"deg)"
 });
}


 //헤더
/**
 * header link-contact
 */
 scaleMotion = gsap.to('.link-contact .circle',.4,{
  scaleX:10,
  paused:true,
})

$('.link-contact').mouseenter(function(e){
  $('.link-contact').addClass('on')
  // width = $(this).width();
  gsap.set('.link-contact .circle',{
    x:e.offsetX,
  })
  scaleMotion.restart()
})

$('.link-contact').mouseleave(function(e){
  $('.link-contact').removeClass('on')
  scaleMotion.reverse()
})


//메인
/**
 * sc-project
 * .group-headline
 */
gsap.to(".sc-project .headline.second", {
  scrollTrigger: {
    trigger: ".head-wrap",
    start: "0% 40%",
    end: "150% 100%",
    scrub: 2,
    // markers:true,
  },
  xPercent:2,
  yPercent:4,
  opacity:1
});
gsap.to(".sc-project .headline.third", {
  scrollTrigger: {
    trigger: ".head-wrap",
    start: "0% 40%",
    end: "150% 100%",
    scrub: 2,
    // markers:true,
  },
  xPercent:4,
  yPercent:6,
  opacity:1
});

/**
 * .group-parallax
 */
document.addEventListener("mousemove",parallax);
function parallax(e){
  this.querySelectorAll('.layer').forEach(layer => {
    const speed = layer.getAttribute('data-speed')

    const xspeed = (window.innerWidth - e.pageX*speed)/100
    const yspeed = (window.innerHeight - e.pageY*speed)/100

    layer.style.transform = `translateX(${xspeed}px) translateY(${yspeed}px)`
  })
}

/**
 * .sc-intro 스크롤버튼
 */
//btn-scroll
$('.sc-intro .btn-scroll').hover(function(){
  $('.icon.white').addClass('on')
},function(){
  $('.icon.white').removeClass('on')
})

projectPos = $('.sc-project').offset().top;

$('.btn-scroll').click(function(){
  window.scrollTo({top:projectPos,behavior:"smooth"})
})

/**
 * .sc-contact 가로스크롤
 * .group-row-scroll
 */
rowWidth = $('.group-row-scroll').outerWidth(); //1200

$(window).resize(function(){
  rowWidth = $('.group-row-scroll').outerWidth(); //1200

  console.log(rowWidth);
})

const scrollRow = gsap.timeline({
  scrollTrigger: {
    trigger:".group-row-scroll",
    pin:true,
    end:"+=500%",
    scrub:0,
    invalidateOnRefresh: true,
    // markers:true,
  },
}) 
scrollRow
.to('.sc-visual .group-row-scroll .row-wrapper', {
    xPercent:-100,
    x:()=>{
      return (window.innerWidth*75/100);
    },
    ease: "none",
})


gsap.from(".sc-visual .ic-list .ic-item", {
  scrollTrigger: {
    trigger: ".banner-area",
    containerAnimation: scrollRow,
    start: "0% 100%",
    end: "100% 80%",
    scrub: true,
    // markers:true,
  },
  yPercent:100,
  opacity:0,
  stagger:0.1
});

//.group-row-scroll .info-area .desc
gsap.to(".group-row-scroll .info-area .desc", {
  scrollTrigger: {
    trigger: ".sc-visual .info-area",
    containerAnimation: scrollRow,
    start: "0% 25%",
    end: "70% 100%",
    scrub: true,
    // markers:true,
  },
  x:1000,
});

/**
 * .sc-contact 가로스크롤
 * .box-area
 */
const handleOnMouseMove = e => {
  const{ currentTarget : target } = e;

  const rect = target.getBoundingClientRect(),
  x = e.clientX - rect.left,
  y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
}

const cards = document.querySelectorAll(".card")

for(const card of cards){
  card.addEventListener ("mousemove", e =>handleOnMouseMove(e));
}
console.log(cards.length);


  



}) //지우지말것