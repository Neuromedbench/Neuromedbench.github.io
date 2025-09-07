// NeuroMedBench - 导航和动画功能

// 初始化滚动动画
function initScrollReveal() {
    // 创建 Intersection Observer
    const observerOptions = {
        threshold: 0.1, // 当元素10%可见时触发
        rootMargin: '0px 0px -50px 0px' // 提前50px触发
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 元素进入视口，添加revealed类
                entry.target.classList.add('revealed');
                // 一次性动画，观察后就停止观察该元素
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // 为已经在视口内的元素立即添加revealed类（主要是首屏内容）
    revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            element.classList.add('revealed');
        }
    });
}

// 更新导航栏活跃状态
function updateActiveNavItem(targetId) {
    // 移除所有导航项的活跃状态
    document.querySelectorAll('nav a, #mobile-menu a').forEach(link => {
        link.classList.remove('text-primary', 'font-medium');
        link.classList.add('text-gray-300');
    });
    
    // 为当前目标添加活跃状态
    document.querySelectorAll(`a[href="${targetId}"]`).forEach(link => {
        link.classList.remove('text-gray-300');
        link.classList.add('text-primary', 'font-medium');
    });
}

// 滚动时更新导航栏活跃状态 - 重写逻辑
function updateActiveNavOnScroll() {
    const sections = [
        { id: '#ranking', element: document.querySelector('#ranking') },
        { id: '#datasets', element: document.querySelector('#datasets') },
        { id: '#papers', element: document.querySelector('#papers') },
        { id: '#about', element: document.querySelector('#about') }
    ];
    
    const headerHeight = document.querySelector('header').getBoundingClientRect().height;
    const scrollPosition = window.scrollY + headerHeight + 50; // 50px缓冲区
    
    let activeSection = '#ranking'; // 默认为第一个section
    
    // 从后往前检查，找到当前应该激活的section
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
            const sectionTop = section.element.offsetTop;
            if (scrollPosition >= sectionTop) {
                activeSection = section.id;
                break;
            }
        }
    }
    
    updateActiveNavItem(activeSection);
}
