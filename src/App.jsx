import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, EnvelopeSimple, List, Pause, Play, X } from "@phosphor-icons/react";

const showcaseItems = [
  { label: "CHARACTER STUDY", image: "/media/showcase/showcase-02.webp" },
  { label: "BEHAVIOR STUDY", image: "/media/showcase/showcase-05.webp" },
  { label: "WORLD BUILDING", image: "/media/showcase/showcase-07.webp" },
  { label: "MATERIAL STUDY", image: "/media/showcase/showcase-09.webp" },
  { label: "MOTION STUDY", image: "/media/showcase/showcase-10.webp" },
  { label: "STYLE SYSTEM", image: "/media/showcase/showcase-12.webp" },
  { label: "ILLUSTRATION", image: "/media/showcase/showcase-16.webp" },
  { label: "CHARACTER STUDY", image: "/media/showcase/showcase-19.webp" },
];

const methodology = [
  { number: "01", title: "定义行为", text: "把模糊需求拆成可以观察、比较和复现的行为目标。" },
  { number: "02", title: "构建评测", text: "设计数据、样例与检查维度，让每一次模型变化都有证据可循。" },
  { number: "03", title: "迭代对齐", text: "联动提示词、工具与工作流，持续缩短理想行为与实际输出的距离。" },
];

const toolPartners = [
  {
    name: "CLAUDE",
    role: "REASONING / CONTENT",
    description: "长文本理解、结构化思考与内容共创，让复杂问题被清晰地拆解与表达。",
    image: "/media/partners/claude.webp",
    accent: "#68aef7",
  },
  {
    name: "CODEX",
    role: "CODE / ENGINEERING",
    description: "代码理解、实现、调试与工程协作，把想法推进为可以运行和验证的结果。",
    image: "/media/partners/codex.webp",
    accent: "#68aef7",
  },
  {
    name: "DEEPSEEK",
    role: "REASONING / RESEARCH",
    description: "深度推理、问题拆解与知识探索，为训练任务提供更扎实的分析路径。",
    image: "/media/partners/deepseek.webp",
    accent: "#68aef7",
  },
  {
    name: "CURSOR",
    role: "EDIT / WORKFLOW",
    description: "上下文编程、快速编辑与流程衔接，让高频迭代保持轻快而连续。",
    image: "/media/partners/cursor.webp",
    accent: "#68aef7",
  },
];

const projectSlots = [
  {
    number: "01",
    type: "AI VIDEO / MOTION",
    title: "动态视觉实验 01",
    video: "/media/projects/project-video-01.mp4",
    poster: "/media/projects/project-video-01-poster.jpg",
    note: "人物动作与日常办公场景的动态生成实验。",
    focus: "多任务动作一致性",
    method: "动作拆解 / 道具交互 / 镜头稳定",
    watch: "手部、吸管与视线关系",
  },
  {
    number: "02",
    type: "AI VIDEO / CHARACTER",
    title: "动态视觉实验 02",
    video: "/media/projects/project-video-02.mp4",
    poster: "/media/projects/project-video-02-poster.jpg",
    note: "角色表情、材质与萌系动作的短片生成实验。",
    focus: "角色表情与材质稳定",
    method: "角色设定 / 表情节奏 / 动作约束",
    watch: "表情、体积与材质连续性",
  },
  {
    number: "03",
    type: "AI VIDEO / CINEMATIC",
    title: "动态视觉实验 03",
    video: "/media/projects/project-video-03.mp4",
    poster: "/media/projects/project-video-03-poster.jpg",
    note: "环绕镜头、氛围光影与古风场景的动态生成实验。",
    focus: "环绕镜头与氛围连续",
    method: "镜头路径 / 衣摆运动 / 光影控制",
    watch: "长发、长袍与空间关系",
  },
];

const navItems = [["关于", "about"], ["工作流", "capabilities"], ["项目", "projects"], ["联系", "contact"]];

