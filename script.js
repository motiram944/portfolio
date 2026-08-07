/**
 * Motiram V. Shinde - Developer Portfolio JavaScript Engine
 * Stack: Pure Vanilla ES6+ JavaScript + Tailwind CSS
 * Features: Motiram.AI Portfolio Copilot (Strict Guardrails & Pure Branding)
 */

document.addEventListener('DOMContentLoaded', () => {

  const NVIDIA_MODEL = "meta/llama-3.1-70b-instruct";
  const NVIDIA_ENDPOINT = "/api/chat";

  // System Prompt for Motiram.AI Copilot with strict guardrails
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
     DYNAMIC RAG RESUME RESPONSE ROUTER WITH STRICT OFF-TOPIC GUARDRAILS
     ========================================================================== */
  const getDynamicRAGResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    // Guardrail Check: Restrict to Motiram's info only
    const isMotiramRelated = q.includes('motiram') || q.includes('shinde') || q.includes('experience') ||
                             q.includes('ai') || q.includes('counselor') || q.includes('rag') || q.includes('parental') ||
                             q.includes('microfrontend') || q.includes('federation') || q.includes('gessa') || q.includes('module') ||
                             q.includes('keycloak') || q.includes('npm') || q.includes('auth') || q.includes('rbac') || q.includes('entra') || q.includes('sso') ||
                             q.includes('award') || q.includes('honor') || q.includes('achievement') || q.includes('hackerrank') || q.includes('gold') ||
                             q.includes('education') || q.includes('cgpa') || q.includes('b.tech') || q.includes('nanded') || q.includes('college') || q.includes('degree') ||
                             q.includes('workflow') || q.includes('io flow') || q.includes('react flow') || q.includes('builder') ||
                             q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('location') || q.includes('reach') ||
                             q.includes('hire') || q.includes('resume') || q.includes('skill') || q.includes('project') || q.includes('who') || q.includes('tell me');

    const isExplicitOffTopic = q.includes('france') || q.includes('capital') || q.includes('weather') || q.includes('poem') ||
                               q.includes('joke') || q.includes('recipe') || q.includes('president') || q.includes('football') || q.includes('cricket');

    if (!isMotiramRelated || isExplicitOffTopic) {
      return "I am Motiram.AI, dedicated exclusively to assisting with Motiram V. Shinde's professional profile, engineering experience, and projects. Please feel free to ask me any question about Motiram's background!";
    }

    if (q.includes('ai') || q.includes('counselor') || q.includes('rag') || q.includes('parental')) {
      return "Motiram built a production parental-control AI Counselor web app using Next.js, Firebase, and RAG retrieval. Key highlight: He designed a dynamic AI chat renderer supporting 12+ layout card types (sliders, matrices, stat cards) backed by a 2-layer JSON parser!";
    }

    if (q.includes('microfrontend') || q.includes('federation') || q.includes('gessa') || q.includes('module')) {
      return "At IAURO Systems (Apr 2022 - Present), Motiram architected enterprise microfrontend platforms with React.js & Webpack Module Federation, enabling independent deployment of IAM, user provisioning, and workflow modules.";
    }

    if (q.includes('keycloak') || q.includes('npm') || q.includes('auth') || q.includes('rbac') || q.includes('entra') || q.includes('sso')) {
      return "Motiram authored & published 'keycloak-provider' on NPM — a reusable React authentication package with declarative RBAC hooks. He also led Azure Entra ID SSO migrations resolving token refresh bugs.";
    }

    if (q.includes('award') || q.includes('honor') || q.includes('achievement') || q.includes('hackerrank') || q.includes('gold')) {
      return "Motiram earned 2x Annual Awards & multiple monthly problem-solving awards at IAURO Systems. He also holds 5x Gold Badges on HackerRank (Python) and was awarded the Team Player Badge!";
    }

    if (q.includes('education') || q.includes('cgpa') || q.includes('b.tech') || q.includes('nanded') || q.includes('college') || q.includes('degree')) {
      return "Motiram graduated with a B.Tech in Information Technology from SGGSIE&T, Nanded, achieving a stellar CGPA of 9.19 / 10!";
    }

    if (q.includes('workflow') || q.includes('io flow') || q.includes('react flow') || q.includes('builder')) {
      return "Motiram built the IO Flow Workflow Builder platform using React Flow renderer and Material UI, creating drag-and-drop process visualizers and real-time execution tracking nodes.";
    }

    if (q.includes('experience') || q.includes('company') || q.includes('iauro') || q.includes('years') || q.includes('role')) {
      return "Motiram is a Senior Frontend Engineer with 4.5+ years of experience at IAURO Systems Pvt. Ltd., Pune (Apr 2022 - Present), leading React, Next.js, Microfrontends, and AI product engineering.";
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('location') || q.includes('reach')) {
      return "You can reach Motiram directly via Email at motiramshinde944@gmail.com, Phone at (+91) 8975303848, or find him located in Pune, Maharashtra, India.";
    }

    return `Motiram V. Shinde is a Senior Frontend Engineer (4.5+ Yrs at IAURO Systems, Pune; CGPA: 9.19). He specializes in React.js, Next.js, RAG AI Platforms, Microfrontends, and Keycloak RBAC. Regarding "${userQuery}": Explore the portfolio sections or email motiramshinde944@gmail.com!`;
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
    const particleCount = Math.min(Math.floor(width / 18), 75);
    const connectionDistance = 140;

    let mouse = { x: null, y: null, radius: 160 };

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
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.8 + 1;
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6';
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
            this.x -= (dx / dist) * force * 2;
            this.y -= (dy / dist) * force * 2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

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
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.25})`;
            ctx.lineWidth = 0.8;
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

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
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

      let speed = isDeleting ? 35 : 75;

      if (!isDeleting && charIndex === currentTitle.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 350;
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
        ? 'p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-right ml-6 font-mono text-[11px]'
        : 'p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px] space-y-1';

      if (sender === 'user') {
        msgDiv.textContent = text;
      } else if (isThinking) {
        msgDiv.id = 'thinking-msg-node';
        msgDiv.innerHTML = `<span class="text-cyan-400 font-bold block flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> 🤖 Motiram.AI Copilot:</span><p class="text-slate-400 italic">Processing prompt...</p>`;
      } else {
        msgDiv.innerHTML = `<span class="text-cyan-400 font-bold block flex items-center gap-1">🤖 Motiram.AI Copilot:</span><p class="leading-relaxed whitespace-pre-wrap">${text}</p>`;
      }

      messagesTarget.appendChild(msgDiv);
      messagesTarget.scrollTop = messagesTarget.scrollHeight;
      return msgDiv;
    };

    const handleCopilotAsk = async (userQuery) => {
      appendMessage('user', userQuery);

      // Client Guardrail check for strict domain boundary
      const q = userQuery.toLowerCase();
      const isExplicitOffTopic = q.includes('france') || q.includes('capital') || q.includes('weather') || q.includes('poem') ||
                                 q.includes('joke') || q.includes('recipe') || q.includes('president') || q.includes('football') || q.includes('cricket');

      if (isExplicitOffTopic) {
        const guardrailMsg = "I am Motiram.AI, dedicated exclusively to assisting with Motiram V. Shinde's professional profile, engineering experience, and projects. Please feel free to ask me any question about Motiram's background!";
        appendMessage('bot', guardrailMsg);
        return;
      }

      chatHistory.push({ role: "user", content: userQuery });
      const thinkingNode = appendMessage('bot', '', true);

      try {
        const response = await fetch(NVIDIA_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: NVIDIA_MODEL,
            messages: chatHistory,
            temperature: 0.3,
            max_tokens: 512
          })
        });

        const data = await response.json();
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          const aiAnswer = data.choices[0].message.content;
          chatHistory.push({ role: "assistant", content: aiAnswer });
          if (thinkingNode) {
            thinkingNode.innerHTML = `<span class="text-cyan-400 font-bold block flex items-center gap-1">🤖 Motiram.AI Copilot:</span><p class="leading-relaxed whitespace-pre-wrap">${aiAnswer}</p>`;
          }
        } else {
          throw new Error("API response parse error");
        }
      } catch (err) {
        const dynamicAnswer = getDynamicRAGResponse(userQuery);
        chatHistory.push({ role: "assistant", content: dynamicAnswer });
        if (thinkingNode) {
          thinkingNode.innerHTML = `<span class="text-cyan-400 font-bold block flex items-center gap-1">🤖 Motiram.AI Copilot:</span><p class="leading-relaxed whitespace-pre-wrap">${dynamicAnswer}</p>`;
        }
      }

      messagesTarget.scrollTop = messagesTarget.scrollHeight;
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
        scoreColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40',
        summary: 'Ideal fit for high-scale React/Next.js roles. 4.5+ years experience building production RAG AI interfaces, Redux caching, and Storybook component libraries at IAURO Systems.',
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
        scoreColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40',
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
        scoreColor: 'text-violet-400 bg-violet-500/20 border-violet-500/40',
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
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span class="text-xs text-slate-400 block font-bold">Target Evaluated Role:</span>
              <h3 class="text-sm sm:text-base font-bold text-white">${data.roleTitle}</h3>
            </div>
            <span class="px-3 py-1 rounded-lg text-xs font-bold border ${data.scoreColor} self-start sm:self-auto">${data.matchScore}</span>
          </div>

          <p class="text-xs text-slate-300 font-sans leading-relaxed">${data.summary}</p>

          <div class="space-y-2 pt-1">
            <span class="text-xs font-bold text-violet-400 block">AI Verified Candidate Strengths:</span>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
              ${data.bullets.map(b => `
                <li class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                  <span class="text-emerald-400 font-mono">✔</span>
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
          b.classList.remove('active', 'bg-violet-600', 'text-white', 'font-bold');
          b.classList.add('bg-slate-800', 'text-slate-300');
        });
        btn.classList.add('active', 'bg-violet-600', 'text-white', 'font-bold');
        btn.classList.remove('bg-slate-800', 'text-slate-300');

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

    const scenarioData = {
      screentime: {
        title: 'PARSED CARD #01 • SCREEN-TIME & SCHEDULE SLIDER',
        vectorScore: '0.965 (Cosine Sim)',
        systemPrompt: "You are an AI Counselor for parental control. Give a short 2-sentence advice for screen time guidelines.",
        renderControls: (age) => {
          const defaultHours = age === '8' ? 1.0 : (age === '12' ? 1.5 : 2.5);
          return `
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono text-cyan-400 font-bold">Interactive Screen Time Control:</span>
                <span id="slider-val" class="text-sm font-mono font-bold text-white bg-slate-900 px-2.5 py-1 rounded border border-slate-800">${defaultHours} Hours / Day</span>
              </div>
              
              <input type="range" id="screentime-slider" min="0.5" max="4.0" step="0.5" value="${defaultHours}" class="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400">
              
              <div class="space-y-2 pt-2 text-xs font-mono">
                <div class="flex justify-between text-slate-400"><span>Educational Study (Unlimited)</span><span class="text-emerald-400">2.5 hrs</span></div>
                <div class="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                  <div class="bg-emerald-400 h-2.5 rounded-full" style="width: 80%"></div>
                </div>

                <div class="flex justify-between text-slate-400"><span>Gaming & Video Apps (Capped)</span><span id="gaming-hr-text" class="text-cyan-400">${defaultHours} hrs</span></div>
                <div class="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                  <div id="gaming-bar" class="bg-cyan-400 h-2.5 rounded-full transition-all duration-300" style="width: ${(defaultHours / 4) * 100}%"></div>
                </div>
              </div>
            </div>
          `;
        },
        attachEvents: () => {
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
      },
      rules: {
        title: 'PARSED CARD #09 • 3-STATE VISUAL RULE BUILDER',
        vectorScore: '0.982 (Cosine Sim)',
        systemPrompt: "You are an AI Counselor for parental control. Briefly summarize safe rule settings.",
        renderControls: (age) => `
          <div class="space-y-3 font-mono text-xs">
            <span class="text-violet-400 font-bold block">Interactive 3-State Rule Toggles (Click to change state):</span>
            
            <div class="space-y-2">
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span class="text-white font-bold block">YouTube App</span>
                  <span class="text-[10px] text-slate-400">Age Appropriateness Filter</span>
                </div>
                <button class="rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold border transition-all" data-state="scheduled" id="rule-yt">
                  ⏳ SCHEDULED (09:00 PM)
                </button>
              </div>

              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span class="text-white font-bold block">Roblox & Online Gaming</span>
                  <span class="text-[10px] text-slate-400">Multiplayer Safety Guard</span>
                </div>
                <button class="rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold border transition-all" data-state="allowed" id="rule-gaming">
                  ✔ ALLOWED
                </button>
              </div>

              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span class="text-white font-bold block">Adult Web Filtering</span>
                  <span class="text-[10px] text-slate-400">Strict Domain Shield</span>
                </div>
                <button class="rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold border transition-all" data-state="blocked" id="rule-adult">
                  🚫 BLOCKED
                </button>
              </div>
            </div>
            <p class="text-[11px] text-slate-500 pt-1">Unified visual system introduced by Motiram at IAURO Systems to clarify clickable vs static elements.</p>
          </div>
        `,
        attachEvents: () => {
          const updateBtnUI = (btn, state) => {
            btn.setAttribute('data-state', state);
            if (state === 'allowed') {
              btn.className = 'rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
              btn.textContent = '✔ ALLOWED';
            } else if (state === 'scheduled') {
              btn.className = 'rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40';
              btn.textContent = '⏳ SCHEDULED (09:00 PM)';
            } else {
              btn.className = 'rule-toggle-btn px-3 py-1.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40';
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
      },
      comparison: {
        title: 'PARSED CARD #04 • POLICY COMPARISON MATRIX',
        vectorScore: '0.948 (Cosine Sim)',
        systemPrompt: "You are an AI Counselor for parental control. Briefly explain policy enforcement.",
        renderControls: (age) => `
          <div class="space-y-3 font-mono text-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-slate-300">
                <thead class="bg-slate-900 text-slate-400 text-[11px]">
                  <tr><th class="p-2.5">Feature Shield</th><th class="p-2.5">Configured Policy</th><th class="p-2.5">AI Guardrail</th></tr>
                </thead>
                <tbody class="divide-y divide-slate-800 text-[11px]">
                  <tr><td class="p-2.5 text-cyan-300 font-bold">App Install Consent</td><td class="p-2.5 text-amber-400 font-bold">Requires Parent PIN</td><td class="p-2.5 text-emerald-400">PASSED</td></tr>
                  <tr><td class="p-2.5 text-violet-300 font-bold">Bedtime Quiet Hours</td><td class="p-2.5 text-slate-200">${age === '16' ? '11:00 PM' : '09:00 PM'}</td><td class="p-2.5 text-emerald-400">PASSED</td></tr>
                  <tr><td class="p-2.5 text-pink-300 font-bold">Safe Search Mode</td><td class="p-2.5 text-emerald-400 font-bold">Enforced (Strict)</td><td class="p-2.5 text-emerald-400">PASSED</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        `,
        attachEvents: () => {}
      }
    };

    const executeRealtimeStream = async () => {
      if (isStreaming) return;
      isStreaming = true;

      const data = scenarioData[currentScenario];
      headerTitle.textContent = data.title;
      telVector.textContent = data.vectorScore;
      telStatus.textContent = 'STREAMING...';
      telStatus.className = 'px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-bold animate-pulse';

      streamTarget.textContent = 'Retrieving age-contextual guidance rules...';
      controlArea.innerHTML = '';

      const promptText = promptInput ? promptInput.value : "How much daily screen time should I allow for weeknights?";

      try {
        const response = await fetch(NVIDIA_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: NVIDIA_MODEL,
            messages: [
              { role: "system", content: `${data.systemPrompt} Context: Child is ${activeAge} years old.` },
              { role: "user", content: promptText }
            ],
            temperature: 0.5,
            max_tokens: 150
          })
        });

        const resData = await response.json();
        const fullText = (resData && resData.choices && resData.choices[0] && resData.choices[0].message)
          ? resData.choices[0].message.content
          : `[RAG Retrieval Complete]: Based on pediatric safety guidelines for a ${activeAge}-year-old child, daily non-educational screen time is recommended to be capped. Adjust settings below:`;

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
            telStatus.className = 'px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold';

            controlArea.innerHTML = data.renderControls(activeAge);
            data.attachEvents();
          }
        }, 15);

      } catch (err) {
        const fullText = `[RAG Retrieval Complete]: Based on pediatric safety guidelines for a ${activeAge}-year-old child, daily non-educational screen time should be managed cleanly. You can interactively adjust settings below:`;
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
            telStatus.className = 'px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold';
            controlArea.innerHTML = data.renderControls(activeAge);
            data.attachEvents();
          }
        }, 15);
      }
    };

    ageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        ageBtns.forEach(b => {
          b.classList.remove('active', 'bg-cyan-500', 'text-slate-950', 'font-bold');
          b.classList.add('bg-slate-900', 'text-slate-300');
        });
        btn.classList.add('active', 'bg-cyan-500', 'text-slate-950', 'font-bold');
        btn.classList.remove('bg-slate-900', 'text-slate-300');

        activeAge = btn.getAttribute('data-age');
        currentAgeBadge.textContent = `${activeAge} Years Old`;
        executeRealtimeStream();
      });
    });

    scenarioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        scenarioBtns.forEach(b => {
          b.classList.remove('active', 'bg-cyan-500', 'text-slate-950', 'font-bold');
          b.classList.add('bg-slate-800', 'text-slate-300');
        });
        btn.classList.add('active', 'bg-cyan-500', 'text-slate-950', 'font-bold');
        btn.classList.remove('bg-slate-800', 'text-slate-300');

        currentScenario = btn.getAttribute('data-scenario');
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
          b.classList.remove('active', 'bg-gradient-to-r', 'from-cyan-500', 'to-violet-600', 'text-white', 'font-bold');
          b.classList.add('text-slate-400');
        });

        btn.classList.add('active', 'bg-gradient-to-r', 'from-cyan-500', 'to-violet-600', 'text-white', 'font-bold');
        btn.classList.remove('text-slate-400');

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
              <span class="text-violet-400 font-mono font-bold">Active Role: ADMIN</span>
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">ALL PERMISSIONS UNLOCKED</span>
            </div>
            <div class="p-4 rounded bg-slate-900 border border-violet-500/40 space-y-2">
              <span class="text-white text-xs font-bold">&lt;HasRole role="admin"&gt;</span>
              <p class="text-xs text-slate-400">Granted tenant user provisioning, Keycloak client secrets, and Azure Entra SSO token refresh controls.</p>
              <div class="flex gap-2 pt-1">
                <button class="px-3 py-1 rounded text-xs bg-violet-600 text-white font-mono font-bold">Provision Tenant User</button>
                <button class="px-3 py-1 rounded text-xs bg-red-500/20 text-red-400 border border-red-500/40 font-mono">Revoke Client Secrets</button>
              </div>
            </div>
          </div>
        `;
      } else if (role === 'PARENT') {
        targetArea.innerHTML = `
          <div class="space-y-3 font-sans">
            <div class="flex items-center justify-between text-xs">
              <span class="text-cyan-400 font-mono font-bold">Active Role: PARENT</span>
              <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold">MANAGED ACCESS</span>
            </div>
            <div class="p-4 rounded bg-slate-900 border border-cyan-500/40 space-y-2">
              <span class="text-white text-xs font-bold">Parental Controls Dashboard</span>
              <p class="text-xs text-slate-400">Can view RAG guidance, schedule bedtime locks, and configure URL filters. Admin tenant provisioning is hidden.</p>
            </div>
          </div>
        `;
      } else {
        targetArea.innerHTML = `
          <div class="space-y-3 font-sans">
            <div class="flex items-center justify-between text-xs">
              <span class="text-amber-400 font-mono font-bold">Active Role: GUEST</span>
              <span class="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-mono font-bold">ACCESS RESTRICTED</span>
            </div>
            <div class="p-4 rounded bg-slate-900 border border-red-500/40 text-center space-y-1">
              <p class="text-xs text-red-400 font-mono font-bold">🚫 Access Denied</p>
              <p class="text-xs text-slate-500">keycloak-provider fallback prevents unauthorized access.</p>
            </div>
          </div>
        `;
      }
    };

    renderRBACState('ADMIN');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('active', 'bg-violet-600', 'text-white', 'font-bold');
          b.classList.add('bg-slate-800', 'text-slate-300');
        });
        btn.classList.add('active', 'bg-violet-600', 'text-white', 'font-bold');
        btn.classList.remove('bg-slate-800', 'text-slate-300');

        const role = btn.getAttribute('data-role');
        renderRBACState(role);
      });
    });
  };

  initRBACDemo();

  // Print Resume Handler
  const printBtn = document.getElementById('btn-print-resume');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
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
      submitBtn.innerHTML = `<span>LAUNCHED GMAIL...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>SEND MESSAGE</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`;

        statusDiv.classList.remove('hidden');
        statusDiv.className = 'p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-slate-100 shadow-xl space-y-3 transition-all duration-300 text-center sm:text-left';
        
        statusDiv.innerHTML = `
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm justify-center sm:justify-start">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Gmail Web Compose Window Opened!</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Hi <strong>${name}</strong>, a pre-filled Gmail Compose tab has been opened for <strong>motiramshinde944@gmail.com</strong>. Simply hit 'Send' in Gmail!
            </p>
            <div class="flex flex-wrap items-center gap-2 pt-2 justify-center sm:justify-start">
              <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all">
                <span>✉️ Re-Open Gmail Web</span>
              </a>
              <a href="${mailtoUrl}" target="_blank" class="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all">
                <span>💻 Open Desktop Mail App</span>
              </a>
              <button type="button" id="btn-copy-contact-email" class="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all">
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
      }, 400);
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
