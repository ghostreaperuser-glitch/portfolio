# portfolio
My website information is within repo
<!-- 
/*
 * ══════════════════════════════════════════════════════════════════════
 *  CONFIGURATION — edit this section to manage your contributors
 * ══════════════════════════════════════════════════════════════════════
 *
 *  GITHUB SETUP GUIDE:
 *  1. Create a NEW public repo called e.g. "uni-contributions" on your GitHub
 *     (separate from your private website repo — keeps them isolated)
 *  2. Inside that repo, structure folders like:
 *       /dr-nakato/coursework.pdf
 *       /dr-nakato/notes.pdf
 *       /dr-nakato/README.md
 *  3. In each contributor below, set:
 *       githubFolder: "dr-nakato"   ← must match the folder name exactly
 *  4. The download links go directly to GitHub's raw CDN (raw.githubusercontent.com)
 *     Visitors download from GitHub — they NEVER touch your private website repo.
 *
 *  ADDING A CONTRIBUTOR:
 *  - Copy one object inside the CONTRIBUTORS array and fill in the fields.
 *  - photo: put their image in /assets/contributors/ on your website repo
 *    OR leave as "" to use the auto-generated initials avatar.
 *  - githubFolder: the folder name inside your public contributions repo.
 *  - docs: list the EXACT file names inside that folder (max 3 per semester).
 */

 <script>


const GITHUB_USER   = "ghostreaperuser-glitch";          
const GITHUB_REPO   = "uni-contributions";               // public docs
const GITHUB_BRANCH = "main";                            

// Raw base URL — this is public CDN, no auth needed
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// ─── ADD / EDIT CONTRIBUTORS HERE ───────────────────────────────────────
const CONTRIBUTORS = [
  {
    id: "nakato",
    name: "Dr. Sarah Nakato",
    role: "lecturer",
    dept: "cs",
    department: "Computer Science",
    title: "Senior Lecturer — Data Structures",
    photo: "",                        // e.g. "/assets/contributors/nakato.jpg"
    semester: "Semester 1, 2025",
    githubFolder: "dr-nakato",        // folder in your public repo
    docs: [
      { name: "Coursework 1 — Linked Lists",  file: "coursework.pdf", type: "pdf" },
      { name: "Lecture Notes — DSA",           file: "notes.pdf",      type: "pdf" },
      { name: "README — How to use these docs",file: "README.md",      type: "md"  },
    ]
  },
  {
    id: "ssebunya",
    name: "Prof. James Ssebunya",
    role: "lecturer",
    dept: "eng",
    department: "Software Engineering",
    title: "Professor — Software Architecture",
    photo: "",
    semester: "Semester 1, 2025",
    githubFolder: "prof-ssebunya",
    docs: [
      { name: "Coursework — System Design",    file: "coursework.pdf", type: "pdf" },
      { name: "Notes — Design Patterns",        file: "notes.pdf",      type: "pdf" },
      { name: "README — Study Guide",           file: "README.md",      type: "md"  },
    ]
  },
  {
    id: "akullo",
    name: "Grace Akullo",
    role: "student",
    dept: "cs",
    department: "Computer Science — Year 2",
    title: "Student Representative",
    photo: "",
    semester: "Semester 1, 2025",
    githubFolder: "grace-akullo",
    docs: [
      { name: "Summary Notes — Algorithms",    file: "notes.pdf",      type: "pdf" },
      { name: "Practice Coursework",            file: "coursework.pdf", type: "pdf" },
      { name: "README — How to approach exams", file: "README.md",      type: "md"  },
    ]
  },
  {
    id: "tumwebaze",
    name: "Ivan Tumwebaze",
    role: "student",
    dept: "eng",
    department: "Software Engineering — Year 3",
    title: "Verified Student Contributor",
    photo: "",
    semester: "Semester 1, 2025",
    githubFolder: "ivan-tumwebaze",
    docs: [
      { name: "Notes — Database Systems",       file: "notes.pdf",      type: "pdf" },
      { name: "Coursework — SQL Queries",       file: "coursework.pdf", type: "pdf" },
      { name: "README — Getting Started",       file: "README.md",      type: "md"  },
    ]
  },
];
// ─── END CONFIGURATION ───────────────────────────────────────────────────

// Helpers
function getInitials(name) {
  return name.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase();
}

