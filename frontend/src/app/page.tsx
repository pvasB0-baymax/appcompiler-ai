'use client';

import React, { useState, useEffect } from 'react';

// Design System Icon SVGs
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
  </svg>
);

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
  </svg>
);

const WrenchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743.14a4.5 4.5 0 0 0 2.104 2.104c.328.58.304 1.193.14 1.743m-1.743-1.743c-.318-.318-.744-.57-1.229-.75a5.93 5.93 0 0 0-3.23-.308m3.23 3.23c.18-.485.432-.91.75-1.229a5.93 5.93 0 0 0 .308-3.23M3.375 7.5h.007v.008H3.375V7.5Zm0 3.5h.007v.008H3.375V11Zm0 3.5h.007v.008H3.375V14.5Zm0 3.5h.007v.008H3.375V18Zm3.5-12h.008v.008H6.875V6Zm0 3.5h.008v.008H6.875V9.5Zm0 3.5h.008v.008H6.875V13Zm0 3.5h.008v.008H6.875V16.5Zm3.5-12h.008v.008h-.008V6Zm0 3.5h.008v.008h-.008V9.5Zm0 3.5h.008v.008h-.008V13Zm0 3.5h.008v.008h-.008V16.5Zm3.5-12h.008v.008h-.008V6Zm0 3.5h.008v.008h-.008V9.5Zm0 3.5h.008v.008h-.008V13Zm0 3.5h.008v.008h-.008V16.5ZM16.5 6a.75.75 0 0 0 1.5 0v-.375a.75.75 0 0 0-1.5 0V6Zm0 3.5a.75.75 0 0 0 1.5 0V9.125a.75.75 0 0 0-1.5 0V9.5Zm0 3.5a.75.75 0 0 0 1.5 0v-.375a.75.75 0 0 0-1.5 0V13Zm0 3.5a.75.75 0 0 0 1.5 0v-.375a.75.75 0 0 0-1.5 0V16.5Z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

interface StageInfo {
  name: string;
  label: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'REPAIRING';
  duration: number;
  error?: string;
}

interface CompilationJob {
  id: string;
  app_name: string;
  description: string;
  status: string;
  repair_count: number;
  execution_time: number;
  created_at: string;
}

const TEMPLATES = [
  {
    name: 'Gym Membership & Class Booking',
    prompt: 'A SaaS platform for gym owners to manage memberships, schedule fitness classes, and allow members to book sessions online. Free tier gets basic class view; Premium tier gets booking, notifications, and analytics dashboard. Admin can create schedules, view revenue reports, and manage trainers.',
  },
  {
    name: 'Peer-to-Peer Book Sharing Network',
    prompt: 'A community app where users list books they own to lend, search local libraries, request books from neighbors, and chat to arrange drop-off. Needs rating system, request queues, and automated reminders for book returns. Admins review reported content.',
  },
  {
    name: 'Freelancer Invoice & Time Tracker',
    prompt: 'A tool for freelancers to track work hours, generate professional invoices, request payments via Stripe, and view monthly earnings graphs. Invoices auto-remind clients on late payments. Premium tier adds multi-currency support and tax reports.',
  },
  {
    name: 'SaaS Multi-tenant Helpdesk',
    prompt: 'A customer support ticketing system with tickets assigned to agents. Needs ticket priorities, customer login, auto-assignment rules based on tags, and SLA breach warnings (e.g. notify supervisor if ticket unassigned for 4 hours). Premium tiers get API integrations.',
  }
];

interface LiveAppPreviewProps {
  specification: any;
  jobId: string | null;
  setSimulatorLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setSimulatorResponse: React.Dispatch<React.SetStateAction<any>>;
}

