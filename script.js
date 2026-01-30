/**
 * Git Commands Cheat Sheet
 * - No build step
 * - Data-driven rendering
 * - Search + category filters
 */

/**
 * @typedef {Object} GitCommand
 * @property {string} id
 * @property {string} category
 * @property {string} title
 * @property {string} description
 * @property {string} syntax
 * @property {string[]} examples
 * @property {string[]} [notes]
 */

/** @type {GitCommand[]} */
const COMMANDS = [
  {
    id: "config",
    category: "Config",
    title: "git config",
    description: "Get and set repository or global Git configuration options.",
    syntax:
      "git config [--global] <key> <value>\n" +
      "git config [--global] --list\n" +
      "git config [--global] --get <key>",
    examples: [
      "git config --global user.name \"Your Name\"",
      "git config --global user.email you@example.com",
      "git config --list",
    ],
    notes: [
      "Use --global for machine-wide identity/settings; omit it to set config only for this repo.",
    ],
  },
  {
    id: "init",
    category: "Basics",
    title: "git init",
    description: "Create a new Git repository in the current folder.",
    syntax: "git init [<directory>]",
    examples: ["git init", "git init my-project"],
  },
  {
    id: "clone",
    category: "Basics",
    title: "git clone",
    description: "Download an existing repository (including history) to your machine.",
    syntax: "git clone <repo-url> [<directory>]",
    examples: [
      "git clone https://github.com/user/repo.git",
      "git clone git@github.com:user/repo.git my-repo",
    ],
  },
  {
    id: "status",
    category: "Basics",
    title: "git status",
    description: "Show the working tree status (staged/unstaged/untracked).",
    syntax: "git status [-sb]",
    examples: ["git status", "git status -sb"],
  },
  {
    id: "add",
    category: "Basics",
    title: "git add",
    description: "Stage changes (add file contents to the index) before committing.",
    syntax: "git add <path>\ngit add .\ngit add -p",
    examples: [
      "git add .",
      "git add src/app.js",
      "git add -p  # stage hunks interactively",
    ],
  },
  {
    id: "commit",
    category: "Basics",
    title: "git commit",
    description: "Create a new commit from staged changes.",
    syntax: "git commit -m <message>\ngit commit --amend",
    examples: [
      "git commit -m \"Add login form\"",
      "git commit --amend  # edit last commit (message and/or staged changes)",
    ],
    notes: [
      "Amend rewrites history of the last commit — avoid amending commits already pushed to shared branches.",
    ],
  },
  {
    id: "log",
    category: "History",
    title: "git log",
    description: "View commit history.",
    syntax:
      "git log\n" +
      "git log --oneline --graph --decorate --all\n" +
      "git log -p",
    examples: [
      "git log --oneline",
      "git log --oneline --graph --decorate --all",
      "git log -p  # include diffs",
    ],
  },
  {
    id: "diff",
    category: "History",
    title: "git diff",
    description: "Show differences between commits and working tree/index.",
    syntax: "git diff\ngit diff --staged\ngit diff <commitA>..<commitB>",
    examples: [
      "git diff",
      "git diff --staged",
      "git diff HEAD~1..HEAD",
    ],
  },
  {
    id: "show",
    category: "History",
    title: "git show",
    description: "Inspect an object (commonly a commit).",
    syntax: "git show [<object>]",
    examples: ["git show", "git show HEAD", "git show <commit-hash>"],
  },
  {
    id: "branch",
    category: "Branching",
    title: "git branch",
    description: "List, create, rename, or delete branches.",
    syntax:
      "git branch\n" +
      "git branch <name>\n" +
      "git branch -d <name>\n" +
      "git branch -m <old> <new>",
    examples: [
      "git branch",
      "git branch feature/login",
      "git branch -d feature/login",
      "git branch -m old-name new-name",
    ],
  },
  {
    id: "switch",
    category: "Branching",
    title: "git switch",
    description: "Switch branches (modern alternative to checkout for branches).",
    syntax: "git switch <branch>\ngit switch -c <new-branch>",
    examples: ["git switch main", "git switch -c feature/api"],
  },
  {
    id: "checkout",
    category: "Branching",
    title: "git checkout (legacy)",
    description:
      "Older multi-purpose command used for switching branches and checking out paths.",
    syntax: "git checkout <branch>\ngit checkout -b <new-branch>",
    examples: ["git checkout main", "git checkout -b feature/ui"],
    notes: ["Prefer git switch (branches) and git restore (files) when possible."],
  },
  {
    id: "merge",
    category: "Merge/Rebase",
    title: "git merge",
    description: "Merge another branch into the current branch.",
    syntax: "git merge <branch>",
    examples: ["git merge feature/login"],
  },
  {
    id: "rebase",
    category: "Merge/Rebase",
    title: "git rebase",
    description: "Reapply commits on top of another base tip (rewrites history).",
    syntax: "git rebase <upstream>\ngit rebase -i <upstream>",
    examples: [
      "git rebase main",
      "git rebase -i HEAD~3  # edit/squash last 3 commits",
    ],
    notes: ["Avoid rebasing commits already pushed to shared branches unless your team expects it."],
  },
  {
    id: "remote",
    category: "Remote",
    title: "git remote",
    description: "Manage set of tracked repositories (remotes).",
    syntax:
      "git remote -v\n" +
      "git remote add <name> <url>\n" +
      "git remote set-url <name> <url>",
    examples: [
      "git remote -v",
      "git remote add origin https://github.com/user/repo.git",
      "git remote set-url origin git@github.com:user/repo.git",
    ],
  },
  {
    id: "fetch",
    category: "Remote",
    title: "git fetch",
    description: "Download objects/refs from a remote without integrating them.",
    syntax: "git fetch [<remote>] [<refspec>]",
    examples: ["git fetch", "git fetch origin"],
    notes: ["Fetch updates remote-tracking branches like origin/main."],
  },
  {
    id: "pull",
    category: "Remote",
    title: "git pull",
    description: "Fetch from remote and integrate into the current branch.",
    syntax: "git pull [--rebase] [<remote>] [<branch>]",
    examples: ["git pull", "git pull --rebase origin main"],
    notes: ["Equivalent to fetch + merge (or fetch + rebase with --rebase)."],
  },
  {
    id: "push",
    category: "Remote",
    title: "git push",
    description: "Upload local commits/refs to a remote.",
    syntax: "git push [<remote>] [<branch>]\ngit push -u <remote> <branch>",
    examples: ["git push", "git push -u origin main"],
    notes: ["-u sets upstream so future `git push`/`git pull` work without args."],
  },
  {
    id: "restore",
    category: "Undo/Reset",
    title: "git restore",
    description: "Restore working tree files (modern alternative to checkout for files).",
    syntax: "git restore <path>\ngit restore --staged <path>",
    examples: [
      "git restore src/app.js  # discard unstaged changes",
      "git restore --staged src/app.js  # unstage file",
    ],
  },
  {
    id: "reset",
    category: "Undo/Reset",
    title: "git reset",
    description:
      "Move HEAD and optionally modify index/working tree (powerful for undoing local changes).",
    syntax: "git reset [--soft|--mixed|--hard] <commit>",
    examples: [
      "git reset --soft HEAD~1   # undo commit, keep changes staged",
      "git reset --mixed HEAD~1  # undo commit, keep changes unstaged",
      "git reset --hard HEAD~1   # discard commit + changes (danger)",
    ],
    notes: ["Be careful with --hard; it discards local work."],
  },
  {
    id: "revert",
    category: "Undo/Reset",
    title: "git revert",
    description: "Create a new commit that reverses changes from an earlier commit.",
    syntax: "git revert <commit>",
    examples: ["git revert <commit-hash>", "git revert HEAD"],
    notes: ["Safe for shared branches because it doesn’t rewrite history."],
  },
  {
    id: "stash",
    category: "Stash",
    title: "git stash",
    description: "Temporarily save uncommitted changes so you can switch context.",
    syntax: "git stash\ngit stash push -m <message>\ngit stash pop",
    examples: [
      "git stash push -m \"WIP: refactor\"",
      "git stash list",
      "git stash pop",
    ],
  },
  {
    id: "tag",
    category: "Tags",
    title: "git tag",
    description: "Create, list, delete tags (often used for releases).",
    syntax: "git tag\ngit tag <name>\ngit tag -a <name> -m <message>",
    examples: [
      "git tag",
      "git tag v1.0.0",
      "git tag -a v1.0.0 -m \"Release 1.0.0\"",
    ],
  },
  {
    id: "clean",
    category: "Cleanup",
    title: "git clean",
    description: "Remove untracked files from the working tree.",
    syntax: "git clean -n\ngit clean -fd",
    examples: [
      "git clean -n   # preview what would be removed",
      "git clean -fd  # remove untracked files + folders",
    ],
    notes: ["Start with -n (dry-run). This can delete files permanently."],
  },
];