function docIcon(type) {
  const map = { pdf: "fa-file-pdf pdf", md: "fa-file-lines md", txt: "fa-file-alt txt" };
  const cls = map[type] || "fa-file other";
  return `<div class="doc-icon ${type || 'other'}"><i class="fas ${cls.split(' ')[0]}"></i></div>`;
}

function typeLabel(type) {
  const map = { pdf: "PDF Document", md: "Markdown / README", txt: "Text File" };
  return map[type] || "Document";
}

function buildDownloadUrl(contributor, filename) {
  return `${RAW_BASE}/${contributor.githubFolder}/${filename}`;
}

// Build the card grid
function renderCards(filter) {
  const grid = document.getElementById("contributors-grid");
  const list = filter === "all"
    ? CONTRIBUTORS
    : CONTRIBUTORS.filter(c => c.role === filter || c.dept === filter);

  if (!list.length) {
    grid.innerHTML = `<div class="col-12 empty-state"><i class="fas fa-users-slash"></i>No contributors in this category yet.</div>`;
    return;
  }

  grid.innerHTML = list.map(c => {
    const avatar = c.photo
      ? `<img src="${c.photo}" class="contrib-avatar" alt="${c.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
         <div class="contrib-avatar-placeholder" style="display:none;">${getInitials(c.name)}</div>`
      : `<div class="contrib-avatar-placeholder">${getInitials(c.name)}</div>`;

    const roleIcon = c.role === "lecturer"
      ? `<i class="fas fa-chalkboard-teacher" style="color:#0090d4;font-size:0.7rem;"></i> Lecturer`
      : `<i class="fas fa-user-graduate" style="color:#ffd43b;font-size:0.7rem;"></i> Student`;

    return `
      <div class="col-sm-6 col-md-4 col-lg-3 fade-up" data-role="${c.role}" data-dept="${c.dept}">
        <div class="contributor-card" onclick="openDocs('${c.id}')">
          ${avatar}
          <div class="contrib-name">
            ${c.name}
            <i class="fas fa-circle-check ms-1" style="color:#0090d4;font-size:0.75rem;" title="GhostR Verified"></i>
          </div>
          <div class="contrib-role">${roleIcon}</div>
          <div class="contrib-dept">${c.department}</div>
          <div class="contrib-doc-count">
            <i class="fas fa-file-circle-check"></i>
            ${c.docs.length} document${c.docs.length !== 1 ? 's' : ''} · ${c.semester}
          </div>
        </div>
      </div>`;
  }).join("");
}

// Open document modal
function openDocs(id) {
  const contrib = CONTRIBUTORS.find(c => c.id === id);
  if (!contrib) return;

  document.getElementById("modal-contrib-name").textContent = contrib.name;
  document.getElementById("modal-contrib-role").textContent = contrib.title + " · " + contrib.department;

  const body = document.getElementById("modal-body-content");

  const docsHtml = contrib.docs.map(doc => {
    const url = buildDownloadUrl(contrib, doc.file);
    return `
      <div class="doc-item">
        ${docIcon(doc.type)}
        <div class="doc-meta">
          <div class="doc-name">${doc.name}</div>
          <div class="doc-type-label">${typeLabel(doc.type)} &mdash; ${contrib.semester}</div>
        </div>
        <a href="${url}" class="btn-download" target="_blank" rel="noopener noreferrer" download>
          <i class="fas fa-download me-1"></i> Download
        </a>
      </div>`;
  }).join("");

  body.innerHTML = `
    <span class="semester-tag"><i class="fas fa-calendar-alt me-1"></i>${contrib.semester}</span>
    <p style="font-size:0.85rem;color:var(--muted,#8899aa);margin-bottom:1.2rem;">
      Files are hosted securely on GitHub and open directly for download. 
      Always read the README first to understand how to use these documents.
    </p>
    ${docsHtml}`;

  const modal = new bootstrap.Modal(document.getElementById("docs-modal"));
  modal.show();
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    renderCards(this.dataset.filter);
  });
});

// Initial render
renderCards("all");

// Year in footer (if you include footer)
const yr = document.getElementById("year");
if (yr) yr.textContent = new Date().getFullYear();
</script>

<!-- ═══════════════════════════════════════════
     SKILLS
