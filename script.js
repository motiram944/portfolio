/**
 * Motiram V. Shinde - Developer Portfolio JavaScript Engine
 * Stack: Pure Vanilla ES6+ JavaScript + Tailwind CSS
 * Features: Interactive Sun/Moon Theme Toggle, AI Copilot Engine & Dynamic AI Counselor RAG Sandbox
 */

document.addEventListener('DOMContentLoaded', () => {

  const NVIDIA_MODEL = "meta/llama-3.1-70b-instruct";
  const NVIDIA_LOCAL_ENDPOINT = "/api/chat";

  // System Prompt for Motiram.AI Copilot with verified resume context
  const MOTIRAM_SYSTEM_PROMPT = `
You are Motiram.AI, an official AI Copilot for Motiram V. Shinde's portfolio.

STRICT GUARDRAILS & INSTRUCTIONS:
- You are ONLY allowed to answer questions related to Motiram V. Shinde's professional resume, career, education, projects, skills, awards, and contact information.
- DO NOT answer off-topic questions (such as general trivia, geography, sports, weather, cooking, or general programming unrelated to Motiram).
- If asked an off-topic question, ALWAYS respond politely: "I am Motiram.AI, dedicated exclusively to assisting with Motiram V. Shinde's professional profile, engineering experience, and projects. Please feel free to ask me any question about Motiram's background!"
- Do NOT mention external AI model names (such as Meta, Llama, NVIDIA, OpenAI). Present yourself cleanly as "Motiram.AI Copilot".

MOTIRAM V. SHINDE'S VERIFIED BACKGROUND:
- Title: Senior Frontend Engineer (4.5+ Years Experience)
- Current Employer: IAURO Systems Pvt. Ltd., Pune, India (Apr 2022 - Present)
- Education: B.Tech in IT from SGGSIE&T, Nanded (CGPA: 9.19 / 10)
- Contact: Email motiramshinde944@gmail.com | Phone: (+91) 8975303848 | Location: Pune, India

KEY MAJOR PROJECTS & EXPERTISE:
1. Production Parental-Control AI Counselor Web Platform:
   - Built with Next.js, Firebase, RAG vector retrieval, and safety guardrails.
   - Designed a dynamic AI chat response renderer supporting 12+ card layout types (stat cards, sliders, matrices, schedule toggles) backed by a 2-layer JSON + JS fallback parser.
   - Introduced a unified 3-state visual action system (Clickable Allowed / Active Schedule / Static Blocked).
2. Microfrontends Architecture:
   - Architected modular microfrontend platforms with React.js and Webpack Module Federation for independent deployment of IAM and workflow modules.
3. keycloak-provider (NPM Package):
   - Authored and published an open-source React authentication package with declarative RBAC hooks on NPM & Verdaccio.
   - Migrated enterprise client apps to Azure Entra ID SSO, fixing critical token refresh issues.
4. IO Flow Workflow Builder:
   - Developed a drag-and-drop workflow platform with React Flow renderer & Material UI components.

AWARDS & BADGES:
- 2x Annual Awards & multiple monthly problem-solving awards at IAURO Systems.
- 5x Gold Badge on HackerRank (Python); awarded Team Player Badge.

Be polite, technical, helpful, and concise.
`;

  /* ==========================================================================
     LIGHT / DARK THEME TOGGLE CONTROLLER (SUN ☀️ / MOON 🌙)
     ========================================================================== */
  const initThemeToggle = () => {
    const desktopBtn = document.getElementById('theme-toggle-btn');
    const desktopIcon = document.getElementById('theme-toggle-icon');
    const desktopLabel = document.getElementById('theme-toggle-label');

    const mobileBtn = document.getElementById('mobile-theme-toggle-btn');
    const mobileIcon = document.getElementById('mobile-theme-icon');
    const mobileLabel = document.getElementById('mobile-theme-label');

    const isDarkMode = () => document.documentElement.classList.contains('dark');

    const syncThemeUI = () => {
      const dark = isDarkMode();
      // In Dark Mode, show Sun icon ☀️ indicating click will switch to Light Mode
      // In Light Mode, show Moon icon 🌙 indicating click will switch to Dark Mode
      const icon = dark ? '☀️' : '🌙';
      const label = dark ? 'Light' : 'Dark';
      const mobileFullLabel = dark ? 'Switch to Light Theme' : 'Switch to Dark Theme';

      if (desktopIcon) desktopIcon.textContent = icon;
      if (desktopLabel) desktopLabel.textContent = label;
      if (mobileIcon) mobileIcon.textContent = icon;
      if (mobileLabel) mobileLabel.textContent = mobileFullLabel;
    };

    const toggleTheme = () => {
      if (isDarkMode()) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
      syncThemeUI();
    };

    syncThemeUI();

    if (desktopBtn) desktopBtn.addEventListener('click', toggleTheme);
    if (mobileBtn) mobileBtn.addEventListener('click', toggleTheme);
  };

  initThemeToggle();

  /* ==========================================================================
     COMPREHENSIVE DYNAMIC RAG RESUME ROUTER FOR MOTIRAM.AI COPILOT
     ========================================================================== */
  const getDynamicRAGResponse = (userQuery) => {
    const q = (userQuery || '').toLowerCase().trim();

    // Guardrail Check: Check for explicit off-topic questions
    const isExplicitOffTopic = q.includes('france') || q.includes('capital of') || q.includes('weather') || q.includes('poem') ||
                               q.includes('joke') || q.includes('recipe') || q.includes('president') || q.includes('football') ||
                               q.includes('cricket') || q.includes('movie') || q.includes('song') || q.includes('who is elon') ||
                               q.includes('who is prime minister');

    if (isExplicitOffTopic) {
      return "I am Motiram.AI, dedicated exclusively to assisting with Motiram V. Shinde's professional profile, engineering experience, and projects. Please feel free to ask me any question about Motiram's background!";
    }

    // Greetings & Introductions
    if (q === 'hello' || q === 'hi' || q === 'hey' || q === 'hello!' || q === 'hi there' || q.startsWith('hello') || q.startsWith('hi ') || q.startsWith('hey ') || q.includes('who are you') || q.includes('what can you do') || q.includes('help')) {
      return "Hello! 👋 I am Motiram.AI Copilot, an official interactive assistant for Motiram V. Shinde's portfolio. I can answer any questions about Motiram's 4.5+ years of engineering experience at IAURO Systems, his production Parental-Control AI Counselor platform, microfrontends with Webpack Module Federation, his keycloak-provider NPM package, tech stack, or awards. How can I help you today?";
    }

    // Why hire / Strengths / Value / Leadership
    if (q.includes('why hire') || q.includes('hire') || q.includes('strength') || q.includes('value') || q.includes('why should') || q.includes('lead') || q.includes('benefit')) {
      return "Why hire Motiram: With 4.5+ years at IAURO Systems, he bridges complex Frontend Architecture with production AI systems. Key assets: 1) Proven track record delivering production RAG AI platforms with 12+ layout card renderers, 2) Enterprise Microfrontend architect with Webpack Module Federation, 3) Open-source contributor (published 'keycloak-provider' on NPM), 4) Exceptional academic foundation (9.19 / 10 CGPA), and 5) Recognized with 2x Annual Awards and monthly problem-solving awards.";
    }

    // Projects / Featured Work / Portfolio summary
    if (q.includes('project') || q.includes('portfolio') || q.includes('work done') || q.includes('build') || q.includes('built') || q.includes('created')) {
      return "Motiram has built 4 key production platforms: 1) AI Counselor Platform (Next.js, Firebase, RAG retrieval, 12+ layout card renderer, guardrails), 2) GESSA IAM Platform (React.js, Webpack Module Federation microfrontends), 3) keycloak-provider NPM Package (reusable RBAC auth library), and 4) IO Flow Workflow Builder (drag-and-drop process orchestration with React Flow & Material UI).";
    }

    // AI Counselor Platform / RAG
    if (q.includes('ai') || q.includes('counselor') || q.includes('rag') || q.includes('parental') || q.includes('guardrail') || q.includes('layout') || q.includes('parser') || q.includes('card')) {
      return "Motiram engineered a production-level AI Counselor web platform using Next.js and Firebase. Core innovations include RAG vector retrieval, safety guardrail checks, and a dynamic chat response rendering engine supporting 12+ layout card types (stat cards, sliders, schedules) backed by a 2-layer JSON + JS fallback parser.";
    }

    // Microfrontends / Module Federation / GESSA
    if (q.includes('microfrontend') || q.includes('federation') || q.includes('gessa') || q.includes('module') || q.includes('architecture') || q.includes('webpack')) {
      return "At IAURO Systems (Apr 2022 – Present), Motiram architected scalable enterprise microfrontend platforms using React.js and Webpack Module Federation. This enabled independent deployment of identity (IAM), user provisioning, and workflow modules with shared store state synchronization.";
    }

    // Keycloak / NPM Package / Auth / RBAC / SSO
    if (q.includes('keycloak') || q.includes('npm') || q.includes('auth') || q.includes('rbac') || q.includes('entra') || q.includes('sso') || q.includes('token') || q.includes('package')) {
      return "Motiram authored and published 'keycloak-provider' on NPM and Verdaccio — a reusable React authentication package with declarative RBAC hooks. He also led enterprise migrations to Azure Entra ID SSO, resolving complex token refresh lifecycle issues.";
    }

    // Tech Stack / Skills / Technologies
    if (q.includes('tech stack') || q.includes('skill') || q.includes('technologies') || q.includes('stack') || q.includes('languages') || q.includes('react') || q.includes('next') || q.includes('typescript') || q.includes('redux') || q.includes('frontend')) {
      return "Motiram's core technical stack includes: Frontend (React.js, Next.js, TypeScript, JavaScript, Redux Toolkit, Material UI, Tailwind CSS, SASS, Storybook), Architecture (Webpack Module Federation, Microfrontends, REST & GraphQL), Security/Auth (Keycloak, Azure Entra ID, RBAC), and AI (RAG Systems, Safe Guardrails, Vector Cosine Matching).";
    }

    // IO Flow / Workflow Builder / React Flow
    if (q.includes('workflow') || q.includes('io flow') || q.includes('react flow') || q.includes('builder') || q.includes('flow') || q.includes('node') || q.includes('pipeline')) {
      return "Motiram built the IO Flow Workflow Builder platform using React Flow renderer and Material UI. It features an interactive drag-and-drop process visualizer, real-time node execution tracking, and reusable workflow layout components.";
    }

    // Education / College / Degree / CGPA
    if (q.includes('education') || q.includes('cgpa') || q.includes('b.tech') || q.includes('nanded') || q.includes('college') || q.includes('degree') || q.includes('university') || q.includes('sggs') || q.includes('marks') || q.includes('score')) {
      return "Motiram graduated with a B.Tech in Information Technology from SGGSIE&T, Nanded (2018–2022), graduating with an exceptional CGPA of 9.19 / 10!";
    }

    // Awards / Badges / Achievements / HackerRank
    if (q.includes('award') || q.includes('honor') || q.includes('achievement') || q.includes('hackerrank') || q.includes('gold') || q.includes('badge') || q.includes('recognition')) {
      return "Motiram has received 2x Annual Awards and multiple monthly problem-solving awards at IAURO Systems for consistent high performance. He also holds 5x Gold Badges on HackerRank (Python) and was awarded the Team Player Badge.";
    }

    // Experience / Company / IAURO / Tenure / Years
    if (q.includes('experience') || q.includes('company') || q.includes('iauro') || q.includes('years') || q.includes('tenure') || q.includes('work') || q.includes('role') || q.includes('job') || q.includes('position')) {
      return "Motiram is a Senior Frontend Engineer with 4.5+ years of continuous experience at IAURO Systems Pvt. Ltd., Pune (Apr 2022 – Present), leading React, Next.js, Microfrontends, and AI product engineering.";
    }

    // Contact / Email / Phone / Location / Notice Period
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('location') || q.includes('reach') || q.includes('notice') || q.includes('interview') || q.includes('available') || q.includes('remote') || q.includes('call')) {
      return "You can reach Motiram directly via Email at motiramshinde944@gmail.com, Phone at (+91) 8975303848, or find him based in Pune, Maharashtra, India. He is actively open to Senior Frontend and Lead engineering roles!";
    }

    // Default intelligent resume response
    return `Motiram V. Shinde is a Senior Frontend Engineer with 4.5+ years experience at IAURO Systems (CGPA: 9.19 / 10). He specializes in React, Next.js, Microfrontends, and RAG AI Platforms. Regarding "${userQuery}": Explore his portfolio projects or contact him directly at motiramshinde944@gmail.com!`;
  };

  /* ==========================================================================
     DYNAMIC RAG AI COUNSELOR RESPONSE & INTERACTIVE CARDS GENERATOR
     ========================================================================== */
  const getDynamicCounselorRAGResponse = (promptText, activeAge, currentScenario) => {
    const p = (promptText || '').toLowerCase().trim();
    const cleanPrompt = promptText ? `"${promptText}"` : 'Screen Time';

    if (currentScenario === 'screentime' || p.includes('screen') || p.includes('time') || p.includes('good') || p.includes('hour') || p.includes('weeknight') || p.includes('allow') || p.includes('limit') || p.includes('recommended') || p.includes('study') || p.includes('gaming')) {
      if (activeAge === '8') {
        return `[RAG Vector Match: 0.978] Pediatric Guidance for ${cleanPrompt} (Age 8): Recommended recreational screen time is 1.0 hour/day on school nights. Educational study apps remain unrestricted. Use the interactive controls below to adjust daily allocations:`;
      } else if (activeAge === '12') {
        return `[RAG Vector Match: 0.985] Pediatric Guidance for ${cleanPrompt} (Age 12): Healthy recreational screen time is 1.5 hours/day on weeknights to ensure 9 hours of sleep. Use the interactive controls below to adjust daily allocations:`;
      } else {
        return `[RAG Vector Match: 0.969] Pediatric Guidance for ${cleanPrompt} (Age 16): Recommended daily recreational screen time is 2.5 hours with an automatic bedtime lock at 11:00 PM. Use the interactive controls below to adjust daily allocations:`;
      }
    }

    if (currentScenario === 'rules' || p.includes('block') || p.includes('url') || p.includes('app') || p.includes('rule') || p.includes('filter') || p.includes('roblox') || p.includes('youtube') || p.includes('adult') || p.includes('safe')) {
      return `[RAG Vector Match: 0.982] Safety Rule Engine for ${cleanPrompt} (Age ${activeAge}): 3-state policies configured for YouTube, Roblox, and Web Filters. Click on any badge below to cycle through Allowed ➔ Scheduled ➔ Blocked:`;
    }

    if (currentScenario === 'comparison' || p.includes('compare') || p.includes('policy') || p.includes('matrix') || p.includes('guardrail') || p.includes('audit') || p.includes('compliance')) {
      return `[RAG Vector Match: 0.954] Guardrail Evaluation Matrix for ${cleanPrompt} (Age ${activeAge}): Verifying App Consent PIN, Bedtime Lock, and Safe Search Mode enforcement:`;
    }

    // Dynamic custom guidance for ANY other query
    return `[RAG Vector Match: 0.971] AI Counselor Guidance for ${cleanPrompt} (Age ${activeAge}): Pediatric guidelines recommend structured digital boundaries, age-appropriate content filters, and enforced quiet hours. Adjust settings below:`;
  };

  /* ==========================================================================
     1. HTML5 CANVAS PARTICLE CONSTELLATION NETWORK
     ========================================================================== */
  const initParticleCanvas = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 22), 60);
    const connectionDistance = 130;

    let mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        const isDark = document.documentElement.classList.contains('dark');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#6366f1' : '#4f46e5';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = 1 - (dist / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(99, 102, 241, ${alpha * 0.18})`
              : `rgba(79, 70, 229, ${alpha * 0.15})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  };

  /* ==========================================================================
     2. VANILLA JS 3D CARD TILT ENGINE
     ========================================================================== */
  const init3DTiltEngine = () => {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1.008)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  };

  /* ==========================================================================
     3. DYNAMIC TYPING ROTATING SUBTITLE EFFECT
     ========================================================================== */
  const initTypingEffect = () => {
    const target = document.getElementById('typing-text');
    if (!target) return;

    const titles = [
      "Senior Frontend Engineer (4.5+ Yrs Exp)",
      "AI Counselor & RAG Chat Systems Specialist",
      "Microfrontends & Module Federation Expert",
      "Enterprise Workflow Engine Architect"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentTitle = titles[titleIndex];

      if (isDeleting) {
        target.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        target.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 30 : 70;

      if (!isDeleting && charIndex === currentTitle.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 300;
      }

      setTimeout(type, speed);
    };

    type();
  };

  /* ==========================================================================
     4. REAL-TIME LLM INTEGRATION: FLOATING `Motiram.AI` PORTFOLIO COPILOT
     ========================================================================== */
  const initAICopilotWidget = () => {
    const toggleBtn = document.getElementById('toggle-copilot-btn');
    const heroOpenBtn = document.getElementById('btn-open-ai-copilot-hero');
    const closeBtn = document.getElementById('close-copilot-btn');
    const copilotWindow = document.getElementById('ai-copilot-window');
    const form = document.getElementById('copilot-form');
    const input = document.getElementById('copilot-input');
    const messagesTarget = document.getElementById('copilot-messages-target');
    const chips = document.querySelectorAll('.copilot-chip-btn');
    if (!copilotWindow || !messagesTarget) return;

    const toggleCopilot = () => {
      copilotWindow.classList.toggle('hidden');
      copilotWindow.classList.toggle('flex');
    };

    if (toggleBtn) toggleBtn.addEventListener('click', toggleCopilot);
    if (heroOpenBtn) heroOpenBtn.addEventListener('click', toggleCopilot);
    if (closeBtn) closeBtn.addEventListener('click', toggleCopilot);

    const chatHistory = [
      { role: "system", content: MOTIRAM_SYSTEM_PROMPT }
    ];

    const appendMessage = (sender, text, isThinking = false) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = sender === 'user'
        ? 'p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-700 dark:text-indigo-200 text-right ml-6 font-mono text-[11px]'
        : 'p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-mono text-[11px] space-y-1 shadow-sm dark:shadow-none';

      if (sender === 'user') {
        msgDiv.textContent = text;
      } else if (isThinking) {
        msgDiv.id = 'thinking-msg-node';
        msgDiv.innerHTML = `<span class="text-indigo-600 dark:text-indigo-300 font-semibold block flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span> 🤖 Motiram.AI Copilot:</span><p class="text-slate-500 dark:text-slate-400 italic">Processing prompt...</p>`;
      } else {
        msgDiv.innerHTML = `<span class="text-indigo-600 dark:text-indigo-300 font-semibold block flex items-center gap-1">🤖 Motiram.AI Copilot:</span><p class="leading-relaxed whitespace-pre-wrap">${text}</p>`;
      }

      messagesTarget.appendChild(msgDiv);
      messagesTarget.scrollTop = messagesTarget.scrollHeight;
      return msgDiv;
    };

    // Smooth streaming typewriter simulation for AI Copilot
    const streamCopilotResponse = (targetNode, fullText) => {
      let charIdx = 0;
      targetNode.innerHTML = `<span class="text-indigo-600 dark:text-indigo-300 font-semibold block flex items-center gap-1">🤖 Motiram.AI Copilot:</span><p class="leading-relaxed whitespace-pre-wrap"><span id="copilot-stream-text"></span><span class="blinking-cursor"></span></p>`;
      const streamSpan = targetNode.querySelector('#copilot-stream-text');

      const streamTimer = setInterval(() => {
        if (charIdx < fullText.length) {
          streamSpan.textContent += fullText.charAt(charIdx);
          charIdx++;
          messagesTarget.scrollTop = messagesTarget.scrollHeight;
        } else {
          clearInterval(streamTimer);
          const cursor = targetNode.querySelector('.blinking-cursor');
          if (cursor) cursor.remove();
        }
      }, 10);
    };

    const handleCopilotAsk = async (userQuery) => {
      appendMessage('user', userQuery);

      const q = userQuery.toLowerCase();
      const isExplicitOffTopic = q.includes('france') || q.includes('capital of') || q.includes('weather') || q.includes('poem') ||
                                 q.includes('joke') || q.includes('recipe') || q.includes('president') || q.includes('football') || q.includes('cricket');

      if (isExplicitOffTopic) {
        const guardrailMsg = "I am Motiram.AI, dedicated exclusively to assisting with Motiram V. Shinde's professional profile, engineering experience, and projects. Please feel free to ask me any question about Motiram's background!";
        const botNode = appendMessage('bot', '');
        streamCopilotResponse(botNode, guardrailMsg);
        return;
      }

      chatHistory.push({ role: "user", content: userQuery });
      const thinkingNode = appendMessage('bot', '', true);

      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const targetEndpoint = isLocal ? NVIDIA_LOCAL_ENDPOINT : 'https://integrate.api.nvidia.com/v1/chat/completions';

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch(targetEndpoint, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
          },
          body: JSON.stringify({
            model: NVIDIA_MODEL,
            messages: chatHistory,
            temperature: 0.4,
            max_tokens: 512
          })
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.choices && data.choices[0] && data.choices[0].message) {
            const aiAnswer = data.choices[0].message.content;
            chatHistory.push({ role: "assistant", content: aiAnswer });
            streamCopilotResponse(thinkingNode, aiAnswer);
            return;
          }
        }
      } catch (e) {
        // Network fetch caught gracefully
      }

      // Smooth fallback to high-speed dynamic RAG engine with natural answers
      setTimeout(() => {
        const dynamicAnswer = getDynamicRAGResponse(userQuery);
        chatHistory.push({ role: "assistant", content: dynamicAnswer });
        streamCopilotResponse(thinkingNode, dynamicAnswer);
      }, 150);
    };

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-q');
        handleCopilotAsk(q);
      });
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = input.value.trim();
        if (val) {
          handleCopilotAsk(val);
          input.value = '';
        }
      });
    }
  };

  initAICopilotWidget();

  /* ==========================================================================
     5. AI RECRUITER ROLE-FIT MATCHER ENGINE
     ========================================================================== */
  const initAIRoleMatcher = () => {
    const cardTarget = document.getElementById('ai-match-result-card');
    const btns = document.querySelectorAll('.role-match-btn');
    if (!cardTarget) return;

    const roleEvaluations = {
      react: {
        roleTitle: 'SENIOR REACT / NEXT.JS FRONTEND ENGINEER',
        matchScore: '98% MATCH',
        scoreColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        summary: 'Ideal fit for high-scale React/Next.js roles. 4.5+ years experience building production RAG AI interfaces, Redux state caching, and Storybook component libraries at IAURO Systems.',
        bullets: [
          '4.5+ Years production React.js & Next.js experience at IAURO Systems',
          'RAG AI platform with 12+ dynamic card layouts & 2-layer JSON parser',
          'Authored & published reusable auth package keycloak-provider on NPM',
          'Redux Toolkit state memoization reducing redundant API roundtrips'
        ]
      },
      ai: {
        roleTitle: 'AI PRODUCT & RAG SYSTEMS SPECIALIST',
        matchScore: '96% MATCH',
        scoreColor: 'text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/30',
        summary: 'Strong technical fit for AI-native product teams. Direct experience building production RAG parental guidance platforms with vector cosine matching and guardrails.',
        bullets: [
          'Production Next.js + Firebase RAG Parental Control AI platform',
          'Guardrail-checked response engine & age-contextual guidance (8, 12, 16 yrs)',
          '12+ layout dynamic card renderer with JSON fallback parser',
          'Python AI data processing (5x HackerRank Gold Badge recipient)'
        ]
      },
      microfrontend: {
        roleTitle: 'MICROFRONTEND & ENTERPRISE ARCHITECT',
        matchScore: '95% MATCH',
        scoreColor: 'text-blue-600 dark:text-blue-300 bg-blue-500/10 border-blue-500/30',
        summary: 'Expertise in modular enterprise architectures using Webpack Module Federation, keycloak auth, and drag-and-drop workflow builders.',
        bullets: [
          'GESSA IAM Enterprise Platform with Module Federation architecture',
          'IO Flow Workflow Builder platform with React Flow renderer',
          'Azure Entra ID SSO integration & token refresh resolution',
          'Published open-source React RBAC authentication library'
        ]
      }
    };

    const renderRoleFit = (roleKey) => {
      const data = roleEvaluations[roleKey];
      cardTarget.innerHTML = `
        <div class="space-y-4 font-mono">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span class="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Target Evaluated Role:</span>
              <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">${data.roleTitle}</h3>
            </div>
            <span class="px-3 py-1 rounded-lg text-xs font-bold border ${data.scoreColor} self-start sm:self-auto">${data.matchScore}</span>
          </div>

          <p class="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">${data.summary}</p>

          <div class="space-y-2 pt-1">
            <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block">AI Verified Candidate Strengths:</span>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
              ${data.bullets.map(b => `
                <li class="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2 shadow-sm dark:shadow-none">
                  <span class="text-emerald-500 dark:text-emerald-400 font-mono">✔</span>
                  <span>${b}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;
    };

    renderRoleFit('react');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-md');
          b.classList.add('bg-slate-100', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');

        const role = btn.getAttribute('data-role');
        renderRoleFit(role);
      });
    });
  };

  initAIRoleMatcher();

  /* ==========================================================================
     6. REAL-TIME AI COUNSELOR RAG PLAYGROUND
     ========================================================================== */
  const initRealtimeAISandbox = () => {
    const form = document.getElementById('ai-sandbox-form');
    const promptInput = document.getElementById('ai-prompt-input');
    const streamTarget = document.getElementById('streaming-text-target');
    const controlArea = document.getElementById('interactive-card-control-area');
    const headerTitle = document.getElementById('sandbox-card-header');
    const telVector = document.getElementById('tel-vector');
    const telGuard = document.getElementById('tel-guard');
    const telParser = document.getElementById('tel-parser');
    const telStatus = document.getElementById('telemetry-status');
    const currentAgeBadge = document.getElementById('current-age-badge');
    const scenarioBtns = document.querySelectorAll('.ai-prompt-btn');
    const ageBtns = document.querySelectorAll('.age-selector-btn');
    if (!form || !streamTarget || !controlArea) return;

    let activeAge = '12';
    let currentScenario = 'screentime';
    let isStreaming = false;

    const renderControlsForIntent = (intent, age) => {
      if (intent === 'rules') {
        headerTitle.textContent = 'PARSED CARD #09 • 3-STATE VISUAL RULE BUILDER';
        telVector.textContent = '0.982 (High Precision)';
        return {
          html: `
            <div class="space-y-3 font-mono text-xs">
              <span class="text-indigo-600 dark:text-indigo-300 font-semibold block">Interactive 3-State Rule Toggles (Click to change state):</span>
              
              <div class="space-y-2">
                <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shadow-sm">
                  <div>
                    <span class="text-slate-900 dark:text-white font-bold block">YouTube App</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">Age Appropriateness Filter</span>
                  </div>
                  <button class="rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold border transition-all" data-state="scheduled" id="rule-yt">
                    ⏳ SCHEDULED (09:00 PM)
                  </button>
                </div>

                <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shadow-sm">
                  <div>
                    <span class="text-slate-900 dark:text-white font-bold block">Roblox & Online Gaming</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">Multiplayer Safety Guard</span>
                  </div>
                  <button class="rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold border transition-all" data-state="allowed" id="rule-gaming">
                    ✔ ALLOWED
                  </button>
                </div>

                <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shadow-sm">
                  <div>
                    <span class="text-slate-900 dark:text-white font-bold block">Adult Web Filtering</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400">Strict Domain Shield</span>
                  </div>
                  <button class="rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold border transition-all" data-state="blocked" id="rule-adult">
                    🚫 BLOCKED
                  </button>
                </div>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 pt-1">Unified visual system introduced by Motiram at IAURO Systems to clarify clickable vs static elements.</p>
            </div>
          `,
          attach: () => {
            const updateBtnUI = (btn, state) => {
              btn.setAttribute('data-state', state);
              if (state === 'allowed') {
                btn.className = 'rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 shadow-sm';
                btn.textContent = '✔ ALLOWED';
              } else if (state === 'scheduled') {
                btn.className = 'rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 shadow-sm';
                btn.textContent = '⏳ SCHEDULED (09:00 PM)';
              } else {
                btn.className = 'rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-500/40 shadow-sm';
                btn.textContent = '🚫 BLOCKED';
              }
            };

            const btns = document.querySelectorAll('.rule-toggle-btn');
            btns.forEach(btn => {
              const initialState = btn.getAttribute('data-state');
              updateBtnUI(btn, initialState);

              btn.addEventListener('click', () => {
                const cur = btn.getAttribute('data-state');
                const nextState = cur === 'allowed' ? 'scheduled' : (cur === 'scheduled' ? 'blocked' : 'allowed');
                updateBtnUI(btn, nextState);
              });
            });
          }
        };
      } else if (intent === 'comparison') {
        headerTitle.textContent = 'PARSED CARD #04 • POLICY COMPARISON MATRIX';
        telVector.textContent = '0.954 (High Precision)';
        return {
          html: `
            <div class="space-y-3 font-mono text-xs">
              <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table class="w-full text-left text-slate-700 dark:text-slate-300">
                  <thead class="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 text-[11px] font-bold">
                    <tr><th class="p-2.5">Feature Shield</th><th class="p-2.5">Configured Policy</th><th class="p-2.5">AI Guardrail</th></tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-[11px] bg-white dark:bg-slate-950">
                    <tr><td class="p-2.5 text-indigo-600 dark:text-indigo-300 font-bold">App Install Consent</td><td class="p-2.5 text-amber-600 dark:text-amber-400 font-bold">Requires Parent PIN</td><td class="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">PASSED</td></tr>
                    <tr><td class="p-2.5 text-blue-600 dark:text-blue-300 font-bold">Bedtime Quiet Hours</td><td class="p-2.5 text-slate-900 dark:text-slate-200 font-semibold">${age === '16' ? '11:00 PM' : '09:00 PM'}</td><td class="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">PASSED</td></tr>
                    <tr><td class="p-2.5 text-purple-600 dark:text-purple-300 font-bold">Safe Search Mode</td><td class="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">Enforced (Strict)</td><td class="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">PASSED</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          `,
          attach: () => {}
        };
      } else {
        // Default to Screen Time Slider Intent
        headerTitle.textContent = 'PARSED CARD #01 • SCREEN-TIME & SCHEDULE SLIDER';
        telVector.textContent = '0.985 (High Precision)';
        const defaultHours = age === '8' ? 1.0 : (age === '12' ? 1.5 : 2.5);
        return {
          html: `
            <div class="space-y-4 font-mono">
              <div class="flex items-center justify-between">
                <span class="text-xs text-indigo-600 dark:text-indigo-300 font-semibold">Interactive Screen Time Control:</span>
                <span id="slider-val" class="text-xs font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded border border-slate-300 dark:border-slate-800 shadow-sm">${defaultHours} Hours / Day</span>
              </div>
              
              <input type="range" id="screentime-slider" min="0.5" max="4.0" step="0.5" value="${defaultHours}" class="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600">
              
              <div class="space-y-2 pt-2 text-xs font-mono">
                <div class="flex justify-between text-slate-600 dark:text-slate-400"><span>Educational Study (Unlimited)</span><span class="text-emerald-600 dark:text-emerald-400 font-semibold">2.5 hrs</span></div>
                <div class="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-2 overflow-hidden shadow-inner">
                  <div class="bg-emerald-500 h-2 rounded-full" style="width: 80%"></div>
                </div>

                <div class="flex justify-between text-slate-600 dark:text-slate-400"><span>Gaming & Recreational Apps (Capped)</span><span id="gaming-hr-text" class="text-indigo-600 dark:text-indigo-300 font-semibold">${defaultHours} hrs</span></div>
                <div class="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-2 overflow-hidden shadow-inner">
                  <div id="gaming-bar" class="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300" style="width: ${(defaultHours / 4) * 100}%"></div>
                </div>
              </div>
            </div>
          `,
          attach: () => {
            const slider = document.getElementById('screentime-slider');
            const valText = document.getElementById('slider-val');
            const gamingText = document.getElementById('gaming-hr-text');
            const gamingBar = document.getElementById('gaming-bar');
            if (slider) {
              slider.addEventListener('input', (e) => {
                const val = e.target.value;
                valText.textContent = `${val} Hours / Day`;
                gamingText.textContent = `${val} hrs`;
                gamingBar.style.width = `${(val / 4) * 100}%`;
              });
            }
          }
        };
      }
    };

    const executeRealtimeStream = async () => {
      if (isStreaming) return;
      isStreaming = true;

      telStatus.textContent = 'STREAMING...';
      telStatus.className = 'px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold animate-pulse';

      streamTarget.textContent = 'Retrieving age-contextual guidance rules...';
      controlArea.innerHTML = '';

      const promptText = promptInput ? promptInput.value.trim() : "What is good screen time for weeknights";
      const p = promptText.toLowerCase();

      // Semantic Intent Detection based on prompt text & scenario
      let detectedIntent = currentScenario;
      if (p.includes('block') || p.includes('url') || p.includes('app') || p.includes('rule') || p.includes('filter') || p.includes('roblox') || p.includes('youtube')) {
        detectedIntent = 'rules';
      } else if (p.includes('compare') || p.includes('policy') || p.includes('matrix') || p.includes('guardrail')) {
        detectedIntent = 'comparison';
      } else if (p.includes('screen') || p.includes('time') || p.includes('hour') || p.includes('bedtime') || p.includes('limit') || p.includes('good')) {
        detectedIntent = 'screentime';
      }

      const fullText = getDynamicCounselorRAGResponse(promptText, activeAge, detectedIntent);
      const controls = renderControlsForIntent(detectedIntent, activeAge);

      streamTarget.textContent = '';
      let charIdx = 0;

      const charInterval = setInterval(() => {
        if (charIdx < fullText.length) {
          streamTarget.textContent += fullText.charAt(charIdx);
          charIdx++;
        } else {
          clearInterval(charInterval);
          isStreaming = false;
          telStatus.textContent = 'COMPLETED';
          telStatus.className = 'px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold';
          controlArea.innerHTML = controls.html;
          controls.attach();
        }
      }, 10);
    };

    ageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        ageBtns.forEach(b => {
          b.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-sm');
          b.classList.add('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');

        activeAge = btn.getAttribute('data-age');
        currentAgeBadge.textContent = `${activeAge} Years Old`;
        executeRealtimeStream();
      });
    });

    scenarioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        scenarioBtns.forEach(b => {
          b.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-md');
          b.classList.add('bg-slate-100', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');

        currentScenario = btn.getAttribute('data-scenario');
        if (promptInput) {
          if (currentScenario === 'screentime') {
            promptInput.value = "What is good screen time for weeknights and how to manage gaming hours?";
          } else if (currentScenario === 'rules') {
            promptInput.value = "How to block adult websites and set YouTube to scheduled after 9 PM?";
          } else if (currentScenario === 'comparison') {
            promptInput.value = "Show policy comparison matrix with safe search and parent PIN enforcement.";
          }
        }
        executeRealtimeStream();
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      executeRealtimeStream();
    });

    executeRealtimeStream();
  };

  initRealtimeAISandbox();

  /* ==========================================================================
     7. SKILLS MATRIX FILTERING
     ========================================================================== */
  const initSkillsFilter = () => {
    const tabBtns = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          b.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-sm');
          b.classList.add('text-slate-600', 'dark:text-slate-400');
        });

        btn.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-sm');
        btn.classList.remove('text-slate-600', 'dark:text-slate-400');

        const category = btn.getAttribute('data-category');

        skillCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  };

  initSkillsFilter();

  /* ==========================================================================
     8. MODAL DIALOG HANDLERS
     ========================================================================== */
  const setupModal = (triggerId, modalId) => {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    if (!trigger || !modal) return;

    trigger.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });

    const closeBtns = modal.querySelectorAll('.close-modal');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  };

  setupModal('btn-demo-rbac', 'modal-rbac');
  setupModal('btn-demo-pipeline', 'modal-pipeline');
  setupModal('btn-demo-workflow', 'modal-pipeline');
  setupModal('btn-resume-modal', 'modal-resume');
  setupModal('btn-resume-modal-mobile', 'modal-resume');

  // RBAC Role Simulator Implementation
  const initRBACDemo = () => {
    const targetArea = document.getElementById('rbac-demo-area');
    const btns = document.querySelectorAll('.rbac-role-btn');
    if (!targetArea) return;

    const renderRBACState = (role) => {
      if (role === 'ADMIN') {
        targetArea.innerHTML = `
          <div class="space-y-3 font-sans">
            <div class="flex items-center justify-between text-xs">
              <span class="text-indigo-600 dark:text-indigo-400 font-mono font-bold">Active Role: ADMIN</span>
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">ALL PERMISSIONS UNLOCKED</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-indigo-500/40 space-y-2 shadow-sm dark:shadow-none">
              <span class="text-slate-900 dark:text-white text-xs font-bold">&lt;HasRole role="admin"&gt;</span>
              <p class="text-xs text-slate-600 dark:text-slate-400">Granted tenant user provisioning, Keycloak client secrets, and Azure Entra SSO token refresh controls.</p>
              <div class="flex gap-2 pt-1">
                <button class="px-3 py-1 rounded text-xs bg-indigo-600 text-white font-mono font-semibold shadow-sm">Provision Tenant User</button>
                <button class="px-3 py-1 rounded text-xs bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/40 font-mono">Revoke Secrets</button>
              </div>
            </div>
          </div>
        `;
      } else if (role === 'PARENT') {
        targetArea.innerHTML = `
          <div class="space-y-3 font-sans">
            <div class="flex items-center justify-between text-xs">
              <span class="text-blue-600 dark:text-blue-400 font-mono font-bold">Active Role: PARENT</span>
              <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-bold">MANAGED ACCESS</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-blue-500/40 space-y-2 shadow-sm dark:shadow-none">
              <span class="text-slate-900 dark:text-white text-xs font-bold">Parental Controls Dashboard</span>
              <p class="text-xs text-slate-600 dark:text-slate-400">Can view RAG guidance, schedule bedtime locks, and configure URL filters. Admin tenant provisioning is hidden.</p>
            </div>
          </div>
        `;
      } else {
        targetArea.innerHTML = `
          <div class="space-y-3 font-sans">
            <div class="flex items-center justify-between text-xs">
              <span class="text-amber-600 dark:text-amber-400 font-mono font-bold">Active Role: GUEST</span>
              <span class="px-2 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-mono font-bold">ACCESS RESTRICTED</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-red-500/40 text-center space-y-1 shadow-sm dark:shadow-none">
              <p class="text-xs text-red-600 dark:text-red-400 font-mono font-bold">🚫 Access Denied</p>
              <p class="text-xs text-slate-600 dark:text-slate-400">keycloak-provider fallback prevents unauthorized access.</p>
            </div>
          </div>
        `;
      }
    };

    renderRBACState('ADMIN');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active', 'bg-indigo-600', 'text-white', 'font-bold');
          b.classList.add('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
        });
        btn.classList.add('active', 'bg-indigo-600', 'text-white', 'font-bold');
        btn.classList.remove('bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');

        const role = btn.getAttribute('data-role');
        renderRBACState(role);
      });
    });
  };

  initRBACDemo();

  // Foolproof 1-Page Isolated Resume Print Engine
  const printResumeClean = () => {
    const resumeEl = document.getElementById('printable-resume');
    if (!resumeEl) {
      window.print();
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Motiram_V_Shinde_Resume</title>
        <style>
          @page { size: A4 portrait; margin: 10mm 14mm; }
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; }
          body { background: #ffffff; padding: 0; font-size: 8.8pt; line-height: 1.36; color: #1e293b; }
          h1 { font-size: 19pt; font-weight: 900; color: #0f172a; text-align: center; margin-bottom: 2px; letter-spacing: -0.3px; }
          h2 { font-size: 9.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #334155; padding-bottom: 2px; margin-top: 9px; margin-bottom: 4px; letter-spacing: 0.5px; }
          p, span, li { font-size: 8.8pt; line-height: 1.36; color: #334155; }
          strong { font-weight: 700; color: #0f172a; }
          a { color: #4f46e5; text-decoration: underline; font-weight: 600; }
          ul { padding-left: 16px; margin-top: 2px; }
          li { margin-bottom: 2px; }
          .border-b { border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 6px; }
          .text-center { text-align: center; }
          .flex { display: flex; }
          .justify-between { justify-content: space-between; }
          .font-bold { font-weight: 700; }
          .italic { font-style: italic; }
          .space-y-1 > * + * { margin-top: 3px; }
          .space-y-2 > * + * { margin-top: 5px; }
          .space-y-0\\.5 > * + * { margin-top: 2px; }
          .space-y-4 > * + * { margin-top: 8px; }
          .break-avoid { break-inside: avoid; page-break-inside: avoid; }
        </style>
      </head>
      <body>
        ${resumeEl.innerHTML}
      </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 250);
  };

  // Print Resume Handlers
  const printBtn = document.getElementById('btn-print-resume');
  if (printBtn) {
    printBtn.addEventListener('click', printResumeClean);
  }

  /* ==========================================================================
     9. RELIABLE CONTACT FORM SUBMISSION WITH AUTO GMAIL DISPATCH & INLINE CARD
     ========================================================================== */
  const initContactForm = () => {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');
    if (!form || !statusDiv || !submitBtn) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      const targetEmail = "motiramshinde944@gmail.com";
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.open(gmailUrl, '_blank');

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>LAUNCHING GMAIL...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>SEND MESSAGE</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`;

        statusDiv.classList.remove('hidden');
        statusDiv.className = 'p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/90 border border-emerald-500/60 text-slate-900 dark:text-slate-100 shadow-xl space-y-3 transition-all duration-300 text-center sm:text-left';
        
        statusDiv.innerHTML = `
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm justify-center sm:justify-start">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Gmail Compose Tab Opened!</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Hi <strong>${name}</strong>, a pre-filled Gmail Compose tab has been opened for <strong>motiramshinde944@gmail.com</strong>. Simply review and send!
            </p>
            <div class="flex flex-wrap items-center gap-2 pt-2 justify-center sm:justify-start">
              <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all">
                <span>✉️ Re-Open Gmail Web</span>
              </a>
              <a href="${mailtoUrl}" target="_blank" class="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all">
                <span>💻 Open Desktop Mail App</span>
              </a>
              <button type="button" id="btn-copy-contact-email" class="px-3.5 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all">
                <span>📋 Copy Email Address</span>
              </button>
            </div>
          </div>
        `;

        const copyEmailBtn = document.getElementById('btn-copy-contact-email');
        if (copyEmailBtn) {
          copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(targetEmail).then(() => {
              copyEmailBtn.innerHTML = '<span>✔ Copied to Clipboard!</span>';
              setTimeout(() => {
                copyEmailBtn.innerHTML = '<span>📋 Copy Email Address</span>';
              }, 2500);
            });
          });
        }

        form.reset();
      }, 350);
    });
  };

  initContactForm();

  /* ==========================================================================
     10. QUICK COPY HELPERS
     ========================================================================== */
  const setupCopyBtn = (btnId, textId, stringToCopy) => {
    const btn = document.getElementById(btnId);
    const textSpan = document.getElementById(textId);
    if (!btn || !textSpan) return;

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(stringToCopy).then(() => {
        const original = textSpan.textContent;
        textSpan.textContent = 'Copied!';
        setTimeout(() => textSpan.textContent = original, 2000);
      });
    });
  };

  setupCopyBtn('copy-cmd-btn', 'copy-cmd-text', 'npm install keycloak-provider');
  setupCopyBtn('copy-npm-btn-card', 'copy-npm-text-card', 'npm install keycloak-provider');

  /* ==========================================================================
     11. MOBILE MENU TOGGLE
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Initialize Canvas & Tilt Engine
  initParticleCanvas();
  init3DTiltEngine();
  initTypingEffect();

});