function FloatingPillNavigation({ activeSection }) {
  const containerRef = useRef(null);
  const itemRefs = useRef(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const container = containerRef.current;
      const activeItem = itemRefs.current.get(activeSection);

      if (!container || !activeItem) {
        setIndicator((current) => ({ ...current, visible: false }));
        return;
      }

      setIndicator({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
        visible: true,
      });
    };

    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection]);

  return (
    <div className="nav__pill" ref={containerRef}>
      <span
        className={`nav__pill-indicator ${indicator.visible ? "is-visible" : ""}`}
        style={{ width: `${indicator.width}px`, transform: `translateX(${indicator.left}px)` }}
        aria-hidden="true"
      />
      {navItems.map(([label, id]) => (
        <a
          key={id}
          ref={(node) => {
            if (node) itemRefs.current.set(id, node);
            else itemRefs.current.delete(id);
          }}
          className={activeSection === id ? "is-active" : ""}
          href={`#${id}`}
          aria-current={activeSection === id ? "page" : undefined}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

function EyeFollowButton({ href, children }) {
  const eyeRefs = useRef([]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduceMotion.matches) return undefined;

    let animationFrame = 0;
    let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const renderEyes = () => {
      eyeRefs.current.forEach((eye) => {
        if (!eye) return;
        const pupil = eye.querySelector(".eye-button__pupil");
        const rect = eye.getBoundingClientRect();
        const dx = pointer.x - (rect.left + rect.width / 2);
        const dy = pointer.y - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        const pupilSize = pupil?.offsetWidth || 6;
        const limit = Math.max(0, (rect.width - pupilSize) * 0.39);
        const travel = Math.min(distance, limit);
        const x = (dx / distance) * travel;
        const y = (dy / distance) * travel;
        pupil?.style.setProperty("--eye-x", `${x.toFixed(2)}px`);
        pupil?.style.setProperty("--eye-y", `${y.toFixed(2)}px`);
      });
      animationFrame = 0;
    };

    const onPointerMove = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderEyes);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <a className="button button--solid eye-button" href={href}>
      <span>{children}</span>
      <span className="eye-button__eyes" aria-hidden="true">
        {[0, 1].map((index) => (
          <span className="eye-button__eye" key={index} ref={(node) => { eyeRefs.current[index] = node; }}>
            <span className="eye-button__pupil" />
          </span>
        ))}
      </span>
    </a>
  );
}

function SectionLabel({ number, children, light = false }) {
  return <div className={`section-label ${light ? "section-label--light" : ""}`}><span>{number}</span><span>{children}</span></div>;
}

function ProjectVideo({ src, poster, title }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!video || reduceMotion) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => setIsPlaying(false));
      } else {
        video.pause();
      }
    }, { threshold: 0.25 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setIsPlaying(false));
    else video.pause();
  };

  return (
    <>
      <img className="project-card__backdrop" src={poster} alt="" aria-hidden="true" />
      <video
        ref={videoRef}
        className="project-card__video"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${title}视频`}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button className="project-card__playback" type="button" onClick={togglePlayback} aria-label={isPlaying ? `暂停${title}` : `播放${title}`}>
        {isPlaying ? <Pause weight="fill" /> : <Play weight="fill" />}
      </button>
    </>
  );
}

function ToolPartnersSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const unlockTimer = useRef(null);
  const activePartner = toolPartners[activeIndex];

  useEffect(() => {
    toolPartners.forEach(({ image }) => {
      const preload = new Image();
      preload.src = image;
    });
    return () => window.clearTimeout(unlockTimer.current);
  }, []);

  const selectPartner = (nextIndex) => {
    if (isAnimating || nextIndex === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(nextIndex);
    window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(() => setIsAnimating(false), 650);
  };

  const navigate = (direction) => {
    const delta = direction === "next" ? 1 : -1;
    selectPartner((activeIndex + delta + toolPartners.length) % toolPartners.length);
  };

  const getRole = (index) => {
    const offset = (index - activeIndex + toolPartners.length) % toolPartners.length;
    if (offset === 0) return "center";
    if (offset === 1) return "left";
    if (offset === 2) return "right";
    return "back";
  };

  return (
    <section
      className="tool-partners section-dark"
      id="capabilities"
      style={{ "--partner-accent": activePartner.accent }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") navigate("prev");
        if (event.key === "ArrowRight") navigate("next");
      }}
    >
      <div className="section-frame">
        <div className="tool-partners__label section-label">
          <span className="tool-partners__label-main"><span>03</span><span>/</span><span>TOOL PARTNERS</span></span>
          <span>AI协作框架</span>
        </div>
        <div className="tool-partners__stage" data-reveal="stage" tabIndex="0" aria-label="工具伙伴轮播，使用左右方向键切换">
          <div className="tool-partners__ghost" aria-hidden="true"><span>TOOL</span><span>PARTNERS</span></div>

          <div className="tool-partners__figures" aria-live="polite">
            {toolPartners.map((partner, index) => {
              const role = getRole(index);
              return (
                <figure className={`tool-partners__figure tool-partners__figure--${role}`} key={partner.name} aria-hidden={role !== "center"}>
                  <img src={partner.image} alt={role === "center" ? `${partner.name} 3D角色` : ""} draggable="false" />
                </figure>
              );
            })}
          </div>

          <div className="tool-partners__info" key={activePartner.name} aria-live="polite">
            <div className="tool-partners__active-number"><span />{String(activeIndex + 1).padStart(2, "0")}</div>
            <h2>{activePartner.name}</h2>
            <span className="tool-partners__role">{activePartner.role}</span>
            <p>{activePartner.description}</p>
            <div className="tool-partners__index" aria-label="选择工具伙伴">
              {toolPartners.map((partner, index) => (
                <button
                  className={index === activeIndex ? "is-active" : ""}
                  type="button"
                  key={partner.name}
                  onClick={() => selectPartner(index)}
                  aria-label={`查看 ${partner.name}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          <div className="tool-partners__controls">
            <button type="button" onClick={() => navigate("prev")} disabled={isAnimating} aria-label="上一个工具伙伴"><ArrowLeft weight="light" /></button>
            <button type="button" onClick={() => navigate("next")} disabled={isAnimating} aria-label="下一个工具伙伴"><ArrowRight weight="light" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showcasePaused, setShowcasePaused] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean);
    let animationFrame = 0;

    const updateNavigation = () => {
      const marker = window.scrollY + window.innerHeight * 0.34;
      let currentSection = "";
      sections.forEach((section) => {
        if (section.offsetTop <= marker) currentSection = section.id;
      });
      setNavScrolled(window.scrollY > window.innerHeight * 0.7);
      setActiveSection(currentSection);
      animationFrame = 0;
    };

    const onScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateNavigation);
    };

    updateNavigation();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className="site-shell">
      <section className="hero" id="home">
        <video className="hero__video" src="/media/deep-space-geometry.mp4" poster="/media/deep-space-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className="hero__shade" />

        <nav className={`nav ${navScrolled ? "is-scrolled" : ""}`} aria-label="主导航">
          <a className="nav__brand" href="#home" aria-label="返回首页">
            <span className="nav__brand-mark">AT</span>
            <span className="nav__brand-copy">AI TRAINER<br />PERSONAL ARCHIVE</span>
          </a>
          <FloatingPillNavigation activeSection={activeSection} />
          <a className="nav__contact" href="#contact">建立联系 <ArrowUpRight weight="bold" /></a>
          <button className="nav__menu-button" type="button" aria-label="打开菜单" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><List weight="bold" /></button>
        </nav>

        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          <div className="mobile-menu__top"><span>AI TRAINER</span><button type="button" aria-label="关闭菜单" onClick={() => setMenuOpen(false)}><X weight="bold" /></button></div>
          <div className="mobile-menu__links">
            {navItems.map(([label, id], index) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} style={{ transitionDelay: menuOpen ? `${100 + index * 70}ms` : "0ms" }}><span>0{index + 1}</span>{label}</a>
            ))}
          </div>
        </div>

        <div className="hero__content">
          <div className="hero__eyebrow hero-animate hero-animate--1"><span className="status-dot" />PERSONAL AI PRACTICE · 2026</div>
          <h1 className="hero__title hero-animate hero-animate--2"><span>TRAIN.</span><span>ALIGN.</span><span>EVOLVE.</span></h1>
          <div className="hero__bottom hero-animate hero-animate--3">
            <p><span>我是AI训练师。</span>我把模糊需求转化为可验证的模型行为，通过数据设计、提示词实验与评测迭代，让AI更稳定，也更贴近真实使用场景。</p>
            <div className="hero__actions">
              <EyeFollowButton href="#projects">查看精选案例</EyeFollowButton>
              <a className="button button--ghost" href="#about">认识我</a>
            </div>
          </div>
        </div>

        <div className="hero__meta hero-animate hero-animate--4">
          <div><span>IDENTITY</span><strong>AI TRAINER</strong></div>
          <div><span>FOCUS</span><strong>MODEL × WORKFLOW</strong></div>
          <a href="#showcase"><span>SCROLL TO EXPLORE</span><ArrowDown /></a>
        </div>
      </section>

      <section className="showcase section-dark" id="showcase">
        <div className="section-frame showcase__intro" data-reveal="wipe">
          <SectionLabel number="01">PRACTICE INDEX</SectionLabel>
          <div className="showcase__intro-row">
            <p>从数据到行为，从一次生成到可持续的系统。</p>
            <button className="showcase__pause" type="button" onClick={() => setShowcasePaused((paused) => !paused)} aria-pressed={showcasePaused}>
              {showcasePaused ? <Play weight="fill" /> : <Pause weight="fill" />}<span>{showcasePaused ? "继续轮播" : "暂停轮播"}</span>
            </button>
          </div>
        </div>
        <div className={`marquee ${showcasePaused ? "is-paused" : ""}`} aria-label="精选AI视觉实验"><div className="marquee__track">
          {[0, 1].flatMap((setIndex) => showcaseItems.map((item, index) => (
            <article className="showcase-card" key={`${item.image}-${setIndex}`} aria-hidden={setIndex === 1 ? "true" : undefined}>
              <img src={item.image} alt={setIndex === 0 ? `AI视觉实验作品 ${String(index + 1).padStart(2, "0")}：${item.label}` : ""} loading="lazy" decoding="async" />
              <div className="showcase-card__overlay" /><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.label}</h3>
            </article>
          )))}
        </div></div>
      </section>

      <section className="about section-dark" id="about">
        <div className="section-frame about__grid">
          <div data-reveal="slide"><SectionLabel number="02">ABOUT THE PRACTICE</SectionLabel></div>
          <div className="about__copy" data-reveal="text">
            <p className="about__kicker">可靠，不是模型的默认状态。</p>
            <h2>我训练模型，<br />也设计人与AI协作的方式。</h2>
            <p className="about__body">我的工作从定义行为开始：设计数据与评测，验证提示词和工具链，再把有效方法沉淀为可复用的工作流。这个网站记录的，是这些判断如何一步步成为稳定的AI表现。</p>
            <div className="about__tags" aria-label="关注方向"><span>数据设计</span><span>行为对齐</span><span>模型评测</span><span>智能体工作流</span></div>
            <div className="about__method" aria-label="AI训练方法">
              {methodology.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}
            </div>
          </div>
        </div>
        <div className="about__statement" data-reveal="marquee" aria-hidden="true">HUMAN JUDGMENT × MACHINE INTELLIGENCE</div>
      </section>

      <ToolPartnersSection />

      <section className="projects section-dark" id="projects"><div className="section-frame">
        <div className="projects__heading" data-reveal="text"><SectionLabel number="04">SELECTED PROJECTS</SectionLabel><h2>项目档案</h2><p>三段AI动态视觉实验已进入档案；项目背景与方法将在后续素材补齐后继续完善。</p></div>
        <div className="project-stack">
          {projectSlots.map(({ number, type, title, video, poster, note, focus, method, watch }, index) => (
            <article className="project-card" data-reveal="project" key={number} style={{ top: `${96 + index * 22}px`, zIndex: index + 1, "--reveal-delay": `${index * 90}ms` }}>
              <div className="project-card__media"><ProjectVideo src={video} poster={poster} title={title} /><span>AI VIDEO STUDY</span></div>
              <div className="project-card__content"><div className="project-card__topline"><span>{number}</span><span>{type}</span></div><div><h3>{title}</h3><p>{note}</p><dl className="project-card__study-grid"><div><dt>实验重点</dt><dd>{focus}</dd></div><div><dt>方法</dt><dd>{method}</dd></div><div><dt>观察维度</dt><dd>{watch}</dd></div></dl></div><div className="project-card__footer"><span>VIDEO ARCHIVE</span><ArrowUpRight weight="light" /></div></div>
            </article>
          ))}
        </div>
      </div></section>

      <section className="contact section-dark" id="contact">
        <div className="section-frame contact__inner" data-reveal="contact"><SectionLabel number="05">CONTACT</SectionLabel><p className="contact__kicker">LET'S MAKE AI WORK BETTER.</p><h2>让好用的AI，<br />变得<span>可靠。</span></h2><div className="contact__bottom"><p>如果你正在搭建AI产品、评测模型表现，或优化智能体工作流，欢迎与我交流。正式联系入口将在下一版补充。</p><div className="contact__pending" aria-label="主要联系入口待补充"><EnvelopeSimple weight="light" /><span><small>主要联系入口</small><strong>邮箱 / 社交账号待补充</strong></span></div></div></div>
        <footer className="footer section-frame"><span>AI TRAINER · PERSONAL ARCHIVE</span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>
      </section>
    </main>
  );
}