════════════════════════════════════════════ -->
<section id="skills" class="section-pad">
  <div class="container">

    <div class="text-center mb-5 fade-up">
      <span class="section-label">Technical Arsenal</span>
      <h2 class="section-title">Languages &amp; Technologies</h2>
      <p class="section-subtitle mx-auto">
        A decade of curiosity distilled into ten languages. Click any card to explore deeper.
      </p>
    </div>

    <div class="row g-4">

      <!-- C -->
      <div class="col-sm-6 col-lg-4 fade-up">
        <div class="skill-card" data-bs-toggle="modal" data-bs-target="#modal-c">
          <div class="skill-icon" style="background:rgba(0,90,160,0.18);color:#0090d4;">C</div>
          <div class="skill-name">C Language</div>
          <div class="skill-type">Systems &amp; Embedded</div>
          <div class="skill-desc">The foundation of modern computing. Low-level memory control, pointers, and raw performance.</div>
          <div class="skill-badge-row">
            <span class="skill-badge">Pointers</span>
            <span class="skill-badge">Memory</span>
            <span class="skill-badge">Structs</span>
            <span class="skill-badge">Files</span>
          </div>
        </div>
      </div>

      <!-- C++ -->
      <div class="col-sm-6 col-lg-4 fade-up">
        <div class="skill-card" data-bs-toggle="modal" data-bs-target="#modal-cpp">
          <div class="skill-icon" style="background:rgba(0,90,160,0.18);color:#1e88e5;">C++</div>
          <div class="skill-name">C++</div>
          <div class="skill-type">OOP &amp; Performance</div>
          <div class="skill-desc">Object-oriented power on top of C. Classes, templates, STL, and modern C++17/20 features.</div>
          <div class="skill-badge-row">
            <span class="skill-badge">OOP</span>
            <span class="skill-badge">STL</span>
            <span class="skill-badge">Templates</span>
            <span class="skill-badge">RAII</span>
          </div>
        </div>
      </div>

      <!-- Java -->
      <div class="col-sm-6 col-lg-4 fade-up">
        <div class="skill-card" data-bs-toggle="modal" data-bs-target="#modal-java">
          <div class="skill-icon" style="background:rgba(240,80,40,0.14);color:#f05028;">☕</div>
          <div class="skill-name">Java</div>
          <div class="skill-type">Enterprise &amp; OOP</div>
          <div class="skill-desc">Write once, run anywhere. Robust OOP, strong typing, and a rich ecosystem for enterprise apps.</div>
          <div class="skill-badge-row">
            <span class="skill-badge">OOP</span>
            <span class="skill-badge">JVM</span>
            <span class="skill-badge">Collections</span>
            <span class="skill-badge">Threads</span>
          </div>
        </div>
      </div>

      <!-- Python -->
      <div class="col-sm-6 col-lg-4 fade-up">
        <div class="skill-card" data-bs-toggle="modal" data-bs-target="#modal-python">
          <div class="skill-icon" style="background:rgba(55,120,200,0.15);color:#ffd43b;">🐍</div>
          <div class="skill-name">Python</div>
          <div class="skill-type">Scripting &amp; Data</div>
          <div class="skill-desc">Elegant, readable, and powerful. From automation scripts to data analysis and AI pipelines.</div>
          <div class="skill-badge-row">
            <span class="skill-badge">Scripting</span>
            <span class="skill-badge">Data</span>
            <span class="skill-badge">OOP</span>
            <span class="skill-badge">APIs</span>
          </div>
        </div>
      </div>

      <!-- HTML & CSS -->
      <div class="col-sm-6 col-lg-4 fade-up">
        <div class="skill-card" data-bs-toggle="modal" data-bs-target="#modal-html">
          <div class="skill-icon" style="background:rgba(230,70,40,0.14);color:#e64228;">&lt;/&gt;</div>
          <div class="skill-name">HTML &amp; CSS</div>
          <div class="skill-type">Structure &amp; Style</div>
          <div class="skill-desc">Semantic markup and expressive styling. The canvas on which every web experience is painted.</div>
          <div class="skill-badge-row">
            <span class="skill-badge">Semantic</span>
            <span class="skill-badge">Flexbox</span>
            <span class="skill-badge">Grid</span>
            <span class="skill-badge">Animations</span>
          </div>
        </div>
      </div>

      <!-- JavaScript -->
      <div class="col-sm-6 col-lg-4 fade-up">
        <div class="skill-card" data-bs-toggle="modal" data-bs-target="#modal-js">
          <div class="skill-icon" style="background:rgba(240,200,0,0.14);color:#f7df1e;">JS</div>
          <div class="skill-name">JavaScript</div>
          <div class="skill-type">Interactivity &amp; DOM</div>
          <div class="skill-desc">The language of the web. Dynamic interactions, async programming, and modern ES6+ patterns.</div>
          <div class="skill-badge-row">
            <span class="skill-badge">ES6+</span>
            <span class="skill-badge">Async</span>
            <span class="skill-badge">DOM</span>
            <span class="skill-badge">APIs</span>
          </div>
        </div>
      </div>

      <!-- Bootstrap -->
      <div class="col-sm-6 col-lg-4 fade-up">
        <div class="skill-card" data-bs-toggle="modal" data-bs-target="#modal-bs">
          <div class="skill-icon" style="background:rgba(120,70,200,0.14);color:#7952b3;">BS5</div>
          <div class="skill-name">Bootstrap 5</div>
          <div class="skill-type">UI Framework</div>
          <div class="skill-desc">Rapid, responsive, professional UI. Component-driven design with a powerful grid system.</div>
          <div class="skill-badge-row">
            <span class="skill-badge">Grid</span>
            <span class="skill-badge">Components</span>
            <span class="skill-badge">Utilities</span>
            <span class="skill-badge">Modals</span>
          </div>
        </div>
      </div>

      <!-- PHP -->
      <div class="col-sm-6 col-lg-4 fade-up">
        <div class="skill-card" data-bs-toggle="modal" data-bs-target="#modal-php">
          <div class="skill-icon" style="background:rgba(100,130,200,0.14);color:#8892be;">PHP</div>
          <div class="skill-name">PHP</div>
          <div class="skill-type">Server-Side Scripting</div>
          <div class="skill-desc">Powering the server side of the web. Dynamic pages, form handling, session management, and APIs.</div>
          <div class="skill-badge-row">
            <span class="skill-badge">Backend</span>
            <span class="skill-badge">Forms</span>
            <span class="skill-badge">Sessions</span>
            <span class="skill-badge">MySQL</span>
          </div>
        </div>
      </div>

      <!-- SQL -->
      <div class="col-sm-6 col-lg-4 fade-up">
        <div class="skill-card" data-bs-toggle="modal" data-bs-target="#modal-sql">
          <div class="skill-icon" style="background:rgba(0,160,100,0.14);color:#00c876;">SQL</div>
          <div class="skill-name">SQL</div>
          <div class="skill-type">Databases &amp; Queries</div>
          <div class="skill-desc">Structured data mastery. Complex queries, normalization, joins, indexing, and relational design.</div>
          <div class="skill-badge-row">
            <span class="skill-badge">MySQL</span>
            <span class="skill-badge">Joins</span>
            <span class="skill-badge">Indexes</span>
            <span class="skill-badge">Design</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     PROJECTS
