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
    { id: 'b1', projectId: 'proj-1', category: 'Personnel',             wbs: 'WBS-001 · People & Labour',      planned: 150000, actual: 52000, notes: 'A10 team fees' },
    { id: 'b2', projectId: 'proj-1', category: 'Travel & Accommodation',wbs: 'CC-002 · Site Operations',       planned: 35000,  actual: 18500, notes: 'Site visits — 4 trips to date' },
    { id: 'b3', projectId: 'proj-1', category: 'External Services',     wbs: 'WBS-003 · Technical Advisory',   planned: 40000,  actual: 12000, notes: 'Specialist technical consultants' },
    { id: 'b4', projectId: 'proj-1', category: 'Technology',            wbs: 'CC-004 · IT & Systems',          planned: 15000,  actual: 5000,  notes: 'Software licences and tools' },
    { id: 'b5', projectId: 'proj-1', category: 'Contingency',           wbs: 'CC-005 · Reserve',               planned: 10000,  actual: 0,     notes: '4% contingency reserve' },
    /* proj-2 */
    { id: 'b6', projectId: 'proj-2', category: 'Personnel',             wbs: 'WBS-001 · Consulting Fees',      planned: 110000, actual: 72000, notes: 'A10 team fees' },
    { id: 'b7', projectId: 'proj-2', category: 'Travel & Accommodation',wbs: 'CC-002 · Travel',                planned: 20000,  actual: 15000, notes: '3 cities covered' },
    { id: 'b8', projectId: 'proj-2', category: 'Technology',            wbs: 'WBS-003 · WMS Integration',      planned: 25000,  actual: 18000, notes: 'WMS integration tools' },
    { id: 'b9', projectId: 'proj-2', category: 'Contingency',           wbs: 'CC-004 · Reserve',               planned: 25000,  actual: 7000,  notes: '' },
    /* proj-3 */
    { id: 'b10', projectId: 'proj-3', category: 'Personnel',             wbs: 'WBS-001 · Programme Team',       planned: 260000, actual: 52000, notes: 'A10 team fees — 11 months' },
    { id: 'b11', projectId: 'proj-3', category: 'Travel & Accommodation',wbs: 'CC-002 · Site Travel',           planned: 60000,  actual: 14000, notes: 'Site-based work' },
    { id: 'b12', projectId: 'proj-3', category: 'External Services',     wbs: 'WBS-003 · Engineering',          planned: 50000,  actual: 8000,  notes: 'Engineering subcontractors' },
    { id: 'b13', projectId: 'proj-3', category: 'Technology',            wbs: 'CC-004 · Systems',               planned: 20000,  actual: 5000,  notes: '' },
    { id: 'b14', projectId: 'proj-3', category: 'Materials',             wbs: 'CC-005 · Site Materials',        planned: 15000,  actual: 3000,  notes: '' },
    { id: 'b15', projectId: 'proj-3', category: 'Contingency',           wbs: 'CC-006 · Reserve',               planned: 15000,  actual: 2000,  notes: '' },
    /* proj-4 */
    { id: 'b16', projectId: 'proj-4', category: 'Personnel',             wbs: 'WBS-001 · Consulting Fees',      planned: 120000, actual: 118000, notes: 'A10 team fees' },
    { id: 'b17', projectId: 'proj-4', category: 'Travel & Accommodation',wbs: 'CC-002 · Travel',                planned: 18000,  actual: 16500,  notes: '' },
    { id: 'b18', projectId: 'proj-4', category: 'Technology',            wbs: 'WBS-003 · Analytics Tools',      planned: 12000,  actual: 9800,   notes: '' },
    { id: 'b19', projectId: 'proj-4', category: 'Contingency',           wbs: 'CC-004 · Reserve',               planned: 10000,  actual: 4200,   notes: '' },
  ],
  purchaseOrders: [
    { id: 'po-1', budgetItemId: 'b1', projectId: 'proj-1', poNumber: 'PO-2026-001', description: 'A10 Consulting Services – Phase 1 & 2', vendor: 'A10 Consulting', status: 'issued', amount: 80000, raisedDate: '2026-01-10', issuedDate: '2026-01-15', notes: '' },
    { id: 'po-2', budgetItemId: 'b1', projectId: 'proj-1', poNumber: 'PO-2026-002', description: 'A10 Consulting Services – Phase 3', vendor: 'A10 Consulting', status: 'raised', amount: 70000, raisedDate: '2026-04-01', issuedDate: '', notes: '' },
    { id: 'po-3', budgetItemId: 'b2', projectId: 'proj-1', poNumber: 'PO-2026-003', description: 'Site Travel & Accommodation Q1–Q2', vendor: 'CWT Travel Management', status: 'issued', amount: 35000, raisedDate: '2026-01-10', issuedDate: '2026-01-12', notes: '' },
    { id: 'po-4', budgetItemId: 'b6', projectId: 'proj-2', poNumber: 'PO-2025-001', description: 'Supply Chain Redesign – A10 Fees', vendor: 'A10 Consulting', status: 'issued', amount: 110000, raisedDate: '2025-10-28', issuedDate: '2025-11-01', notes: '' },
    { id: 'po-5', budgetItemId: 'b8', projectId: 'proj-2', poNumber: 'PO-2025-002', description: 'WMS Integration Development', vendor: 'TechOps Solutions', status: 'issued', amount: 25000, raisedDate: '2025-12-01', issuedDate: '2025-12-05', notes: '' },
  ],
  invoices: [
    { id: 'inv-1', poId: 'po-1', projectId: 'proj-1', invoiceNumber: 'A10-2026-001', description: 'Phase 1 – January Professional Fees', amount: 25000, invoiceDate: '2026-01-31', dueDate: '2026-02-28', status: 'paid', paidDate: '2026-02-20', notes: '' },
    { id: 'inv-2', poId: 'po-1', projectId: 'proj-1', invoiceNumber: 'A10-2026-002', description: 'Phase 1 – February Professional Fees', amount: 27000, invoiceDate: '2026-02-28', dueDate: '2026-03-31', status: 'paid', paidDate: '2026-03-22', notes: '' },
    { id: 'inv-3', poId: 'po-3', projectId: 'proj-1', invoiceNumber: 'A10-2026-003', description: 'Q1 Site Travel – 4 trips', amount: 18500, invoiceDate: '2026-03-31', dueDate: '2026-04-30', status: 'approved', paidDate: '', notes: '' },
    { id: 'inv-4', poId: 'po-4', projectId: 'proj-2', invoiceNumber: 'A10-2025-001', description: 'SC Redesign – November Fee', amount: 18000, invoiceDate: '2025-11-30', dueDate: '2025-12-31', status: 'paid', paidDate: '2025-12-20', notes: '' },
    { id: 'inv-5', poId: 'po-4', projectId: 'proj-2', invoiceNumber: 'A10-2025-002', description: 'SC Redesign – December Fee', amount: 18000, invoiceDate: '2025-12-31', dueDate: '2026-01-31', status: 'paid', paidDate: '2026-01-25', notes: '' },
    { id: 'inv-6', poId: 'po-4', projectId: 'proj-2', invoiceNumber: 'A10-2026-004', description: 'SC Redesign – January Fee', amount: 18000, invoiceDate: '2026-01-31', dueDate: '2026-02-28', status: 'paid', paidDate: '2026-02-20', notes: '' },
    { id: 'inv-7', poId: 'po-4', projectId: 'proj-2', invoiceNumber: 'A10-2026-005', description: 'SC Redesign – February Fee', amount: 18000, invoiceDate: '2026-02-28', dueDate: '2026-03-31', status: 'approved', paidDate: '', notes: '' },
    { id: 'inv-8', poId: 'po-5', projectId: 'proj-2', invoiceNumber: 'TOS-2026-001', description: 'WMS Integration – Milestone 1', amount: 12000, invoiceDate: '2026-02-15', dueDate: '2026-03-15', status: 'paid', paidDate: '2026-03-10', notes: '' },
    { id: 'inv-9', poId: 'po-5', projectId: 'proj-2', invoiceNumber: 'TOS-2026-002', description: 'WMS Integration – Milestone 2', amount: 6000, invoiceDate: '2026-03-31', dueDate: '2026-04-30', status: 'pending', paidDate: '', notes: '' },
  ],
  risks: [
    { id: 'rsk-1', projectId: 'proj-1', description: 'Key personnel unavailability during critical execution phase', category: 'Resource', probability: 'medium', impact: 'high', owner: 'Alexandre Costa', mitigation: 'Identify backup resources and cross-train team members; document critical knowledge', status: 'open', createdAt: '2026-01-20T09:00:00Z' },
    { id: 'rsk-2', projectId: 'proj-1', description: 'Scope creep from additional client requests outside agreed scope', category: 'Commercial', probability: 'high', impact: 'medium', owner: 'Alexandre Costa', mitigation: 'Strict change control process with documented sign-off and commercial impact assessment', status: 'open', createdAt: '2026-01-20T09:00:00Z' },
    { id: 'rsk-3', projectId: 'proj-1', description: 'Contractor resistance to renegotiated terms', category: 'External', probability: 'medium', impact: 'high', owner: 'Alexandre Costa', mitigation: 'Prepare alternative contractor options; engage senior client sponsor for negotiations', status: 'mitigated', createdAt: '2026-02-01T10:00:00Z' },
    { id: 'rsk-4', projectId: 'proj-2', description: 'WMS integration delays from technology vendor side', category: 'Technical', probability: 'medium', impact: 'high', owner: 'Sofia Martins', mitigation: 'Parallel implementation track with alternative WMS provider; contractual penalty clauses', status: 'open', createdAt: '2025-11-10T10:00:00Z' },
    { id: 'rsk-5', projectId: 'proj-2', description: 'Vendor contract negotiations extending beyond planned timeline', category: 'Schedule', probability: 'high', impact: 'medium', owner: 'Sofia Martins', mitigation: 'Parallel-tracking two vendors to reduce dependency; weekly steering committee review', status: 'mitigated', createdAt: '2025-11-15T09:00:00Z' },
    { id: 'rsk-6', projectId: 'proj-3', description: 'Client governance approval delay blocking project mobilisation', category: 'External', probability: 'high', impact: 'high', owner: 'Alexandre Costa', mitigation: 'Executive escalation; prepare fast-track approval documentation; weekly client engagement', status: 'open', createdAt: '2026-02-10T09:00:00Z' },
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

  purchaseOrders() { return this.get('purchaseOrders') || []; },
  invoices()       { return this.get('invoices')       || []; },
  risks()          { return this.get('risks')          || []; },
  savePurchaseOrders(arr) { this.set('purchaseOrders', arr); },
  saveInvoices(arr)       { this.set('invoices', arr); },
  saveRisks(arr)          { this.set('risks', arr); },

  /* A10 outbound invoices & company settings */
  a10Invoices()        { return this.get('a10Invoices') || []; },
  saveA10Invoices(arr) { this.set('a10Invoices', arr); },
  a10Settings() {
    return this.get('a10Settings') || {
      name: 'A10 Consulting Lda', address: '', city: '', postalCode: '',
      country: 'Portugal', nif: '', email: '', phone: '', iban: '', bic: '',
      paymentTerms: '30 days net',
    };
  },
  saveA10Settings(obj) { this.set('a10Settings', obj); },
  nextInvoiceNumber(type) {
    const year = new Date().getFullYear();
    const prefix = type === 'credit-note' ? `A10-NC-${year}` : `A10-FT-${year}`;
    const count = this.a10Invoices().filter(i => i.invoiceNumber?.startsWith(prefix)).length;
    return `${prefix}-${String(count + 1).padStart(3, '0')}`;
  },

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
    const invos = this.invoices().filter(i => i.projectId === projectId && i.status === 'paid');
    if (invos.length > 0) return invos.reduce((s, i) => s + (i.amount || 0), 0);
    return this.budgetItems().filter(b => b.projectId === projectId).reduce((s, b) => s + (b.actual || 0), 0);
  },

  /* Computed: budget planned for project */
  projectPlanned(projectId) {
    return this.budgetItems()
      .filter(b => b.projectId === projectId)
      .reduce((s, b) => s + (b.planned || 0), 0);
  },

  /* Computed: auto health score — null for completed/draft */
  projectHealth(projectId) {
    const proj = this.projectById(projectId);
    if (!proj || proj.status === 'completed' || proj.status === 'draft') return null;
    const pct = this.projectCompletion(projectId);
    const planned = this.projectPlanned(projectId);
    const spent = this.projectSpent(projectId);
    const budgetPct = planned ? Math.round(spent / planned * 100) : 0;
    const actions = this.actionItems().filter(a => a.projectId === projectId);
    const overdueActions = actions.filter(a => a.status !== 'done' && isOverdue(a.dueDate)).length;
    const criticalOpen   = actions.filter(a => a.status !== 'done' && a.priority === 'critical').length;
    const today = new Date();
    const end   = proj.endDate   ? new Date(proj.endDate)   : null;
    const start = proj.startDate ? new Date(proj.startDate) : null;
    const totalDays = end && start ? (end - start) / 86400000 : null;
    const elapsed   = start ? (today - start) / 86400000 : null;
    const schedulePct = totalDays && elapsed > 0 ? Math.min(100, Math.round(elapsed / totalDays * 100)) : 0;
    let score = 0;
    const gap = schedulePct - pct;
    if (gap > 20) score += 2; else if (gap > 10) score += 1;
    if (budgetPct > 90) score += 2; else if (budgetPct > 75) score += 1;
    if (overdueActions > 3) score += 2; else if (overdueActions > 0) score += 1;
    if (criticalOpen > 0) score += 1;
    if (score >= 4) return 'off-track';
    if (score >= 2) return 'at-risk';
    return 'on-track';
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
    this.savePurchaseOrders(SEED.purchaseOrders);
    this.saveInvoices(SEED.invoices);
    this.saveRisks(SEED.risks);
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

function poStatusBadge(status) {
  const map = {
    'raised': '<span class="badge badge-in-progress">Raised</span>',
    'issued': '<span class="badge badge-active">Issued</span>',
    'closed': '<span class="badge badge-done">Closed</span>',
  };
  return map[status] || `<span class="badge">${status}</span>`;
}

function invoiceStatusBadge(status) {
  const map = {
    'pending':  '<span class="badge badge-todo">Pending</span>',
    'approved': '<span class="badge badge-in-progress">Approved</span>',
    'paid':     '<span class="badge badge-done">Paid</span>',
  };
  return map[status] || `<span class="badge">${status}</span>`;
}

function statusLabel(s) {
  const map = { 'active': 'Active', 'on-hold': 'On Hold', 'completed': 'Completed', 'draft': 'Draft' };
  return map[s] || s;
}

function a10InvStatusBadge(status) {
  const map = {
    'draft':     '<span class="badge badge-draft">Draft</span>',
    'sent':      '<span class="badge badge-in-progress">Sent</span>',
    'paid':      '<span class="badge badge-done">Paid</span>',
    'overdue':   '<span class="badge badge-critical">Overdue</span>',
    'cancelled': '<span class="badge">Cancelled</span>',
  };
  return map[status] || `<span class="badge">${status}</span>`;
}

function calcInvTotals(items) {
  const subtotal  = items.reduce((s, it) => s + (parseFloat(it.qty) || 0) * (parseFloat(it.unitPrice) || 0), 0);
  const vatAmount = items.reduce((s, it) => s + (parseFloat(it.qty) || 0) * (parseFloat(it.unitPrice) || 0) * (parseFloat(it.vatRate) || 0) / 100, 0);
  return { subtotal, vatAmount, total: subtotal + vatAmount };
}

function progressBar(pct) {
  return `<div class="progress-wrap">
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    <span class="progress-pct">${pct}%</span>
  </div>`;
}

function healthBadge(health) {
  if (!health) return '';
  const map = {
    'on-track':  ['On Track',  '#16a34a', '#dcfce7'],
    'at-risk':   ['At Risk',   '#d97706', '#fef3c7'],
    'off-track': ['Off Track', '#dc2626', '#fee2e2'],
  };
  const [label, color, bg] = map[health] || ['—', '#6b7280', '#f3f4f6'];
  return `<span style="display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700;background:${bg};color:${color}">${label}</span>`;
}

function riskScoreBadge(prob, impact) {
  const p = { low: 1, medium: 2, high: 3 }[prob] || 1;
  const i = { low: 1, medium: 2, high: 3 }[impact] || 1;
  const score = p * i;
  if (score >= 6) return `<span style="display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700;background:#fee2e2;color:#dc2626">Critical (${score})</span>`;
  if (score >= 4) return `<span style="display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700;background:#fef3c7;color:#d97706">High (${score})</span>`;
  if (score >= 2) return `<span style="display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700;background:#dbeafe;color:#3e6697">Medium (${score})</span>`;
  return `<span style="display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700;background:#dcfce7;color:#16a34a">Low (${score})</span>`;
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

/* ── Notifications ─────────────────────────────────────────── */

const Notifications = {
  _open: false,

  refresh() {
    const count = this._getItems().length;
    const badge = document.getElementById('notif-badge');
    if (!badge) return;
    badge.textContent = count;
    if (count > 0) badge.classList.remove('hidden'); else badge.classList.add('hidden');
  },

  _getItems() {
    const today = new Date();
    const items = [];
    DB.actionItems()
      .filter(a => a.status !== 'done' && a.dueDate && new Date(a.dueDate) < today)
      .forEach(a => {
        const proj = DB.projectById(a.projectId);
        items.push({ type: 'action', text: a.description, sub: proj?.name || '', id: a.projectId });
      });
    DB.tasks()
      .filter(t => t.status !== 'completed' && t.dueDate && new Date(t.dueDate) < today)
      .forEach(t => {
        const proj = DB.projectById(t.projectId);
        items.push({ type: 'task', text: t.name, sub: proj?.name || '', id: t.projectId });
      });
    DB.projects().filter(p => p.status === 'active').forEach(p => {
      const planned = DB.projectPlanned(p.id);
      const spent   = DB.projectSpent(p.id);
      if (planned > 0 && spent / planned > 0.9) {
        items.push({ type: 'budget', text: 'Budget >90% consumed', sub: p.name, id: p.id });
      }
    });
    return items;
  },

  toggle() {
    this._open = !this._open;
    const dropdown = document.getElementById('notif-dropdown');
    if (!dropdown) return;
    if (this._open) {
      dropdown.innerHTML = this._buildDropdown();
      dropdown.classList.remove('hidden');
      dropdown.querySelectorAll('[data-notif-project]').forEach(el => {
        el.addEventListener('click', () => {
          Router.go('project', el.dataset.notifProject);
          this.close();
        });
      });
    } else {
      dropdown.classList.add('hidden');
    }
  },

  close() {
    this._open = false;
    document.getElementById('notif-dropdown')?.classList.add('hidden');
  },

  _buildDropdown() {
    const items = this._getItems();
    const iconMap = { action: '⚠️', task: '🕐', budget: '💰' };
    return `
      <div class="notif-header">Alerts (${items.length})</div>
      ${items.length
        ? items.map(it => `
          <div class="notif-item" data-notif-project="${it.id}">
            <div class="notif-icon">${iconMap[it.type]}</div>
            <div>
              <div class="notif-text">${it.text}</div>
              <div class="notif-sub">${it.sub}</div>
            </div>
          </div>`).join('')
        : `<div class="notif-empty">No alerts — all on track.</div>`
      }
    `;
  },
};

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
    Notifications.close();
    Notifications.refresh();

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
    } else if (route === 'finance') {
      UI.setTitle('Invoicing', 'Finance');
      UI.setHeaderActions(`
        <button class="btn btn-ghost btn-sm" id="btn-a10-settings">⚙ A10 Settings</button>
        <button class="btn btn-secondary" id="btn-new-cn">+ Credit Note</button>
        <button class="btn btn-primary" id="btn-new-inv">+ New Invoice</button>
      `);
      FinanceView.render();
      document.getElementById('btn-a10-settings')?.addEventListener('click', () => A10SettingsModal.open());
      document.getElementById('btn-new-inv')?.addEventListener('click', () => A10InvoiceModal.open(null, 'invoice'));
      document.getElementById('btn-new-cn')?.addEventListener('click', () => A10InvoiceModal.open(null, 'credit-note'));
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
            <th>Health</th>
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
              <td>${healthBadge(DB.projectHealth(p.id))}</td>
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
      { id: 'risks',        label: 'Risk Register' },
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
    if (this.activeTab === 'risks')       this._renderRisks(proj, tc);
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
        ${DB.projectHealth(proj.id) ? `
        <div class="info-card">
          <div class="info-card-label">Health</div>
          <div class="info-card-value">${healthBadge(DB.projectHealth(proj.id))}</div>
        </div>` : ''}
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
    const allPOs = DB.purchaseOrders().filter(po => po.projectId === proj.id);
    const allInvs = DB.invoices().filter(inv => inv.projectId === proj.id);

    function itemStats(b) {
      const pos = allPOs.filter(po => po.budgetItemId === b.id);
      const invs = allInvs.filter(inv => pos.some(po => po.id === inv.poId));
      const committed = pos.reduce((s, po) => s + (po.amount || 0), 0);
      const invoiced  = invs.reduce((s, inv) => s + (inv.amount || 0), 0);
      const paid      = invs.filter(i => i.status === 'paid').reduce((s, i) => s + (i.amount || 0), 0);
      return { committed, invoiced, paid, available: b.planned - committed, pos };
    }

    function poStats(po) {
      const invs = allInvs.filter(inv => inv.poId === po.id);
      return {
        invoiced: invs.reduce((s, i) => s + (i.amount || 0), 0),
        paid: invs.filter(i => i.status === 'paid').reduce((s, i) => s + (i.amount || 0), 0),
        invs,
      };
    }

    const totalPlanned   = items.reduce((s, b) => s + (b.planned || 0), 0);
    const totalCommitted = allPOs.reduce((s, po) => s + (po.amount || 0), 0);
    const totalInvoiced  = allInvs.reduce((s, i) => s + (i.amount || 0), 0);
    const totalPaid      = allInvs.filter(i => i.status === 'paid').reduce((s, i) => s + (i.amount || 0), 0);
    const totalAvailable = totalPlanned - totalCommitted;
    const commitPct      = totalPlanned ? Math.round(totalCommitted / totalPlanned * 100) : 0;

    const expandedItems = new Set();
    const expandedPOs   = new Set();
    const refresh       = () => this._renderTab(proj.id);

    const renderAll = () => {
      tc.innerHTML = `
        <div class="budget-summary" style="grid-template-columns:repeat(5,1fr);margin-bottom:24px">
          <div class="budget-stat">
            <div class="budget-stat-label">Planned</div>
            <div class="budget-stat-value">${fmt(totalPlanned)}</div>
          </div>
          <div class="budget-stat">
            <div class="budget-stat-label">Committed (POs)</div>
            <div class="budget-stat-value">${fmt(totalCommitted)}</div>
            <div style="margin-top:6px">${progressBar(commitPct)}</div>
          </div>
          <div class="budget-stat">
            <div class="budget-stat-label">Invoiced</div>
            <div class="budget-stat-value">${fmt(totalInvoiced)}</div>
          </div>
          <div class="budget-stat">
            <div class="budget-stat-label">Paid</div>
            <div class="budget-stat-value" style="color:#16a34a">${fmt(totalPaid)}</div>
          </div>
          <div class="budget-stat">
            <div class="budget-stat-label">Available</div>
            <div class="budget-stat-value ${totalAvailable < 0 ? 'negative' : ''}">${fmt(totalAvailable)}</div>
          </div>
        </div>
        <div class="section-card">
          <div class="section-card-header">
            <h3>Budget Lines</h3>
            <button class="btn btn-primary btn-sm" id="btn-add-budget">+ Budget Line</button>
          </div>
          ${items.length ? `
            <div style="overflow-x:auto">
              <table class="data-table" id="budget-table">
                <thead>
                  <tr>
                    <th style="min-width:160px">Category</th>
                    <th style="min-width:160px">WBS / Cost Centre</th>
                    <th style="min-width:110px">Planned</th>
                    <th style="min-width:110px">Committed</th>
                    <th style="min-width:110px">Invoiced</th>
                    <th style="min-width:110px">Paid</th>
                    <th style="min-width:110px">Available</th>
                    <th style="min-width:120px"></th>
                  </tr>
                </thead>
                <tbody id="budget-tbody"></tbody>
              </table>
            </div>
          ` : `<div class="empty-state"><div class="empty-state-icon">💰</div><p>No budget lines. Add a budget line to get started.</p></div>`}
        </div>
      `;

      document.getElementById('btn-add-budget')?.addEventListener('click', () => BudgetModal.open(proj.id, null, refresh));
      if (items.length) renderRows();
    };

    const renderRows = () => {
      const tbody = document.getElementById('budget-tbody');
      if (!tbody) return;
      let html = '';

      items.forEach(b => {
        const s = itemStats(b);
        const isExp = expandedItems.has(b.id);
        const avColor = s.available < 0 ? '#dc2626' : '#16a34a';

        html += `<tr class="budget-cat-row">
          <td><div style="display:flex;align-items:center;gap:6px">
            <button class="expand-btn" data-expand-item="${b.id}">${isExp ? '▼' : '▶'}</button>
            <strong>${b.category}</strong>
          </div></td>
          <td style="font-size:12px;color:var(--mid)">${b.wbs || '—'}</td>
          <td style="font-weight:700">${fmt(b.planned)}</td>
          <td>${fmt(s.committed)}</td>
          <td>${fmt(s.invoiced)}</td>
          <td style="color:#16a34a;font-weight:${s.paid > 0 ? '700' : '400'}">${fmt(s.paid)}</td>
          <td style="font-weight:700;color:${avColor}">${fmt(s.available)}</td>
          <td><div class="actions-cell">
            <button class="btn btn-secondary btn-sm" data-edit-budget="${b.id}">Edit</button>
            <button class="btn btn-danger btn-sm" data-delete-budget="${b.id}">✕</button>
          </div></td>
        </tr>`;

        if (isExp) {
          s.pos.forEach(po => {
            const ps = poStats(po);
            const isPOExp = expandedPOs.has(po.id);
            html += `<tr style="background:#f5f8ff">
              <td style="padding-left:28px"><div style="display:flex;align-items:center;gap:6px">
                <button class="expand-btn" data-expand-po="${po.id}">${isPOExp ? '▼' : '▶'}</button>
                <span style="font-size:12px;font-weight:700;color:var(--accent)">${po.poNumber}</span>
              </div></td>
              <td style="font-size:12px"><div style="font-weight:600">${po.description}</div><div style="color:var(--mid)">${po.vendor}</div></td>
              <td>${poStatusBadge(po.status)}</td>
              <td style="font-weight:700">${fmt(po.amount)}</td>
              <td>${fmt(ps.invoiced)}</td>
              <td style="color:#16a34a;font-weight:${ps.paid > 0 ? '700' : '400'}">${fmt(ps.paid)}</td>
              <td style="font-size:12px;color:var(--mid)">${fmt(po.amount - ps.paid)} remaining</td>
              <td><div class="actions-cell">
                <button class="btn btn-primary btn-sm" style="font-size:11px;padding:2px 7px" data-add-invoice="${po.id}">+ Invoice</button>
                <button class="btn btn-secondary btn-sm" data-edit-po="${po.id}">Edit</button>
                <button class="btn btn-danger btn-sm" data-delete-po="${po.id}">✕</button>
              </div></td>
            </tr>`;

            if (isPOExp) {
              if (ps.invs.length) {
                ps.invs.forEach(inv => {
                  html += `<tr style="background:#eef2ff">
                    <td style="padding-left:52px;font-size:12px">📄 ${inv.invoiceNumber}</td>
                    <td style="font-size:12px">${inv.description}</td>
                    <td>${invoiceStatusBadge(inv.status)}</td>
                    <td style="font-weight:700">${fmt(inv.amount)}</td>
                    <td style="font-size:12px;color:var(--mid)">${fmtDate(inv.invoiceDate)}</td>
                    <td style="font-size:12px;color:var(--mid)">Due: ${fmtDate(inv.dueDate)}</td>
                    <td style="font-size:12px;color:#16a34a">${inv.status === 'paid' ? '✓ ' + fmtDate(inv.paidDate) : '—'}</td>
                    <td><div class="actions-cell">
                      <button class="btn btn-secondary btn-sm" data-edit-invoice="${inv.id}">Edit</button>
                      <button class="btn btn-danger btn-sm" data-delete-invoice="${inv.id}">✕</button>
                    </div></td>
                  </tr>`;
                });
              } else {
                html += `<tr style="background:#eef2ff"><td colspan="8" style="padding-left:52px;font-size:12px;color:var(--mid)">No invoices for this PO yet.</td></tr>`;
              }
            }
          });

          html += `<tr style="background:#f5f8ff"><td colspan="8" style="padding-left:28px;padding-top:6px;padding-bottom:8px">
            <button class="btn btn-secondary btn-sm" data-add-po="${b.id}">+ Purchase Order</button>
          </td></tr>`;
        }
      });

      // Totals
      html += `<tr style="background:var(--grey);font-weight:700;border-top:2px solid var(--border)">
        <td colspan="2">Total</td>
        <td>${fmt(totalPlanned)}</td>
        <td>${fmt(totalCommitted)}</td>
        <td>${fmt(totalInvoiced)}</td>
        <td style="color:#16a34a">${fmt(totalPaid)}</td>
        <td style="${totalAvailable < 0 ? 'color:#dc2626' : 'color:#16a34a'}">${fmt(totalAvailable)}</td>
        <td></td>
      </tr>`;

      tbody.innerHTML = html;

      tbody.querySelectorAll('[data-expand-item]').forEach(btn => btn.addEventListener('click', () => {
        const id = btn.dataset.expandItem;
        if (expandedItems.has(id)) expandedItems.delete(id); else expandedItems.add(id);
        renderRows();
      }));
      tbody.querySelectorAll('[data-expand-po]').forEach(btn => btn.addEventListener('click', () => {
        const id = btn.dataset.expandPo;
        if (expandedPOs.has(id)) expandedPOs.delete(id); else expandedPOs.add(id);
        renderRows();
      }));
      tbody.querySelectorAll('[data-edit-budget]').forEach(btn => btn.addEventListener('click', () => BudgetModal.open(proj.id, btn.dataset.editBudget, refresh)));
      tbody.querySelectorAll('[data-delete-budget]').forEach(btn => btn.addEventListener('click', () => {
        if (!UI.confirm('Delete this budget line and all its POs and invoices?')) return;
        const bId = btn.dataset.deleteBudget;
        const bPOs = DB.purchaseOrders().filter(po => po.budgetItemId === bId);
        const poIds = bPOs.map(po => po.id);
        DB.saveBudgetItems(DB.budgetItems().filter(b => b.id !== bId));
        DB.savePurchaseOrders(DB.purchaseOrders().filter(po => po.budgetItemId !== bId));
        DB.saveInvoices(DB.invoices().filter(inv => !poIds.includes(inv.poId)));
        UI.toast('Budget line deleted.', 'default');
        refresh();
      }));
      tbody.querySelectorAll('[data-add-po]').forEach(btn => btn.addEventListener('click', () => {
        const bId = btn.dataset.addPo;
        POModal.open(proj.id, bId, null, () => { expandedItems.add(bId); refresh(); });
      }));
      tbody.querySelectorAll('[data-edit-po]').forEach(btn => btn.addEventListener('click', () => POModal.open(proj.id, null, btn.dataset.editPo, refresh)));
      tbody.querySelectorAll('[data-delete-po]').forEach(btn => btn.addEventListener('click', () => {
        if (!UI.confirm('Delete this PO and all its invoices?')) return;
        const poId = btn.dataset.deletePo;
        DB.savePurchaseOrders(DB.purchaseOrders().filter(po => po.id !== poId));
        DB.saveInvoices(DB.invoices().filter(inv => inv.poId !== poId));
        UI.toast('PO deleted.', 'default');
        refresh();
      }));
      tbody.querySelectorAll('[data-add-invoice]').forEach(btn => btn.addEventListener('click', () => {
        const poId = btn.dataset.addInvoice;
        InvoiceModal.open(proj.id, poId, null, () => { expandedPOs.add(poId); refresh(); });
      }));
      tbody.querySelectorAll('[data-edit-invoice]').forEach(btn => btn.addEventListener('click', () => InvoiceModal.open(proj.id, null, btn.dataset.editInvoice, refresh)));
      tbody.querySelectorAll('[data-delete-invoice]').forEach(btn => btn.addEventListener('click', () => {
        if (!UI.confirm('Delete this invoice?')) return;
        DB.saveInvoices(DB.invoices().filter(inv => inv.id !== btn.dataset.deleteInvoice));
        UI.toast('Invoice deleted.', 'default');
        refresh();
      }));
    };

    renderAll();
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

  /* ── Tab: Risk Register ── */
  _renderRisks(proj, tc) {
    const RISK_CATEGORIES = ['Technical', 'Commercial', 'Schedule', 'Resource', 'External', 'Other'];
    const RISK_STATUSES   = ['open', 'mitigated', 'closed', 'accepted'];
    const refresh = () => this._renderTab(proj.id);

    const render = () => {
      const risks = DB.risks().filter(r => r.projectId === proj.id);
      const open     = risks.filter(r => r.status === 'open').length;
      const critical = risks.filter(r => {
        const p = { low: 1, medium: 2, high: 3 }[r.probability] || 1;
        const i = { low: 1, medium: 2, high: 3 }[r.impact] || 1;
        return p * i >= 6;
      }).length;

      tc.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <div class="stat-card" style="padding:10px 16px;min-width:0">
              <div class="stat-label" style="font-size:11px">Total Risks</div>
              <div class="stat-value" style="font-size:20px">${risks.length}</div>
            </div>
            <div class="stat-card" style="padding:10px 16px;min-width:0">
              <div class="stat-label" style="font-size:11px">Open</div>
              <div class="stat-value" style="font-size:20px;color:${open > 0 ? '#d97706' : 'inherit'}">${open}</div>
            </div>
            <div class="stat-card" style="padding:10px 16px;min-width:0">
              <div class="stat-label" style="font-size:11px">Critical Score</div>
              <div class="stat-value" style="font-size:20px;color:${critical > 0 ? '#dc2626' : 'inherit'}">${critical}</div>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-add-risk">+ Add Risk</button>
        </div>
        ${risks.length ? `
          <div class="section-card" style="overflow-x:auto">
            <table class="data-table" style="min-width:1000px">
              <thead>
                <tr>
                  <th style="min-width:220px">Risk Description</th>
                  <th style="min-width:110px">Category</th>
                  <th style="min-width:90px">Probability</th>
                  <th style="min-width:90px">Impact</th>
                  <th style="min-width:110px">Score</th>
                  <th style="min-width:130px">Owner</th>
                  <th style="min-width:220px">Mitigation</th>
                  <th style="min-width:90px">Status</th>
                  <th style="min-width:80px"></th>
                </tr>
              </thead>
              <tbody>
                ${risks.map(r => `<tr>
                  <td style="font-weight:600;max-width:220px">${r.description}</td>
                  <td style="font-size:12px;color:var(--mid)">${r.category}</td>
                  <td>${priorityBadge(r.probability)}</td>
                  <td>${priorityBadge(r.impact)}</td>
                  <td>${riskScoreBadge(r.probability, r.impact)}</td>
                  <td style="font-size:12px;white-space:nowrap">${r.owner}</td>
                  <td style="font-size:12px;color:var(--mid);max-width:220px">${r.mitigation || '—'}</td>
                  <td>${actionStatusBadge(r.status)}</td>
                  <td>
                    <div class="actions-cell">
                      <button class="btn btn-secondary btn-sm" data-edit-risk="${r.id}">Edit</button>
                      <button class="btn btn-danger btn-sm" data-delete-risk="${r.id}">✕</button>
                    </div>
                  </td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        ` : `<div class="empty-state"><div class="empty-state-icon">🛡️</div><p>No risks logged. Add one to start tracking.</p></div>`}
      `;

      document.getElementById('btn-add-risk')?.addEventListener('click', () => RiskModal.open(proj.id, null, refresh));
      tc.querySelectorAll('[data-edit-risk]').forEach(btn => btn.addEventListener('click', () => RiskModal.open(proj.id, btn.dataset.editRisk, refresh)));
      tc.querySelectorAll('[data-delete-risk]').forEach(btn => btn.addEventListener('click', () => {
        if (!UI.confirm('Delete this risk?')) return;
        DB.saveRisks(DB.risks().filter(r => r.id !== btn.dataset.deleteRisk));
        UI.toast('Risk deleted.', 'default');
        refresh();
      }));
    };

    render();
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

/* ── Risk Modal ────────────────────────────────────────────── */

const RiskModal = {
  open(projectId, riskId, onSave) {
    const risk = riskId ? DB.risks().find(r => r.id === riskId) : null;
    const users = DB.users();
    const RISK_CATEGORIES = ['Technical', 'Commercial', 'Schedule', 'Resource', 'External', 'Other'];
    const RISK_STATUSES   = ['open', 'mitigated', 'closed', 'accepted'];
    const PROB_IMPACT     = ['low', 'medium', 'high'];

    const body = `
      <form id="form-risk">
        <div class="form-field">
          <label>Risk Description *</label>
          <textarea name="description" rows="2" required>${risk?.description || ''}</textarea>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Category</label>
            <select name="category">
              ${RISK_CATEGORIES.map(c => `<option value="${c}" ${risk?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Owner</label>
            <select name="owner">
              ${users.map(u => `<option value="${u.name}" ${risk?.owner === u.name ? 'selected' : ''}>${u.name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Probability</label>
            <select name="probability">
              ${PROB_IMPACT.map(v => `<option value="${v}" ${risk?.probability === v ? 'selected' : ''}>${v[0].toUpperCase() + v.slice(1)}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Impact</label>
            <select name="impact">
              ${PROB_IMPACT.map(v => `<option value="${v}" ${risk?.impact === v ? 'selected' : ''}>${v[0].toUpperCase() + v.slice(1)}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>Status</label>
            <select name="status">
              ${RISK_STATUSES.map(s => `<option value="${s}" ${risk?.status === s ? 'selected' : ''}>${s[0].toUpperCase() + s.slice(1)}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-field">
          <label>Mitigation</label>
          <textarea name="mitigation" rows="2">${risk?.mitigation || ''}</textarea>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="risk-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${risk ? 'Save' : 'Add Risk'}</button>
        </div>
      </form>
    `;

    UI.openModal(risk ? 'Edit Risk' : 'New Risk', body, true);
    document.getElementById('risk-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-risk').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);
      data.projectId = projectId;
      const risks = DB.risks();
      if (risk) {
        const idx = risks.findIndex(r => r.id === riskId);
        risks[idx] = { ...risk, ...data };
      } else {
        risks.push({ ...data, id: 'rsk' + DB.uid(), createdAt: new Date().toISOString() });
      }
      DB.saveRisks(risks);
      UI.closeModal();
      UI.toast(risk ? 'Risk updated.' : 'Risk added.', 'success');
      onSave?.();
    });
  },
};

/* ── Budget Modal ──────────────────────────────────────────── */

const BudgetModal = {
  open(projectId, budgetId, onSave) {
    const item = budgetId ? DB.budgetItems().find(b => b.id === budgetId) : null;
    UI.openModal(item ? 'Edit Budget Line' : 'New Budget Line', `
      <form id="form-budget">
        <div class="form-row">
          <div class="form-field">
            <label>Category</label>
            <select name="category">
              ${BUDGET_CATEGORIES.map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label>WBS / Cost Centre</label>
            <input name="wbs" placeholder="e.g. WBS-001 · People & Labour" value="${item?.wbs || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Planned Value (€) *</label>
            <input name="planned" type="number" min="0" required value="${item?.planned || ''}">
          </div>
          <div class="form-field">
            <label>Notes</label>
            <input name="notes" value="${item?.notes || ''}">
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="budget-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${item ? 'Save' : 'Add'}</button>
        </div>
      </form>
    `);
    document.getElementById('budget-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-budget').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);
      data.planned = parseFloat(data.planned) || 0;
      data.actual = item?.actual || 0;
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
      UI.toast(item ? 'Budget line updated.' : 'Budget line added.', 'success');
      onSave?.();
    });
  },
};

/* ── PO Modal ──────────────────────────────────────────────── */

const POModal = {
  open(projectId, budgetItemId, poId, onSave) {
    const po = poId ? DB.purchaseOrders().find(p => p.id === poId) : null;
    const bId = po ? po.budgetItemId : budgetItemId;
    UI.openModal(po ? 'Edit Purchase Order' : 'New Purchase Order', `
      <form id="form-po">
        <div class="form-row">
          <div class="form-field">
            <label>PO Number *</label>
            <input name="poNumber" required value="${po?.poNumber || ''}">
          </div>
          <div class="form-field">
            <label>Status</label>
            <select name="status">
              <option value="raised" ${(po?.status || 'raised') === 'raised' ? 'selected' : ''}>Raised</option>
              <option value="issued" ${po?.status === 'issued' ? 'selected' : ''}>Issued</option>
              <option value="closed" ${po?.status === 'closed' ? 'selected' : ''}>Closed</option>
            </select>
          </div>
        </div>
        <div class="form-field">
          <label>Description *</label>
          <input name="description" required value="${po?.description || ''}">
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Vendor / Supplier</label>
            <input name="vendor" value="${po?.vendor || ''}">
          </div>
          <div class="form-field">
            <label>PO Amount (€) *</label>
            <input name="amount" type="number" min="0" required value="${po?.amount || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Raised Date</label>
            <input name="raisedDate" type="date" value="${po?.raisedDate || ''}">
          </div>
          <div class="form-field">
            <label>Issued Date</label>
            <input name="issuedDate" type="date" value="${po?.issuedDate || ''}">
          </div>
        </div>
        <div class="form-field">
          <label>Notes</label>
          <input name="notes" value="${po?.notes || ''}">
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="po-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${po ? 'Save' : 'Add PO'}</button>
        </div>
      </form>
    `, true);
    document.getElementById('po-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-po').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);
      data.amount = parseFloat(data.amount) || 0;
      data.projectId = projectId;
      data.budgetItemId = bId;
      const pos = DB.purchaseOrders();
      if (po) {
        const idx = pos.findIndex(p => p.id === poId);
        pos[idx] = { ...po, ...data };
      } else {
        pos.push({ ...data, id: 'po-' + DB.uid() });
      }
      DB.savePurchaseOrders(pos);
      UI.closeModal();
      UI.toast(po ? 'PO updated.' : 'PO added.', 'success');
      onSave?.();
    });
  },
};

/* ── Invoice Modal ─────────────────────────────────────────── */

const InvoiceModal = {
  open(projectId, poId, invoiceId, onSave) {
    const inv = invoiceId ? DB.invoices().find(i => i.id === invoiceId) : null;
    const pid = inv ? inv.poId : poId;
    UI.openModal(inv ? 'Edit Invoice' : 'New Invoice', `
      <form id="form-invoice">
        <div class="form-row">
          <div class="form-field">
            <label>Invoice Number *</label>
            <input name="invoiceNumber" required value="${inv?.invoiceNumber || ''}">
          </div>
          <div class="form-field">
            <label>Status</label>
            <select name="status">
              <option value="pending"  ${(inv?.status || 'pending')  === 'pending'  ? 'selected' : ''}>Pending</option>
              <option value="approved" ${inv?.status === 'approved' ? 'selected' : ''}>Approved</option>
              <option value="paid"     ${inv?.status === 'paid'     ? 'selected' : ''}>Paid</option>
            </select>
          </div>
        </div>
        <div class="form-field">
          <label>Description</label>
          <input name="description" value="${inv?.description || ''}">
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Amount (€) *</label>
            <input name="amount" type="number" min="0" required value="${inv?.amount || ''}">
          </div>
          <div class="form-field">
            <label>Invoice Date</label>
            <input name="invoiceDate" type="date" value="${inv?.invoiceDate || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Due Date</label>
            <input name="dueDate" type="date" value="${inv?.dueDate || ''}">
          </div>
          <div class="form-field">
            <label>Paid Date</label>
            <input name="paidDate" type="date" value="${inv?.paidDate || ''}">
          </div>
        </div>
        <div class="form-field">
          <label>Notes</label>
          <input name="notes" value="${inv?.notes || ''}">
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="invoice-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${inv ? 'Save' : 'Add Invoice'}</button>
        </div>
      </form>
    `, true);
    document.getElementById('invoice-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-invoice').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);
      data.amount = parseFloat(data.amount) || 0;
      data.projectId = projectId;
      data.poId = pid;
      const invoices = DB.invoices();
      if (inv) {
        const idx = invoices.findIndex(i => i.id === invoiceId);
        invoices[idx] = { ...inv, ...data };
      } else {
        invoices.push({ ...data, id: 'inv-' + DB.uid() });
      }
      DB.saveInvoices(invoices);
      UI.closeModal();
      UI.toast(inv ? 'Invoice updated.' : 'Invoice added.', 'success');
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
        <div class="form-section-title">Contact Details</div>
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

        <div class="form-section-title" style="margin-top:18px">Billing Information</div>
        <div class="form-row">
          <div class="form-field"><label>Billing Company Name <span style="font-weight:400;color:var(--mid)">(if different)</span></label><input name="billingName" value="${c?.billingName || ''}" placeholder="${c?.name || ''}"></div>
          <div class="form-field"><label>VAT / NIF Number</label><input name="vatNumber" value="${c?.vatNumber || ''}" placeholder="e.g. PT123456789"></div>
        </div>
        <div class="form-field"><label>Billing Address</label><input name="billingAddress" value="${c?.billingAddress || ''}" placeholder="Street, number, floor…"></div>
        <div class="form-row">
          <div class="form-field"><label>City</label><input name="billingCity" value="${c?.billingCity || ''}"></div>
          <div class="form-field"><label>Postal Code</label><input name="billingPostalCode" value="${c?.billingPostalCode || ''}"></div>
        </div>
        <div class="form-row">
          <div class="form-field"><label>Billing Country</label><input name="billingCountry" value="${c?.billingCountry || c?.country || ''}"></div>
          <div class="form-field"><label>Payment Terms</label><input name="paymentTerms" value="${c?.paymentTerms || ''}" placeholder="e.g. 30 days net"></div>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
          <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${c ? 'Save Changes' : 'Add Client'}</button>
        </div>
      </form>
    `, true);
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
          <thead><tr><th></th><th>Name</th><th>Email</th><th>Role</th><th>Password</th><th></th></tr></thead>
          <tbody>
            ${users.map(u => `<tr ${u.email === session?.email ? 'style="background:var(--grey)"' : ''}>
              <td><div style="width:32px;height:32px;border-radius:50%;background:var(--accent);color:#fff;font-size:12px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${u.avatar || u.name.slice(0,2).toUpperCase()}</div></td>
              <td style="font-weight:700">${u.name}${u.email === session?.email ? ' <span style="font-size:11px;color:var(--mid);font-weight:400">(you)</span>' : ''}</td>
              <td style="font-size:13px">${u.email}</td>
              <td><span class="badge ${u.role === 'admin' ? 'badge-active' : 'badge-in-progress'}">${u.role}</span></td>
              <td>
                ${u.password
                  ? `<span style="font-size:12px;font-weight:700;color:#16a34a">● Set</span>`
                  : `<span style="font-size:12px;font-weight:700;color:#dc2626">⚠ Not set</span>`}
              </td>
              <td>
                <div class="actions-cell">
                  <button class="btn btn-secondary btn-sm" data-edit-user="${u.id}">Edit</button>
                  <button class="btn btn-secondary btn-sm" data-pwd-user="${u.id}" title="Change password">🔑</button>
                  ${u.email !== session?.email ? `<button class="btn btn-danger btn-sm" data-delete-user="${u.id}">✕</button>` : ''}
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-add-user')?.addEventListener('click', () => UsersView.openModal(null));
    document.querySelectorAll('[data-edit-user]').forEach(btn => btn.addEventListener('click', () => UsersView.openModal(btn.dataset.editUser)));
    document.querySelectorAll('[data-pwd-user]').forEach(btn => btn.addEventListener('click', () => UsersView.changePasswordModal(btn.dataset.pwdUser)));
    document.querySelectorAll('[data-delete-user]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!UI.confirm('Delete this user?')) return;
        DB.saveUsers(DB.users().filter(u => String(u.id) !== String(btn.dataset.deleteUser)));
        UI.toast('User deleted.', 'default');
        UsersView.render();
      });
    });
  },

  /* Profile info only — no password here */
  openModal(userId) {
    const users = DB.users();
    const user = userId ? users.find(u => String(u.id) === String(userId)) : null;

    const pwdFields = user ? '' : `
      <div class="form-field">
        <label>Password *</label>
        <div class="pwd-wrap">
          <input id="inp-new-pwd" name="password" type="password" required placeholder="Minimum 6 characters" autocomplete="new-password">
          <button type="button" class="pwd-toggle" data-target="inp-new-pwd" aria-label="Show password">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
      <div class="form-field">
        <label>Confirm Password *</label>
        <div class="pwd-wrap">
          <input id="inp-confirm-pwd" name="confirm" type="password" required placeholder="Repeat password" autocomplete="new-password">
          <button type="button" class="pwd-toggle" data-target="inp-confirm-pwd" aria-label="Show password">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>`;

    UI.openModal(user ? 'Edit User' : 'New User', `
      <form id="form-user">
        <div class="form-row">
          <div class="form-field">
            <label>Full Name *</label>
            <input name="name" required value="${user?.name || ''}">
          </div>
          <div class="form-field">
            <label>Initials</label>
            <input name="avatar" maxlength="2" placeholder="e.g. AC" value="${user?.avatar || ''}">
          </div>
        </div>
        <div class="form-field">
          <label>Email *</label>
          <input name="email" type="email" required value="${user?.email || ''}" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Role</label>
          <select name="role">
            <option value="consultant" ${user?.role === 'consultant' ? 'selected' : ''}>Consultant</option>
            <option value="admin" ${user?.role === 'admin' ? 'selected' : ''}>Admin</option>
          </select>
        </div>
        ${pwdFields}
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
          <button type="button" class="btn btn-secondary" id="user-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${user ? 'Save Changes' : 'Create User'}</button>
        </div>
      </form>
    `);

    /* show/hide toggles */
    document.querySelectorAll('.pwd-toggle[data-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const inp = document.getElementById(btn.dataset.target);
        inp.type = inp.type === 'password' ? 'text' : 'password';
      });
    });

    document.getElementById('user-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-user').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd);

      if (!data.avatar) data.avatar = data.name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();

      /* new user: validate password match */
      if (!user) {
        if (data.password.length < 6) { UI.toast('Password must be at least 6 characters.', 'default'); return; }
        if (data.password !== data.confirm) { UI.toast('Passwords do not match.', 'default'); return; }
        delete data.confirm;
      }

      const list = DB.users();
      if (user) {
        const idx = list.findIndex(u => String(u.id) === String(userId));
        const { password: _pwd, confirm: _c, ...profileData } = data;
        list[idx] = { ...user, ...profileData };
      } else {
        list.push({ ...data, id: DB.uid() });
      }
      DB.saveUsers(list);
      UI.closeModal();
      UI.toast(user ? 'User updated.' : 'User created.', 'success');
      UsersView.render();
    });
  },

  /* Dedicated password-change modal */
  changePasswordModal(userId) {
    const user = DB.users().find(u => String(u.id) === String(userId));
    if (!user) return;

    UI.openModal(`Change Password — ${user.name}`, `
      <form id="form-change-pwd">
        <p style="font-size:13px;color:var(--mid);margin:0 0 16px">
          Setting a new password for <strong>${user.name}</strong> (${user.email}).
          ${user.password ? 'This will replace the existing password.' : '<span style="color:#dc2626">This user currently has no password set.</span>'}
        </p>
        <div class="form-field">
          <label>New Password *</label>
          <div class="pwd-wrap">
            <input id="inp-new-pwd1" name="password" type="password" required placeholder="Minimum 6 characters" autocomplete="new-password">
            <button type="button" class="pwd-toggle" data-target="inp-new-pwd1" aria-label="Show password">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="form-field">
          <label>Confirm New Password *</label>
          <div class="pwd-wrap">
            <input id="inp-new-pwd2" name="confirm" type="password" required placeholder="Repeat new password" autocomplete="new-password">
            <button type="button" class="pwd-toggle" data-target="inp-new-pwd2" aria-label="Show password">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
          <button type="button" class="btn btn-secondary" id="pwd-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Set Password</button>
        </div>
      </form>
    `);

    document.querySelectorAll('.pwd-toggle[data-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const inp = document.getElementById(btn.dataset.target);
        inp.type = inp.type === 'password' ? 'text' : 'password';
      });
    });

    document.getElementById('pwd-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-change-pwd').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const { password, confirm } = Object.fromEntries(fd);
      if (password.length < 6) { UI.toast('Password must be at least 6 characters.', 'default'); return; }
      if (password !== confirm) { UI.toast('Passwords do not match.', 'default'); return; }
      const list = DB.users();
      const idx = list.findIndex(u => String(u.id) === String(userId));
      list[idx] = { ...list[idx], password };
      DB.saveUsers(list);
      UI.closeModal();
      UI.toast(`Password updated for ${user.name}.`, 'success');
      UsersView.render();
    });
  },
};

/* ── Finance View ──────────────────────────────────────────── */

const FinanceView = {
  _filter: 'all',
  _statusFilter: 'all',

  render() {
    const all  = DB.a10Invoices();
    const year = new Date().getFullYear();
    const thisYear = all.filter(i => i.date?.startsWith(String(year)));
    const invoices = thisYear.filter(i => i.type === 'invoice');
    const cns      = thisYear.filter(i => i.type === 'credit-note');
    const paid     = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (i.total || 0), 0);
    const outstanding = invoices.filter(i => i.status !== 'paid' && i.status !== 'cancelled' && i.status !== 'draft')
                                 .reduce((s, i) => s + (i.total || 0), 0);
    const totalIssued = invoices.reduce((s, i) => s + (i.total || 0), 0);

    const mc = document.getElementById('main-content');
    mc.innerHTML = `
      <div class="stat-grid" style="grid-template-columns:repeat(4,1fr)">
        <div class="stat-card">
          <div class="stat-label">Invoiced ${year}</div>
          <div class="stat-value">${fmt(totalIssued)}</div>
          <div class="stat-sub">${invoices.length} invoice(s)</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Paid</div>
          <div class="stat-value" style="color:#16a34a">${fmt(paid)}</div>
          <div class="stat-sub">${invoices.filter(i=>i.status==='paid').length} invoice(s)</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Outstanding</div>
          <div class="stat-value" style="color:${outstanding>0?'#d97706':'inherit'}">${fmt(outstanding)}</div>
          <div class="stat-sub">${invoices.filter(i=>i.status==='sent'||i.status==='overdue').length} pending</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Credit Notes ${year}</div>
          <div class="stat-value">${cns.length}</div>
          <div class="stat-sub">${fmt(cns.reduce((s,i)=>s+(i.total||0),0))}</div>
        </div>
      </div>

      <div class="section-card">
        <div style="padding:16px 18px 0;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <div class="filter-bar" style="flex:1;min-width:0">
            <button class="filter-tab ${this._filter==='all'?'active':''}" data-ftype="all">All (${all.length})</button>
            <button class="filter-tab ${this._filter==='invoice'?'active':''}" data-ftype="invoice">Invoices</button>
            <button class="filter-tab ${this._filter==='credit-note'?'active':''}" data-ftype="credit-note">Credit Notes</button>
          </div>
          <select class="search-box" id="finance-status-filter" style="width:auto">
            <option value="all">All statuses</option>
            <option value="draft" ${this._statusFilter==='draft'?'selected':''}>Draft</option>
            <option value="sent" ${this._statusFilter==='sent'?'selected':''}>Sent</option>
            <option value="paid" ${this._statusFilter==='paid'?'selected':''}>Paid</option>
            <option value="overdue" ${this._statusFilter==='overdue'?'selected':''}>Overdue</option>
            <option value="cancelled" ${this._statusFilter==='cancelled'?'selected':''}>Cancelled</option>
          </select>
        </div>
        <div id="finance-table-wrap"></div>
      </div>`;

    this._renderTable(all);

    mc.querySelectorAll('[data-ftype]').forEach(btn => {
      btn.addEventListener('click', () => {
        this._filter = btn.dataset.ftype;
        mc.querySelectorAll('[data-ftype]').forEach(b => b.classList.toggle('active', b.dataset.ftype === this._filter));
        this._renderTable(all);
      });
    });
    document.getElementById('finance-status-filter')?.addEventListener('change', e => {
      this._statusFilter = e.target.value; this._renderTable(all);
    });
  },

  _renderTable(all) {
    let list = all;
    if (this._filter !== 'all')         list = list.filter(i => i.type === this._filter);
    if (this._statusFilter !== 'all')   list = list.filter(i => i.status === this._statusFilter);
    list = [...list].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    const wrap = document.getElementById('finance-table-wrap');
    if (!list.length) {
      wrap.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🧾</div><p>No documents yet. Create your first invoice.</p></div>`;
      return;
    }
    wrap.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Number</th><th>Type</th><th>Client</th><th>Project</th>
            <th>Date</th><th>Due Date</th><th>Total (incl. VAT)</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          ${list.map(inv => {
            const cl = DB.clients().find(c => c.id === inv.clientId);
            const pr = DB.projectById(inv.projectId);
            const overdue = inv.status === 'sent' && inv.dueDate && new Date(inv.dueDate) < new Date();
            const effStatus = overdue ? 'overdue' : inv.status;
            return `<tr>
              <td style="font-weight:700;font-size:13px;white-space:nowrap">${inv.invoiceNumber}</td>
              <td><span style="font-size:11px;font-weight:700;color:var(--mid);text-transform:uppercase">${inv.type === 'credit-note' ? 'Credit Note' : 'Invoice'}</span></td>
              <td style="font-size:13px">${cl?.name || '—'}</td>
              <td style="font-size:12px;color:var(--mid)">${pr?.name || '—'}</td>
              <td style="font-size:12px;color:var(--mid);white-space:nowrap">${fmtDate(inv.date)}</td>
              <td style="font-size:12px;white-space:nowrap;${overdue?'color:#dc2626;font-weight:700':''}">${fmtDate(inv.dueDate)}${overdue?' ⚠':''}</td>
              <td style="font-weight:700;white-space:nowrap">${fmt(inv.total || 0)}</td>
              <td>${a10InvStatusBadge(effStatus)}</td>
              <td>
                <div class="actions-cell">
                  <button class="btn btn-secondary btn-sm" data-preview-inv="${inv.id}">View</button>
                  <button class="btn btn-secondary btn-sm" data-edit-inv="${inv.id}">Edit</button>
                  <button class="btn btn-danger btn-sm" data-delete-inv="${inv.id}">✕</button>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>`;

    wrap.querySelectorAll('[data-preview-inv]').forEach(btn => btn.addEventListener('click', () => {
      const inv = DB.a10Invoices().find(i => i.id === btn.dataset.previewInv);
      if (inv) InvoiceDocGenerator.preview(inv);
    }));
    wrap.querySelectorAll('[data-edit-inv]').forEach(btn => btn.addEventListener('click', () => {
      A10InvoiceModal.open(btn.dataset.editInv);
    }));
    wrap.querySelectorAll('[data-delete-inv]').forEach(btn => btn.addEventListener('click', () => {
      if (!UI.confirm('Delete this document?')) return;
      DB.saveA10Invoices(DB.a10Invoices().filter(i => i.id !== btn.dataset.deleteInv));
      UI.toast('Deleted.', 'default');
      FinanceView.render();
    }));
  },
};

/* ── A10 Invoice Modal ─────────────────────────────────────── */

const A10InvoiceModal = {
  open(invId, forceType) {
    const inv  = invId ? DB.a10Invoices().find(i => i.id === invId) : null;
    const type = inv ? inv.type : (forceType || 'invoice');
    let lineItems = inv && inv.items?.length
      ? JSON.parse(JSON.stringify(inv.items))
      : [{ description: '', qty: 1, unitPrice: 0, vatRate: 23 }];

    const projects = DB.projects().filter(p => p.status !== 'draft');
    const clients  = DB.clients();
    const autoNum  = inv ? inv.invoiceNumber : DB.nextInvoiceNumber(type);
    const isInv    = type === 'invoice';
    const today    = new Date().toISOString().split('T')[0];
    const due30    = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

    const projOptions = projects.map(p =>
      `<option value="${p.id}" ${inv?.projectId === p.id ? 'selected' : ''}>${p.name}</option>`
    ).join('');
    const clientOptions = clients.map(c =>
      `<option value="${c.id}" ${inv?.clientId === c.id ? 'selected' : ''}>${c.name}</option>`
    ).join('');
    const vatOpts = ['0','6','13','23'].map(r =>
      `<option value="${r}" ${String(lineItems[0]?.vatRate) === r ? 'selected' : ''}>${r}%</option>`
    ).join('');

    UI.openModal(inv ? `Edit ${isInv?'Invoice':'Credit Note'}` : `New ${isInv?'Invoice':'Credit Note'}`, `
      <form id="form-a10inv">
        <div class="form-row">
          <div class="form-field">
            <label>Document Number</label>
            <input name="invoiceNumber" value="${autoNum}" required>
          </div>
          <div class="form-field">
            <label>Status</label>
            <select name="status">
              <option value="draft"     ${(inv?.status||'draft')==='draft'     ? 'selected' : ''}>Draft</option>
              <option value="sent"      ${inv?.status==='sent'      ? 'selected' : ''}>Sent</option>
              <option value="paid"      ${inv?.status==='paid'      ? 'selected' : ''}>Paid</option>
              <option value="cancelled" ${inv?.status==='cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Date *</label>
            <input name="date" type="date" required value="${inv?.date || today}">
          </div>
          <div class="form-field">
            <label>Due Date</label>
            <input name="dueDate" type="date" value="${inv?.dueDate || due30}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Project</label>
            <select name="projectId" id="inv-project-sel">
              <option value="">— select project —</option>
              ${projOptions}
            </select>
          </div>
          <div class="form-field">
            <label>Client *</label>
            <select name="clientId" id="inv-client-sel" required>
              <option value="">— select client —</option>
              ${clientOptions}
            </select>
          </div>
        </div>

        <div class="form-section-title" style="margin-top:8px">Line Items</div>
        <div id="inv-items-wrap"></div>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-add-inv-item" style="margin-bottom:12px">+ Add line</button>

        <div class="inv-totals-preview">
          <div class="inv-tot-row"><span>Subtotal</span><span id="inv-sub">€0</span></div>
          <div class="inv-tot-row"><span>VAT</span><span id="inv-vat">€0</span></div>
          <div class="inv-tot-row inv-tot-total"><span>TOTAL</span><span id="inv-tot">€0</span></div>
        </div>

        <div class="form-field" style="margin-top:12px">
          <label>Notes</label>
          <textarea name="notes" rows="2">${inv?.notes || ''}</textarea>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
          <button type="button" class="btn btn-secondary" id="inv-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${inv ? 'Save Changes' : (isInv ? 'Create Invoice' : 'Create Credit Note')}</button>
        </div>
      </form>
    `, true);

    /* helpers */
    const renderTotals = () => {
      const { subtotal, vatAmount, total } = calcInvTotals(lineItems);
      document.getElementById('inv-sub').textContent = fmt(subtotal);
      document.getElementById('inv-vat').textContent = fmt(vatAmount);
      document.getElementById('inv-tot').textContent = fmt(total);
    };

    const renderItems = () => {
      const wrap = document.getElementById('inv-items-wrap');
      wrap.innerHTML = `
        <div class="inv-items-table">
          <div class="inv-items-head">
            <span class="inv-col-desc">Description</span>
            <span class="inv-col-num">Qty</span>
            <span class="inv-col-num">Unit Price (€)</span>
            <span class="inv-col-vat">VAT %</span>
            <span class="inv-col-num">Amount</span>
            <span class="inv-col-del"></span>
          </div>
          ${lineItems.map((it, idx) => `
            <div class="inv-items-row" data-idx="${idx}">
              <input class="inv-inp inv-col-desc" data-field="description" data-idx="${idx}" value="${it.description || ''}">
              <input class="inv-inp inv-col-num" type="number" data-field="qty" data-idx="${idx}" value="${it.qty || 1}" min="0.01" step="0.01">
              <input class="inv-inp inv-col-num" type="number" data-field="unitPrice" data-idx="${idx}" value="${it.unitPrice || 0}" min="0" step="0.01">
              <select class="inv-inp inv-col-vat" data-field="vatRate" data-idx="${idx}">
                ${['0','6','13','23'].map(r => `<option value="${r}" ${String(it.vatRate)===r?'selected':''}>${r}%</option>`).join('')}
              </select>
              <span class="inv-col-num inv-line-total">${fmt((parseFloat(it.qty)||0)*(parseFloat(it.unitPrice)||0))}</span>
              ${lineItems.length > 1 ? `<button type="button" class="btn btn-danger btn-sm inv-col-del" data-remove="${idx}">✕</button>` : '<span class="inv-col-del"></span>'}
            </div>
          `).join('')}
        </div>`;

      wrap.querySelectorAll('.inv-inp').forEach(inp => {
        inp.addEventListener('input', () => {
          const i = parseInt(inp.dataset.idx);
          lineItems[i][inp.dataset.field] = inp.value;
          const lineTotal = (parseFloat(lineItems[i].qty)||0) * (parseFloat(lineItems[i].unitPrice)||0);
          const row = wrap.querySelector(`[data-idx="${i}"]`);
          row?.querySelector('.inv-line-total')?.textContent !== undefined &&
            (row.querySelector('.inv-line-total').textContent = fmt(lineTotal));
          renderTotals();
        });
      });
      wrap.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', () => { lineItems.splice(parseInt(btn.dataset.remove), 1); renderItems(); renderTotals(); });
      });
    };

    renderItems();
    renderTotals();

    /* auto-select client from project */
    document.getElementById('inv-project-sel')?.addEventListener('change', e => {
      const proj = DB.projectById(e.target.value);
      if (!proj) return;
      const cl = DB.clients().find(c => c.name === proj.client || c.id === proj.clientId);
      if (cl) document.getElementById('inv-client-sel').value = cl.id;
    });

    document.getElementById('btn-add-inv-item').addEventListener('click', () => {
      lineItems.push({ description: '', qty: 1, unitPrice: 0, vatRate: 23 });
      renderItems(); renderTotals();
    });

    document.getElementById('inv-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-a10inv').addEventListener('submit', e => {
      e.preventDefault();
      const fd   = new FormData(e.target);
      const data = Object.fromEntries(fd);
      if (!data.clientId) { UI.toast('Please select a client.', 'default'); return; }
      data.type  = type;
      data.items = lineItems.map(it => ({
        description: it.description,
        qty:       parseFloat(it.qty)       || 0,
        unitPrice: parseFloat(it.unitPrice) || 0,
        vatRate:   parseFloat(it.vatRate)   || 0,
      }));
      const { subtotal, vatAmount, total } = calcInvTotals(data.items);
      data.subtotal  = subtotal;
      data.vatAmount = vatAmount;
      data.total     = total;

      const list = DB.a10Invoices();
      if (inv) {
        const idx = list.findIndex(i => i.id === invId);
        list[idx] = { ...inv, ...data };
      } else {
        list.push({ ...data, id: 'ainv-' + DB.uid(), createdAt: new Date().toISOString(), createdBy: Auth.current()?.name || 'A10' });
      }
      DB.saveA10Invoices(list);
      UI.closeModal();
      UI.toast(inv ? 'Document updated.' : `${isInv ? 'Invoice' : 'Credit note'} created.`, 'success');
      FinanceView.render();
    });
  },
};

/* ── A10 Settings Modal ────────────────────────────────────── */

const A10SettingsModal = {
  open() {
    const s = DB.a10Settings();
    UI.openModal('A10 Company Settings', `
      <form id="form-a10set">
        <div class="form-section-title">Company Identity</div>
        <div class="form-row">
          <div class="form-field"><label>Company Name *</label><input name="name" required value="${s.name || ''}"></div>
          <div class="form-field"><label>NIF / Tax Number</label><input name="nif" value="${s.nif || ''}" placeholder="PT123456789"></div>
        </div>
        <div class="form-row">
          <div class="form-field"><label>Email</label><input name="email" type="email" value="${s.email || ''}"></div>
          <div class="form-field"><label>Phone</label><input name="phone" value="${s.phone || ''}"></div>
        </div>
        <div class="form-section-title" style="margin-top:14px">Address</div>
        <div class="form-field"><label>Street Address</label><input name="address" value="${s.address || ''}"></div>
        <div class="form-row">
          <div class="form-field"><label>City</label><input name="city" value="${s.city || ''}"></div>
          <div class="form-field"><label>Postal Code</label><input name="postalCode" value="${s.postalCode || ''}"></div>
        </div>
        <div class="form-field"><label>Country</label><input name="country" value="${s.country || 'Portugal'}"></div>
        <div class="form-section-title" style="margin-top:14px">Banking & Payment</div>
        <div class="form-row">
          <div class="form-field"><label>IBAN</label><input name="iban" value="${s.iban || ''}" placeholder="PT50 0000 0000…"></div>
          <div class="form-field"><label>BIC / SWIFT</label><input name="bic" value="${s.bic || ''}"></div>
        </div>
        <div class="form-field"><label>Default Payment Terms</label><input name="paymentTerms" value="${s.paymentTerms || '30 days net'}" placeholder="e.g. 30 days net"></div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
          <button type="button" class="btn btn-secondary" id="a10set-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Settings</button>
        </div>
      </form>
    `, true);
    document.getElementById('a10set-cancel').addEventListener('click', UI.closeModal.bind(UI));
    document.getElementById('form-a10set').addEventListener('submit', e => {
      e.preventDefault();
      DB.saveA10Settings(Object.fromEntries(new FormData(e.target)));
      UI.closeModal();
      UI.toast('A10 settings saved.', 'success');
    });
  },
};

/* ── Invoice Document Generator ───────────────────────────── */

const InvoiceDocGenerator = {
  preview(inv) {
    const a10    = DB.a10Settings();
    const client = DB.clients().find(c => c.id === inv.clientId) || {};
    const proj   = DB.projectById(inv.projectId);
    const isInv  = inv.type === 'invoice';
    const typeLabel = isInv ? 'INVOICE' : 'CREDIT NOTE';
    const billingName = client.billingName || client.name || '—';
    const { subtotal, vatAmount, total } = calcInvTotals(inv.items || []);

    const html = `
      <div class="inv-doc">
        <div class="inv-doc-header">
          <div class="inv-doc-brand">
            <div class="inv-brand-mark">A10</div>
            <div class="inv-brand-sub">Consulting</div>
          </div>
          <div class="inv-doc-meta">
            <div class="inv-doc-type-label">${typeLabel}</div>
            <div class="inv-doc-num">${inv.invoiceNumber}</div>
            <table class="inv-meta-tbl">
              <tr><td>Date</td><td>${fmtDate(inv.date)}</td></tr>
              ${inv.dueDate ? `<tr><td>Due Date</td><td>${fmtDate(inv.dueDate)}</td></tr>` : ''}
              ${proj ? `<tr><td>Project</td><td>${proj.name}</td></tr>` : ''}
            </table>
          </div>
        </div>

        <div class="inv-parties">
          <div class="inv-party">
            <div class="inv-party-label">From</div>
            <div class="inv-party-name">${a10.name || 'A10 Consulting'}</div>
            ${a10.address ? `<div>${a10.address}</div>` : ''}
            ${a10.city ? `<div>${a10.postalCode ? a10.postalCode + ' ' : ''}${a10.city}${a10.country ? ', ' + a10.country : ''}</div>` : ''}
            ${a10.nif ? `<div>NIF: ${a10.nif}</div>` : ''}
            ${a10.email ? `<div>${a10.email}</div>` : ''}
            ${a10.phone ? `<div>${a10.phone}</div>` : ''}
          </div>
          <div class="inv-party inv-party-to">
            <div class="inv-party-label">Bill To</div>
            <div class="inv-party-name">${billingName}</div>
            ${client.billingAddress ? `<div>${client.billingAddress}</div>` : ''}
            ${client.billingCity ? `<div>${client.billingPostalCode ? client.billingPostalCode + ' ' : ''}${client.billingCity}${(client.billingCountry || client.country) ? ', ' + (client.billingCountry || client.country) : ''}</div>` : ''}
            ${client.vatNumber ? `<div>VAT/NIF: ${client.vatNumber}</div>` : ''}
            ${client.email ? `<div>${client.email}</div>` : ''}
          </div>
        </div>

        <table class="inv-items-tbl">
          <thead>
            <tr>
              <th>Description</th>
              <th class="inv-r">Qty</th>
              <th class="inv-r">Unit Price</th>
              <th class="inv-r">VAT %</th>
              <th class="inv-r">VAT</th>
              <th class="inv-r">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${(inv.items || []).map(it => {
              const lineSub = (parseFloat(it.qty)||0) * (parseFloat(it.unitPrice)||0);
              const lineVat = lineSub * (parseFloat(it.vatRate)||0) / 100;
              return `<tr>
                <td>${it.description || ''}</td>
                <td class="inv-r">${it.qty}</td>
                <td class="inv-r">${fmt(it.unitPrice)}</td>
                <td class="inv-r">${it.vatRate}%</td>
                <td class="inv-r">${fmt(lineVat)}</td>
                <td class="inv-r">${fmt(lineSub + lineVat)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>

        <div class="inv-summary">
          <table class="inv-summary-tbl">
            <tr><td>Subtotal</td><td class="inv-r">${fmt(subtotal)}</td></tr>
            <tr><td>VAT</td><td class="inv-r">${fmt(vatAmount)}</td></tr>
            <tr class="inv-summary-total"><td>TOTAL</td><td class="inv-r">${fmt(total)}</td></tr>
          </table>
        </div>

        ${a10.iban ? `<div class="inv-payment"><strong>Payment:</strong> IBAN ${a10.iban}${a10.bic ? ' &nbsp;|&nbsp; BIC/SWIFT: ' + a10.bic : ''}</div>` : ''}
        ${a10.paymentTerms ? `<div class="inv-terms"><strong>Payment Terms:</strong> ${a10.paymentTerms}</div>` : ''}
        ${client.paymentTerms && client.paymentTerms !== a10.paymentTerms ? `<div class="inv-terms">Client terms: ${client.paymentTerms}</div>` : ''}
        ${inv.notes ? `<div class="inv-notes">${inv.notes}</div>` : ''}
      </div>`;

    UI.openDocPreview(`${typeLabel} ${inv.invoiceNumber}`, html);
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

/* Login: show/hide password toggle */
document.getElementById('btn-toggle-login-pwd').addEventListener('click', () => {
  const inp = document.getElementById('inp-password');
  inp.type = inp.type === 'password' ? 'text' : 'password';
});

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
    Notifications.close();
  }
});

/* Close notification dropdown on outside click */
document.addEventListener('click', e => {
  if (!e.target.closest('#notif-wrap')) Notifications.close();
});

/* ── Init ──────────────────────────────────────────────────── */

(function init() {
  DB.seed();
  /* One-time migration: populate risks for existing users who already had seeded data */
  if (!DB.get('seeded_v2')) {
    if (!DB.get('risks')) DB.saveRisks(SEED.risks);
    DB.set('seeded_v2', true);
  }
  const session = Auth.current();
  if (session) {
    document.getElementById('user-name').textContent = session.name;
    document.getElementById('user-avatar').textContent = session.avatar;
    Router.go('dashboard');
  } else {
    Router.go('login');
  }
})();
