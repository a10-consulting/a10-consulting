/* ============================================================
   A10 Projects — Application JavaScript
   Single-file SPA with localStorage persistence
   ============================================================ */

'use strict';

/* ── Constants ─────────────────────────────────────────────── */

const USERS = [
  { id: 1, name: 'Alexandre Costa',  email: 'admin@a10-consulting.com', password: 'a10admin2026', role: 'admin',      avatar: 'AC' },
  { id: 2, name: 'Sofia Martins',    email: 'ops@a10-consulting.com',   password: 'a10ops2026',   role: 'consultant', avatar: 'SM' },
  { id: 3, name: 'Ricardo Ferreira', email: 'r.ferreira@a10-consulting.com', password: 'a10rf2026', role: 'consultant', avatar: 'RF' },
];

const SECTORS = [
  'Mining & Exploration',
  'Supply Chain & Logistics',
  'Operations & Infrastructure',
  'Performance & Cost Transformation',
];

const PHASES = ['Diagnose', 'Design', 'Execute', 'Deliver'];

const TASK_STATUSES = ['todo', 'in-progress', 'completed', 'blocked'];

const PROJECT_STATUSES = ['draft', 'active', 'on-hold', 'completed'];

const PRIORITIES = ['low', 'medium', 'high', 'critical'];

const ACTION_STATUSES = ['open', 'in-progress', 'done'];

const BUDGET_CATEGORIES = [
  'Personnel', 'Travel & Accommodation', 'Technology',
  'External Services', 'Materials', 'Overheads', 'Contingency',
];

const DOC_TYPES = {
  'project-brief':    { label: 'Project Brief',      icon: '📋' },
  'status-report':    { label: 'Status Report',      icon: '📊' },
  'meeting-minutes':  { label: 'Meeting Minutes',    icon: '📝' },
  'engagement-letter':{ label: 'Engagement Letter',  icon: '📄' },
};

/* ── Seed Data ─────────────────────────────────────────────── */

const SEED = {
  projects: [
    {
      id: 'proj-1',
      name: 'Mining Operations Optimisation',
      client: 'Acme Resources Ltd',
      sector: 'Mining & Exploration',
      status: 'active',
      lead: 'Alexandre Costa',
      startDate: '2026-01-15',
      endDate: '2026-06-30',
      budget: 250000,
      description: 'Systematic review and optimisation of mining operations to reduce operating costs by 15% and improve productivity through process redesign, contractor management improvement and supply chain consolidation.',
      createdAt: '2026-01-10T09:00:00Z',
    },
    {
      id: 'proj-2',
      name: 'Supply Chain Redesign',
      client: 'GlobalTrans SA',
      sector: 'Supply Chain & Logistics',
      status: 'active',
      lead: 'Sofia Martins',
      startDate: '2025-11-01',
      endDate: '2026-04-30',
      budget: 180000,
      description: 'End-to-end supply chain redesign covering procurement strategy, vendor rationalisation, logistics optimisation and implementation of demand forecasting systems to support international operations.',
      createdAt: '2025-10-28T10:30:00Z',
    },
    {
      id: 'proj-3',
      name: 'Infrastructure Delivery Programme',
      client: 'BuildCorp International',
      sector: 'Operations & Infrastructure',
      status: 'on-hold',
      lead: 'Alexandre Costa',
      startDate: '2026-02-01',
      endDate: '2026-12-31',
      budget: 420000,
      description: 'Multi-workstream infrastructure delivery programme for greenfield industrial facility. Scope includes contractor management framework, programme governance, scheduling and reporting to executive stakeholders.',
      createdAt: '2026-01-20T08:00:00Z',
    },
    {
      id: 'proj-4',
      name: 'EBITDA Improvement Initiative',
      client: 'Meridian Industrial Group',
      sector: 'Performance & Cost Transformation',
      status: 'completed',
      lead: 'Ricardo Ferreira',
      startDate: '2025-08-01',
      endDate: '2025-12-31',
      budget: 160000,
      description: 'Structured cost reduction programme targeting structural inefficiencies across operations, procurement and overhead. Delivered +8pp EBITDA margin improvement within five months.',
      createdAt: '2025-07-25T11:00:00Z',
    },
  ],
  tasks: [
    /* proj-1 */
    { id: 't1', projectId: 'proj-1', name: 'Operational Assessment',  phase: 'Diagnose', assignee: 'Alexandre Costa', startDate: '2026-01-15', dueDate: '2026-01-31', status: 'completed', percentDone: 100 },
    { id: 't2', projectId: 'proj-1', name: 'Cost Structure Analysis', phase: 'Diagnose', assignee: 'Sofia Martins',    startDate: '2026-01-20', dueDate: '2026-02-10', status: 'completed', percentDone: 100 },
    { id: 't3', projectId: 'proj-1', name: 'Optimisation Blueprint',  phase: 'Design',   assignee: 'Alexandre Costa', startDate: '2026-02-11', dueDate: '2026-03-14', status: 'completed', percentDone: 100 },
    { id: 't4', projectId: 'proj-1', name: 'Contractor Renegotiation',phase: 'Execute',  assignee: 'Alexandre Costa', startDate: '2026-03-15', dueDate: '2026-04-30', status: 'in-progress', percentDone: 60 },
    { id: 't5', projectId: 'proj-1', name: 'Process Implementation',  phase: 'Execute',  assignee: 'Sofia Martins',   startDate: '2026-04-01', dueDate: '2026-05-31', status: 'in-progress', percentDone: 20 },
    { id: 't6', projectId: 'proj-1', name: 'Performance Handover',   phase: 'Deliver',  assignee: 'Alexandre Costa', startDate: '2026-06-01', dueDate: '2026-06-30', status: 'todo', percentDone: 0 },
    /* proj-2 */
    { id: 't7',  projectId: 'proj-2', name: 'Supply Chain Diagnostic', phase: 'Diagnose', assignee: 'Sofia Martins',  startDate: '2025-11-01', dueDate: '2025-11-30', status: 'completed', percentDone: 100 },
    { id: 't8',  projectId: 'proj-2', name: 'Vendor Analysis',         phase: 'Diagnose', assignee: 'Sofia Martins',  startDate: '2025-11-15', dueDate: '2025-12-15', status: 'completed', percentDone: 100 },
    { id: 't9',  projectId: 'proj-2', name: 'Future State Design',     phase: 'Design',   assignee: 'Sofia Martins',  startDate: '2025-12-16', dueDate: '2026-01-31', status: 'completed', percentDone: 100 },
    { id: 't10', projectId: 'proj-2', name: 'Vendor Rationalisation',  phase: 'Execute',  assignee: 'Ricardo Ferreira', startDate: '2026-02-01', dueDate: '2026-03-31', status: 'in-progress', percentDone: 80 },
    { id: 't11', projectId: 'proj-2', name: 'System Implementation',   phase: 'Execute',  assignee: 'Sofia Martins',  startDate: '2026-03-01', dueDate: '2026-04-15', status: 'in-progress', percentDone: 35 },
    { id: 't12', projectId: 'proj-2', name: 'Capability Transfer',     phase: 'Deliver',  assignee: 'Sofia Martins',  startDate: '2026-04-16', dueDate: '2026-04-30', status: 'todo', percentDone: 0 },
    /* proj-3 */
    { id: 't13', projectId: 'proj-3', name: 'Programme Assessment',    phase: 'Diagnose', assignee: 'Alexandre Costa', startDate: '2026-02-01', dueDate: '2026-02-28', status: 'completed', percentDone: 100 },
    { id: 't14', projectId: 'proj-3', name: 'Governance Framework',    phase: 'Design',   assignee: 'Alexandre Costa', startDate: '2026-03-01', dueDate: '2026-04-15', status: 'in-progress', percentDone: 40 },
    { id: 't15', projectId: 'proj-3', name: 'Contractor Mobilisation', phase: 'Execute',  assignee: 'Ricardo Ferreira', startDate: '2026-04-16', dueDate: '2026-08-31', status: 'todo', percentDone: 0 },
    { id: 't16', projectId: 'proj-3', name: 'Programme Delivery',      phase: 'Deliver',  assignee: 'Alexandre Costa', startDate: '2026-09-01', dueDate: '2026-12-31', status: 'todo', percentDone: 0 },
    /* proj-4 */
    { id: 't17', projectId: 'proj-4', name: 'P&L Diagnostic',          phase: 'Diagnose', assignee: 'Ricardo Ferreira', startDate: '2025-08-01', dueDate: '2025-08-31', status: 'completed', percentDone: 100 },
    { id: 't18', projectId: 'proj-4', name: 'Cost Reduction Roadmap',  phase: 'Design',   assignee: 'Ricardo Ferreira', startDate: '2025-09-01', dueDate: '2025-09-30', status: 'completed', percentDone: 100 },
    { id: 't19', projectId: 'proj-4', name: 'Cost Reduction Execution',phase: 'Execute',  assignee: 'Ricardo Ferreira', startDate: '2025-10-01', dueDate: '2025-11-30', status: 'completed', percentDone: 100 },
    { id: 't20', projectId: 'proj-4', name: 'Results Validation',      phase: 'Deliver',  assignee: 'Ricardo Ferreira', startDate: '2025-12-01', dueDate: '2025-12-31', status: 'completed', percentDone: 100 },
  ],
  actionItems: [
    { id: 'a1',  projectId: 'proj-1', scope: 'Commercial',       description: 'Finalise contractor renegotiation terms with primary drilling contractor', details: 'Three contractors in scope. Apex Drilling is priority.', owner: 'Alexandre Costa', startDate: '2026-04-01', dueDate: '2026-04-30', priority: 'high',     status: 'in-progress', operationalImpact: 'Cost reduction of ~8% on drilling line', comments: 'Draft terms circulated, awaiting client sign-off' },
    { id: 'a2',  projectId: 'proj-1', scope: 'Compliance',       description: 'Obtain updated HSEC approval for revised site processes',                owner: 'Alexandre Costa', startDate: '2026-04-15', dueDate: '2026-05-15', priority: 'critical',  status: 'open',        operationalImpact: 'Blocks Phase 3 execution start',         comments: '' },
    { id: 'a3',  projectId: 'proj-1', scope: 'Reporting',        description: 'Present cost model to CFO before next board meeting',                   owner: 'Sofia Martins',    startDate: '2026-04-20', dueDate: '2026-05-01', priority: 'high',     status: 'open',        operationalImpact: 'Board approval required for Phase 3',    comments: 'Board meeting scheduled 7 May' },
    { id: 'a4',  projectId: 'proj-1', scope: 'Planning',         description: 'Update project schedule for Phase 3 delay',                             owner: 'Alexandre Costa', startDate: '2026-04-10', dueDate: '2026-04-25', priority: 'medium',   status: 'done',        operationalImpact: 'Schedule baseline refresh',              comments: 'Completed and distributed to team' },
    { id: 'a5',  projectId: 'proj-2', scope: 'Procurement',      description: 'Confirm shortlisted vendor contracts for review',                       owner: 'Sofia Martins',    startDate: '2026-03-15', dueDate: '2026-03-31', priority: 'high',     status: 'done',        operationalImpact: 'Vendor rationalisation from 14 to 4',    comments: '4 vendors confirmed and notified' },
    { id: 'a6',  projectId: 'proj-2', scope: 'Reporting',        description: 'Submit interim results to client steering committee',                   owner: 'Sofia Martins',    startDate: '2026-03-28', dueDate: '2026-04-05', priority: 'high',     status: 'in-progress', operationalImpact: 'Steering committee buy-in for Phase 3',  comments: '' },
    { id: 'a7',  projectId: 'proj-2', scope: 'Operations',       description: 'Align logistics KPIs with client operations team',                      owner: 'Ricardo Ferreira', startDate: '2026-04-05', dueDate: '2026-04-20', priority: 'medium',   status: 'open',        operationalImpact: 'KPI framework for WMS go-live',          comments: '' },
    { id: 'a8',  projectId: 'proj-3', scope: 'Governance',       description: 'Obtain client approval on governance framework document',               owner: 'Alexandre Costa', startDate: '2026-04-01', dueDate: '2026-04-15', priority: 'critical',  status: 'open',        operationalImpact: 'Project unblocked once approved',        comments: 'Project on hold pending this approval' },
    { id: 'a9',  projectId: 'proj-3', scope: 'Risk Management',  description: 'Complete risk register for Phase 2',                                    owner: 'Ricardo Ferreira', startDate: '2026-03-15', dueDate: '2026-03-31', priority: 'high',     status: 'in-progress', operationalImpact: 'Required for contractor mobilisation',   comments: '' },
    { id: 'a10', projectId: 'proj-3', scope: 'Mobilisation',     description: 'Schedule kick-off meeting with main contractor',                        owner: 'Alexandre Costa', startDate: '2026-04-20', dueDate: '2026-04-30', priority: 'medium',   status: 'open',        operationalImpact: 'Contractor on-site readiness',           comments: '' },
  ],
  budgetItems: [
    /* proj-1 */
    { id: 'b1', projectId: 'proj-1', category: 'Personnel',             planned: 150000, actual: 52000, notes: 'A10 team fees' },
    { id: 'b2', projectId: 'proj-1', category: 'Travel & Accommodation',planned: 35000,  actual: 18500, notes: 'Site visits — 4 trips to date' },
    { id: 'b3', projectId: 'proj-1', category: 'External Services',     planned: 40000,  actual: 12000, notes: 'Specialist technical consultants' },
    { id: 'b4', projectId: 'proj-1', category: 'Technology',            planned: 15000,  actual: 5000,  notes: 'Software licences and tools' },
    { id: 'b5', projectId: 'proj-1', category: 'Contingency',           planned: 10000,  actual: 0,     notes: '4% contingency reserve' },
    /* proj-2 */
    { id: 'b6', projectId: 'proj-2', category: 'Personnel',             planned: 110000, actual: 72000, notes: 'A10 team fees' },
    { id: 'b7', projectId: 'proj-2', category: 'Travel & Accommodation',planned: 20000,  actual: 15000, notes: '3 cities covered' },
    { id: 'b8', projectId: 'proj-2', category: 'Technology',            planned: 25000,  actual: 18000, notes: 'WMS integration tools' },
    { id: 'b9', projectId: 'proj-2', category: 'Contingency',           planned: 25000,  actual: 7000,  notes: '' },
    /* proj-3 */
    { id: 'b10', projectId: 'proj-3', category: 'Personnel',             planned: 260000, actual: 52000, notes: 'A10 team fees — 11 months' },
    { id: 'b11', projectId: 'proj-3', category: 'Travel & Accommodation',planned: 60000,  actual: 14000, notes: 'Site-based work' },
    { id: 'b12', projectId: 'proj-3', category: 'External Services',     planned: 50000,  actual: 8000,  notes: 'Engineering subcontractors' },
    { id: 'b13', projectId: 'proj-3', category: 'Technology',            planned: 20000,  actual: 5000,  notes: '' },
    { id: 'b14', projectId: 'proj-3', category: 'Materials',             planned: 15000,  actual: 3000,  notes: '' },
    { id: 'b15', projectId: 'proj-3', category: 'Contingency',           planned: 15000,  actual: 2000,  notes: '' },
    /* proj-4 */
    { id: 'b16', projectId: 'proj-4', category: 'Personnel',             planned: 120000, actual: 118000, notes: 'A10 team fees' },
    { id: 'b17', projectId: 'proj-4', category: 'Travel & Accommodation',planned: 18000,  actual: 16500,  notes: '' },
    { id: 'b18', projectId: 'proj-4', category: 'Technology',            planned: 12000,  actual: 9800,   notes: '' },
    { id: 'b19', projectId: 'proj-4', category: 'Contingency',           planned: 10000,  actual: 4200,   notes: '' },
  ],
  documents: [
    {
      id: 'd1',
      projectId: 'proj-1',
      type: 'project-brief',
      title: 'Project Brief — Mining Operations Optimisation',
      createdAt: '2026-01-12T10:00:00Z',
      createdBy: 'Alexandre Costa',
      content: {
        objective: 'Reduce operating costs by 15% and improve site productivity through systematic process redesign and contractor performance management.',
        scope: 'Full operational review including drilling, processing, maintenance, supply chain and overhead functions.',
        deliverables: '1. Operational assessment report\n2. Cost reduction roadmap\n3. Implementation plan\n4. Monthly progress reports\n5. Final results validation',
        timeline: '15 January 2026 – 30 June 2026 (5.5 months)',
        team: 'Alexandre Costa (Lead), Sofia Martins (Analyst)',
        commercial: 'Fixed-fee engagement of €250,000 excl. expenses. Invoiced in four equal instalments.',
      },
    },
    {
      id: 'd2',
      projectId: 'proj-2',
      type: 'status-report',
      title: 'Status Report — Week 20',
      createdAt: '2026-03-10T09:00:00Z',
      createdBy: 'Sofia Martins',
      content: {
        period: 'Week ending 8 March 2026',
        summary: 'Strong progress this week. Vendor rationalisation reached 80% completion. Four shortlisted vendors have been formally notified. System integration design approved by client IT team.',
        completed: '- Vendor shortlist reduced from 14 to 4\n- Contract templates issued to preferred vendors\n- WMS integration design sign-off received\n- Interim results presented to Steering Committee',
        planned: '- Vendor contract negotiations (target: complete by 20 March)\n- Begin system UAT planning\n- Logistics KPI alignment workshop with operations team',
        risks: 'Vendor contract negotiation may extend beyond 20 March if legal review takes longer than expected. Mitigation: parallel-tracking two vendors to reduce dependency.',
        issues: 'None critical at this stage.',
        actions: 'Ricardo to align logistics KPIs with operations team by 20 April.',
      },
    },
  ],
  clients: [
    { id: 'cli-1', name: 'Acme Resources Ltd',       sector: 'Mining & Exploration',              contact: 'James Whitfield', email: 'j.whitfield@acme.com',      phone: '+61 8 9000 1234',  country: 'Australia',    notes: 'Key account. Ongoing relationship since 2024.' },
    { id: 'cli-2', name: 'GlobalTrans SA',            sector: 'Supply Chain & Logistics',          contact: 'Marie Dupont',    email: 'm.dupont@globaltrans.com',   phone: '+27 21 555 0100',  country: 'South Africa', notes: '' },
    { id: 'cli-3', name: 'BuildCorp International',   sector: 'Operations & Infrastructure',       contact: 'David Keane',     email: 'd.keane@buildcorp.com',      phone: '+351 22 300 4000', country: 'Portugal',     notes: 'Project on hold — awaiting governance approval.' },
    { id: 'cli-4', name: 'Meridian Industrial Group', sector: 'Performance & Cost Transformation', contact: 'Sarah Okonkwo',   email: 's.okonkwo@meridian.com',     phone: '+27 11 200 3300',  country: 'South Africa', notes: 'Completed engagement. Strong results.' },
  ],
  suppliers: [
    { id: 'sup-1', name: 'Apex Drilling Services', category: 'Technical Services', contact: 'Chris Moran',    email: 'c.moran@apexdrilling.com',  phone: '+61 8 9100 2200',  country: 'Australia',    notes: 'Primary drilling contractor for Mining Optimisation.' },
    { id: 'sup-2', name: 'FastLog Logistics',       category: 'Logistics',         contact: 'Lena Brandt',    email: 'lena@fastlog.eu',            phone: '+351 21 400 5600', country: 'Portugal',     notes: '' },
    { id: 'sup-3', name: 'TechOps Solutions',       category: 'Technology',        contact: 'Raj Patel',      email: 'raj@techops.io',             phone: '+27 11 600 7700',  country: 'South Africa', notes: 'WMS integration tools for Supply Chain Redesign.' },
    { id: 'sup-4', name: 'SiteForce Contractors',   category: 'Construction',      contact: 'Tom Hargreaves', email: 't.hargreaves@siteforce.com', phone: '+61 3 9800 4400',  country: 'Australia',    notes: '' },
  ],
};