════════════════════════════════════════════ -->
<section id="projects" class="section-pad">
  <div class="container">

    <div class="text-center mb-5 fade-up">
      <span class="section-label">Portfolio</span>
      <h2 class="section-title">Selected Projects</h2>
      <p class="section-subtitle mx-auto">
        Real work built with real code. Update these with your own projects.
      </p>
    </div>

    <div class="row g-4">

      <!-- Project 1 -->
      <div class="col-md-6 col-lg-4 fade-up">
        <div class="project-card" data-bs-toggle="modal" data-bs-target="#modal-proj1">
          <div class="project-thumb" style="background:linear-gradient(135deg,#1a2035,#2b3240);">
            <div class="project-thumb-code">
              #include &lt;stdio.h&gt;<br>
              int main() {<br>
              &nbsp;&nbsp;printf("Hello");<br>
              &nbsp;&nbsp;return 0;<br>
              }
            </div>
            <div class="project-thumb-icon">⚙️</div>
          </div>
          <div class="project-body">
            <div class="project-tag-row">
              <span class="project-tag gold">C</span>
              <span class="project-tag teal">Systems</span>
            </div>
            <div class="project-title">Memory Manager</div>
            <div class="project-desc">A custom heap memory allocator implementing malloc/free with coalescing &amp; boundary tags. Built in pure C for deep OS understanding.</div>
          </div>
          <div class="project-footer">
            <a href="#" class="project-link" onclick="return false;">View Details <span class="project-link-icon">→</span></a>
            <a href="#" class="project-link" onclick="return false;"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <!-- Project 2 -->
      <div class="col-md-6 col-lg-4 fade-up">
        <div class="project-card" data-bs-toggle="modal" data-bs-target="#modal-proj2">
          <div class="project-thumb" style="background:linear-gradient(135deg,#1c1a2e,#2b3240);">
            <div class="project-thumb-code">
              class Student {<br>
              &nbsp;&nbsp;private String name;<br>
              &nbsp;&nbsp;public void enroll()<br>
              &nbsp;&nbsp;{...}<br>
              }
            </div>
            <div class="project-thumb-icon">🎓</div>
          </div>
          <div class="project-body">
            <div class="project-tag-row">
              <span class="project-tag gold">Java</span>
              <span class="project-tag gold">SQL</span>
              <span class="project-tag teal">OOP</span>
            </div>
            <div class="project-title">Student Mgmt System</div>
            <div class="project-desc">A full Java application for managing student records, enrollment, &amp; grade tracking — backed by a normalized MySQL database.</div>
          </div>
          <div class="project-footer">
            <a href="#" class="project-link" onclick="return false;">View Details <span class="project-link-icon">→</span></a>
            <a href="#" class="project-link" onclick="return false;"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <!-- Project 3 -->
      <div class="col-md-6 col-lg-4 fade-up">
        <div class="project-card" data-bs-toggle="modal" data-bs-target="#modal-proj3">
          <div class="project-thumb" style="background:linear-gradient(135deg,#1a2028,#2b3240);">
            <div class="project-thumb-code">
              &lt;?php<br>
              $conn = mysqli_connect(...);<br>
              $q = "SELECT * FROM users";<br>
              $r = mysqli_query($conn,$q);<br>
              ?&gt;
            </div>
            <div class="project-thumb-icon">🌐</div>
          </div>
          <div class="project-body">
            <div class="project-tag-row">
              <span class="project-tag gold">PHP</span>
              <span class="project-tag gold">SQL</span>
              <span class="project-tag slate">Bootstrap</span>
            </div>
            <div class="project-title">CRUD Web App</div>
            <div class="project-desc">A complete PHP + MySQL CRUD application with user authentication, session management, &amp; a responsive Bootstrap 5 front-end.</div>
          </div>
          <div class="project-footer">
            <a href="#" class="project-link" onclick="return false;">View Details <span class="project-link-icon">→</span></a>
            <a href="#" class="project-link" onclick="return false;"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <!-- Project 4 -->
      <div class="col-md-6 col-lg-4 fade-up">
        <div class="project-card" data-bs-toggle="modal" data-bs-target="#modal-proj4">
          <div class="project-thumb" style="background:linear-gradient(135deg,#1a2330,#2b3240);">
            <div class="project-thumb-code">
              def analyze(data):<br>
              &nbsp;&nbsp;df = pd.DataFrame(data)<br>
              &nbsp;&nbsp;return df.describe()<br>
              <br>
              result = analyze(csv)
            </div>
            <div class="project-thumb-icon">📊</div>
          </div>
          <div class="project-body">
            <div class="project-tag-row">
              <span class="project-tag gold">Python</span>
              <span class="project-tag teal">Data</span>
            </div>
            <div class="project-title">Data Analyzer</div>
            <div class="project-desc">A Python CLI tool for reading, cleaning, &amp; summarizing CSV datasets. Produces statistical reports &amp; simple visualizations.</div>
          </div>
          <div class="project-footer">
            <a href="#" class="project-link" onclick="return false;">View Details <span class="project-link-icon">→</span></a>
            <a href="#" class="project-link" onclick="return false;"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <!-- Project 5 -->
      <div class="col-md-6 col-lg-4 fade-up">
        <div class="project-card" data-bs-toggle="modal" data-bs-target="#modal-proj5">
          <div class="project-thumb" style="background:linear-gradient(135deg,#1a2a1e,#2b3240);">
            <div class="project-thumb-code">
              const fetchData = async () => {<br>
              &nbsp;&nbsp;const r = await fetch(url);<br>
              &nbsp;&nbsp;const d = await r.json();<br>
              &nbsp;&nbsp;render(d);<br>
              };
            </div>
            <div class="project-thumb-icon">⚡</div>
          </div>
          <div class="project-body">
            <div class="project-tag-row">
              <span class="project-tag gold">JavaScript</span>
              <span class="project-tag slate">HTML/CSS</span>
            </div>
            <div class="project-title">Weather Dashboard</div>
            <div class="project-desc">A dynamic weather dashboard consuming a public REST API. Async fetch, live DOM updates, &amp; a clean responsive layout.</div>
          </div>
          <div class="project-footer">
            <a href="#" class="project-link" onclick="return false;">View Details <span class="project-link-icon">→</span></a>
            <a href="#" class="project-link" onclick="return false;"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <!-- Project 6 -->
      <div class="col-md-6 col-lg-4 fade-up">
        <div class="project-card" data-bs-toggle="modal" data-bs-target="#modal-proj6">
          <div class="project-thumb" style="background:linear-gradient(135deg,#2a1a20,#2b3240);">
            <div class="project-thumb-code">
              #include &lt;iostream&gt;<br>
              template&lt;typename T&gt;<br>
              class Stack {<br>
              &nbsp;&nbsp;vector&lt;T&gt; data;<br>
              };
            </div>
            <div class="project-thumb-icon">🧱</div>
          </div>
          <div class="project-body">
            <div class="project-tag-row">
              <span class="project-tag gold">C++</span>
              <span class="project-tag teal">DSA</span>
            </div>
            <div class="project-title">Data Structures Lib</div>
            <div class="project-desc">A templated C++ library implementing core data structures: linked lists, stacks, queues, binary trees, &amp; hash maps from scratch.</div>
          </div>
          <div class="project-footer">
            <a href="#" class="project-link" onclick="return false;">View Details <span class="project-link-icon">→</span></a>
            <a href="#" class="project-link" onclick="return false;"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     PROJECT MODALS
