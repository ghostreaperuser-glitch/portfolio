/* ============================================
   PORTFOLIO — MAIN JS
   ============================================ */

/* ─── CODE CANVAS BACKGROUND ─────────────── */
(function () {
  const canvas = document.getElementById('code-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Real-looking polyglot code lines
  const codeLines = [
    // C
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '#include <string.h>',
    'typedef struct Node { int val; struct Node* next; } Node;',
    'void* malloc_safe(size_t n) { void* p = malloc(n); if(!p) exit(1); return p; }',
    'int binary_search(int* arr, int lo, int hi, int target) {',
    '    while (lo <= hi) { int mid = (lo+hi)/2;',
    '        if (arr[mid] == target) return mid;',
    '        else if (arr[mid] < target) lo = mid+1; else hi = mid-1; }',
    '    return -1; }',
    'FILE* fp = fopen("data.bin", "rb");',
    'fread(&header, sizeof(Header), 1, fp);',
    // C++
    '#include <vector>',
    '#include <unordered_map>',
    'template<typename T> class Stack {',
    '    std::vector<T> data;',
    'public:',
    '    void push(T val) { data.push_back(val); }',
    '    T pop() { T v = data.back(); data.pop_back(); return v; }',
    '};',
    'auto it = std::find_if(v.begin(), v.end(), [](int x){ return x > 42; });',
    'std::shared_ptr<Node> root = std::make_shared<Node>(0);',
    // Java
    'public class BinaryTree<T extends Comparable<T>> {',
    '    private Node<T> root;',
    '    public void insert(T val) { root = insertRec(root, val); }',
    '    private Node<T> insertRec(Node<T> n, T val) {',
    '        if (n == null) return new Node<>(val);',
    '        if (val.compareTo(n.val) < 0) n.left = insertRec(n.left, val);',
    '        else n.right = insertRec(n.right, val);',
    '        return n; } }',
    'ExecutorService pool = Executors.newFixedThreadPool(4);',
    'Future<Integer> result = pool.submit(() -> heavyCompute(data));',
    'List<String> sorted = list.stream().sorted().collect(Collectors.toList());',
    // Python
    'def quicksort(arr):',
    '    if len(arr) <= 1: return arr',
    '    pivot = arr[len(arr) // 2]',
    '    left = [x for x in arr if x < pivot]',
    '    mid  = [x for x in arr if x == pivot]',
    '    right= [x for x in arr if x > pivot]',
    '    return quicksort(left) + mid + quicksort(right)',
    'import pandas as pd',
    'df = pd.read_csv("dataset.csv")',
    'df.dropna(inplace=True)',
    'grouped = df.groupby("category").agg({"value": "mean"})',
    'with open("config.json") as f: cfg = json.load(f)',
    '@app.route("/api/data", methods=["GET","POST"])',
    'def handle(): return jsonify({"status": "ok"})',
    // JavaScript
    'const fetchUser = async (id) => {',
    '  const res = await fetch(`/api/users/${id}`);',
    '  if (!res.ok) throw new Error(res.statusText);',
    '  return res.json();',
    '};',
    'const debounce = (fn, ms) => {',
    '  let timer; return (...args) => {',
    '  clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };',
    '};',
    "document.querySelectorAll('.card').forEach(card => {",
    '  card.addEventListener("mouseenter", () => card.classList.add("active"));',
    '});',
    'const [state, setState] = useState({ count: 0, loading: false });',
    'localStorage.setItem("token", btoa(JSON.stringify(payload)));',
    // PHP
    '<?php',
    'class Database {',
    '  private PDO $pdo;',
    '  public function __construct(string $dsn) {',
    '    $this->pdo = new PDO($dsn); }',
    '  public function query(string $sql, array $params = []): array {',
    '    $stmt = $this->pdo->prepare($sql);',
    '    $stmt->execute($params);',
    '    return $stmt->fetchAll(PDO::FETCH_ASSOC); } }',
    '$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");',
    '$stmt->execute([$_GET["id"]]);',
    'session_start(); $_SESSION["user"] = $user["id"];',
    // SQL
    'SELECT u.name, COUNT(o.id) AS orders, SUM(o.total) AS revenue',
    'FROM users u LEFT JOIN orders o ON u.id = o.user_id',
    'WHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)',
    'GROUP BY u.id HAVING revenue > 1000 ORDER BY revenue DESC;',
    'CREATE INDEX idx_user_email ON users(email);',
    'BEGIN TRANSACTION;',
    'UPDATE accounts SET balance = balance - 500 WHERE id = 1;',
    'UPDATE accounts SET balance = balance + 500 WHERE id = 2;',
    'COMMIT;',
    // HTML/CSS
    '<section class="hero" id="home">',
    '  <canvas id="bg-canvas"></canvas>',
    '  <div class="container position-relative">',
    '    <h1 class="hero-name">Hello, I\'m <span>Dev</span></h1>',
    '  </div>',
    '</section>',
    ':root { --charcoal: #2B3240; --gold: #C8A96E; --teal: #4ECDC4; }',
    '.card { backdrop-filter: blur(12px); transition: transform 0.3s ease; }',
    '.card:hover { transform: translateY(-6px); border-color: var(--gold); }',
    '@keyframes fadeUp { from { opacity:0; transform:translateY(24px); }',
    '  to   { opacity:1; transform:translateY(0); } }',
  ];

  // Column configuration
  const FONT_SIZE = 13;
  const FONT     = `${FONT_SIZE}px "DM Mono", "Courier New", monospace`;
  const LINE_H   = 22;
  const COL_W    = 520;   // px wide per column
  const COL_GAP  = 60;

  // Syntax-aware color palette (muted, will be further dimmed by CSS filter)
  const COLORS = {
    keyword:   '#569cd6',
    string:    '#ce9178',
    comment:   '#6a9955',
    number:    '#b5cea8',
    operator:  '#d4d4d4',
    type:      '#4ec9b0',
    fn:        '#dcdcaa',
    default:   '#abb2bf',
    gold:      '#c8a96e',
    teal:      '#4ecdc4',
  };

  const KEYWORDS = ['int','void','return','if','else','while','for','struct','typedef',
    'class','public','private','template','typename','auto','const','static','new',
    'def','import','from','with','as','async','await','elif','True','False','None',
    'function','const','let','var','export','default','SELECT','FROM','WHERE',
    'JOIN','GROUP','ORDER','BY','CREATE','INSERT','UPDATE','DELETE','BEGIN','COMMIT',
    'public','private','class','extends','implements','interface','throws',
    'void','int','String','List','Map','Future','bool','double','float',
    'echo','session_start','require','include','namespace','use'];

  function tokenize(line) {
    // Returns array of {text, color}
    const tokens = [];
    let rest = line;

    while (rest.length > 0) {
      // Comments
      let m;
      if ((m = rest.match(/^(\/\/.*|#.*|--.*)/))) {
        tokens.push({ text: m[1], color: COLORS.comment }); rest = rest.slice(m[1].length); continue;
      }
      // Strings
      if ((m = rest.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/))) {
        tokens.push({ text: m[1], color: COLORS.string }); rest = rest.slice(m[1].length); continue;
      }
      // Numbers
      if ((m = rest.match(/^(\b\d+\.?\d*\b)/))) {
        tokens.push({ text: m[1], color: COLORS.number }); rest = rest.slice(m[1].length); continue;
      }
      // Keywords
      if ((m = rest.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)/))) {
        const word = m[1];
        const color = KEYWORDS.includes(word) ? COLORS.keyword
                    : /^[A-Z]/.test(word)      ? COLORS.type
                    : rest[word.length] === '(' ? COLORS.fn
                    : COLORS.default;
        tokens.push({ text: word, color }); rest = rest.slice(word.length); continue;
      }
      // Operators & symbols
      if ((m = rest.match(/^([=><!+\-*\/&|^%~<>.,;:?@#{}[\]()]+)/))) {
        tokens.push({ text: m[1], color: COLORS.operator }); rest = rest.slice(m[1].length); continue;
      }
      // Space
      tokens.push({ text: rest[0], color: COLORS.default });
      rest = rest.slice(1);
    }
    return tokens;
  }

  // Each column has its own scroll offset and line slice
  let columns = [];

  function initColumns() {
    const W = canvas.width;
    const H = canvas.height;
    const numCols = Math.ceil(W / (COL_W + COL_GAP)) + 1;
    columns = [];
    for (let i = 0; i < numCols; i++) {
      const startLine = Math.floor(Math.random() * codeLines.length);
      columns.push({
        x: i * (COL_W + COL_GAP) - (Math.random() * COL_W * 0.3),
        offsetY: Math.random() * H * 1.5,   // start at random scroll position
        speed: 0.25 + Math.random() * 0.35, // px per frame
        opacity: 0.55 + Math.random() * 0.45,
        startLine,
      });
    }
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    initColumns();
  }

  function drawColumn(col) {
    const H = canvas.height;
    const totalContentH = codeLines.length * LINE_H;

    // Advance scroll
    col.offsetY += col.speed;
    if (col.offsetY > totalContentH) col.offsetY -= totalContentH;

    ctx.save();
    ctx.globalAlpha = col.opacity;

    const firstLine = Math.floor(col.offsetY / LINE_H);
    const startY    = -(col.offsetY % LINE_H);

    const visibleLines = Math.ceil((H - startY) / LINE_H) + 2;

    for (let i = 0; i < visibleLines; i++) {
      const lineIdx = (firstLine + i + col.startLine) % codeLines.length;
      const lineText = codeLines[lineIdx];
      const y = startY + i * LINE_H;

      if (y > H + LINE_H) break;

      ctx.font = FONT;
      const tokens = tokenize(lineText);
      let x = col.x;

      // Indent preservation
      tokens.forEach(tok => {
        ctx.fillStyle = tok.color;
        ctx.fillText(tok.text, x, y);
        x += ctx.measureText(tok.text).width;
      });
    }

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dark base so columns don't bleed too bright
    ctx.fillStyle = 'rgba(14, 17, 24, 0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    columns.forEach(drawColumn);
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  animate();
})();

document.addEventListener('DOMContentLoaded', () => {

  // ─── TYPEWRITER ───────────────────────────
  const roles = [ //languages supported
    'C Programming Language',
    'C++ Programming',
    'Java Programming',
    'MySQL, NOSQL',
    'PHP Scripting',
    'Python',
    'HTML/ CSS/ Bootstrap',
    'JavaScript',
    'Nodejs',
    'MERN Stack'
    
  ];
  let roleIdx = 0, charIdx = 0, isDeleting = false;
  const typingEl = document.getElementById('typing-text');

  function typeLoop() {
    if (!typingEl) return;
    const current = roles[roleIdx];
    if (!isDeleting) {
      typingEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { isDeleting = true; setTimeout(typeLoop, 2000); return; }
    } else {
      typingEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(typeLoop, isDeleting ? 55 : 95);
  }
  typeLoop();

  // ─── SCROLL ANIMATIONS ────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));

  // ─── CARD MOUSE GLOW ──────────────────────
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const my = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', mx + '%');
      card.style.setProperty('--my', my + '%');
    });
  });

  // ─── MODAL: ANIMATE PROGRESS BARS ─────────
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('shown.bs.modal', () => {
      modal.querySelectorAll('.skill-progress-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
    });
    modal.addEventListener('hidden.bs.modal', () => {
      modal.querySelectorAll('.skill-progress-fill').forEach(bar => {
        bar.style.width = '0';
      });
    });
  });

  // ─── ACTIVE NAV ON SCROLL ─────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link');

  const scrollSpy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.navbar .nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => scrollSpy.observe(s));

  // ─── CONTACT FORM SUBMISSION ANIMATION ───
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '✓ Message Sent';
        btn.style.background = 'var(--teal)';
        btn.style.color = 'var(--dark-bg)';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ─── NAVBAR SCROLL SHADOW ─────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,0.35)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // ─── YEAR IN FOOTER ───────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});