/* ── DB Layer ──────────────────────────────────────────────── */

const DB = {
  _key: (k) => `a10proj_${k}`,

  get(key) {
    try { return JSON.parse(localStorage.getItem(this._key(key))); }
    catch { return null; }
  },

  set(key, val) {
    localStorage.setItem(this._key(key), JSON.stringify(val));
  },

  projects()     { return this.get('projects')     || []; },
  tasks()        { return this.get('tasks')         || []; },
  actionItems()  { return this.get('actionItems')   || []; },
  budgetItems()  { return this.get('budgetItems')   || []; },
  documents()    { return this.get('documents')     || []; },
  clients()      { return this.get('clients')       || []; },
  suppliers()    { return this.get('suppliers')     || []; },
  users()        { return this.get('users')         || USERS; },

  saveProjects(arr)     { this.set('projects', arr); },
  saveTasks(arr)        { this.set('tasks', arr); },
  saveActionItems(arr)  { this.set('actionItems', arr); },
  saveBudgetItems(arr)  { this.set('budgetItems', arr); },
  saveDocuments(arr)    { this.set('documents', arr); },
  saveClients(arr)      { this.set('clients', arr); },
  saveSuppliers(arr)    { this.set('suppliers', arr); },
  saveUsers(arr)        { this.set('users', arr); },

  projectById(id)  { return this.projects().find(p => p.id === id); },

  /* Computed: project completion based on tasks */
  projectCompletion(projectId) {
    const tasks = this.tasks().filter(t => t.projectId === projectId);
    if (!tasks.length) return 0;
    const sum = tasks.reduce((s, t) => s + (t.percentDone || 0), 0);
    return Math.round(sum / tasks.length);
  },

  /* Computed: budget spent for project */
  projectSpent(projectId) {
    return this.budgetItems()
      .filter(b => b.projectId === projectId)
      .reduce((s, b) => s + (b.actual || 0), 0);
  },

  /* Computed: budget planned for project */
  projectPlanned(projectId) {
    return this.budgetItems()
      .filter(b => b.projectId === projectId)
      .reduce((s, b) => s + (b.planned || 0), 0);
  },

  uid() { return Math.random().toString(36).slice(2, 10); },

  seed() {
    if (this.get('seeded')) return;
    this.saveProjects(SEED.projects);
    this.saveTasks(SEED.tasks);
    this.saveActionItems(SEED.actionItems);
    this.saveBudgetItems(SEED.budgetItems);
    this.saveDocuments(SEED.documents);
    this.saveClients(SEED.clients);
    this.saveSuppliers(SEED.suppliers);
    this.saveUsers(USERS);
    this.set('seeded', true);
  },
};

/* ── Auth ──────────────────────────────────────────────────── */

const Auth = {
  _key: 'a10proj_session',

  login(email, password) {
    const user = DB.users().find(u =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return false;
    sessionStorage.setItem(this._key, JSON.stringify({ id: user.id, name: user.name, avatar: user.avatar, role: user.role }));
    return true;
  },

  logout() {
    sessionStorage.removeItem(this._key);
    Router.go('login');
  },

  current() {
    try { return JSON.parse(sessionStorage.getItem(this._key)); }
    catch { return null; }
  },

  require() {
    if (!this.current()) { Router.go('login'); return false; }
    return true;
  },
};

/* ── UI Utilities ──────────────────────────────────────────── */

const UI = {
  /* Toast */
  toast(msg, type = 'default', duration = 3000) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = `toast ${type}`;
    el.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.add('hidden'), duration);
  },

  /* Modal */
  openModal(title, bodyHtml, wide = false) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('modal-box').className = wide ? 'modal-box modal-wide' : 'modal-box';
    document.getElementById('modal-overlay').classList.remove('hidden');
  },

  closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('modal-body').innerHTML = '';
  },

  openDocPreview(title, bodyHtml) {
    document.getElementById('doc-title').textContent = title;
    document.getElementById('doc-body').innerHTML = bodyHtml;
    document.getElementById('doc-overlay').classList.remove('hidden');
    document.getElementById('btn-print-doc').onclick = () => printContent(document.getElementById('doc-body').innerHTML);
  },

  closeDocPreview() {
    document.getElementById('doc-overlay').classList.add('hidden');
  },

  /* Confirm */
  confirm(msg) { return window.confirm(msg); },

  /* Set page title */
  setTitle(title, breadcrumb = '') {
    document.getElementById('page-title').textContent = title;
    document.getElementById('breadcrumb').textContent = breadcrumb;
    document.title = `${title} — A10 Projects`;
  },

  setHeaderActions(html) {
    document.getElementById('header-actions').innerHTML = html;
  },
};