════════════════════════════════════════════ -->

<!-- Project 1 Modal -->
<div class="modal fade" id="modal-proj1" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <div><h5 class="modal-title">Memory Manager</h5><div class="section-label mt-1" style="margin-bottom:0">C · Systems Programming</div></div>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="modal-desc">A custom heap memory allocator written in pure C that implements <code>malloc</code>, <code>free</code>, &amp; <code>realloc</code>. Uses boundary tags for O(1) coalescing of adjacent free blocks &amp; a best-fit allocation strategy.</p>
        <div class="modal-section-label">Features</div>
        <div class="modal-tag-list mb-3">
          <span class="modal-tag">Boundary Tags</span><span class="modal-tag">Free List</span>
          <span class="modal-tag">Coalescing</span><span class="modal-tag">Best-Fit</span><span class="modal-tag">Alignment</span>
        </div>
        <div class="modal-section-label">Tech Stack</div>
        <div class="modal-tag-list">
          <span class="modal-tag">C</span><span class="modal-tag">GCC</span><span class="modal-tag">Valgrind</span><span class="modal-tag">Make</span>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#" class="btn-primary-custom" onclick="return false;"><i class="fab fa-github me-2"></i>View on GitHub</a>
        <button class="btn-outline-custom" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Project 2 Modal -->