const LiveAppPreview: React.FC<LiveAppPreviewProps> = ({
  specification,
  jobId,
  setSimulatorLogs,
  setSimulatorResponse,
}) => {
  const appName = specification?.intent?.app_name || 'My Compiled App';
  const appType = appName.toLowerCase();

  const [currentRoute, setCurrentRoute] = useState('/login');
  const [currentUserRole, setCurrentRole] = useState('guest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; isError: boolean } | null>(null);

  // Database mock states
  const [gymClasses, setGymClasses] = useState([
    { id: 'class-1', title: 'Vinyasa Yoga Flow', trainer: 'Sarah Jenkins', capacity: 15, booked: 12, schedule: 'Mon 9:00 AM' },
    { id: 'class-2', title: 'High-Intensity HIIT', trainer: 'Marcus Vance', capacity: 20, booked: 19, schedule: 'Tue 6:00 PM' },
    { id: 'class-3', title: 'Power Strength Lab', trainer: 'Alex Rivera', capacity: 12, booked: 5, schedule: 'Thu 10:00 AM' }
  ]);
  const [gymBookings, setGymBookings] = useState<any[]>([
    { id: 'booking-1', class_id: 'class-2', class_title: 'High-Intensity HIIT', created_at: '2026-05-24 18:30' }
  ]);

  const [books, setBooks] = useState([
    { id: 'book-1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Available', owner: 'Sarah' },
    { id: 'book-2', title: 'Clean Code', author: 'Robert C. Martin', status: 'Lent', owner: 'Mike' },
    { id: 'book-3', title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Available', owner: 'Dave' }
  ]);
  const [lendings, setLendings] = useState<any[]>([
    { id: 'lend-1', book_id: 'book-2', book_title: 'Clean Code', borrower: 'Dave', lent_at: '2026-05-20', due_at: '2026-06-03' }
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'inv-1042', client: 'Acme Corp', amount: 1250.00, currency: 'USD', status: 'Paid', due_date: '2026-05-30' },
    { id: 'inv-1043', client: 'Alpha Labs', amount: 480.00, currency: 'USD', status: 'Unpaid', due_date: '2026-06-15' }
  ]);
  const [timeLogs, setTimeLogs] = useState([
    { id: 'log-1', project: 'SaaS Dashboard Refactor', hours: 6.5, date: '2026-05-24' },
    { id: 'log-2', project: 'API Endpoint Integrations', hours: 8.0, date: '2026-05-23' }
  ]);

  const [tickets, setTickets] = useState([
    { id: 't-301', title: 'Stripe webhook payment failure', priority: 'High', status: 'Open', customer: 'Alice Smith', created_at: '2026-05-24' },
    { id: 't-302', title: 'CSS styling overflow in mobile browser', priority: 'Medium', status: 'InProgress', customer: 'Bob Jones', created_at: '2026-05-23' }
  ]);

  // Form input states
  const [newClassName, setNewClassName] = useState('');
  const [newClassTrainer, setNewClassTrainer] = useState('');
  const [newClassCapacity, setNewClassCapacity] = useState('15');
  const [newClassSchedule, setNewClassSchedule] = useState('Wed 10:00 AM');

  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');

  const [newInvoiceClient, setNewInvoiceClient] = useState('');
  const [newInvoiceAmount, setNewInvoiceAmount] = useState('');
  const [newInvoiceCurrency, setNewInvoiceCurrency] = useState('USD');
  const [newInvoiceDueDate, setNewInvoiceDueDate] = useState('2026-06-30');

  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState('Medium');

  const triggerToast = (msg: string, isError: boolean = false) => {
    setToast({ message: msg, isError });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSimulatedCall = async (path: string, method: string, payload: any, expectedRole: string) => {
    if (!jobId) {
      triggerToast('No active compile job ID found', true);
      return false;
    }
    setLoading(true);
    setSimulatorLogs(prev => [...prev, `[INFO] [PREVIEW] Navigating visual flow. Dispatching backend simulator request...`]);

    try {
      const res = await fetch('/api/v1/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: jobId,
          path,
          method,
          role: expectedRole,
          payload
        })
      });

      const data = await res.json();
      setSimulatorResponse(data.response);
      if (data.logs) {
        setSimulatorLogs(prev => [...prev, ...data.logs.map((l: string) => `[PREVIEW] ${l}`)]);
      }

      if (res.ok && !data.status.includes('403') && !data.status.includes('422') && !data.status.includes('404')) {
        setLoading(false);
        return true;
      } else {
        const errorDetail = data.response?.detail || data.response?.error || 'Validation error';
        triggerToast(`Error: ${errorDetail} (${data.status})`, true);
        setLoading(false);
        return false;
      }
    } catch (e: any) {
      triggerToast(`Request Failed: ${e.message}`, true);
      setLoading(false);
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      triggerToast('Please specify a username or select a quick role', true);
      return;
    }

    // Determine role based on email input or selected role
    let role = currentUserRole;
    if (role === 'guest') {
      if (emailInput.includes('admin')) role = 'admin';
      else if (emailInput.includes('trainer')) role = 'trainer';
      else if (emailInput.includes('freelancer')) role = 'freelancer';
      else if (emailInput.includes('client')) role = 'client';
      else if (emailInput.includes('member')) role = 'member';
      else if (emailInput.includes('customer')) role = 'customer';
      else if (emailInput.includes('agent')) role = 'agent';
      else role = specification?.auth_schema?.roles?.[0]?.name || 'user';
    }

    const payload = { email: emailInput, password: passwordInput };
    const success = await handleSimulatedCall('/api/v1/auth/login', 'POST', payload, role);
    
    if (success) {
      setCurrentRole(role);
      setIsLoggedIn(true);
      setCurrentRoute('/dashboard');
      triggerToast(`Logged in successfully as ${role}!`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentRoute('/login');
    setCurrentRole('guest');
    setEmailInput('');
    setPasswordInput('');
    triggerToast('Logged out of compiled sandbox.');
  };

  const handleBookGymClass = async (classItem: any) => {
    if (classItem.booked >= classItem.capacity) {
      triggerToast('Class is fully booked!', true);
      return;
    }

    const success = await handleSimulatedCall('/api/v1/bookings', 'POST', { class_id: classItem.id }, currentUserRole);
    if (success) {
      setGymClasses(prev => prev.map(c => c.id === classItem.id ? { ...c, booked: c.booked + 1 } : c));
      setGymBookings(prev => [
        ...prev,
        { id: `booking-${Date.now()}`, class_id: classItem.id, class_title: classItem.title, created_at: 'Just now' }
      ]);
      triggerToast(`Successfully booked ${classItem.title}!`);
    }
  };

  const handleCreateGymClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim() || !newClassTrainer.trim()) {
      triggerToast('Please fill out all class fields', true);
      return;
    }

    const payload = {
      title: newClassName,
      trainer_id: newClassTrainer,
      schedule_time: newClassSchedule,
      capacity: parseInt(newClassCapacity) || 15
    };

    const success = await handleSimulatedCall('/api/v1/classes', 'POST', payload, currentUserRole);
    if (success) {
      setGymClasses(prev => [
        ...prev,
        {
          id: `class-${Date.now()}`,
          title: newClassName,
          trainer: newClassTrainer,
          capacity: parseInt(newClassCapacity) || 15,
          booked: 0,
          schedule: newClassSchedule
        }
      ]);
      setNewClassName('');
      setNewClassTrainer('');
      triggerToast(`Created class ${newClassName} successfully!`);
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookTitle.trim() || !newBookAuthor.trim()) {
      triggerToast('Please provide a title and author', true);
      return;
    }

    const success = await handleSimulatedCall('/api/v1/books', 'POST', { title: newBookTitle, author: newBookAuthor }, currentUserRole);
    if (success) {
      setBooks(prev => [
        ...prev,
        {
          id: `book-${Date.now()}`,
          title: newBookTitle,
          author: newBookAuthor,
          status: 'Available',
          owner: emailInput.split('@')[0] || 'Me'
        }
      ]);
      setNewBookTitle('');
      setNewBookAuthor('');
      triggerToast(`Added book "${newBookTitle}" to library!`);
    }
  };

  const handleRequestBook = async (bookItem: any) => {
    const success = await handleSimulatedCall('/api/v1/lendings', 'POST', { book_id: bookItem.id }, currentUserRole);
    if (success) {
      setBooks(prev => prev.map(b => b.id === bookItem.id ? { ...b, status: 'Lent' } : b));
      setLendings(prev => [
        ...prev,
        {
          id: `lend-${Date.now()}`,
          book_id: bookItem.id,
          book_title: bookItem.title,
          borrower: emailInput.split('@')[0] || 'Me',
          lent_at: 'Today',
          due_at: 'In 14 days'
        }
      ]);
      triggerToast(`Lending request submitted for "${bookItem.title}"!`);
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoiceClient.trim() || !newInvoiceAmount.trim()) {
      triggerToast('Provide client name and invoice amount', true);
      return;
    }

    const payload = {
      client_id: newInvoiceClient,
      amount: parseFloat(newInvoiceAmount),
      currency: newInvoiceCurrency,
      due_date: newInvoiceDueDate
    };

    const success = await handleSimulatedCall('/api/v1/invoices', 'POST', payload, currentUserRole);
    if (success) {
      setInvoices(prev => [
        ...prev,
        {
          id: `inv-${Math.floor(Math.random() * 9000 + 1000)}`,
          client: newInvoiceClient,
          amount: parseFloat(newInvoiceAmount),
          currency: newInvoiceCurrency,
          status: 'Unpaid',
          due_date: newInvoiceDueDate
        }
      ]);
      setNewInvoiceClient('');
      setNewInvoiceAmount('');
      triggerToast(`Invoice generated for ${newInvoiceClient}!`);
    }
  };

  const handlePayInvoice = async (invoiceItem: any) => {
    const success = await handleSimulatedCall('/api/v1/payments', 'POST', { invoice_id: invoiceItem.id, token: 'tok_visa' }, currentUserRole);
    if (success) {
      setInvoices(prev => prev.map(inv => inv.id === invoiceItem.id ? { ...inv, status: 'Paid' } : inv));
      triggerToast(`Successfully processed payment of ${invoiceItem.amount} ${invoiceItem.currency}!`);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) {
      triggerToast('Please provide a ticket summary', true);
      return;
    }

    const success = await handleSimulatedCall('/api/v1/tickets', 'POST', { title: newTicketTitle, priority: newTicketPriority }, currentUserRole);
    if (success) {
      setTickets(prev => [
        ...prev,
        {
          id: `t-${Math.floor(Math.random() * 900 + 100)}`,
          title: newTicketTitle,
          priority: newTicketPriority,
          status: 'Open',
          customer: emailInput.split('@')[0] || 'Customer',
          created_at: 'Just now'
        }
      ]);
      setNewTicketTitle('');
      triggerToast(`Support ticket submitted!`);
    }
  };

  const availableRoles = specification?.auth_schema?.roles?.map((r: any) => r.name) || ['user', 'admin'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {toast && (
        <div className={`toast-msg ${toast.isError ? 'error' : ''}`}>
          <span>{toast.isError ? '❌' : '✨'}</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{toast.message}</span>
        </div>
      )}

      <div style={{ marginBottom: '12px' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#fff' }}>Sandbox Interactive Visual Preview</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          A live visual simulation of your compiled web page. Test the UI layouts, check role permission rules, and watch backend logs trigger in real-time.
        </p>
      </div>

      <div className="browser-shell" style={{ flex: 1, minHeight: 0 }}>
        <div className="browser-header">
          <div className="browser-dots">
            <div className="browser-dot dot-red"></div>
            <div className="browser-dot dot-yellow"></div>
            <div className="browser-dot dot-green"></div>
          </div>
          <div style={{ display: 'flex', gap: '8px', color: '#4b5563' }}>
            <span style={{ cursor: 'pointer' }}>◀</span>
            <span style={{ cursor: 'pointer' }}>▶</span>
            <span style={{ cursor: 'pointer' }}>⟳</span>
          </div>
          <div className="browser-address-bar">
            <span>🔒</span>
            <span style={{ color: '#60a5fa' }}>https://localhost:3000</span>
            <span>{currentRoute}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '0.65rem',
              background: loading ? 'var(--color-accent)' : 'var(--bg-tertiary)',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {loading ? 'Simulating API Transaction...' : 'STANDALONE SANDBOX'}
            </span>
          </div>
        </div>

        <div className="browser-content">
          {!isLoggedIn && currentRoute === '/login' && (
            <div style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px',
              background: 'radial-gradient(circle at 50% 50%, #0d1222 0%, #07090e 100%)'
            }}>
              <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '400px',
                padding: '32px',
                background: 'rgba(10, 13, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-purple) 100%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    boxShadow: '0 0 15px rgba(99,102,241,0.4)'
                  }}>
                    🔑
                  </div>
                  <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '4px' }}>{appName}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Email Address</label>
                    <input
                      type="text"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. member@gymflex.com"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Password</label>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="glass-panel" style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                    <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Fast-Track Auth Role
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {availableRoles.map((role: string) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setCurrentRole(role);
                            setEmailInput(`${role}@${appName.replace(/\s+/g, '').toLowerCase()}.com`);
                            setPasswordInput('password123');
                          }}
                          style={{
                            background: currentUserRole === role ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)',
                            color: '#fff',
                            border: 'none',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.65rem',
                            cursor: 'pointer'
                          }}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-purple) 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      marginTop: '8px'
                    }}
                  >
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {isLoggedIn && (
            <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
              <div style={{
                width: '200px',
                background: '#0d111c',
                borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', background: 'linear-gradient(90deg, #fff 0%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {appName}
                  </div>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>SANDBOX SUITE</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <button
                    onClick={() => setCurrentRoute('/dashboard')}
                    style={{
                      width: '100%',
                      background: currentRoute === '/dashboard' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                      color: currentRoute === '/dashboard' ? '#fff' : 'var(--text-secondary)',
                      border: 'none',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>🏠</span> Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentRoute('/profile')}
                    style={{
                      width: '100%',
                      background: currentRoute === '/profile' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                      color: currentRoute === '/profile' ? '#fff' : 'var(--text-secondary)',
                      border: 'none',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>👤</span> My Profile
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Active Role</span>
                    <span style={{
                      fontSize: '0.65rem',
                      color: currentUserRole === 'admin' ? 'var(--color-success)' : currentUserRole === 'trainer' || currentUserRole === 'freelancer' ? 'var(--color-info)' : 'var(--color-purple)',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      🛡️ {currentUserRole}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: 'var(--color-error)',
                      border: 'none',
                      padding: '6px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>

              <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: '#080a10', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {currentRoute === '/dashboard' && (
                  <>
                    <header>
                      <h2 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 600 }}>Welcome Back!</h2>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>You are logged in as {emailInput}</p>
                    </header>

                    {appType.includes('gym') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Classes Available</span>
                            <div style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 'bold', marginTop: '4px' }}>
                              {gymClasses.length}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>My Reserved Bookings</span>
                            <div style={{ fontSize: '1.4rem', color: 'var(--color-success)', fontWeight: 'bold', marginTop: '4px' }}>
                              {gymBookings.length}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Account Subscription</span>
                            <div style={{ fontSize: '1.4rem', color: 'var(--color-info)', fontWeight: 'bold', marginTop: '4px' }}>
                              Premium Gold
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#fff' }}>📅 Fitness Classes Schedule</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {gymClasses.map(c => (
                                <div key={c.id} className="glass-panel" style={{
                                  padding: '14px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  background: 'rgba(255,255,255,0.01)'
                                }}>
                                  <div>
                                    <h4 style={{ fontSize: '0.85rem', color: '#fff' }}>{c.title}</h4>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>
                                      Trainer: {c.trainer} | {c.schedule}
                                    </span>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                      Slots: {c.booked} / {c.capacity} filled
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => handleBookGymClass(c)}
                                    disabled={loading || c.booked >= c.capacity}
                                    style={{
                                      background: 'var(--color-accent)',
                                      color: '#fff',
                                      border: 'none',
                                      padding: '6px 12px',
                                      borderRadius: '6px',
                                      fontSize: '0.75rem',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Book Session
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              🛡️ Create Class Form
                            </h3>
                            {currentUserRole === 'admin' || currentUserRole === 'trainer' ? (
                              <form onSubmit={handleCreateGymClass} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div>
                                  <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Class Name</label>
                                  <input
                                    type="text"
                                    value={newClassName}
                                    onChange={(e) => setNewClassName(e.target.value)}
                                    placeholder="e.g. Boxing Blast"
                                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Trainer Name</label>
                                  <input
                                    type="text"
                                    value={newClassTrainer}
                                    onChange={(e) => setNewClassTrainer(e.target.value)}
                                    placeholder="e.g. Coach Ken"
                                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                  />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                  <div>
                                    <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Capacity</label>
                                    <input
                                      type="text"
                                      value={newClassCapacity}
                                      onChange={(e) => setNewClassCapacity(e.target.value)}
                                      style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Schedule</label>
                                    <input
                                      type="text"
                                      value={newClassSchedule}
                                      onChange={(e) => setNewClassSchedule(e.target.value)}
                                      style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                    />
                                  </div>
                                </div>
                                <button
                                  type="submit"
                                  disabled={loading}
                                  style={{
                                    width: '100%',
                                    background: 'var(--color-success)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    marginTop: '6px'
                                  }}
                                >
                                  Publish Class
                                </button>
                              </form>
                            ) : (
                              <div style={{ textAlign: 'center', padding: '24px 12px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                🔒 <strong>Access Denied</strong>. Only users with the <code>admin</code> or <code>trainer</code> role have privileges to define classes.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {appType.includes('book') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Shared Books</span>
                            <div style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 'bold', marginTop: '4px' }}>
                              {books.length}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>My Lending Transactions</span>
                            <div style={{ fontSize: '1.4rem', color: 'var(--color-success)', fontWeight: 'bold', marginTop: '4px' }}>
                              {lendings.length}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Trust Score</span>
                            <div style={{ fontSize: '1.4rem', color: 'var(--color-info)', fontWeight: 'bold', marginTop: '4px' }}>
                              98% (Excellent)
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#fff' }}>📚 Local Book Catalog</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {books.map(b => (
                                <div key={b.id} className="glass-panel" style={{
                                  padding: '14px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  background: 'rgba(255,255,255,0.01)'
                                }}>
                                  <div>
                                    <h4 style={{ fontSize: '0.85rem', color: '#fff' }}>{b.title}</h4>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>
                                      Author: {b.author} | Owner: {b.owner}
                                    </span>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                      fontSize: '0.65rem',
                                      padding: '2px 6px',
                                      borderRadius: '4px',
                                      background: b.status === 'Available' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                      color: b.status === 'Available' ? 'var(--color-success)' : 'var(--color-error)'
                                    }}>
                                      {b.status}
                                    </span>
                                    {b.status === 'Available' && (
                                      <button
                                        onClick={() => handleRequestBook(b)}
                                        disabled={loading}
                                        style={{
                                          background: 'var(--color-accent)',
                                          color: '#fff',
                                          border: 'none',
                                          padding: '4px 10px',
                                          borderRadius: '4px',
                                          fontSize: '0.7rem',
                                          cursor: 'pointer'
                                        }}
                                      >
                                        Request
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '12px' }}>📖 Share a Book</h3>
                            {currentUserRole === 'admin' || currentUserRole === 'user' ? (
                              <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div>
                                  <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Book Title</label>
                                  <input
                                    type="text"
                                    value={newBookTitle}
                                    onChange={(e) => setNewBookTitle(e.target.value)}
                                    placeholder="e.g. The Hobbit"
                                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Author</label>
                                  <input
                                    type="text"
                                    value={newBookAuthor}
                                    onChange={(e) => setNewBookAuthor(e.target.value)}
                                    placeholder="e.g. J.R.R. Tolkien"
                                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                  />
                                </div>
                                <button
                                  type="submit"
                                  disabled={loading}
                                  style={{
                                    width: '100%',
                                    background: 'var(--color-success)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    marginTop: '6px'
                                  }}
                                >
                                  List Book
                                </button>
                              </form>
                            ) : (
                              <div style={{ textAlign: 'center', padding: '24px 12px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                🔒 <strong>Registered Users Only</strong>. Please sign in as a user to list books.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {appType.includes('invoice') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Total Invoiced</span>
                            <div style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 'bold', marginTop: '4px' }}>
                              $1,730.00
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Hours Tracked</span>
                            <div style={{ fontSize: '1.4rem', color: 'var(--color-info)', fontWeight: 'bold', marginTop: '4px' }}>
                              {timeLogs.reduce((acc, curr) => acc + curr.hours, 0)} hrs
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Outstanding Payments</span>
                            <div style={{ fontSize: '1.4rem', color: 'var(--color-warning)', fontWeight: 'bold', marginTop: '4px' }}>
                              ${invoices.filter(i => i.status === 'Unpaid').reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#fff' }}>💳 Invoices List</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {invoices.map(inv => (
                                <div key={inv.id} className="glass-panel" style={{
                                  padding: '14px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  background: 'rgba(255,255,255,0.01)'
                                }}>
                                  <div>
                                    <h4 style={{ fontSize: '0.85rem', color: '#fff' }}>Invoice ID: {inv.id}</h4>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>
                                      Client: {inv.client} | Due: {inv.due_date}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'bold' }}>
                                      {inv.amount.toLocaleString('en-US', { style: 'currency', currency: inv.currency })}
                                    </span>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                      fontSize: '0.65rem',
                                      padding: '2px 6px',
                                      borderRadius: '4px',
                                      background: inv.status === 'Paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                      color: inv.status === 'Paid' ? 'var(--color-success)' : 'var(--color-warning)'
                                    }}>
                                      {inv.status}
                                    </span>
                                    {inv.status === 'Unpaid' && (
                                      <button
                                        onClick={() => handlePayInvoice(inv)}
                                        disabled={loading}
                                        style={{
                                          background: 'var(--color-success)',
                                          color: '#fff',
                                          border: 'none',
                                          padding: '4px 10px',
                                          borderRadius: '4px',
                                          fontSize: '0.7rem',
                                          cursor: 'pointer'
                                        }}
                                      >
                                        Stripe Pay
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '12px' }}>💵 Generate Invoice</h3>
                            {currentUserRole === 'freelancer' || currentUserRole === 'admin' ? (
                              <form onSubmit={handleCreateInvoice} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div>
                                  <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Client Name</label>
                                  <input
                                    type="text"
                                    value={newInvoiceClient}
                                    onChange={(e) => setNewInvoiceClient(e.target.value)}
                                    placeholder="e.g. Acme Corp"
                                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                  />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                  <div>
                                    <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Amount ($)</label>
                                    <input
                                      type="text"
                                      value={newInvoiceAmount}
                                      onChange={(e) => setNewInvoiceAmount(e.target.value)}
                                      placeholder="e.g. 500"
                                      style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Currency</label>
                                    <select
                                      value={newInvoiceCurrency}
                                      onChange={(e) => setNewInvoiceCurrency(e.target.value)}
                                      style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                                    >
                                      <option value="USD">USD</option>
                                      <option value="EUR">EUR</option>
                                      <option value="GBP">GBP</option>
                                    </select>
                                  </div>
                                </div>
                                <div>
                                  <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Due Date</label>
                                  <input
                                    type="text"
                                    value={newInvoiceDueDate}
                                    onChange={(e) => setNewInvoiceDueDate(e.target.value)}
                                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                  />
                                </div>
                                <button
                                  type="submit"
                                  disabled={loading}
                                  style={{
                                    width: '100%',
                                    background: 'var(--color-success)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    marginTop: '6px'
                                  }}
                                >
                                  Send Invoice
                                </button>
                              </form>
                            ) : (
                              <div style={{ textAlign: 'center', padding: '24px 12px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                🔒 <strong>Freelancers Only</strong>. Please sign in as a freelancer to create invoices.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {(appType.includes('ticket') || appType.includes('helpdesk') || appType.includes('support')) && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Active Tickets</span>
                            <div style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 'bold', marginTop: '4px' }}>
                              {tickets.length}
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Average SLA Time</span>
                            <div style={{ fontSize: '1.4rem', color: 'var(--color-success)', fontWeight: 'bold', marginTop: '4px' }}>
                              1.8 hours
                            </div>
                          </div>
                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Support Agents Online</span>
                            <div style={{ fontSize: '1.4rem', color: 'var(--color-info)', fontWeight: 'bold', marginTop: '4px' }}>
                              4 Active
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#fff' }}>🎫 Support Tickets</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {tickets.map(t => (
                                <div key={t.id} className="glass-panel" style={{
                                  padding: '14px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  background: 'rgba(255,255,255,0.01)'
                                }}>
                                  <div>
                                    <h4 style={{ fontSize: '0.85rem', color: '#fff' }}>[{t.id}] {t.title}</h4>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>
                                      Submitted by: {t.customer} | Date: {t.created_at}
                                    </span>
                                    <span style={{
                                      fontSize: '0.65rem',
                                      padding: '1px 5px',
                                      borderRadius: '4px',
                                      background: t.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                      color: t.priority === 'High' ? 'var(--color-error)' : 'var(--color-warning)'
                                    }}>
                                      Priority: {t.priority}
                                    </span>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                      fontSize: '0.65rem',
                                      padding: '2px 6px',
                                      borderRadius: '4px',
                                      background: t.status === 'Open' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                      color: t.status === 'Open' ? 'var(--color-success)' : 'var(--color-info)'
                                    }}>
                                      {t.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '12px' }}>🎫 Raise a Support Ticket</h3>
                            {currentUserRole === 'customer' || currentUserRole === 'admin' ? (
                              <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div>
                                  <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Problem Summary</label>
                                  <input
                                    type="text"
                                    value={newTicketTitle}
                                    onChange={(e) => setNewTicketTitle(e.target.value)}
                                    placeholder="e.g. Payment failed during checkout"
                                    style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                                  />
                                </div>
                                <div>
                                  <label style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>SLA Priority</label>
                                  <select
                                    value={newTicketPriority}
                                    onChange={(e) => setNewTicketPriority(e.target.value)}
                                    style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                                  >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                  </select>
                                </div>
                                <button
                                  type="submit"
                                  disabled={loading}
                                  style={{
                                    width: '100%',
                                    background: 'var(--color-success)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    marginTop: '6px'
                                  }}
                                >
                                  Submit Ticket
                                </button>
                              </form>
                            ) : (
                              <div style={{ textAlign: 'center', padding: '24px 12px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                🔒 <strong>Customers Only</strong>. Please sign in as a customer to submit help tickets.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {!appType.includes('gym') && !appType.includes('book') && !appType.includes('invoice') && !appType.includes('ticket') && !appType.includes('helpdesk') && !appType.includes('support') && (
                      <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚙️</div>
                        <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>Custom Dashboard: {appName}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', maxWidth: '500px', margin: '0 auto 16px auto' }}>
                          This compiled application is loaded inside the visual sandbox environment. You are currently viewing it as role: <code>{currentUserRole}</code>.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleSimulatedCall('/api/v1/custom-action', 'POST', { action: 'test' }, currentUserRole)}
                            style={{
                              background: 'var(--color-accent)',
                              border: 'none',
                              color: '#fff',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            Trigger API Simulation Action
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {currentRoute === '/profile' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <header>
                      <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>My User Profile</h2>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Manage your credentials and privileges</p>
                    </header>

                    <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)' }}>
                      <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '16px' }}>Identity & Session Details</h3>
                      
                      <table style={{ width: '100%', fontSize: '0.8rem', color: 'var(--text-secondary)', borderCollapse: 'collapse' }}>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '10px 0', fontWeight: 'bold', width: '150px' }}>Simulated Email</td>
                            <td style={{ padding: '10px 0', color: '#fff' }}>{emailInput}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '10px 0', fontWeight: 'bold' }}>RBAC Role Token</td>
                            <td style={{ padding: '10px 0', color: 'var(--color-success)', textTransform: 'uppercase', fontWeight: 600 }}>{currentUserRole}</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '10px 0', fontWeight: 'bold', verticalAlign: 'top' }}>Assigned API Scopes</td>
                            <td style={{ padding: '10px 0' }}>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {(specification?.auth_schema?.roles?.find((r: any) => r.name === currentUserRole)?.permissions || ['read_public']).map((p: string) => (
                                  <span key={p} style={{
                                    background: 'rgba(99,102,241,0.1)',
                                    color: 'var(--color-accent)',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.65rem'
                                  }}>{p}</span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [promptInput, setPromptInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  
  // Pipeline Stages
  const [stages, setStages] = useState<StageInfo[]>([
    { name: 'intent_extraction', label: 'Intent Extraction', status: 'PENDING', duration: 0 },
    { name: 'system_design', label: 'System Design', status: 'PENDING', duration: 0 },
    { name: 'database_schema', label: 'Database Schema', status: 'PENDING', duration: 0 },
    { name: 'api_schema', label: 'API Schema', status: 'PENDING', duration: 0 },
    { name: 'ui_schema', label: 'UI Schema', status: 'PENDING', duration: 0 },
    { name: 'auth_schema', label: 'Auth Model', status: 'PENDING', duration: 0 },
    { name: 'business_logic', label: 'Business Logic', status: 'PENDING', duration: 0 },
    { name: 'validation', label: 'Validation Engine', status: 'PENDING', duration: 0 },
    { name: 'repair', label: 'Auto Repair Engine', status: 'PENDING', duration: 0 },
    { name: 'runtime', label: 'Runtime Compiler', status: 'PENDING', duration: 0 },
  ]);

  // Compiled Data Specification
  const [specification, setSpecification] = useState<any>(null);
  const [repairsLog, setRepairsLog] = useState<any[]>([]);
  const [assumptions, setAssumptions] = useState<string[]>([]);
  
  // Tabs
  const [activeMainTab, setActiveMainTab] = useState<'preview' | 'spec' | 'metrics' | 'code' | 'simulator'>('preview');
  const [activeSpecTab, setActiveSpecTab] = useState<string>('intent');

  // History & Metrics
  const [historyJobs, setHistoryJobs] = useState<CompilationJob[]>([]);
  const [globalMetrics, setGlobalMetrics] = useState<any>({
    total_compilations: 0,
    success_rate: 100,
    average_duration: 0,
    total_repairs: 0,
  });

  // Simulator State
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null);
  const [simulatorParams, setSimulatorParams] = useState<Record<string, string>>({});
  const [simulatorRole, setSimulatorRole] = useState<string>('guest');
  const [simulatorResponse, setSimulatorResponse] = useState<any>(null);
  const [simulatorLoading, setSimulatorLoading] = useState<boolean>(false);
  const [simulatorLogs, setSimulatorLogs] = useState<string[]>([]);

  // Generated code preview files
  const [generatedFiles, setGeneratedFiles] = useState<Record<string, string>>({});
  const [selectedFileTab, setSelectedFileTab] = useState<string>('models.py');

  // Load API Key from local storage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) setApiKey(savedKey);
    fetchHistory();
    fetchMetrics();
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/v1/jobs');
      if (res.ok) {
        const data = await res.json();
        setHistoryJobs(data);
      }
    } catch (e) {
      console.error("Failed to fetch compilation history", e);
    }
  };

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/v1/metrics');
      if (res.ok) {
        const data = await res.json();
        setGlobalMetrics(data);
      }
    } catch (e) {
      console.error("Failed to fetch global metrics", e);
    }
  };

  const loadJob = async (jobId: string) => {
    setSelectedJobId(jobId);
    try {
      const res = await fetch(`/api/v1/jobs/${jobId}`);
      if (res.ok) {
        const data = await res.json();
        setSpecification(data.specification);
        setRepairsLog(data.repairs || []);
        setAssumptions(data.assumptions || []);
        
        // Reset stages from database record
        const stageLogs = data.stage_logs || [];
        setStages(prev => prev.map(s => {
          const log = stageLogs.find((l: any) => l.stage_name === s.name);
          return {
            ...s,
            status: log ? (log.status === 'PASS' || log.status === 'SUCCESS' ? 'SUCCESS' : (log.status === 'FAIL' || log.status === 'FAILED' ? 'FAILED' : 'SUCCESS')) : 'SUCCESS',
            duration: log ? log.duration_ms / 1000 : 0.5,
          };
        }));

        if (data.runtime_code) {
          setGeneratedFiles(data.runtime_code);
        } else {
          setGeneratedFiles({});
        }

        // Set default endpoints for simulation
        if (data.specification?.api_schema?.endpoints?.length > 0) {
          setSelectedEndpoint(data.specification.api_schema.endpoints[0]);
          setSimulatorParams({});
          setSimulatorResponse(null);
          setSimulatorLogs([]);
        }
      }
    } catch (e) {
      console.error("Failed to load job details", e);
    }
  };

  const handleCompile = async () => {
    if (!promptInput.trim()) return;

    setIsCompiling(true);
    setSpecification(null);
    setRepairsLog([]);
    setAssumptions([]);
    setGeneratedFiles({});
    setSimulatorResponse(null);
    setSimulatorLogs([]);

    // Reset stages to PENDING/RUNNING
    setStages(prev => prev.map((s, idx) => ({
      ...s,
      status: idx === 0 ? 'RUNNING' : 'PENDING',
      duration: 0,
      error: undefined,
    })));

    try {
      const startTime = Date.now();
      const res = await fetch('/api/v1/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gemini-API-Key': apiKey,
        },
        body: JSON.stringify({ prompt: promptInput }),
      });

      if (!res.ok) {
        throw new Error(await res.text() || 'Failed to compile');
      }

      // Simulate UI pipeline progression in tandem with server processing
      // Since compiler endpoints are fast or streaming, we update the stages sequentially
      const data = await res.json();
      
      // Update each stage progressively for an eye-catching compilation experience
      const stageKeys = [
        'intent_extraction', 'system_design', 'database_schema', 
        'api_schema', 'ui_schema', 'auth_schema', 'business_logic',
        'validation', 'repair', 'runtime'
      ];

      for (let i = 0; i < stageKeys.length; i++) {
        const currentStage = stageKeys[i];
        
        // Update stage status to running
        setStages(prev => prev.map(s => s.name === currentStage ? { ...s, status: 'RUNNING' } : s));
        await new Promise(r => setTimeout(r, 600));

        // Update stage status to success
        setStages(prev => prev.map(s => {
          if (s.name === currentStage) {
            // Check if validation stage
            if (currentStage === 'validation') {
              const hasValidationIssues = data.validation?.status === 'FAIL';
              return { ...s, status: hasValidationIssues ? 'FAILED' : 'SUCCESS', duration: 0.8 };
            }
            if (currentStage === 'repair') {
              const hasRepairs = data.repairs && data.repairs.length > 0;
              return { ...s, status: hasRepairs ? 'SUCCESS' : 'SUCCESS', duration: hasRepairs ? 1.5 : 0.2 };
            }
            return { ...s, status: 'SUCCESS', duration: 0.4 };
          }
          return s;
        }));
      }

      // Load full specification
      setSpecification(data.specification);
      setRepairsLog(data.repairs || []);
      setAssumptions(data.assumptions || []);
      setSelectedJobId(data.job_id);

      if (data.runtime_code) {
        setGeneratedFiles(data.runtime_code);
      }

      // Setup simulator
      if (data.specification?.api_schema?.endpoints?.length > 0) {
        setSelectedEndpoint(data.specification.api_schema.endpoints[0]);
        setSimulatorParams({});
      }

      setActiveMainTab('preview');

      // Refresh history & metrics
      fetchHistory();
      fetchMetrics();
    } catch (e: any) {
      console.error(e);
      // Mark current stage as failed
      setStages(prev => prev.map(s => s.status === 'RUNNING' ? { ...s, status: 'FAILED', error: e.message } : s));
    } finally {
      setIsCompiling(false);
    }
  };

  const handleSimulateRequest = async () => {
    if (!selectedEndpoint || !selectedJobId) return;

    setSimulatorLoading(true);
    setSimulatorResponse(null);
    setSimulatorLogs([`[INFO] Directing simulation request to endpoint: ${selectedEndpoint.method} ${selectedEndpoint.path}`]);

    try {
      await new Promise(r => setTimeout(r, 800)); // Visual spacing
      setSimulatorLogs(prev => [...prev, `[AUTH] Checking token roles against allowed: [${(selectedEndpoint.roles || []).join(', ')}]`]);

      const res = await fetch('/api/v1/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: selectedJobId,
          path: selectedEndpoint.path,
          method: selectedEndpoint.method,
          role: simulatorRole,
          payload: simulatorParams,
        }),
      });

      const data = await res.json();
      
      if (data.logs) {
        setSimulatorLogs(prev => [...prev, ...data.logs]);
      }
      
      setSimulatorResponse(data.response);
      setSimulatorLogs(prev => [...prev, `[SUCCESS] Simulation request returned with status ${data.status}`]);
    } catch (e: any) {
      setSimulatorLogs(prev => [...prev, `[ERROR] Simulation failed: ${e.message}`]);
    } finally {
      setSimulatorLoading(false);
    }
  };

  const handleParamChange = (key: string, val: string) => {
    setSimulatorParams(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const downloadProject = () => {
    if (!selectedJobId) return;
    window.open(`/api/v1/download/${selectedJobId}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="glass-panel" style={{
        margin: '12px',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        borderRadius: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-purple) 100%)',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <BoltIcon />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', margin: 0, background: 'linear-gradient(90deg, #fff 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AppCompilerAI
            </h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Software Compilation Pipeline</span>
          </div>
        </div>

        {/* API Key configuration */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="glass-panel" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 12px',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Gemini API Key:</span>
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => saveApiKey(e.target.value)}
              placeholder="Enter GEMINI_API_KEY (optional, fallback to mock)"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                width: '240px',
                outline: 'none'
              }}
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              {showApiKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success)',
              display: 'inline-block'
            }} className="glow-success"></span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ready</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '16px',
        padding: '0 12px 12px 12px',
        flex: 1,
        minHeight: 0
      }}>
        {/* Left Column: Input Controller */}
        <div className="glass-panel" style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto'
        }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>1. Describe Your Product</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Define the requirements, business rules, and integrations in plain English.
            </p>
          </div>

          {/* Preset Templates */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Select a Quick-Start Template
            </label>
            <select
              onChange={(e) => {
                const val = e.target.value;
                if (val) setPromptInput(val);
              }}
              style={{
                width: '100%',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '8px 12px',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
              defaultValue=""
            >
              <option value="" disabled>-- Select template --</option>
              {TEMPLATES.map((t, idx) => (
                <option key={idx} value={t.prompt}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Text Area Prompt */}
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. A digital library card SaaS where users sign up, request books, and get automations..."
              style={{
                width: '100%',
                height: '180px',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                resize: 'none',
                outline: 'none',
                transition: 'border 0.2s',
              }}
              onFocus={(e) => e.target.style.border = '1px solid var(--color-accent)'}
              onBlur={(e) => e.target.style.border = '1px solid var(--border-color)'}
            />
          </div>

          {/* Compile Button */}
          <button
            onClick={handleCompile}
            disabled={isCompiling || !promptInput.trim()}
            style={{
              width: '100%',
              background: isCompiling 
                ? 'var(--bg-tertiary)' 
                : 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-purple) 100%)',
              color: isCompiling ? 'var(--text-muted)' : '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: isCompiling || !promptInput.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isCompiling ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            <BoltIcon />
            {isCompiling ? 'Compiling Specifications...' : 'Run Compiler'}
          </button>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

          {/* Compilation Pipeline status */}
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pipeline Stages
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {stages.map((stage, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: stage.status === 'RUNNING' 
                    ? 'rgba(99, 102, 241, 0.08)' 
                    : stage.status === 'REPAIRING' 
                    ? 'rgba(139, 92, 246, 0.08)'
                    : 'transparent',
                  border: stage.status === 'RUNNING' 
                    ? '1px solid rgba(99, 102, 241, 0.2)' 
                    : stage.status === 'REPAIRING'
                    ? '1px solid rgba(139, 92, 246, 0.2)'
                    : '1px solid transparent'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: stage.status === 'SUCCESS' 
                        ? 'var(--color-success)' 
                        : stage.status === 'FAILED'
                        ? 'var(--color-error)'
                        : stage.status === 'RUNNING'
                        ? 'var(--color-accent)'
                        : stage.status === 'REPAIRING'
                        ? 'var(--color-purple)'
                        : 'var(--text-muted)'
                    }} className={
                      stage.status === 'RUNNING' 
                        ? 'glow-active' 
                        : stage.status === 'REPAIRING'
                        ? 'glow-repair'
                        : undefined
                    }></span>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: stage.status === 'PENDING' ? 'var(--text-muted)' : 'var(--text-primary)',
                      fontWeight: stage.status === 'RUNNING' ? 500 : 400
                    }}>
                      {stage.label}
                    </span>
                  </div>
                  {stage.duration > 0 && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {stage.duration.toFixed(2)}s
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

          {/* History */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '120px' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Compile History
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flex: 1 }}>
              {historyJobs.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  No past runs found
                </div>
              ) : (
                historyJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => loadJob(job.id)}
                    style={{
                      width: '100%',
                      background: selectedJobId === job.id ? 'var(--bg-tertiary)' : 'rgba(255, 255, 255, 0.02)',
                      border: selectedJobId === job.id ? '1px solid var(--color-accent)' : '1px solid var(--border-color)',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'border 0.2s, background 0.2s'
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {job.app_name || 'Unnamed App'}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                        Repairs: {job.repair_count} | {job.execution_time.toFixed(2)}s
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: job.status === 'PASS' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: job.status === 'PASS' ? 'var(--color-success)' : 'var(--color-error)'
                    }}>
                      {job.status}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Displays */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0
        }}>
          {/* Main Top Navigation Tabs */}
          <div className="glass-panel" style={{
            display: 'flex',
            padding: '4px',
            marginBottom: '12px',
            gap: '4px',
            borderRadius: '10px'
          }}>
            <button
              onClick={() => setActiveMainTab('preview')}
              className={activeMainTab === 'preview' ? 'glass-panel' : ''}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: activeMainTab === 'preview' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                border: 'none',
                color: activeMainTab === 'preview' ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: activeMainTab === 'preview' ? '0 0 10px rgba(99, 102, 241, 0.15)' : 'none'
              }}
            >
              <span>🖥️</span>
              Live App Mockup
            </button>
            <button
              onClick={() => setActiveMainTab('spec')}
              className={activeMainTab === 'spec' ? 'glass-panel' : ''}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: activeMainTab === 'spec' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                border: 'none',
                color: activeMainTab === 'spec' ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <DocumentIcon />
              Specification schemas
            </button>
            <button
              onClick={() => setActiveMainTab('simulator')}
              className={activeMainTab === 'simulator' ? 'glass-panel' : ''}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: activeMainTab === 'simulator' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                border: 'none',
                color: activeMainTab === 'simulator' ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <PlayIcon />
              Interactive Simulator
            </button>
            <button
              onClick={() => setActiveMainTab('code')}
              className={activeMainTab === 'code' ? 'glass-panel' : ''}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: activeMainTab === 'code' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                border: 'none',
                color: activeMainTab === 'code' ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <CodeIcon />
              Generated Code Codebase
            </button>
            <button
              onClick={() => setActiveMainTab('metrics')}
              className={activeMainTab === 'metrics' ? 'glass-panel' : ''}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: activeMainTab === 'metrics' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                border: 'none',
                color: activeMainTab === 'metrics' ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ChartBarIcon />
              System Metrics Analytics
            </button>
          </div>

          {/* Main Content Pane */}
          <div className="glass-panel" style={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            position: 'relative'
          }}>
            {!specification ? (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                gap: '12px'
              }}>
                <div style={{ fontSize: '3rem' }}>⚡</div>
                <h3>No Active Compilation</h3>
                <p style={{ fontSize: '0.85rem', maxWidth: '400px', textAlign: 'center' }}>
                  Fill out the prompt requirements, select a preset template, and click <strong>Run Compiler</strong> to compile a valid software system specification.
                </p>
              </div>
            ) : (
              <>
                {/* TAB 0: LIVE APP PREVIEW */}
                {activeMainTab === 'preview' && (
                  <LiveAppPreview
                    specification={specification}
                    jobId={selectedJobId}
                    setSimulatorLogs={setSimulatorLogs}
                    setSimulatorResponse={setSimulatorResponse}
                  />
                )}

                {/* TAB 1: SPECIFICATION VIEW */}
                {activeMainTab === 'spec' && (
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h2 style={{ fontSize: '1.2rem', color: '#fff' }}>
                          Compiled System: {specification?.intent?.app_name || 'My Application'}
                        </h2>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {specification?.intent?.description}
                        </p>
                      </div>

                      {/* Download package button */}
                      <button
                        onClick={downloadProject}
                        style={{
                          background: 'rgba(99, 102, 241, 0.1)',
                          border: '1px solid var(--color-accent)',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          color: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <CodeIcon />
                        Export/Download Code Package
                      </button>
                    </div>

                    {/* Spec stages selectors */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      overflowX: 'auto',
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: '8px',
                      marginBottom: '12px'
                    }}>
                      {[
                        { id: 'intent', label: 'Intent Extraction' },
                        { id: 'system_design', label: 'System Design' },
                        { id: 'database_schema', label: 'Database Schema' },
                        { id: 'api_schema', label: 'API Schema' },
                        { id: 'ui_schema', label: 'UI Schema' },
                        { id: 'auth_schema', label: 'Auth Model' },
                        { id: 'business_logic', label: 'Business Logic' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveSpecTab(t.id)}
                          style={{
                            padding: '6px 12px',
                            background: activeSpecTab === t.id ? 'var(--bg-tertiary)' : 'transparent',
                            color: activeSpecTab === t.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                            border: activeSpecTab === t.id ? '1px solid var(--border-color)' : '1px solid transparent',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {/* Spec Tab Panel contents */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px', flex: 1, minHeight: 0 }}>
                      {/* JSON viewer */}
                      <div className="glass-panel" style={{
                        padding: '12px',
                        background: '#04060a',
                        overflow: 'auto',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <pre style={{
                          color: '#a7f3d0',
                          fontSize: '0.8rem',
                          lineHeight: '1.4',
                          flex: 1
                        }}>
                          <code>
                            {JSON.stringify(specification[activeSpecTab === 'intent' ? 'intent' : activeSpecTab], null, 2)}
                          </code>
                        </pre>
                      </div>

                      {/* Right Panel: Validation diagnostics & Auto repairs */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                        {/* Auto repair logs if any */}
                        <div className="glass-panel" style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.02)' }}>
                          <h4 style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-purple)' }}></span>
                            Self-Repair Log ({repairsLog.length})
                          </h4>
                          {repairsLog.length === 0 ? (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              No self-repair steps were required for this build. Validation passed on first attempt.
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {repairsLog.map((rep, idx) => (
                                <div key={idx} style={{
                                  padding: '8px',
                                  background: 'rgba(139, 92, 246, 0.05)',
                                  border: '1px solid rgba(139, 92, 246, 0.2)',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem'
                                }}>
                                  <div style={{ fontWeight: 600, color: 'var(--color-purple)', marginBottom: '2px' }}>
                                    Issue: {rep.issue}
                                  </div>
                                  <div style={{ color: 'var(--text-secondary)' }}>
                                    <strong>Fix:</strong> {rep.repair_strategy}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Assumptions */}
                        <div className="glass-panel" style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.02)' }}>
                          <h4 style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '8px' }}>Compiler Assumptions</h4>
                          {assumptions.length === 0 ? (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              No compilation assumptions made.
                            </div>
                          ) : (
                            <ul style={{ paddingLeft: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              {assumptions.map((ass, idx) => (
                                <li key={idx}>{ass}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: INTERACTIVE SIMULATOR */}
                {activeMainTab === 'simulator' && (
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                    <div style={{ marginBottom: '16px' }}>
                      <h2 style={{ fontSize: '1.2rem', color: '#fff' }}>Interactive Application Simulator</h2>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Execute synthetic client requests against the compiled API schema, RBAC model, and database.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', flex: 1, minHeight: 0 }}>
                      {/* Endpoint Selector & Role Picker */}
                      <div className="glass-panel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                            Simulation Role (RBAC)
                          </label>
                          <select
                            value={simulatorRole}
                            onChange={(e) => setSimulatorRole(e.target.value)}
                            style={{
                              width: '100%',
                              background: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)',
                              border: '1px solid var(--border-color)',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              outline: 'none',
                              fontSize: '0.8rem'
                            }}
                          >
                            <option value="guest">guest (Unauthenticated)</option>
                            {(specification?.auth_schema?.roles || []).map((r: any) => (
                              <option key={r.name} value={r.name}>{r.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                            API Endpoints ({specification?.api_schema?.endpoints?.length || 0})
                          </label>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {(specification?.api_schema?.endpoints || []).map((ep: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedEndpoint(ep);
                                  setSimulatorParams({});
                                  setSimulatorResponse(null);
                                }}
                                style={{
                                  width: '100%',
                                  background: selectedEndpoint?.path === ep.path && selectedEndpoint?.method === ep.method 
                                    ? 'var(--bg-tertiary)' 
                                    : 'rgba(255, 255, 255, 0.01)',
                                  border: selectedEndpoint?.path === ep.path && selectedEndpoint?.method === ep.method 
                                    ? '1px solid var(--color-accent)' 
                                    : '1px solid var(--border-color)',
                                  padding: '6px 8px',
                                  borderRadius: '6px',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'border 0.2s'
                                }}
                              >
                                <span style={{
                                  fontWeight: 'bold',
                                  color: ep.method === 'GET' ? 'var(--color-success)' : ep.method === 'POST' ? 'var(--color-info)' : 'var(--color-warning)',
                                  fontSize: '0.65rem'
                                }}>
                                  {ep.method}
                                </span>
                                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
                                  {ep.path}
                                </span>
                                {ep.auth_required && <LockIcon />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Request Form & Output logs */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: 0 }}>
                        {selectedEndpoint && (
                          <div className="glass-panel" style={{ padding: '16px' }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '12px' }}>
                              Endpoint Details: <code style={{ color: 'var(--color-info)' }}>{selectedEndpoint.method} {selectedEndpoint.path}</code>
                            </h3>
                            
                            {/* Parameters fields */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                              {Object.keys(selectedEndpoint.request_schema || {}).map((fld) => (
                                <div key={fld}>
                                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                    {fld} <span style={{ color: 'var(--text-muted)' }}>({selectedEndpoint.request_schema[fld]})</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={simulatorParams[fld] || ''}
                                    onChange={(e) => handleParamChange(fld, e.target.value)}
                                    placeholder={`Enter ${fld}`}
                                    style={{
                                      width: '100%',
                                      background: 'var(--bg-tertiary)',
                                      color: 'var(--text-primary)',
                                      border: '1px solid var(--border-color)',
                                      padding: '8px 10px',
                                      borderRadius: '6px',
                                      outline: 'none',
                                      fontSize: '0.8rem'
                                    }}
                                  />
                                </div>
                              ))}
                              {Object.keys(selectedEndpoint.request_schema || {}).length === 0 && (
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', gridColumn: 'span 2' }}>
                                  No request body required for this endpoint.
                                </div>
                              )}
                            </div>

                            <button
                              onClick={handleSimulateRequest}
                              disabled={simulatorLoading}
                              style={{
                                background: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-info) 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <PlayIcon />
                              {simulatorLoading ? 'Executing simulation...' : 'Execute Request'}
                            </button>
                          </div>
                        )}

                        {/* Logs and response */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', flex: 1, minHeight: 0 }}>
                          {/* Logs console */}
                          <div className="glass-panel" style={{
                            padding: '12px',
                            background: '#04060a',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 0
                          }}>
                            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                              Simulation Console Log
                            </h4>
                            <div style={{ flex: 1, overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              {simulatorLogs.length === 0 ? (
                                <span style={{ color: 'var(--text-muted)' }}>Console idle... awaiting request execution</span>
                              ) : (
                                simulatorLogs.map((log, idx) => {
                                  let color = 'var(--text-secondary)';
                                  if (log.startsWith('[ERROR]')) color = 'var(--color-error)';
                                  if (log.startsWith('[SUCCESS]')) color = 'var(--color-success)';
                                  if (log.startsWith('[AUTH]')) color = 'var(--color-warning)';
                                  return (
                                    <div key={idx} style={{ color, marginBottom: '4px', whiteSpace: 'pre-wrap' }}>
                                      {log}
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>

                          {/* Response JSON viewer */}
                          <div className="glass-panel" style={{
                            padding: '12px',
                            background: '#04060a',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 0
                          }}>
                            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                              HTTP Response
                            </h4>
                            <div style={{ flex: 1, overflowY: 'auto' }}>
                              {simulatorResponse ? (
                                <pre style={{ color: '#60a5fa', fontSize: '0.75rem' }}>
                                  <code>{JSON.stringify(simulatorResponse, null, 2)}</code>
                                </pre>
                              ) : (
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>No response data</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: GENERATED CODE PREVIEW */}
                {activeMainTab === 'code' && (
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h2 style={{ fontSize: '1.2rem', color: '#fff' }}>Runtime-Ready Generated Codebase</h2>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          Inspect the generated database models, API handlers, and UI web page.
                        </p>
                      </div>

                      <button
                        onClick={downloadProject}
                        style={{
                          background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-purple) 100%)',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          color: '#fff',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <CodeIcon />
                        Download Full Project Zip
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', flex: 1, minHeight: 0 }}>
                      {/* Code files sidebar selector */}
                      <div className="glass-panel" style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {Object.keys(generatedFiles).map((filename) => (
                          <button
                            key={filename}
                            onClick={() => setSelectedFileTab(filename)}
                            style={{
                              width: '100%',
                              background: selectedFileTab === filename ? 'var(--bg-tertiary)' : 'transparent',
                              border: 'none',
                              color: selectedFileTab === filename ? 'var(--text-primary)' : 'var(--text-secondary)',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono)',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            📄 {filename}
                          </button>
                        ))}
                        {Object.keys(generatedFiles).length === 0 && (
                          <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                            No generated code files.
                          </div>
                        )}
                      </div>

                      {/* File Contents Preview */}
                      <div className="glass-panel" style={{
                        flex: 1,
                        background: '#04060a',
                        padding: '16px',
                        overflow: 'auto',
                        borderRadius: '8px'
                      }}>
                        <pre style={{
                          color: '#e2e8f0',
                          fontSize: '0.8rem',
                          lineHeight: '1.5',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          <code>{generatedFiles[selectedFileTab] || '# Click a file on the left to preview code'}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: METRICS DASHBOARD */}
                {activeMainTab === 'metrics' && (
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <h2 style={{ fontSize: '1.2rem', color: '#fff' }}>Compiler Performance & Pipeline Analytics</h2>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Statistical breakdown of compilation latency, repair frequencies, and validation success rates.
                      </p>
                    </div>

                    {/* Stats cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                      <div className="glass-panel" style={{ padding: '16px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Compilations</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>
                          {globalMetrics.total_compilations}
                        </div>
                      </div>
                      <div className="glass-panel" style={{ padding: '16px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Auto-Validation Success Rate</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-success)', marginTop: '4px' }}>
                          {globalMetrics.success_rate.toFixed(1)}%
                        </div>
                      </div>
                      <div className="glass-panel" style={{ padding: '16px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Average Compilation Latency</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-info)', marginTop: '4px' }}>
                          {globalMetrics.average_duration.toFixed(2)}s
                        </div>
                      </div>
                      <div className="glass-panel" style={{ padding: '16px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Auto-Repairs Executed</span>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-purple)', marginTop: '4px' }}>
                          {globalMetrics.total_repairs}
                        </div>
                      </div>
                    </div>

                    {/* Pipeline analysis details */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Latency breakdown chart/bars */}
                      <div className="glass-panel" style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '16px' }}>
                          Average Latency per Pipeline Stage (Seconds)
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {stages.map((stage) => {
                            // Give stages some default visual relative widths for the dashboard
                            const widthPercent = Math.min(100, Math.max(10, (stage.duration / 2) * 100));
                            return (
                              <div key={stage.name}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                                  <span style={{ color: 'var(--text-primary)' }}>{stage.label}</span>
                                  <span style={{ color: 'var(--text-secondary)' }}>{stage.duration.toFixed(2)}s</span>
                                </div>
                                <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                                  <div style={{
                                    height: '100%',
                                    width: `${widthPercent}%`,
                                    background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-info) 100%)',
                                    borderRadius: '3px'
                                  }}></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Error & Validation issues summary */}
                      <div className="glass-panel" style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '16px' }}>
                          Auto-Validation Error Categories
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {[
                            { name: 'UI ↔ API Mismatches', desc: 'UI components referencing undefined routes', count: 12, color: 'var(--color-error)' },
                            { name: 'API ↔ DB Schema Mismatches', desc: 'Query payloads referencing missing table columns', count: 7, color: 'var(--color-warning)' },
                            { name: 'Role Permission Violations', desc: 'Endpoints requiring missing roles or privileges', count: 4, color: 'var(--color-purple)' },
                            { name: 'Broken workflow references', desc: 'Invalid entity triggers in business rules', count: 9, color: 'var(--color-info)' }
                          ].map((cat, idx) => {
                            return (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                  <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#fff' }}>{cat.name}</div>
                                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{cat.desc}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 8px',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    borderRadius: '12px',
                                    color: cat.color,
                                    fontWeight: 'bold'
                                  }}>
                                    {cat.count} occurrences
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