/* ── Format Helpers ────────────────────────────────────────── */

function fmt(n) {
  if (n === undefined || n === null) return '—';
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

function fmtDate(str) {
  if (!str) return '—';
  const d = new Date(str);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function fmtDateShort(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function fmtMonthYear(d) {
  return d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
}

function parseDate(str) {
  const d = new Date(str);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isOverdue(dueDate) {
  return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
}

function statusBadge(status) {
  const map = {
    'active':    '<span class="badge badge-active">Active</span>',
    'on-hold':   '<span class="badge badge-on-hold">On Hold</span>',
    'completed': '<span class="badge badge-completed">Completed</span>',
    'draft':     '<span class="badge badge-draft">Draft</span>',
  };
  return map[status] || `<span class="badge">${status}</span>`;
}

function taskStatusBadge(status) {
  const map = {
    'todo':        '<span class="badge badge-todo">To Do</span>',
    'in-progress': '<span class="badge badge-in-progress">In Progress</span>',
    'completed':   '<span class="badge badge-done">Completed</span>',
    'blocked':     '<span class="badge badge-critical">Blocked</span>',
  };
  return map[status] || `<span class="badge">${status}</span>`;
}

function priorityBadge(priority) {
  const labels = { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' };
  return `<span class="badge badge-${priority}">${labels[priority] || priority}</span>`;
}

function actionStatusBadge(status) {
  const map = {
    'open':        '<span class="badge badge-open">Open</span>',
    'in-progress': '<span class="badge badge-in-progress">In Progress</span>',
    'done':        '<span class="badge badge-done">Done</span>',
  };
  return map[status] || `<span class="badge">${status}</span>`;
}

function statusLabel(s) {
  const map = { 'active': 'Active', 'on-hold': 'On Hold', 'completed': 'Completed', 'draft': 'Draft' };
  return map[s] || s;
}

function progressBar(pct) {
  return `<div class="progress-wrap">
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    <span class="progress-pct">${pct}%</span>
  </div>`;
}

function printContent(html) {
  const cssText = Array.from(document.styleSheets)
    .map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join('\n'); } catch { return ''; } })
    .join('\n');
  const win = window.open('', '_blank', 'width=900,height=700');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${cssText}</style></head><body>${html}</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 600);
}

/* ── Router ────────────────────────────────────────────────── */

const Router = {
  current: null,

  go(route, param) {
    if (route === 'login') {
      this.current = 'login';
      document.getElementById('page-login').classList.remove('hidden');
      document.getElementById('app').classList.add('hidden');
      return;
    }
    if (!Auth.require()) return;
    document.getElementById('page-login').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    this._updateNav(route);
    this.current = route;

    const content = document.getElementById('main-content');
    content.innerHTML = '';

    // Canvas charts are stateless; nothing to destroy.

    if (route === 'dashboard') {
      UI.setTitle('Dashboard', 'A10 Projects');
      UI.setHeaderActions('<button class="btn btn-primary" id="btn-new-project">+ New Project</button>');
      Dashboard.render();
      document.getElementById('btn-new-project')?.addEventListener('click', () => ProjectModal.open());
    } else if (route === 'active-projects') {
      UI.setTitle('Active Projects', 'A10 Projects');
      UI.setHeaderActions('<button class="btn btn-primary" id="btn-new-project">+ New Project</button>');
      ActiveProjectsView.render();
      document.getElementById('btn-new-project')?.addEventListener('click', () => ProjectModal.open());
    } else if (route === 'project') {
      const proj = DB.projectById(param);
      if (!proj) { Router.go('dashboard'); return; }
      UI.setTitle(proj.name, 'Projects');
      UI.setHeaderActions(`
        <button class="btn btn-secondary btn-sm" onclick="Router.go('dashboard')">← Dashboard</button>
        <button class="btn btn-ghost btn-sm" onclick="ProjectModal.open('${proj.id}')">Edit</button>
      `);
      ProjectView.render(proj.id);
    } else if (route === 'reports') {
      UI.setTitle('Reports', 'A10 Projects');
      UI.setHeaderActions('');
      ReportsView.render();
    } else if (route === 'clients') {
      UI.setTitle('Clients', 'A10 Projects');
      UI.setHeaderActions('<button class="btn btn-primary" id="btn-new-client">+ New Client</button>');
      ClientsView.render();
      document.getElementById('btn-new-client')?.addEventListener('click', () => ClientsView.openModal());
    } else if (route === 'suppliers') {
      UI.setTitle('Suppliers', 'A10 Projects');
      UI.setHeaderActions('<button class="btn btn-primary" id="btn-new-supplier">+ New Supplier</button>');
      SuppliersView.render();
      document.getElementById('btn-new-supplier')?.addEventListener('click', () => SuppliersView.openModal());
    } else if (route === 'users') {
      UI.setTitle('Users', 'A10 Projects');
      UI.setHeaderActions('');
      UsersView.render();
    }
  },

  _updateNav(route) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.route === route);
    });
  },
};

/* ── Active Projects View ──────────────────────────────────── */

const ActiveProjectsView = {
  render() {
    const projects = DB.projects().filter(p => p.status === 'active');
    const wrap = document.getElementById('main-content');

    if (!projects.length) {
      wrap.innerHTML = `<div class="empty-state" style="margin-top:40px"><div class="empty-state-icon">🟢</div><p>No active projects at the moment.</p></div>`;
      return;
    }

    wrap.innerHTML = `
      <div class="section-card">
        <div class="section-card-header">
          <h3>${projects.length} Active Project${projects.length !== 1 ? 's' : ''}</h3>
          <input class="search-box" id="active-search" placeholder="Search..." style="width:200px">
        </div>
        <div id="active-table-wrap"></div>
      </div>
    `;

    const render = (search = '') => {
      const q = search.toLowerCase();
      const list = q ? projects.filter(p =>
        p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.lead.toLowerCase().includes(q)
      ) : projects;

      document.getElementById('active-table-wrap').innerHTML = list.length ? `
        <table class="data-table">
          <thead>
            <tr><th>Project / Client</th><th>Sector</th><th>Lead</th><th>Completion</th><th>Budget Used</th><th>Deadline</th><th></th></tr>
          </thead>
          <tbody>
            ${list.map(p => {
              const pct = DB.projectCompletion(p.id);
              const planned = DB.projectPlanned(p.id);
              const spent = DB.projectSpent(p.id);
              const budgetPct = planned ? Math.round(spent / planned * 100) : 0;
              return `<tr>
                <td>
                  <div class="project-name-cell">
                    <span class="project-name-link" data-project="${p.id}">${p.name}</span>
                    <span class="project-client">${p.client}</span>
                  </div>
                </td>
                <td><span style="font-size:12px;color:var(--mid)">${p.sector}</span></td>
                <td style="font-size:13px;white-space:nowrap">${p.lead}</td>
                <td style="min-width:120px">${progressBar(pct)}</td>
                <td style="font-size:13px;white-space:nowrap">
                  ${fmt(spent)} / ${fmt(planned || p.budget)}
                  <div style="margin-top:4px">${progressBar(budgetPct)}</div>
                </td>
                <td style="font-size:12px;color:var(--mid);white-space:nowrap">${fmtDate(p.endDate)}</td>
                <td><button class="btn btn-secondary btn-sm" data-project="${p.id}">Open</button></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      ` : `<div class="empty-state"><p>No projects match your search.</p></div>`;

      document.getElementById('active-table-wrap').querySelectorAll('[data-project]').forEach(el => {
        el.addEventListener('click', () => Router.go('project', el.dataset.project));
      });
    };

    render();
    document.getElementById('active-search')?.addEventListener('input', e => render(e.target.value));
  },
};

/* ── Dashboard ─────────────────────────────────────────────── */

const Dashboard = {
  filter: 'all',

  render() {
    const projects = DB.projects();
    const tasks = DB.tasks();
    const actionItems = DB.actionItems();

    const active    = projects.filter(p => p.status === 'active').length;
    const totalBudget = projects.reduce((s, p) => s + (p.budget || 0), 0);
    const avgCompletion = projects.length
      ? Math.round(projects.reduce((s, p) => s + DB.projectCompletion(p.id), 0) / projects.length)
      : 0;
    const openActions = actionItems.filter(a => a.status !== 'done').length;

    document.getElementById('main-content').innerHTML = `
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-label">Total Projects</div>
          <div class="stat-value">${projects.length}</div>
          <div class="stat-sub">${active} active</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Budget</div>
          <div class="stat-value">${fmt(totalBudget)}</div>
          <div class="stat-sub">All projects</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Avg. Progress</div>
          <div class="stat-value">${avgCompletion}%</div>
          <div class="stat-sub">Average completion</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Open Actions</div>
          <div class="stat-value">${openActions}</div>
          <div class="stat-sub">${actionItems.filter(a => a.priority === 'critical' && a.status !== 'done').length} critical</div>
        </div>
      </div>

      <div class="section-card">
        <div class="section-card-header">
          <h3>Projects</h3>
        </div>
        <div style="padding:16px 18px 0">
          <div class="filter-bar">
            <button class="filter-tab ${this.filter === 'all' ? 'active' : ''}" data-filter="all">All</button>
            <button class="filter-tab ${this.filter === 'active' ? 'active' : ''}" data-filter="active">Active</button>
            <button class="filter-tab ${this.filter === 'on-hold' ? 'active' : ''}" data-filter="on-hold">On Hold</button>
            <button class="filter-tab ${this.filter === 'completed' ? 'active' : ''}" data-filter="completed">Completed</button>
            <button class="filter-tab ${this.filter === 'draft' ? 'active' : ''}" data-filter="draft">Draft</button>
            <input class="search-box" id="proj-search" placeholder="Search..." value="">
          </div>
        </div>
        <div id="project-table-wrap"></div>
      </div>
    `;

    this._renderTable(projects);
    this._bindEvents();
  },

  _filtered(projects, filter, search) {
    let list = filter === 'all' ? projects : projects.filter(p => p.status === filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.lead.toLowerCase().includes(q)
      );
    }
    return list;
  },

  _renderTable(projects) {
    const search = document.getElementById('proj-search')?.value || '';
    const list = this._filtered(projects, this.filter, search);
    const wrap = document.getElementById('project-table-wrap');
    if (!list.length) {
      wrap.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📁</div><p>No projects found.</p></div>`;
      return;
    }
    wrap.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Project / Client</th>
            <th>Sector</th>
            <th>Status</th>
            <th>Lead</th>
            <th>Completion</th>
            <th>Budget</th>
            <th>Deadline</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${list.map(p => {
            const pct = DB.projectCompletion(p.id);
            const planned = DB.projectPlanned(p.id);
            const spent = DB.projectSpent(p.id);
            const budgetPct = planned ? Math.round(spent / planned * 100) : 0;
            return `<tr>
              <td>
                <div class="project-name-cell">
                  <span class="project-name-link" data-project="${p.id}">${p.name}</span>
                  <span class="project-client">${p.client}</span>
                </div>
              </td>
              <td><span style="font-size:12px;color:var(--mid)">${p.sector}</span></td>
              <td>${statusBadge(p.status)}</td>
              <td style="font-size:13px;white-space:nowrap">${p.lead}</td>
              <td style="min-width:120px">${progressBar(pct)}</td>
              <td style="font-size:13px;white-space:nowrap">
                ${fmt(spent)} / ${fmt(p.budget)}
                <div style="margin-top:4px">${progressBar(budgetPct)}</div>
              </td>
              <td style="font-size:12px;color:var(--mid);white-space:nowrap">${fmtDate(p.endDate)}</td>
              <td>
                <div class="actions-cell">
                  <button class="btn btn-secondary btn-sm" data-project="${p.id}">View</button>
                  <button class="btn btn-danger btn-sm" data-delete="${p.id}" title="Delete">✕</button>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    `;
  },

  _bindEvents() {
    document.querySelectorAll('.filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filter = btn.dataset.filter;
        document.querySelectorAll('.filter-tab').forEach(b => b.classList.toggle('active', b.dataset.filter === this.filter));
        this._renderTable(DB.projects());
      });
    });

    document.getElementById('proj-search')?.addEventListener('input', () => this._renderTable(DB.projects()));

    document.getElementById('main-content').addEventListener('click', e => {
      const projectId = e.target.closest('[data-project]')?.dataset.project;
      const deleteId  = e.target.closest('[data-delete]')?.dataset.delete;
      if (projectId) Router.go('project', projectId);
      if (deleteId) {
        if (!UI.confirm('Delete this project and all its data?')) return;
        const projects = DB.projects().filter(p => p.id !== deleteId);
        DB.saveProjects(projects);
        DB.saveTasks(DB.tasks().filter(t => t.projectId !== deleteId));
        DB.saveActionItems(DB.actionItems().filter(a => a.projectId !== deleteId));
        DB.saveBudgetItems(DB.budgetItems().filter(b => b.projectId !== deleteId));
        DB.saveDocuments(DB.documents().filter(d => d.projectId !== deleteId));
        UI.toast('Project deleted.', 'default');
        Dashboard.render();
      }
    });
  },
};