<div class="modal fade" id="modal-proj2" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <div><h5 class="modal-title">Student Management System</h5><div class="section-label mt-1" style="margin-bottom:0">Java · SQL · OOP</div></div>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="modal-desc">A desktop-style Java application for academic record management. Features full CRUD operations on student, course, &amp; enrollment entities backed by a normalized MySQL schema. Built with MVC architecture.</p>
        <div class="modal-section-label">Features</div>
        <div class="modal-tag-list mb-3">
          <span class="modal-tag">CRUD Operations</span><span class="modal-tag">MVC Pattern</span>
          <span class="modal-tag">Login System</span><span class="modal-tag">Grade Reports</span>
        </div>
        <div class="modal-section-label">Tech Stack</div>
        <div class="modal-tag-list">
          <span class="modal-tag">Java</span><span class="modal-tag">MySQL</span><span class="modal-tag">JDBC</span>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#" class="btn-primary-custom" onclick="return false;"><i class="fab fa-github me-2"></i>View on GitHub</a>
        <button class="btn-outline-custom" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Project 3 Modal -->
<div class="modal fade" id="modal-proj3" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <div><h5 class="modal-title">CRUD Web Application</h5><div class="section-label mt-1" style="margin-bottom:0">PHP · SQL · Bootstrap</div></div>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="modal-desc">A full-stack web application built with PHP &amp; MySQL. Includes user registration, login with hashed passwords, session management, &amp; a Bootstrap 5 admin panel for data management.</p>
        <div class="modal-section-label">Features</div>
        <div class="modal-tag-list mb-3">
          <span class="modal-tag">Auth System</span><span class="modal-tag">CRUD</span>
          <span class="modal-tag">Responsive UI</span><span class="modal-tag">Prepared Statements</span>
        </div>
        <div class="modal-section-label">Tech Stack</div>
        <div class="modal-tag-list">
          <span class="modal-tag">PHP</span><span class="modal-tag">MySQL</span><span class="modal-tag">Bootstrap 5</span><span class="modal-tag">HTML/CSS</span>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#" class="btn-primary-custom" onclick="return false;"><i class="fab fa-github me-2"></i>View on GitHub</a>
        <button class="btn-outline-custom" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Project 4 Modal -->