const ALL_CATEGORY = "All";

/** @returns {string[]} */
function getCategories() {
  const unique = new Set(COMMANDS.map((c) => c.category));
  return [ALL_CATEGORY, ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
}

/**
 * @param {GitCommand} cmd
 * @returns {string}
 */
function commandToSearchText(cmd) {
  const notes = (cmd.notes ?? []).join(" ");
  return [cmd.title, cmd.category, cmd.description, cmd.syntax, ...cmd.examples, notes]
    .join("\n")
    .toLowerCase();
}

/**
 * @param {GitCommand} cmd
 * @returns {HTMLElement}
 */
function renderCard(cmd) {
  const card = document.createElement("article");
  card.className = "card";

  const top = document.createElement("div");
  top.className = "card__top";

  const h = document.createElement("h2");
  h.className = "cmd";
  h.textContent = cmd.title;

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = cmd.category;

  top.appendChild(h);
  top.appendChild(badge);

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = cmd.description;

  const syntaxTitle = document.createElement("div");
  syntaxTitle.className = "sectionTitle";
  syntaxTitle.textContent = "Syntax";

  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.textContent = cmd.syntax;
  pre.appendChild(code);

  const examplesTitle = document.createElement("div");
  examplesTitle.className = "sectionTitle";
  examplesTitle.textContent = "Examples";

  const ul = document.createElement("ul");
  cmd.examples.forEach((ex) => {
    const li = document.createElement("li");
    const c = document.createElement("code");
    c.textContent = ex;
    li.appendChild(c);
    ul.appendChild(li);
  });

  card.appendChild(top);
  card.appendChild(desc);
  card.appendChild(syntaxTitle);
  card.appendChild(pre);
  card.appendChild(examplesTitle);
  card.appendChild(ul);

  if (cmd.notes && cmd.notes.length) {
    const notes = document.createElement("div");
    notes.className = "notes";
    notes.innerHTML = `<b>Notes:</b> ${cmd.notes
      .map((n) => escapeHtml(n))
      .join(" ")}`;
    card.appendChild(notes);
  }

  return card;
}

/**
 * Basic escaping since we use innerHTML for notes.
 * @param {string} str
 */
function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * @param {{search: string, category: string}} state
 */
function filterCommands(state) {
  const q = state.search.trim().toLowerCase();
  return COMMANDS.filter((cmd) => {
    const categoryOk = state.category === ALL_CATEGORY || cmd.category === state.category;
    if (!categoryOk) return false;
    if (!q) return true;
    return commandToSearchText(cmd).includes(q);
  });
}

function main() {
  const cardsEl = document.getElementById("cards");
  const searchInput = document.getElementById("searchInput");
  const chipsEl = document.getElementById("categoryChips");
  const resultsCount = document.getElementById("resultsCount");
  const emptyState = document.getElementById("emptyState");
  const activeFilters = document.getElementById("activeFilters");

  if (!cardsEl || !searchInput || !chipsEl || !resultsCount || !emptyState || !activeFilters) {
    return;
  }

  const state = {
    search: "",
    category: ALL_CATEGORY,
  };

  /** @param {string} category */
  function setCategory(category) {
    state.category = category;
    render();
  }

  function renderChips() {
    const cats = getCategories();
    chipsEl.innerHTML = "";
    cats.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = cat;
      btn.setAttribute("aria-pressed", String(cat === state.category));
      btn.addEventListener("click", () => setCategory(cat));
      chipsEl.appendChild(btn);
    });
  }

  function render() {
    const filtered = filterCommands(state);
    cardsEl.innerHTML = "";
    filtered.forEach((cmd) => cardsEl.appendChild(renderCard(cmd)));

    resultsCount.textContent = `${filtered.length} command${filtered.length === 1 ? "" : "s"}`;

    const parts = [];
    if (state.category !== ALL_CATEGORY)
      parts.push(`Category: <b>${escapeHtml(state.category)}</b>`);
    if (state.search.trim())
      parts.push(`Search: <b>${escapeHtml(state.search.trim())}</b>`);
    activeFilters.innerHTML = parts.length ? `Filtering by ${parts.join(" · ")}` : "";

    emptyState.hidden = filtered.length !== 0;
  }

  renderChips();
  render();

  searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    render();
  });

  // Keyboard shortcut: press / to focus search
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", main);