/* ── Project View ──────────────────────────────────────────── */

const ProjectView = {
  activeTab: 'overview',

  render(projectId) {
    const proj = DB.projectById(projectId);
    if (!proj) return;

    const tabs = [
      { id: 'overview',     label: 'Overview' },
      { id: 'gantt',        label: 'Gantt' },
      { id: 'action-plan',  label: 'Action Plan' },
      { id: 'budget',       label: 'Budget' },
      { id: 'documents',    label: 'Documents' },
    ];

    document.getElementById('main-content').innerHTML = `
      <div class="tabs">
        ${tabs.map(t => `<button class="tab-btn ${this.activeTab === t.id ? 'active' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}
      </div>
      <div id="tab-content"></div>
    `;

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === this.activeTab));
        this._renderTab(projectId);
      });
    });

    this._renderTab(projectId);
  },

  _renderTab(projectId) {
    const proj = DB.projectById(projectId);
    const tc = document.getElementById('tab-content');
    tc.innerHTML = '';

    if (this.activeTab === 'overview')    this._renderOverview(proj, tc);
    if (this.activeTab === 'gantt')       this._renderGantt(proj, tc);
    if (this.activeTab === 'action-plan') this._renderActionPlan(proj, tc);
    if (this.activeTab === 'budget')      this._renderBudget(proj, tc);
    if (this.activeTab === 'documents')   this._renderDocuments(proj, tc);
  },

  /* ── Tab: Overview ── */
  _renderOverview(proj, tc) {
    const pct = DB.projectCompletion(proj.id);
    const planned = DB.projectPlanned(proj.id);
    const spent = DB.projectSpent(proj.id);
    const budgetPct = planned ? Math.round(spent / planned * 100) : 0;
    const tasks = DB.tasks().filter(t => t.projectId === proj.id);
    const actions = DB.actionItems().filter(a => a.projectId === proj.id);
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const openActions = actions.filter(a => a.status !== 'done').length;

    tc.innerHTML = `
      <div class="overview-grid">
        <div class="info-card">
          <div class="info-card-label">Client</div>
          <div class="info-card-value">${proj.client}</div>
        </div>
        <div class="info-card">
          <div class="info-card-label">Sector</div>
          <div class="info-card-value">${proj.sector}</div>
        </div>
        <div class="info-card">
          <div class="info-card-label">Status</div>
          <div class="info-card-value">${statusBadge(proj.status)}</div>
        </div>
        <div class="info-card">
          <div class="info-card-label">Lead</div>
          <div class="info-card-value">${proj.lead}</div>
        </div>
        <div class="info-card">
          <div class="info-card-label">Start → End</div>
          <div class="info-card-value">${fmtDate(proj.startDate)} → ${fmtDate(proj.endDate)}</div>
        </div>
        <div class="info-card">
          <div class="info-card-label">Budget</div>
          <div class="info-card-value">${fmt(proj.budget)}</div>
          <div class="info-card-sub">${fmt(spent)} used (${budgetPct}%)</div>
        </div>
      </div>

      <div class="section-card" style="margin-bottom:16px">
        <div class="section-card-header"><h3>Overall Progress</h3></div>
        <div class="section-card-body">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:16px">
            <div>
              <div class="info-card-label">Completion (Tasks)</div>
              ${progressBar(pct)}
            </div>
            <div>
              <div class="info-card-label">Budget Used</div>
              ${progressBar(budgetPct)}
            </div>
            <div>
              <div class="info-card-label">Tasks</div>
              <div style="font-size:20px;font-weight:900;letter-spacing:-1px;color:var(--navy)">${completedTasks}/${tasks.length}</div>
              <div style="font-size:12px;color:var(--mid)">${openActions} open actions</div>
            </div>
          </div>
        </div>
      </div>

      ${proj.description ? `
      <div class="section-card">
        <div class="section-card-header"><h3>Project Description</h3></div>
        <div class="section-card-body">
          <p style="font-size:14px;color:#3f4d61;line-height:1.7;white-space:pre-wrap">${proj.description}</p>
        </div>
      </div>` : ''}
    `;
  },

  /* ── Tab: Gantt ── */
  _renderGantt(proj, tc) {
    const tasks = DB.tasks().filter(t => t.projectId === proj.id);

    let ganttHtml = '';
    if (!tasks.length) {
      ganttHtml = `<div class="gantt-empty"><div class="empty-state-icon">📅</div><p>No tasks yet for this project.</p></div>`;
    } else {
      ganttHtml = this._buildGantt(tasks, proj);
    }

    tc.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <p style="font-size:13px;color:var(--mid);margin:0">${tasks.length} task(s) · Red line marks today</p>
        <button class="btn btn-primary btn-sm" id="btn-add-task">+ Task</button>
      </div>
      ${ganttHtml}
      <div style="margin-top:16px">
        <table class="data-table">
          <thead>
            <tr><th>Task</th><th>Phase</th><th>Assignee</th><th>Start</th><th>End</th><th>Status</th><th>%</th><th></th></tr>
          </thead>
          <tbody>
            ${tasks.map(t => `<tr>
              <td style="font-weight:700">${t.name}</td>
              <td><span style="font-size:11px;color:var(--accent);font-weight:900;letter-spacing:.8px;text-transform:uppercase">${t.phase}</span></td>
              <td style="font-size:12px">${t.assignee}</td>
              <td style="font-size:12px;color:var(--mid)">${fmtDate(t.startDate)}</td>
              <td style="font-size:12px;color:var(--mid)">${fmtDate(t.dueDate)}</td>
              <td>${taskStatusBadge(t.status)}</td>
              <td style="font-weight:700">${t.percentDone}%</td>
              <td>
                <div class="actions-cell">
                  <button class="btn btn-secondary btn-sm" data-edit-task="${t.id}">Edit</button>
                  <button class="btn btn-danger btn-sm" data-delete-task="${t.id}">✕</button>
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-add-task')?.addEventListener('click', () => TaskModal.open(proj.id, null, () => { this._renderTab(proj.id); }));

    tc.querySelectorAll('[data-edit-task]').forEach(btn => {
      btn.addEventListener('click', () => TaskModal.open(proj.id, btn.dataset.editTask, () => { this._renderTab(proj.id); }));
    });

    tc.querySelectorAll('[data-delete-task]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!UI.confirm('Delete this task?')) return;
        DB.saveTasks(DB.tasks().filter(t => t.id !== btn.dataset.deleteTask));
        this._renderTab(proj.id);
        UI.toast('Task deleted.', 'default');
      });
    });
  },

  _buildGantt(tasks, proj) {
    const dates = tasks.flatMap(t => [parseDate(t.startDate), parseDate(t.dueDate)]);
    dates.push(parseDate(proj.startDate), parseDate(proj.endDate));
    const minTime = Math.min(...dates.map(d => d.getTime()));
    const maxTime = Math.max(...dates.map(d => d.getTime()));
    const totalMs = maxTime - minTime || 1;

    // Month markers
    const months = [];
    const mStart = new Date(minTime);
    mStart.setDate(1); mStart.setHours(0, 0, 0, 0);
    let m = new Date(mStart);
    while (m.getTime() <= maxTime) {
      months.push(new Date(m));
      m.setMonth(m.getMonth() + 1);
    }

    const pct = (dateStr) => Math.max(0, Math.min(100, ((parseDate(dateStr).getTime() - minTime) / totalMs * 100)));
    const wPct = (s, e) => Math.max(0.5, (parseDate(e).getTime() - parseDate(s).getTime()) / totalMs * 100);

    // Today line
    const todayPct = ((Date.now() - minTime) / totalMs * 100).toFixed(2);
    const showToday = todayPct >= 0 && todayPct <= 100;

    // Group tasks by phase preserving order
    const byPhase = {};
    PHASES.forEach(p => byPhase[p] = []);
    tasks.forEach(t => { (byPhase[t.phase] || (byPhase['Diagnose'] = byPhase['Diagnose'] || [])).push(t); });

    const monthMarkersHtml = months.map(mo => {
      const left = ((mo.getTime() - minTime) / totalMs * 100).toFixed(2);
      return `<div class="gantt-month-marker" style="left:${left}%">${fmtMonthYear(mo)}</div>
              <div class="gantt-gridline" style="left:${left}%"></div>`;
    }).join('');

    let rowsHtml = '';
    PHASES.forEach(phase => {
      const phaseTasks = (byPhase[phase] || []);
      if (!phaseTasks.length) return;
      rowsHtml += `
        <div class="gantt-phase-row">
          <div class="gantt-phase-label">${phase}</div>
          <div class="gantt-phase-track"></div>
        </div>
        ${phaseTasks.map(t => {
          const left = pct(t.startDate).toFixed(2);
          const width = wPct(t.startDate, t.dueDate).toFixed(2);
          return `<div class="gantt-row">
            <div class="gantt-row-label">
              ${t.name}
              <span>${t.assignee}</span>
            </div>
            <div class="gantt-row-track">
              <div class="gantt-bar status-${t.status}" style="left:${left}%;width:${width}%">
                <div class="gantt-bar-bg"></div>
                <div class="gantt-bar-fill" style="width:${t.percentDone}%"></div>
                <span class="gantt-bar-text">${t.name} · ${t.percentDone}%</span>
              </div>
            </div>
          </div>`;
        }).join('')}`;
    });

    return `
      <div class="gantt-wrap">
        <div class="gantt">
          <div class="gantt-header-row">
            <div class="gantt-label-col">Task</div>
            <div class="gantt-timeline-col" style="position:relative">
              ${monthMarkersHtml}
              ${showToday ? `<div class="gantt-today-line" style="left:${todayPct}%"></div>` : ''}
            </div>
          </div>
          ${rowsHtml}
        </div>
      </div>`;
  },

  /* ── Tab: Action Plan ── */
  _renderActionPlan(proj, tc) {
    const all = DB.actionItems().filter(a => a.projectId === proj.id);
    let filterStatus = 'all';
    let filterPriority = 'all';

    function daysCounter(a) {
      if (a.status === 'done') return '<span style="color:#16a34a;font-weight:700">✓</span>';
      if (!a.dueDate) return '—';
      const diff = Math.round((parseDate(a.dueDate) - new Date()) / 86400000);
      if (diff < 0) return `<span style="color:#dc2626;font-weight:700">${Math.abs(diff)}d overdue</span>`;
      if (diff === 0) return `<span style="color:#f59e0b;font-weight:700">Today</span>`;
      return `<span style="color:${diff <= 7 ? '#f59e0b' : 'var(--mid)'}">${diff}d</span>`;
    }

    const render = () => {
      let list = all;
      if (filterStatus !== 'all')   list = list.filter(a => a.status === filterStatus);
      if (filterPriority !== 'all') list = list.filter(a => a.priority === filterPriority);
      const overdueCount = list.filter(a => a.status !== 'done' && isOverdue(a.dueDate)).length;

      tc.innerHTML = `
        <div class="action-controls">
          <div class="action-filters">
            <button class="filter-tab ${filterStatus === 'all' ? 'active' : ''}" data-status="all">All (${all.length})</button>
            <button class="filter-tab ${filterStatus === 'open' ? 'active' : ''}" data-status="open">Open</button>
            <button class="filter-tab ${filterStatus === 'in-progress' ? 'active' : ''}" data-status="in-progress">In Progress</button>
            <button class="filter-tab ${filterStatus === 'done' ? 'active' : ''}" data-status="done">Done</button>
          </div>
          <div style="display:flex;gap:6px">
            <select class="search-box" id="filter-priority" style="width:auto">
              <option value="all">All priorities</option>
              ${PRIORITIES.map(p => `<option value="${p}" ${filterPriority === p ? 'selected' : ''}>${p[0].toUpperCase() + p.slice(1)}</option>`).join('')}
            </select>
            <button class="btn btn-primary btn-sm" id="btn-add-action">+ Action</button>
          </div>
        </div>
        ${overdueCount > 0 ? `<div style="background:#fee2e2;border-radius:var(--radius);padding:10px 14px;margin-bottom:14px;font-size:13px;color:#dc2626;font-weight:700">⚠ ${overdueCount} overdue action(s)</div>` : ''}
        ${list.length ? `
          <div class="section-card" style="overflow-x:auto">
            <table class="data-table action-plan-table">
              <thead>
                <tr>
                  <th style="min-width:100px">Scope</th>
                  <th style="min-width:200px">Action / Description</th>
                  <th style="min-width:180px">Details / Context</th>
                  <th style="min-width:130px">Owner</th>
                  <th style="min-width:80px">Priority</th>
                  <th style="min-width:100px">Status</th>
                  <th style="min-width:90px">Start Date</th>
                  <th style="min-width:90px">Due Date</th>
                  <th style="min-width:80px">Days</th>
                  <th style="min-width:180px">Operational Impact</th>
                  <th style="min-width:180px">Comments / Next Step</th>
                  <th style="min-width:80px"></th>
                </tr>
              </thead>
              <tbody>
                ${list.map(a => {
                  const overdue = a.status !== 'done' && isOverdue(a.dueDate);
                  return `<tr ${overdue ? 'style="background:#fff5f5"' : ''}>
                    <td style="font-size:12px;font-weight:700;white-space:nowrap">${a.scope || '—'}</td>
                    <td style="font-weight:600;max-width:200px">${a.description}</td>
                    <td style="font-size:12px;color:var(--mid);max-width:180px">${a.details || '—'}</td>
                    <td style="font-size:12px;white-space:nowrap">${a.owner}</td>
                    <td>${priorityBadge(a.priority)}</td>
                    <td>${actionStatusBadge(a.status)}</td>
                    <td style="font-size:12px;color:var(--mid);white-space:nowrap">${fmtDate(a.startDate) || '—'}</td>
                    <td style="font-size:12px;white-space:nowrap;${overdue ? 'color:#dc2626;font-weight:700' : 'color:var(--mid)'}">${fmtDate(a.dueDate)}${overdue ? ' ⚠' : ''}</td>
                    <td style="text-align:center">${daysCounter(a)}</td>
                    <td style="font-size:12px;color:var(--mid);max-width:180px">${a.operationalImpact || '—'}</td>
                    <td style="font-size:12px;color:var(--mid);max-width:180px">${a.comments || a.notes || '—'}</td>
                    <td>
                      <div class="actions-cell">
                        <button class="btn btn-secondary btn-sm" data-edit-action="${a.id}">Edit</button>
                        <button class="btn btn-danger btn-sm" data-delete-action="${a.id}">✕</button>
                      </div>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `<div class="empty-state"><div class="empty-state-icon">✅</div><p>No actions for the selected filters.</p></div>`}
      `;

      tc.querySelectorAll('[data-status]').forEach(btn => {
        btn.addEventListener('click', () => { filterStatus = btn.dataset.status; render(); });
      });
      document.getElementById('filter-priority')?.addEventListener('change', e => { filterPriority = e.target.value; render(); });
      document.getElementById('btn-add-action')?.addEventListener('click', () => ActionModal.open(proj.id, null, render));
      tc.querySelectorAll('[data-edit-action]').forEach(btn => btn.addEventListener('click', () => ActionModal.open(proj.id, btn.dataset.editAction, render)));
      tc.querySelectorAll('[data-delete-action]').forEach(btn => btn.addEventListener('click', () => {
        if (!UI.confirm('Delete this action?')) return;
        DB.saveActionItems(DB.actionItems().filter(a => a.id !== btn.dataset.deleteAction));
        UI.toast('Action deleted.', 'default');
        render();
      }));
    };

    render();
  },

  /* ── Tab: Budget ── */
  _renderBudget(proj, tc) {
    const items = DB.budgetItems().filter(b => b.projectId === proj.id);
    const totalPlanned = items.reduce((s, b) => s + b.planned, 0);
    const totalActual  = items.reduce((s, b) => s + b.actual, 0);
    const variance     = totalPlanned - totalActual;
    const utilPct      = totalPlanned ? Math.round(totalActual / totalPlanned * 100) : 0;

    tc.innerHTML = `
      <div class="budget-summary">
        <div class="budget-stat">
          <div class="budget-stat-label">Planned Budget</div>
          <div class="budget-stat-value">${fmt(totalPlanned)}</div>
        </div>
        <div class="budget-stat">
          <div class="budget-stat-label">Actual Spend</div>
          <div class="budget-stat-value">${fmt(totalActual)}</div>
        </div>
        <div class="budget-stat">
          <div class="budget-stat-label">Variance</div>
          <div class="budget-stat-value ${variance < 0 ? 'negative' : ''}">${variance >= 0 ? '+' : ''}${fmt(variance)}</div>
        </div>
        <div class="budget-stat">
          <div class="budget-stat-label">Utilisation</div>
          <div class="budget-stat-value">${utilPct}%</div>
          <div style="margin-top:6px">${progressBar(utilPct)}</div>
        </div>
      </div>

      <div class="section-card">
        <div class="section-card-header">
          <h3>Breakdown by Category</h3>
          <button class="btn btn-primary btn-sm" id="btn-add-budget">+ Category</button>
        </div>
        ${items.length ? `
          <table class="data-table">
            <thead>
              <tr><th>Category</th><th>Planned</th><th>Actual</th><th>Variance</th><th>Utilisation</th><th>Notes</th><th></th></tr>
            </thead>
            <tbody>
              ${items.map(b => {
                const v = b.planned - b.actual;
                const u = b.planned ? Math.round(b.actual / b.planned * 100) : 0;
                return `<tr>
                  <td style="font-weight:700">${b.category}</td>
                  <td style="font-size:13px">${fmt(b.planned)}</td>
                  <td style="font-size:13px">${fmt(b.actual)}</td>
                  <td style="font-size:13px;${v < 0 ? 'color:#dc2626;font-weight:700' : 'color:#16a34a'}">${v >= 0 ? '+' : ''}${fmt(v)}</td>
                  <td style="min-width:120px">${progressBar(u)}</td>
                  <td style="font-size:12px;color:var(--mid)">${b.notes || '—'}</td>
                  <td>
                    <div class="actions-cell">
                      <button class="btn btn-secondary btn-sm" data-edit-budget="${b.id}">Edit</button>
                      <button class="btn btn-danger btn-sm" data-delete-budget="${b.id}">✕</button>
                    </div>
                  </td>
                </tr>`;
              }).join('')}
              <tr style="background:var(--grey);font-weight:700">
                <td>Total</td>
                <td>${fmt(totalPlanned)}</td>
                <td>${fmt(totalActual)}</td>
                <td style="${variance < 0 ? 'color:#dc2626' : 'color:#16a34a'}">${variance >= 0 ? '+' : ''}${fmt(variance)}</td>
                <td>${progressBar(utilPct)}</td>
                <td></td><td></td>
              </tr>
            </tbody>
          </table>
        ` : `<div class="empty-state"><div class="empty-state-icon">💰</div><p>No budget items. Add categories to track spending.</p></div>`}
      </div>
    `;

    document.getElementById('btn-add-budget')?.addEventListener('click', () => BudgetModal.open(proj.id, null, () => this._renderTab(proj.id)));
    tc.querySelectorAll('[data-edit-budget]').forEach(btn => btn.addEventListener('click', () => BudgetModal.open(proj.id, btn.dataset.editBudget, () => this._renderTab(proj.id))));
    tc.querySelectorAll('[data-delete-budget]').forEach(btn => btn.addEventListener('click', () => {
      if (!UI.confirm('Delete this category?')) return;
      DB.saveBudgetItems(DB.budgetItems().filter(b => b.id !== btn.dataset.deleteBudget));
      UI.toast('Category deleted.', 'default');
      this._renderTab(proj.id);
    }));
  },

  /* ── Tab: Documents ── */
  _renderDocuments(proj, tc) {
    const refresh = () => this._renderTab(proj.id);

    const renderDocs = () => {
      const docs = DB.documents().filter(d => d.projectId === proj.id);

      tc.innerHTML = `
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">
          <div style="flex:1;min-width:260px">
            <div style="font-size:11px;font-weight:900;letter-spacing:1px;text-transform:uppercase;color:var(--mid);margin-bottom:12px">Documents (${docs.length})</div>
            ${docs.length ? `
              <div class="doc-grid">
                ${docs.map(d => `
                  <div class="doc-card-wrap" style="position:relative">
                    <div class="doc-card" data-view-doc="${d.id}" style="cursor:pointer">
                      <div class="doc-card-type">${d.type === 'pdf' ? '📎 PDF Import' : (DOC_TYPES[d.type]?.icon + ' ' + (DOC_TYPES[d.type]?.label || d.type))}</div>
                      <div class="doc-card-title">${d.title}</div>
                      <div class="doc-card-date">${fmtDate(d.createdAt)} · ${d.createdBy || '—'}</div>
                    </div>
                    <button class="doc-delete-btn" data-delete-doc="${d.id}" title="Delete document">✕</button>
                  </div>
                `).join('')}
              </div>
            ` : `<div class="empty-state" style="padding:32px 0"><p style="font-size:13px">No documents yet.</p></div>`}
          </div>
          <div style="flex-shrink:0;min-width:220px">
            <div style="font-size:11px;font-weight:900;letter-spacing:1px;text-transform:uppercase;color:var(--mid);margin-bottom:12px">Generate Document</div>
            <div class="template-grid" style="grid-template-columns:1fr">
              ${Object.entries(DOC_TYPES).map(([type, info]) => `
                <div class="template-card" data-new-doc="${type}">
                  <div class="template-icon">${info.icon}</div>
                  <div class="template-name">${info.label}</div>
                </div>
              `).join('')}
            </div>
            <div style="margin-top:12px">
              <div style="font-size:11px;font-weight:900;letter-spacing:1px;text-transform:uppercase;color:var(--mid);margin-bottom:8px">Import PDF</div>
              <label class="btn btn-secondary btn-sm" style="cursor:pointer;display:inline-block">
                📎 Choose PDF file
                <input type="file" accept=".pdf" id="pdf-import-input" style="display:none">
              </label>
              <div style="font-size:11px;color:var(--mid);margin-top:6px">Max recommended: 2 MB</div>
            </div>
          </div>
        </div>
      `;

      tc.querySelectorAll('[data-view-doc]').forEach(el => {
        el.addEventListener('click', () => {
          const doc = DB.documents().find(d => d.id === el.dataset.viewDoc);
          if (!doc) return;
          if (doc.type === 'pdf' && doc.fileData) {
            const byteStr = atob(doc.fileData);
            const ab = new ArrayBuffer(byteStr.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteStr.length; i++) ia[i] = byteStr.charCodeAt(i);
            const blob = new Blob([ab], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          } else {
            DocGenerator.preview(doc, proj);
          }
        });
      });

      tc.querySelectorAll('[data-delete-doc]').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          if (!UI.confirm('Delete this document?')) return;
          DB.saveDocuments(DB.documents().filter(d => d.id !== btn.dataset.deleteDoc));
          UI.toast('Document deleted.', 'default');
          renderDocs();
        });
      });

      tc.querySelectorAll('[data-new-doc]').forEach(el => {
        el.addEventListener('click', () => {
          DocGenerator.openForm(el.dataset.newDoc, proj, refresh);
        });
      });

      document.getElementById('pdf-import-input')?.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
          UI.toast('File too large. Max 5 MB.', 'default');
          return;
        }
        const reader = new FileReader();
        reader.onload = ev => {
          const base64 = ev.target.result.split(',')[1];
          const doc = {
            id: 'd' + DB.uid(),
            projectId: proj.id,
            type: 'pdf',
            title: file.name.replace(/\.pdf$/i, ''),
            fileData: base64,
            createdAt: new Date().toISOString(),
            createdBy: Auth.current()?.name || 'A10',
          };
          DB.saveDocuments([...DB.documents(), doc]);
          UI.toast('PDF imported.', 'success');
          renderDocs();
        };
        reader.readAsDataURL(file);
      });
    };

    renderDocs();
  },
};