<div class="modal fade" id="modal-proj4" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <div><h5 class="modal-title">Data Analyzer</h5><div class="section-label mt-1" style="margin-bottom:0">Python · Data</div></div>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="modal-desc">A Python command-line tool that ingests CSV files, performs data cleaning (null handling, type inference), &amp; generates statistical summaries &amp; simple ASCII/Matplotlib charts of key distributions.</p>
        <div class="modal-section-label">Features</div>
        <div class="modal-tag-list mb-3">
          <span class="modal-tag">CSV Parsing</span><span class="modal-tag">Data Cleaning</span>
          <span class="modal-tag">Statistics</span><span class="modal-tag">Visualizations</span>
        </div>
        <div class="modal-section-label">Tech Stack</div>
        <div class="modal-tag-list">
          <span class="modal-tag">Python</span><span class="modal-tag">csv module</span><span class="modal-tag">argparse</span>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#" class="btn-primary-custom" onclick="return false;"><i class="fab fa-github me-2"></i>View on GitHub</a>
        <button class="btn-outline-custom" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Project 5 Modal -->
<div class="modal fade" id="modal-proj5" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <div><h5 class="modal-title">Weather Dashboard</h5><div class="section-label mt-1" style="margin-bottom:0">JavaScript · HTML/CSS</div></div>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="modal-desc">A vanilla JavaScript weather app that fetches live data from the OpenWeatherMap API. Features city search, 5-day forecast, dynamic background gradients based on weather conditions, &amp; localStorage for recent searches.</p>
        <div class="modal-section-label">Features</div>
        <div class="modal-tag-list mb-3">
          <span class="modal-tag">REST API</span><span class="modal-tag">async/await</span>
          <span class="modal-tag">Dynamic DOM</span><span class="modal-tag">localStorage</span>
        </div>
        <div class="modal-section-label">Tech Stack</div>
        <div class="modal-tag-list">
          <span class="modal-tag">JavaScript</span><span class="modal-tag">HTML5</span><span class="modal-tag">CSS3</span>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#" class="btn-primary-custom" onclick="return false;"><i class="fab fa-github me-2"></i>View on GitHub</a>
        <button class="btn-outline-custom" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Project 6 Modal -->
<div class="modal fade" id="modal-proj6" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <div><h5 class="modal-title">Data Structures Library</h5><div class="section-label mt-1" style="margin-bottom:0">C++ · DSA</div></div>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="modal-desc">A header-only C++ template library implementing common data structures from scratch: singly/doubly linked lists, stacks, queues, binary search trees, &amp; a chained hash map — all with full unit tests.</p>
        <div class="modal-section-label">Features</div>
        <div class="modal-tag-list mb-3">
          <span class="modal-tag">Templated</span><span class="modal-tag">Iterator Support</span>
          <span class="modal-tag">Exception Safe</span><span class="modal-tag">Unit Tested</span>
        </div>
        <div class="modal-section-label">Tech Stack</div>
        <div class="modal-tag-list">
          <span class="modal-tag">C++17</span><span class="modal-tag">GCC</span><span class="modal-tag">CMake</span>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#" class="btn-primary-custom" onclick="return false;"><i class="fab fa-github me-2"></i>View on GitHub</a>
        <button class="btn-outline-custom" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div> -->