/* ── Project Modal ─────────────────────────────────────────── */

const ProjectModal = {
  open(projectId) {
    const proj = projectId ? DB.projectById(projectId) : null;
    const title = proj ? 'Edit Project' : 'New Project';

    const body = `
      <form id="form-project">
        <div class="form-row">
          <div class="form-field">
            <label>Project Name *</label>
            <input name="name" required value="${proj?.name || ''}">
          </div>
          <div class="form-field">
            <label>Client *</label>
            <input name="client" required value="${proj?.client || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Sector</label>
            <select name="sector">
              ${SECTORS.map(s => `<option value="${s}" ${proj?.sector === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Status</label>
            <select name="status">
              ${PROJECT_STATUSES.map(s => `<option value="${s}" ${(proj?.status || 'active') === s ? 'selected' : ''}>${statusLabel(s)}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Lead</label>
            <select name="lead">
              ${DB.users().map(u => `<option value="${u.name}" ${proj?.lead === u.name ? 'selected' : ''}>${u.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Budget (€)</label>
            <input name="budget" type="number" min="0" value="${proj?.budget || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Start Date</label>
            <input name="startDate" type="date" value="${proj?.startDate || ''}">
          </div>
          <div class="form-field">
            <label>End Date</label>
            <input name="endDate" type="date" value="${proj?.endDate || ''}">
          </div>
        </div>
        <div class="form-field">
          <label>Description</label>
          <textarea name="description" rows="4">${proj?.description || ''}</textarea>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${proj ? 'Save Changes' : 'Create Project'}</button>
        </div>
      </form>
    `;

    UI.openModal(title, body, true);

    document.getElementById('modal-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-project').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);
      data.budget = parseFloat(data.budget) || 0;

      const projects = DB.projects();
      if (proj) {
        const idx = projects.findIndex(p => p.id === proj.id);
        projects[idx] = { ...proj, ...data };
        DB.saveProjects(projects);
        UI.toast('Project updated.', 'success');
        Router.go('project', proj.id);
      } else {
        const newProj = { ...data, id: 'proj-' + DB.uid(), createdAt: new Date().toISOString() };
        DB.saveProjects([...projects, newProj]);
        UI.toast('Project created.', 'success');
        Router.go('project', newProj.id);
      }
      UI.closeModal();
    });
  },
};

/* ── Task Modal ────────────────────────────────────────────── */

const TaskModal = {
  open(projectId, taskId, onSave) {
    const task = taskId ? DB.tasks().find(t => t.id === taskId) : null;

    const body = `
      <form id="form-task">
        <div class="form-field">
          <label>Task Name *</label>
          <input name="name" required value="${task?.name || ''}">
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Phase</label>
            <select name="phase">
              ${PHASES.map(p => `<option value="${p}" ${task?.phase === p ? 'selected' : ''}>${p}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Assignee</label>
            <select name="assignee">
              ${DB.users().map(u => `<option value="${u.name}" ${task?.assignee === u.name ? 'selected' : ''}>${u.name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Start Date *</label>
            <input name="startDate" type="date" required value="${task?.startDate || ''}">
          </div>
          <div class="form-field">
            <label>Due Date *</label>
            <input name="dueDate" type="date" required value="${task?.dueDate || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Status</label>
            <select name="status">
              ${TASK_STATUSES.map(s => `<option value="${s}" ${task?.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Completion (%)</label>
            <input name="percentDone" type="number" min="0" max="100" value="${task?.percentDone ?? 0}">
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="task-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${task ? 'Save' : 'Add'}</button>
        </div>
      </form>
    `;

    UI.openModal(task ? 'Edit Task' : 'New Task', body);
    document.getElementById('task-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-task').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);
      data.percentDone = parseInt(data.percentDone, 10) || 0;
      data.projectId = projectId;

      const tasks = DB.tasks();
      if (task) {
        const idx = tasks.findIndex(t => t.id === taskId);
        tasks[idx] = { ...task, ...data };
      } else {
        tasks.push({ ...data, id: 't' + DB.uid() });
      }
      DB.saveTasks(tasks);
      UI.closeModal();
      UI.toast(task ? 'Task updated.' : 'Task added.', 'success');
      onSave?.();
    });
  },
};

/* ── Action Item Modal ─────────────────────────────────────── */

const ActionModal = {
  open(projectId, actionId, onSave) {
    const action = actionId ? DB.actionItems().find(a => a.id === actionId) : null;
    const users = DB.users();

    const body = `
      <form id="form-action">
        <div class="form-row">
          <div class="form-field">
            <label>Scope</label>
            <input name="scope" placeholder="e.g. Commercial, Compliance, Risk…" value="${action?.scope || ''}">
          </div>
          <div class="form-field">
            <label>Owner</label>
            <select name="owner">
              ${users.map(u => `<option value="${u.name}" ${action?.owner === u.name ? 'selected' : ''}>${u.name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-field">
          <label>Action / Description *</label>
          <textarea name="description" rows="2" required>${action?.description || ''}</textarea>
        </div>
        <div class="form-field">
          <label>Details / Context</label>
          <textarea name="details" rows="2">${action?.details || ''}</textarea>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Priority</label>
            <select name="priority">
              ${PRIORITIES.map(p => `<option value="${p}" ${action?.priority === p ? 'selected' : ''}>${p[0].toUpperCase() + p.slice(1)}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Status</label>
            <select name="status">
              ${ACTION_STATUSES.map(s => `<option value="${s}" ${action?.status === s ? 'selected' : ''}>${s[0].toUpperCase() + s.slice(1)}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Start Date</label>
            <input name="startDate" type="date" value="${action?.startDate || ''}">
          </div>
          <div class="form-field">
            <label>Due Date *</label>
            <input name="dueDate" type="date" required value="${action?.dueDate || ''}">
          </div>
        </div>
        <div class="form-field">
          <label>Operational Impact</label>
          <input name="operationalImpact" value="${action?.operationalImpact || ''}">
        </div>
        <div class="form-field">
          <label>Comments / Next Step</label>
          <textarea name="comments" rows="2">${action?.comments || action?.notes || ''}</textarea>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="action-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${action ? 'Save' : 'Add'}</button>
        </div>
      </form>
    `;

    UI.openModal(action ? 'Edit Action' : 'New Action', body, true);
    document.getElementById('action-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-action').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);
      data.projectId = projectId;

      const items = DB.actionItems();
      if (action) {
        const idx = items.findIndex(a => a.id === actionId);
        items[idx] = { ...action, ...data };
      } else {
        items.push({ ...data, id: 'a' + DB.uid(), createdAt: new Date().toISOString() });
      }
      DB.saveActionItems(items);
      UI.closeModal();
      UI.toast(action ? 'Action updated.' : 'Action added.', 'success');
      onSave?.();
    });
  },
};

/* ── Budget Modal ──────────────────────────────────────────── */

const BudgetModal = {
  open(projectId, budgetId, onSave) {
    const item = budgetId ? DB.budgetItems().find(b => b.id === budgetId) : null;

    const body = `
      <form id="form-budget">
        <div class="form-field">
          <label>Category</label>
          <select name="category">
            ${BUDGET_CATEGORIES.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Planned Value (€) *</label>
            <input name="planned" type="number" min="0" required value="${item?.planned || ''}">
          </div>
          <div class="form-field">
            <label>Actual Value (€)</label>
            <input name="actual" type="number" min="0" value="${item?.actual || 0}">
          </div>
        </div>
        <div class="form-field">
          <label>Notes</label>
          <input name="notes" value="${item?.notes || ''}">
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="budget-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${item ? 'Save' : 'Add'}</button>
        </div>
      </form>
    `;

    UI.openModal(item ? 'Edit Category' : 'New Category', body);
    document.getElementById('budget-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-budget').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);
      data.planned = parseFloat(data.planned) || 0;
      data.actual  = parseFloat(data.actual)  || 0;
      data.projectId = projectId;

      const items = DB.budgetItems();
      if (item) {
        const idx = items.findIndex(b => b.id === budgetId);
        items[idx] = { ...item, ...data };
      } else {
        items.push({ ...data, id: 'b' + DB.uid() });
      }
      DB.saveBudgetItems(items);
      UI.closeModal();
      UI.toast(item ? 'Category updated.' : 'Category added.', 'success');
      onSave?.();
    });
  },
};

/* ── Document Generator ────────────────────────────────────── */

const DocGenerator = {
  openForm(type, proj, onSave) {
    const info = DOC_TYPES[type];
    let fieldsHtml = '';

    if (type === 'project-brief') {
      fieldsHtml = `
        <div class="form-field"><label>Document Title</label><input name="title" value="Project Brief — ${proj.name}"></div>
        <div class="form-field"><label>Objective</label><textarea name="objective" rows="3" placeholder="Describe the main objective of the project..."></textarea></div>
        <div class="form-field"><label>Scope</label><textarea name="scope" rows="3" placeholder="Define the scope of work..."></textarea></div>
        <div class="form-field"><label>Deliverables (one per line)</label><textarea name="deliverables" rows="4" placeholder="1. Diagnostic report&#10;2. Implementation roadmap..."></textarea></div>
        <div class="form-field"><label>Timeline</label><input name="timeline" value="${fmtDate(proj.startDate)} – ${fmtDate(proj.endDate)}"></div>
        <div class="form-field"><label>Team</label><input name="team" value="${proj.lead}"></div>
        <div class="form-field"><label>Commercial Terms</label><textarea name="commercial" rows="2"></textarea></div>
      `;
    } else if (type === 'status-report') {
      fieldsHtml = `
        <div class="form-field"><label>Title</label><input name="title" value="Status Report — ${proj.name}"></div>
        <div class="form-field"><label>Reporting Period</label><input name="period" placeholder="Week ending ..."></div>
        <div class="form-field"><label>Executive Summary</label><textarea name="summary" rows="3"></textarea></div>
        <div class="form-field"><label>Completed this period</label><textarea name="completed" rows="3" placeholder="- Item 1&#10;- Item 2"></textarea></div>
        <div class="form-field"><label>Planned for next period</label><textarea name="planned" rows="3" placeholder="- Item 1&#10;- Item 2"></textarea></div>
        <div class="form-field"><label>Risks</label><textarea name="risks" rows="2"></textarea></div>
        <div class="form-field"><label>Issues</label><textarea name="issues" rows="2"></textarea></div>
        <div class="form-field"><label>Actions (for client)</label><textarea name="actions" rows="2"></textarea></div>
      `;
    } else if (type === 'meeting-minutes') {
      fieldsHtml = `
        <div class="form-field"><label>Title</label><input name="title" value="Meeting Minutes — ${proj.name}"></div>
        <div class="form-field"><label>Date</label><input name="date" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
        <div class="form-field"><label>Location / Format</label><input name="location" placeholder="Video call / Client office / ..."></div>
        <div class="form-field"><label>Attendees</label><textarea name="attendees" rows="3" placeholder="Name — Role&#10;Name — Role"></textarea></div>
        <div class="form-field"><label>Agenda</label><textarea name="agenda" rows="3" placeholder="1. Item 1&#10;2. Item 2"></textarea></div>
        <div class="form-field"><label>Decisions Made</label><textarea name="decisions" rows="3"></textarea></div>
        <div class="form-field"><label>Actions (who does what by when)</label><textarea name="actions" rows="3"></textarea></div>
        <div class="form-field"><label>Next Meeting</label><input name="nextMeeting"></div>
      `;
    } else if (type === 'engagement-letter') {
      fieldsHtml = `
        <div class="form-field"><label>Title</label><input name="title" value="Engagement Letter — ${proj.name}"></div>
        <div class="form-field"><label>Context / Background</label><textarea name="context" rows="3"></textarea></div>
        <div class="form-field"><label>Scope of Services</label><textarea name="scope" rows="4"></textarea></div>
        <div class="form-field"><label>Deliverables</label><textarea name="deliverables" rows="3"></textarea></div>
        <div class="form-field"><label>Timeline</label><input name="timeline" value="${fmtDate(proj.startDate)} – ${fmtDate(proj.endDate)}"></div>
        <div class="form-field"><label>Fees and Commercial Terms</label><textarea name="commercial" rows="3" placeholder="Fixed fee of €... payable in ..."></textarea></div>
        <div class="form-field"><label>General Terms</label><textarea name="terms" rows="3" placeholder="Confidentiality, intellectual property..."></textarea></div>
      `;
    }

    UI.openModal(`New ${info.label}`, `
      <form id="form-doc">
        ${fieldsHtml}
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="doc-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Generate Document</button>
        </div>
      </form>
    `, true);

    document.getElementById('doc-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-doc').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const content = Object.fromEntries(fd);
      const title = content.title || `${info.label} — ${proj.name}`;

      const doc = {
        id: 'd' + DB.uid(),
        projectId: proj.id,
        type,
        title,
        content,
        createdAt: new Date().toISOString(),
        createdBy: Auth.current()?.name || 'A10',
      };

      DB.saveDocuments([...DB.documents(), doc]);
      UI.closeModal();
      UI.toast('Document generated.', 'success');
      onSave?.();
      this.preview(doc, proj);
    });
  },

  preview(doc, proj) {
    const html = this._generateHtml(doc, proj);
    UI.openDocPreview(doc.title, html);
  },

  _generateHtml(doc, proj) {
    const c = doc.content;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const nl2li = (str) => str ? str.split('\n').filter(l => l.trim()).map(l => `<li>${l.replace(/^[-•]\s*/, '')}</li>`).join('') : '';
    const nl2p  = (str) => str ? str.split('\n').filter(l => l.trim()).map(l => `<p>${l}</p>`).join('') : '';

    let bodyHtml = '';

    if (doc.type === 'project-brief') {
      bodyHtml = `
        <div class="doc-print-field"><div class="doc-print-field-label">Client</div><div class="doc-print-field-value">${proj.client}</div></div>
        <div class="doc-print-field"><div class="doc-print-field-label">Sector</div><div class="doc-print-field-value">${proj.sector}</div></div>
        <div class="doc-print-field"><div class="doc-print-field-label">A10 Lead</div><div class="doc-print-field-value">${proj.lead}</div></div>
        <h2>Objective</h2><p>${c.objective}</p>
        <h2>Scope</h2><p>${c.scope}</p>
        <h2>Deliverables</h2><ul>${nl2li(c.deliverables)}</ul>
        <h2>Timeline</h2><p>${c.timeline}</p>
        <h2>Team</h2><p>${c.team}</p>
        ${c.commercial ? `<h2>Commercial Terms</h2><p>${c.commercial}</p>` : ''}
      `;
    } else if (doc.type === 'status-report') {
      const pct = DB.projectCompletion(proj.id);
      bodyHtml = `
        <div class="doc-print-field"><div class="doc-print-field-label">Period</div><div class="doc-print-field-value">${c.period}</div></div>
        <div class="doc-print-field"><div class="doc-print-field-label">Overall Progress</div><div class="doc-print-field-value">${pct}%</div></div>
        <h2>Executive Summary</h2><p>${c.summary}</p>
        <h2>Completed This Period</h2><ul>${nl2li(c.completed)}</ul>
        <h2>Planned for Next Period</h2><ul>${nl2li(c.planned)}</ul>
        ${c.risks ? `<h2>Risks</h2><p>${c.risks}</p>` : ''}
        ${c.issues ? `<h2>Issues</h2><p>${c.issues}</p>` : ''}
        ${c.actions ? `<h2>Actions</h2><ul>${nl2li(c.actions)}</ul>` : ''}
      `;
    } else if (doc.type === 'meeting-minutes') {
      bodyHtml = `
        <div class="doc-print-field"><div class="doc-print-field-label">Date</div><div class="doc-print-field-value">${fmtDate(c.date)}</div></div>
        <div class="doc-print-field"><div class="doc-print-field-label">Location / Format</div><div class="doc-print-field-value">${c.location}</div></div>
        <h2>Attendees</h2><ul>${nl2li(c.attendees)}</ul>
        <h2>Agenda</h2><ul>${nl2li(c.agenda)}</ul>
        <h2>Decisions Made</h2>${nl2p(c.decisions)}
        <h2>Actions</h2><ul>${nl2li(c.actions)}</ul>
        ${c.nextMeeting ? `<h2>Next Meeting</h2><p>${c.nextMeeting}</p>` : ''}
      `;
    } else if (doc.type === 'engagement-letter') {
      bodyHtml = `
        <h2>Context</h2><p>${c.context}</p>
        <h2>Scope of Services</h2><p>${c.scope}</p>
        <h2>Deliverables</h2><ul>${nl2li(c.deliverables)}</ul>
        <h2>Timeline</h2><p>${c.timeline}</p>
        <h2>Fees and Commercial Terms</h2><p>${c.commercial}</p>
        ${c.terms ? `<h2>General Terms</h2><p>${c.terms}</p>` : ''}
        <p style="margin-top:32px">A10 Consulting looks forward to your confirmation of acceptance of this engagement.</p>
      `;
    }

    return `
      <div class="doc-print">
        <div class="doc-print-header">
          <div>
            <div class="doc-print-logo">A10 <span>Consulting</span></div>
            <div style="font-size:12px;color:var(--mid);margin-top:2px">Strategic Advisory</div>
          </div>
          <div class="doc-print-meta">
            <strong>${DOC_TYPES[doc.type]?.label}</strong>
            ${today}<br>
            ${proj.name}<br>
            ${proj.client}
          </div>
        </div>

        <h1>${doc.title}</h1>

        ${bodyHtml}

        <div class="doc-confidential">Confidential — A10 Consulting · Restricted Use</div>
      </div>
    `;
  },
};


/* ── Clients View ──────────────────────────────────────────── */

const ClientsView = {
  render() {
    const clients = DB.clients();
    document.getElementById('main-content').innerHTML = `
      <div class="section-card">
        ${clients.length ? `
          <table class="data-table">
            <thead><tr><th>Name</th><th>Sector</th><th>Contact</th><th>Email</th><th>Phone</th><th>Country</th><th>Notes</th><th></th></tr></thead>
            <tbody>
              ${clients.map(c => `<tr>
                <td style="font-weight:700">${c.name}</td>
                <td style="font-size:12px;color:var(--mid)">${c.sector}</td>
                <td style="font-size:13px">${c.contact}</td>
                <td style="font-size:12px"><a href="mailto:${c.email}" style="color:var(--accent)">${c.email}</a></td>
                <td style="font-size:12px;color:var(--mid);white-space:nowrap">${c.phone}</td>
                <td style="font-size:12px;color:var(--mid)">${c.country}</td>
                <td style="font-size:12px;color:var(--mid);max-width:180px">${c.notes || '—'}</td>
                <td><div class="actions-cell">
                  <button class="btn btn-secondary btn-sm" data-edit-client="${c.id}">Edit</button>
                  <button class="btn btn-danger btn-sm" data-delete-client="${c.id}">X</button>
                </div></td>
              </tr>`).join('')}
            </tbody>
          </table>
        ` : `<div class="empty-state"><div class="empty-state-icon">🏢</div><p>No clients yet.</p></div>`}
      </div>
    `;
    document.querySelectorAll('[data-edit-client]').forEach(btn => btn.addEventListener('click', () => this.openModal(btn.dataset.editClient)));
    document.querySelectorAll('[data-delete-client]').forEach(btn => btn.addEventListener('click', () => {
      if (!UI.confirm('Delete this client?')) return;
      DB.saveClients(DB.clients().filter(c => c.id !== btn.dataset.deleteClient));
      UI.toast('Client deleted.', 'default'); this.render();
    }));
  },
  openModal(clientId) {
    const c = clientId ? DB.clients().find(x => x.id === clientId) : null;
    UI.openModal(c ? 'Edit Client' : 'New Client', `
      <form id="form-client">
        <div class="form-row">
          <div class="form-field"><label>Company Name *</label><input name="name" required value="${c?.name || ''}"></div>
          <div class="form-field"><label>Sector</label>
            <select name="sector">${SECTORS.map(s => `<option value="${s}" ${c?.sector === s ? 'selected' : ''}>${s}</option>`).join('')}</select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field"><label>Contact Person</label><input name="contact" value="${c?.contact || ''}"></div>
          <div class="form-field"><label>Email</label><input name="email" type="email" value="${c?.email || ''}"></div>
        </div>
        <div class="form-row">
          <div class="form-field"><label>Phone</label><input name="phone" value="${c?.phone || ''}"></div>
          <div class="form-field"><label>Country</label><input name="country" value="${c?.country || ''}"></div>
        </div>
        <div class="form-field"><label>Notes</label><textarea name="notes" rows="2">${c?.notes || ''}</textarea></div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${c ? 'Save Changes' : 'Add Client'}</button>
        </div>
      </form>
    `);
    document.getElementById('modal-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-client').addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      const clients = DB.clients();
      if (c) { const idx = clients.findIndex(x => x.id === c.id); clients[idx] = { ...c, ...data }; }
      else clients.push({ ...data, id: 'cli-' + DB.uid() });
      DB.saveClients(clients);
      UI.closeModal();
      UI.toast(c ? 'Client updated.' : 'Client added.', 'success');
      this.render();
    });
  },
};

/* ── Suppliers View ────────────────────────────────────────── */

const SUPPLIER_CATEGORIES = ['Technical Services', 'Logistics', 'Technology', 'Construction', 'Professional Services', 'Materials'];

const SuppliersView = {
  render() {
    const suppliers = DB.suppliers();
    document.getElementById('main-content').innerHTML = `
      <div class="section-card">
        ${suppliers.length ? `
          <table class="data-table">
            <thead><tr><th>Name</th><th>Category</th><th>Contact</th><th>Email</th><th>Phone</th><th>Country</th><th>Notes</th><th></th></tr></thead>
            <tbody>
              ${suppliers.map(s => `<tr>
                <td style="font-weight:700">${s.name}</td>
                <td style="font-size:12px;color:var(--mid)">${s.category}</td>
                <td style="font-size:13px">${s.contact}</td>
                <td style="font-size:12px"><a href="mailto:${s.email}" style="color:var(--accent)">${s.email}</a></td>
                <td style="font-size:12px;color:var(--mid);white-space:nowrap">${s.phone}</td>
                <td style="font-size:12px;color:var(--mid)">${s.country}</td>
                <td style="font-size:12px;color:var(--mid);max-width:180px">${s.notes || '—'}</td>
                <td><div class="actions-cell">
                  <button class="btn btn-secondary btn-sm" data-edit-supplier="${s.id}">Edit</button>
                  <button class="btn btn-danger btn-sm" data-delete-supplier="${s.id}">X</button>
                </div></td>
              </tr>`).join('')}
            </tbody>
          </table>
        ` : `<div class="empty-state"><div class="empty-state-icon">🚚</div><p>No suppliers yet.</p></div>`}
      </div>
    `;
    document.querySelectorAll('[data-edit-supplier]').forEach(btn => btn.addEventListener('click', () => this.openModal(btn.dataset.editSupplier)));
    document.querySelectorAll('[data-delete-supplier]').forEach(btn => btn.addEventListener('click', () => {
      if (!UI.confirm('Delete this supplier?')) return;
      DB.saveSuppliers(DB.suppliers().filter(s => s.id !== btn.dataset.deleteSupplier));
      UI.toast('Supplier deleted.', 'default'); this.render();
    }));
  },
  openModal(supplierId) {
    const s = supplierId ? DB.suppliers().find(x => x.id === supplierId) : null;
    UI.openModal(s ? 'Edit Supplier' : 'New Supplier', `
      <form id="form-supplier">
        <div class="form-row">
          <div class="form-field"><label>Company Name *</label><input name="name" required value="${s?.name || ''}"></div>
          <div class="form-field"><label>Category</label>
            <select name="category">${SUPPLIER_CATEGORIES.map(cat => `<option value="${cat}" ${s?.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}</select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field"><label>Contact Person</label><input name="contact" value="${s?.contact || ''}"></div>
          <div class="form-field"><label>Email</label><input name="email" type="email" value="${s?.email || ''}"></div>
        </div>
        <div class="form-row">
          <div class="form-field"><label>Phone</label><input name="phone" value="${s?.phone || ''}"></div>
          <div class="form-field"><label>Country</label><input name="country" value="${s?.country || ''}"></div>
        </div>
        <div class="form-field"><label>Notes</label><textarea name="notes" rows="2">${s?.notes || ''}</textarea></div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${s ? 'Save Changes' : 'Add Supplier'}</button>
        </div>
      </form>
    `);
    document.getElementById('modal-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-supplier').addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      const suppliers = DB.suppliers();
      if (s) { const idx = suppliers.findIndex(x => x.id === s.id); suppliers[idx] = { ...s, ...data }; }
      else suppliers.push({ ...data, id: 'sup-' + DB.uid() });
      DB.saveSuppliers(suppliers);
      UI.closeModal();
      UI.toast(s ? 'Supplier updated.' : 'Supplier added.', 'success');
      this.render();
    });
  },
};

/* ── Users View ────────────────────────────────────────────── */

const UsersView = {
  render() {
    const session = Auth.current();
    const users = DB.users();
    document.getElementById('main-content').innerHTML = `
      <div class="section-card">
        <div class="section-card-header">
          <h3>Platform Users (${users.length})</h3>
          <button class="btn btn-primary btn-sm" id="btn-add-user">+ New User</button>
        </div>
        <table class="data-table">
          <thead><tr><th></th><th>Name</th><th>Email</th><th>Role</th><th></th></tr></thead>
          <tbody>
            ${users.map(u => `<tr ${u.email === session?.email ? 'style="background:var(--grey)"' : ''}>
              <td><div style="width:32px;height:32px;border-radius:50%;background:var(--accent);color:#fff;font-size:12px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${u.avatar || u.name.slice(0,2).toUpperCase()}</div></td>
              <td style="font-weight:700">${u.name}${u.email === session?.email ? ' <span style="font-size:11px;color:var(--mid);font-weight:400">(you)</span>' : ''}</td>
              <td style="font-size:13px">${u.email}</td>
              <td><span class="badge ${u.role === 'admin' ? 'badge-active' : 'badge-in-progress'}">${u.role}</span></td>
              <td>
                <div class="actions-cell">
                  <button class="btn btn-secondary btn-sm" data-edit-user="${u.id}">Edit</button>
                  ${u.email !== session?.email ? `<button class="btn btn-danger btn-sm" data-delete-user="${u.id}">✕</button>` : ''}
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-add-user')?.addEventListener('click', () => UsersView.openModal(null));

    document.querySelectorAll('[data-edit-user]').forEach(btn => {
      btn.addEventListener('click', () => UsersView.openModal(btn.dataset.editUser));
    });

    document.querySelectorAll('[data-delete-user]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!UI.confirm('Delete this user?')) return;
        const updated = DB.users().filter(u => String(u.id) !== String(btn.dataset.deleteUser));
        DB.saveUsers(updated);
        UI.toast('User deleted.', 'default');
        UsersView.render();
      });
    });
  },

  openModal(userId) {
    const users = DB.users();
    const user = userId ? users.find(u => String(u.id) === String(userId)) : null;

    UI.openModal(user ? 'Edit User' : 'New User', `
      <form id="form-user">
        <div class="form-row">
          <div class="form-field">
            <label>Full Name *</label>
            <input name="name" required value="${user?.name || ''}">
          </div>
          <div class="form-field">
            <label>Avatar Initials</label>
            <input name="avatar" maxlength="2" placeholder="e.g. AC" value="${user?.avatar || ''}">
          </div>
        </div>
        <div class="form-field">
          <label>Email *</label>
          <input name="email" type="email" required value="${user?.email || ''}">
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Password *</label>
            <input name="password" type="password" ${user ? '' : 'required'} placeholder="${user ? 'Leave blank to keep current' : ''}">
          </div>
          <div class="form-field">
            <label>Role</label>
            <select name="role">
              <option value="consultant" ${user?.role === 'consultant' ? 'selected' : ''}>Consultant</option>
              <option value="admin" ${user?.role === 'admin' ? 'selected' : ''}>Admin</option>
            </select>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="user-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${user ? 'Save Changes' : 'Create User'}</button>
        </div>
      </form>
    `);

    document.getElementById('user-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-user').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);

      if (!data.avatar) data.avatar = data.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

      const list = DB.users();
      if (user) {
        const idx = list.findIndex(u => String(u.id) === String(userId));
        list[idx] = { ...user, ...data, password: data.password || user.password };
      } else {
        if (!data.password) { UI.toast('Password is required.', 'default'); return; }
        list.push({ ...data, id: DB.uid() });
      }
      DB.saveUsers(list);
      UI.closeModal();
      UI.toast(user ? 'User updated.' : 'User created.', 'success');
      UsersView.render();
    });
  },
};

/* ── Reports View ──────────────────────────────────────────── */

const ReportsView = {
  _charts: [],

  render() {
    const projects = DB.projects();
    const tasks    = DB.tasks();
    const actions  = DB.actionItems();

    const totalBudgetPlanned = projects.reduce((s, p) => s + DB.projectPlanned(p.id), 0);
    const totalBudgetSpent   = projects.reduce((s, p) => s + DB.projectSpent(p.id), 0);
    const totalTasks         = tasks.length;
    const completedTasks     = tasks.filter(t => t.status === 'completed').length;
    const openActions        = actions.filter(a => a.status !== 'done').length;
    const criticalActions    = actions.filter(a => a.priority === 'critical' && a.status !== 'done').length;

    document.getElementById('main-content').innerHTML = `
      <div class="stat-grid" style="margin-bottom:24px">
        <div class="stat-card">
          <div class="stat-label">Total Budget</div>
          <div class="stat-value">${fmt(totalBudgetPlanned)}</div>
          <div class="stat-sub">${fmt(totalBudgetSpent)} used (${totalBudgetPlanned ? Math.round(totalBudgetSpent/totalBudgetPlanned*100) : 0}%)</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Tasks Completed</div>
          <div class="stat-value">${completedTasks}/${totalTasks}</div>
          <div class="stat-sub">${totalTasks ? Math.round(completedTasks/totalTasks*100) : 0}% overall completion</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Open Actions</div>
          <div class="stat-value">${openActions}</div>
          <div class="stat-sub">${criticalActions} critical</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Active Projects</div>
          <div class="stat-value">${projects.filter(p => p.status === 'active').length}</div>
          <div class="stat-sub">${projects.length} total</div>
        </div>
      </div>

      <div class="reports-grid">
        <div class="chart-card">
          <div class="chart-title">Projects by Status</div>
          <div class="chart-wrap"><canvas id="chart-status"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Budget: Planned vs. Actual by Project</div>
          <div class="chart-wrap"><canvas id="chart-budget"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Progress by Project (%)</div>
          <div class="chart-wrap"><canvas id="chart-progress"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Actions by Priority</div>
          <div class="chart-wrap"><canvas id="chart-actions"></canvas></div>
        </div>
      </div>
    `;

    // Defer until canvas elements are laid out
    requestAnimationFrame(() => this._renderCharts(projects, tasks, actions));
  },

  _renderCharts(projects, tasks, actions) {
    const accent = '#3e6697';
    const light  = '#c4d7ff';
    const mid    = '#6b7280';
    const green  = '#22c55e';
    const amber  = '#f59e0b';
    const red    = '#ef4444';

    /* Chart 1: Status doughnut */
    const statusCounts = {};
    PROJECT_STATUSES.forEach(s => statusCounts[s] = 0);
    projects.forEach(p => { statusCounts[p.status] = (statusCounts[p.status] || 0) + 1; });

    A10Charts.doughnut('chart-status', {
      labels: ['Active', 'On Hold', 'Completed', 'Draft'],
      data:   [statusCounts.active, statusCounts['on-hold'], statusCounts.completed, statusCounts.draft],
      colors: [green, amber, mid, accent],
    });

    /* Chart 2: Budget bar */
    A10Charts.bar('chart-budget', {
      labels: projects.map(p => p.name.length > 20 ? p.name.slice(0, 20) + '…' : p.name),
      datasets: [
        { label: 'Planned', data: projects.map(p => DB.projectPlanned(p.id)), backgroundColor: light },
        { label: 'Actual',  data: projects.map(p => DB.projectSpent(p.id)),   backgroundColor: accent },
      ],
      yTickFormat: v => `€${(v / 1000).toFixed(0)}k`,
    });

    /* Chart 3: Horizontal progress bar */
    const colors3 = projects.map(p => p.status === 'completed' ? green : accent);
    A10Charts.barH('chart-progress', {
      labels: projects.map(p => p.name.length > 22 ? p.name.slice(0, 22) + '…' : p.name),
      datasets: [{ label: 'Completion', data: projects.map(p => DB.projectCompletion(p.id)), backgroundColor: colors3 }],
      xTickFormat: v => `${Math.round(v)}%`,
    });

    /* Chart 4: Actions by priority */
    const byPriority = {};
    PRIORITIES.forEach(p => byPriority[p] = { open: 0, done: 0 });
    actions.forEach(a => {
      if (!byPriority[a.priority]) byPriority[a.priority] = { open: 0, done: 0 };
      if (a.status === 'done') byPriority[a.priority].done++;
      else byPriority[a.priority].open++;
    });

    A10Charts.bar('chart-actions', {
      labels: ['Low', 'Medium', 'High', 'Critical'],
      datasets: [
        { label: 'Open', data: PRIORITIES.map(p => byPriority[p]?.open || 0), backgroundColor: [mid, accent, amber, red] },
        { label: 'Done', data: PRIORITIES.map(p => byPriority[p]?.done || 0), backgroundColor: green },
      ],
      stacked: true,
    });
  },
};

/* ── Global Event Listeners ────────────────────────────────── */

/* Login form */
document.getElementById('form-login').addEventListener('submit', e => {
  e.preventDefault();
  const email    = document.getElementById('inp-email').value;
  const password = document.getElementById('inp-password').value;
  const errorEl  = document.getElementById('login-error');
  if (Auth.login(email, password)) {
    errorEl.classList.add('hidden');
    const session = Auth.current();
    document.getElementById('user-name').textContent = session.name;
    document.getElementById('user-avatar').textContent = session.avatar;
    Router.go('dashboard');
  } else {
    errorEl.classList.remove('hidden');
  }
});

/* Logout */
document.getElementById('btn-logout').addEventListener('click', () => Auth.logout());

/* Modal close */
document.getElementById('modal-close').addEventListener('click', () => UI.closeModal());
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) UI.closeModal();
});

/* Doc preview close */
document.getElementById('doc-close').addEventListener('click', () => UI.closeDocPreview());
document.getElementById('doc-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('doc-overlay')) UI.closeDocPreview();
});

/* Sidebar navigation */
document.querySelectorAll('.nav-item[data-route]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    Router.go(el.dataset.route);
  });
});

/* Keyboard: Escape closes modals */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    UI.closeModal();
    UI.closeDocPreview();
  }
});

/* ── Init ──────────────────────────────────────────────────── */

(function init() {
  DB.seed();
  const session = Auth.current();
  if (session) {
    document.getElementById('user-name').textContent = session.name;
    document.getElementById('user-avatar').textContent = session.avatar;
    Router.go('dashboard');
  } else {
    Router.go('login');
  }
})();
