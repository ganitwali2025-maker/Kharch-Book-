// Make storage globally available to simulate the native environment
    window.storage = {
      async get(key) {
        return { value: localStorage.getItem(key) };
      },
      async set(key, value) {
        localStorage.setItem(key, value);
      },
      async delete(key) {
        localStorage.removeItem(key);
      }
    };

(function(){

  const ICONS = {
    minus:      '<circle cx="12" cy="12" r="9"/><line x1="7" y1="12" x2="17" y2="12"/>',
    plus:       '<circle cx="12" cy="12" r="9"/><line x1="12" y1="7" x2="12" y2="17"/><line x1="7" y1="12" x2="17" y2="12"/>',
    send:       '<path d="M21 3L3 10.5l7 2.5 2.5 7L21 3z"/><path d="M10.5 13L21 3"/>',
    download:   '<path d="M12 3v12M7.5 10L12 15.5 16.5 10"/><line x1="4" y1="19" x2="20" y2="19"/>',
    users:      '<circle cx="9" cy="9" r="3.6"/><circle cx="16.5" cy="12" r="2.8"/><path d="M3 19c0-3 2.6-5 6-5s6 2 6 5"/><path d="M14.2 19c.3-1.9 1.7-3.2 3.8-3.2 2 0 3.5 1.2 3.9 3.2"/>',
    repeat:     '<path d="M4 7h13l-3-3"/><path d="M20 17H7l3 3"/>',
    target:     '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.3"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
    bars:       '<line x1="5" y1="20" x2="5" y2="12"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="19" y1="20" x2="19" y2="15"/>',
    home:       '<path d="M4 11.5L12 4l8 7.5"/><path d="M6 10v9h5v-5h2v5h5v-9"/>',
    list:       '<line x1="8" y1="7" x2="19" y2="7"/><line x1="8" y1="12" x2="19" y2="12"/><line x1="8" y1="17" x2="19" y2="17"/><circle cx="4.5" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="17" r="1" fill="currentColor" stroke="none"/>',
    user:       '<circle cx="12" cy="8.3" r="3.6"/><path d="M4.5 20c1.3-3.8 4.2-5.8 7.5-5.8s6.2 2 7.5 5.8"/>',
    search:     '<circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.3" y1="15.3" x2="20.5" y2="20.5"/>',
    bell:       '<path d="M6.5 10.2a5.5 5.5 0 0 1 11 0c0 4 1.4 5.3 1.4 5.3H5.1s1.4-1.3 1.4-5.3z"/><path d="M10 18.5a2 2 0 0 0 4 0"/>',
    cash:       '<rect x="3" y="7" width="18" height="10" rx="1.6"/><circle cx="12" cy="12" r="2.2"/>',
    bank:       '<path d="M4 10l8-5 8 5"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="6" y1="10" x2="6" y2="18"/><line x1="10" y1="10" x2="10" y2="18"/><line x1="14" y1="10" x2="14" y2="18"/><line x1="18" y1="10" x2="18" y2="18"/><line x1="4" y1="18" x2="20" y2="18"/>',
    phone:      '<rect x="7.5" y="3" width="9" height="18" rx="2"/><line x1="10.2" y1="18" x2="13.8" y2="18"/>',
    wallet:     '<path d="M3.5 8a2 2 0 0 1 2-2h12.5a1 1 0 0 1 1 1v2"/><rect x="3.5" y="8" width="17" height="11" rx="2"/><circle cx="16.2" cy="13.5" r="1.3" fill="currentColor" stroke="none"/>',
    food:       '<path d="M6.2 3v6.5a1.8 1.8 0 0 0 3.6 0V3M8 9.5V21"/><path d="M16 3c-1.4 0-2.4 1.6-2.4 4.2s1 4.2 2.4 4.2V21"/>',
    car:        '<path d="M4.5 16l1.3-5.3A2 2 0 0 1 7.7 9.2h8.6a2 2 0 0 1 1.9 1.5L19.5 16"/><rect x="3.3" y="16" width="17.4" height="3.6" rx="1.4"/><circle cx="7.5" cy="19.8" r="1.2"/><circle cx="16.5" cy="19.8" r="1.2"/>',
    bag:        '<path d="M6.3 8h11.4l-1 12H7.3L6.3 8z"/><path d="M9 8V6.3a3 3 0 0 1 6 0V8"/>',
    fuel:       '<rect x="4" y="4.5" width="9" height="15" rx="1"/><path d="M13 9.5h2.2L17.5 12v4.6a1.4 1.4 0 0 0 2.8 0V10l-2-2"/><line x1="6.2" y1="8" x2="10.8" y2="8"/>',
    bolt:       '<path d="M13 2.5L4.5 14h5.6l-1 7.5 8.4-12.6h-5.6l1-6.4z"/>',
    briefcase:  '<rect x="3" y="8" width="18" height="11" rx="1.6"/><path d="M8.3 8V6.3a2 2 0 0 1 2-2h3.4a2 2 0 0 1 2 2V8"/><line x1="3" y1="13.2" x2="21" y2="13.2"/>',
    building:   '<rect x="5.2" y="3" width="13.6" height="18" rx="1"/><line x1="5.2" y1="9" x2="18.8" y2="9"/><line x1="5.2" y1="14.5" x2="18.8" y2="14.5"/><line x1="9.6" y1="21" x2="9.6" y2="18" /><line x1="14.4" y1="21" x2="14.4" y2="18"/>',
    medkit:     '<rect x="3" y="8" width="18" height="11.5" rx="2"/><path d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"/><line x1="12" y1="11.5" x2="12" y2="16.5"/><line x1="9.5" y1="14" x2="14.5" y2="14"/>',
    cap:        '<path d="M2.5 9.5L12 4.8l9.5 4.7L12 14.2 2.5 9.5z"/><path d="M6.3 11.4v4.4c0 1.6 2.6 3 5.7 3s5.7-1.4 5.7-3v-4.4"/>',
    film:       '<rect x="3" y="6" width="18" height="14" rx="1.6"/><path d="M3 6.3l3.2-3.3h3.8L6.8 6.3M11.2 6.3l3.2-3.3H18l-3.2 3.3"/>',
    box:        '<path d="M3.2 8L12 3.3 20.8 8 12 12.7 3.2 8z"/><path d="M3.2 8v9L12 21.7 20.8 17V8"/><line x1="12" y1="12.7" x2="12" y2="21.7"/>',
    eyeoff:     '<path d="M3 3l18 18"/><path d="M10.6 10.6a3 3 0 0 0 4.2 4.2"/><path d="M6.6 6.8C4.6 8.1 3.1 10 2.2 12c1.8 3.6 5.5 7 9.8 7 1.7 0 3.3-.4 4.7-1.1M9.9 5.2A10.6 10.6 0 0 1 12 5c4.6 0 8.3 3.5 10 7-.5 1-1.2 2-2 2.9"/>',
    lock:       '<rect x="5" y="11" width="14" height="9" rx="1.6"/><path d="M8 11V7.2a4 4 0 0 1 8 0V11"/>',
    trash:      '<line x1="4" y1="7" x2="20" y2="7"/><path d="M6.2 7l1 13h9.6l1-13"/><path d="M9.3 7V4h5.4v3"/>',
    check:      '<path d="M5 13l4 4L19 7"/>',
    file:       '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><line x1="9.5" y1="12.5" x2="14.5" y2="12.5"/><line x1="9.5" y1="15.7" x2="14.5" y2="15.7"/>',
    arrowleft:  '<line x1="19" y1="12" x2="5" y2="12"/><path d="M11 6l-6 6 6 6"/>',
    chevron:    '<path d="M9 6l6 6-6 6"/>',
    bulb:       '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.2 1 2.1h5c0-.9.4-1.7 1-2.1A6 6 0 0 0 12 3z"/>'
  };
  function I(name, cls){ return '<svg class="kb-i '+(cls||'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[name]||'')+'</svg>'; }

  const CATS = [
    {n:'Food',ic:'food'},{n:'Travel',ic:'car'},{n:'Shopping',ic:'bag'},{n:'Fuel',ic:'fuel'},
    {n:'Electricity',ic:'bolt'},{n:'Mobile',ic:'phone'},{n:'Rent',ic:'home'},{n:'Salary',ic:'briefcase'},
    {n:'Office',ic:'building'},{n:'Medical',ic:'medkit'},{n:'Education',ic:'cap'},{n:'Entertainment',ic:'film'},{n:'Other',ic:'box'}
  ];
  const INCOME_SOURCES = ['Salary','Business','Freelance','Interest','Commission','Other'];
  const PAY_METHODS = ['Cash','Bank','UPI','Card','Wallet'];
  const STORAGE_KEY = 'kharch-book-app-data';

  const KB = {
    state: {
      data: null,
      currentForm: null,
      formParty: null,
      selectedCategory: null,
      selectedMethod: 'UPI',
      selectedTxnId: null,
      selectedParty: null,
      txFilter: 'ALL',
      udhariTab: 'lena',
      lastSuccess: null
    },

    async init(){
      let loaded = null;
      try{
        const res = await window.storage.get(STORAGE_KEY, false);
        if(res && res.value) loaded = JSON.parse(res.value);
      }catch(e){ loaded = null; }

      if(loaded){
        if (!loaded.members) loaded.members = [];
        this.state.data = loaded;
        setTimeout(()=>{ document.getElementById('kb-splash').style.display='none'; this.go('home'); }, 900);
      } else {
        setTimeout(()=>{ document.getElementById('kb-splash').style.display='none'; this.showScreenOnly('setup'); }, 900);
      }
    },

    async save(){
      try{ await window.storage.set(STORAGE_KEY, JSON.stringify(this.state.data), false); }
      catch(e){ console.error('save failed', e); }
    },

    emptyData(profile){
      return {
        profile: profile,
        accounts: { Cash: profile.opening||0, Bank: 0, UPI: 0, Wallet: 0 },
        transactions: [],
        budgets: { monthly: 0, categories: {} },
        parties: {},
        members: []
      };
    },

    // ---------- SETUP ----------
    finishSetup(){
      const name = document.getElementById('su-name').value.trim() || 'Friend';
      const mobile = document.getElementById('su-mobile').value.trim();
      const currency = document.getElementById('su-currency').value;
      const type = document.querySelector('#su-type .opt.sel').dataset.v;
      const opening = parseFloat(document.getElementById('su-opening').value) || 0;
      this.state.data = this.emptyData({name, mobile, currency, type, opening});
      this.save();
      this.go('home');
    },

    // ---------- NAV ----------
    showScreenOnly(id){
      document.querySelectorAll('.kb-screen').forEach(s=>s.classList.remove('active'));
      const el = document.getElementById('scr-'+id);
      if(el) el.classList.add('active');
      document.getElementById('kb-nav').style.display = (id==='setup') ? 'none' : 'flex';
    },

    go(screen){
      this.closeAllSheets();
      this.showScreenOnly(screen);
      document.querySelectorAll('.kb-nav-item').forEach(n=>n.classList.toggle('active', n.dataset.scr===screen));
      if(screen==='home') this.renderHome();
      if(screen==='transactions') this.renderTransactions();
      if(screen==='members') this.renderMembers();
      if(screen==='budget') this.renderBudget();
      if(screen==='accounts') this.renderAccounts();
      if(screen==='reports') this.renderReports();
      if(screen==='profile') this.renderProfile();
      if(screen==='notifications') this.renderNotifications();
      window.scrollTo(0,0);
    },

    fmt(n){
      const c = (this.state.data && this.state.data.profile.currency) || '₹';
      n = Number(n)||0;
      return c + n.toLocaleString('en-IN', {maximumFractionDigits:0});
    },

    toast(msg){
      const t = document.getElementById('kb-toast');
      t.textContent = msg; t.classList.add('show');
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(()=>t.classList.remove('show'), 1800);
    },

    // ---------- DASHBOARD ----------
    renderHome(){
      const d = this.state.data;
      document.getElementById('hm-name').textContent = d.profile.name;
      document.getElementById('hm-avatar').textContent = (d.profile.name || 'U')[0].toUpperCase();
      const h = new Date().getHours();
      document.getElementById('hm-greet').textContent = h<12?'Good Morning':(h<17?'Good Afternoon':'Good Evening');

      const totals = this.computeTotals();
      const balance = Object.values(d.accounts).reduce((a,b)=>a+b,0);
      document.getElementById('hm-balance').textContent = this.fmt(balance);
      document.getElementById('hm-income').textContent = this.fmt(totals.income);
      document.getElementById('hm-expense').textContent = this.fmt(totals.expense);
      document.getElementById('hm-saved').textContent = this.fmt(totals.income - totals.expense);

      const recent = [...d.transactions].sort((a,b)=>b.ts-a.ts).slice(0,5);
      const box = document.getElementById('hm-recent');
      box.innerHTML = '';
      if(recent.length===0){
        box.innerHTML = '<div class="kb-empty"><div class="e-ic">'+I('file','lg')+'</div>No transactions yet.<br>Tap + to add your first entry.</div>';
      } else {
        recent.forEach(t=> box.appendChild(this.txnRow(t)));
      }
    },

    computeTotals(){
      const d = this.state.data;
      let income=0, expense=0;
      d.transactions.forEach(t=>{
        if(t.type==='Income' || t.type==='Receive') income += t.amount;
        if(t.type==='Expense' || t.type==='Payment') expense += t.amount;
      });
      return {income, expense};
    },

    catIcon(cat){
      const f = CATS.find(c=>c.n===cat);
      return I(f ? f.ic : 'box');
    },
    catIconKey(cat){
      const f = CATS.find(c=>c.n===cat);
      return f ? f.ic : 'box';
    },

    typeVisual(t){
      if(t.type==='Income') return {ic:I('plus'), bg:'#DFF6EA', color:'var(--green)', sign:'+', cls:'pos'};
      if(t.type==='Receive') return {ic:I('download'), bg:'#FBF0DA', color:'var(--amber)', sign:'+', cls:'pos'};
      if(t.type==='Payment') return {ic:I('send'), bg:'#E7EEFB', color:'var(--blue)', sign:'-', cls:'neg'};
      if(t.type==='Udhari') return {ic: I('users'), bg:'#F1E8FB', color:'var(--violet)', sign: t.udhariDirection==='given'?'-':'+', cls: t.udhariDirection==='given'?'neg':'pos'};
      if(t.type==='Transfer') return {ic:I('repeat'), bg:'#E7EEFB', color:'var(--blue-2)', sign:'', cls:''};
      return {ic: I(this.catIconKey(t.category)), bg:'#FDE7E6', color:'var(--red)', sign:'-', cls:'neg'};
    },

    txnRow(t){
      const v = this.typeVisual(t);
      const el = document.createElement('div');
      el.className = 'kb-txn';
      el.onclick = ()=> this.openDetails(t.id);
      const dt = new Date(t.ts);
      const dateStr = dt.toLocaleDateString('en-IN',{day:'2-digit',month:'short'}) + ', ' + dt.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
      el.innerHTML = `
        <div class="av" style="background:${v.bg};color:${v.color};">${v.ic}</div>
        <div class="mid">
          <p class="name">${t.party || t.category || t.type}</p>
          <p class="meta">${t.category || t.type} · ${dateStr}</p>
        </div>
        <div class="amt ${v.cls}">${v.sign}${this.fmt(t.amount)}</div>
      `;
      return el;
    },

    // ---------- ADD SHEET ----------
    openAddSheet(){ document.getElementById('add-sheet-overlay').classList.add('active'); },
    closeAllSheets(){
      document.getElementById('add-sheet-overlay').classList.remove('active');
      document.getElementById('form-sheet-overlay').classList.remove('active');
    },
    closeSheetOnBg(e, which){
      if(e.target.classList.contains('kb-sheet-overlay')) this.closeAllSheets();
    },

    // ---------- FORMS ----------
    openForm(type, party){
      document.getElementById('add-sheet-overlay').classList.remove('active');
      this.state.currentForm = type;
      this.state.selectedCategory = null;
      this.state.selectedMethod = 'UPI';
      this.state.formParty = party || null;
      const body = document.getElementById('form-sheet-body');
      body.innerHTML = this.formTemplate(type);
      document.getElementById('form-sheet-overlay').classList.add('active');
    },

    formTemplate(type){
      if (type === 'member') {
        return `
        <div class="kb-sheet-handle"></div>
        <div class="kb-form-title"><h2 style="flex:1;">Add Member</h2></div>
        <div class="kb-field"><label>Name</label><input type="text" id="f-member-name" placeholder="Name"></div>
        <div class="kb-field"><label>Designation</label><input type="text" id="f-member-designation" placeholder="Designation"></div>
        <div class="kb-field"><label>Address</label><input type="text" id="f-member-address" placeholder="Address"></div>
        <div class="kb-field"><label>Mobile</label><input type="tel" id="f-member-mobile" placeholder="Mobile Number"></div>
        <div class="kb-field"><label>Notes</label><textarea id="f-member-notes" rows="2" placeholder="Notes..."></textarea></div>
        <button class="kb-btn" onclick="KB.submitForm()">SAVE MEMBER</button>
        `;
      }
      const now = new Date();
      const dateVal = now.toISOString().slice(0,10);
      const titles = {expense:'Add Expense', income:'Add Income', payment:'Make Payment', receive:'Receive Money', member:'Add Member', transfer:'Transfer Money'};

      let catChips = '';
      if(type==='expense'){
        catChips = `<div class="kb-field"><label>Category</label><div class="kb-chip-row" id="f-cats">${CATS.map(c=>`<div class="kb-chip" data-v="${c.n}" onclick="KB.pickChip(this,'category')" style="display:flex;align-items:center;gap:6px;">${I(c.ic,'sm')} ${c.n}</div>`).join('')}</div></div>`;
      }
      if(type==='income'){
        catChips = `<div class="kb-field"><label>Income Source</label><div class="kb-chip-row" id="f-cats">${INCOME_SOURCES.map(c=>`<div class="kb-chip" data-v="${c}" onclick="KB.pickChip(this,'category')">${c}</div>`).join('')}</div></div>`;
      }

      let methodChips = `<div class="kb-field"><label>Payment Method</label><div class="kb-chip-row" id="f-methods">${PAY_METHODS.map(m=>`<div class="kb-chip ${m==='UPI'?'sel':''}" data-v="${m}" onclick="KB.pickChip(this,'method')">${m}</div>`).join('')}</div></div>`;

      let partyLabel = type==='payment' ? 'Paid To' : (type==='receive' ? 'Received From' : (type==='income' ? 'Received From' : 'Paid To'));

      let extra = '';
      if(type==='transfer'){
        extra = `
        <div class="kb-field"><label>From Account</label>
          <select id="f-from">${Object.keys(this.state.data.accounts).map(a=>`<option>${a}</option>`).join('')}</select>
        </div>
        <div class="kb-field"><label>To Account</label>
          <select id="f-to">${Object.keys(this.state.data.accounts).map((a,i)=>`<option ${i===1?'selected':''}>${a}</option>`).join('')}</select>
        </div>`;
        partyLabel = null; methodChips = '';
      }

      const partyField = partyLabel ? `<div class="kb-field"><label>${partyLabel}</label><input type="text" id="f-party" placeholder="Name of person / shop / company" value="${this.state.formParty||''}"></div>` : '';

      return `
        <div class="kb-sheet-handle"></div>
        <div class="kb-form-title"><h2 style="flex:1;">${titles[type]}</h2></div>
        <div class="kb-field">
          <label>Amount</label>
          <div class="kb-amount-input"><span class="cur">${this.state.data.profile.currency}</span><input type="number" id="f-amount" placeholder="0.00" autofocus></div>
        </div>
        ${extra}
        ${catChips}
        ${partyField}
        ${methodChips}
        <div class="kb-field"><label>Date</label><input type="date" id="f-date" value="${dateVal}"></div>
        <div class="kb-field"><label>Notes (optional)</label><textarea id="f-notes" rows="2" placeholder="Add a note..."></textarea></div>
        <button class="kb-btn" onclick="KB.submitForm()">${type==='payment'?'PAY / RECORD PAYMENT': type==='receive' ? 'RECORD RECEIVED' : 'SAVE'}</button>
      `;
    },

    pickChip(el, field){
      const parent = el.parentElement;
      parent.querySelectorAll('.kb-chip').forEach(c=>c.classList.remove('sel'));
      el.classList.add('sel');
      if(field==='category') this.state.selectedCategory = el.dataset.v;
      if(field==='method') this.state.selectedMethod = el.dataset.v;
    },

    submitForm(){
      const type = this.state.currentForm;
      if (type === 'member') {
        const name = document.getElementById('f-member-name').value.trim();
        if(!name){ this.toast('Please enter a name'); return; }
        const designation = document.getElementById('f-member-designation').value.trim();
        const address = document.getElementById('f-member-address').value.trim();
        const mobile = document.getElementById('f-member-mobile').value.trim();
        const mnotes = document.getElementById('f-member-notes').value.trim();
        this.state.data.members.push({ id: Date.now(), name, designation, address, mobile, notes: mnotes });
        this.save();
        this.closeAllSheets();
        this.toast('Member added');
        this.go('members');
        return;
      }
      
      const amtEl = document.getElementById('f-amount');
      const amount = amtEl ? parseFloat(amtEl.value) : 0;
      if(!amount || amount<=0){ this.toast('Please enter a valid amount'); return; }
      const dateInput = document.getElementById('f-date').value;
      const notes = document.getElementById('f-notes') ? document.getElementById('f-notes').value : '';
      const ts = dateInput ? new Date(dateInput).getTime() + (Date.now() % 86400000) : Date.now();
      const d = this.state.data;

      if(type==='expense'){
        const cat = this.state.selectedCategory || 'Other';
        const party = document.getElementById('f-party').value.trim() || cat;
        const method = this.state.selectedMethod;
        this.addTxn({type:'Expense', amount, category:cat, party, method, notes, ts});
        d.accounts[method] = (d.accounts[method]||0) - amount;
      }
      else if(type==='income'){
        const cat = this.state.selectedCategory || 'Other';
        const party = document.getElementById('f-party').value.trim() || cat;
        const method = this.state.selectedMethod;
        this.addTxn({type:'Income', amount, category:cat, party, method, notes, ts});
        d.accounts[method] = (d.accounts[method]||0) + amount;
      }
      else if(type==='payment'){
        const party = document.getElementById('f-party').value.trim() || 'Unknown';
        const method = this.state.selectedMethod;
        const txn = this.addTxn({type:'Payment', amount, category:'Payment', party, method, notes, ts});
        d.accounts[method] = (d.accounts[method]||0) - amount;
        this.state.lastSuccess = txn;
        this.showSuccess(txn, 'Payment Recorded');
        return;
      }
      else if(type==='receive'){
        const party = document.getElementById('f-party').value.trim() || 'Unknown';
        const method = this.state.selectedMethod;
        const txn = this.addTxn({type:'Receive', amount, category:'Receive', party, method, notes, ts});
        d.accounts[method] = (d.accounts[method]||0) + amount;
        this.save(); this.closeAllSheets(); this.toast('Money received recorded'); this.go('home');
        return;
      }
      else if(type==='transfer'){
        const from = document.getElementById('f-from').value;
        const to = document.getElementById('f-to').value;
        if(from===to){ this.toast('Choose two different accounts'); return; }
        d.accounts[from] = (d.accounts[from]||0) - amount;
        d.accounts[to] = (d.accounts[to]||0) + amount;
        this.addTxn({type:'Transfer', amount, category:'Transfer', party:`${from} → ${to}`, method:from, notes, ts});
        this.save(); this.closeAllSheets(); this.toast('Transfer complete'); this.go('home');
        return;
      }

      this.save();
      this.closeAllSheets();
      this.toast('Saved successfully');
      this.go('home');
    },

    addTxn(t){
      t.id = 'tx_' + Date.now() + '_' + Math.floor(Math.random()*9999);
      this.state.data.transactions.push(t);
      return t;
    },

    showSuccess(txn, label){
      const body = document.getElementById('form-sheet-body');
      const dt = new Date(txn.ts);
      body.innerHTML = `
        <div class="kb-sheet-handle"></div>
        <div class="kb-success">
          <div class="tick">${I('check','lg')}</div>
          <p class="desc">${label}</p>
          <p class="amt">${this.fmt(txn.amount)}</p>
          <p class="desc">To: ${txn.party}</p>
          <p class="dt">${dt.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})} • ${dt.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</p>
          <div class="kb-receipt">
            <div class="r"><span class="k">Amount</span><span class="v">${this.fmt(txn.amount)}</span></div>
            <div class="r"><span class="k">To</span><span class="v">${txn.party}</span></div>
            <div class="r"><span class="k">Method</span><span class="v">${txn.method}</span></div>
            <div class="r"><span class="k">Transaction ID</span><span class="v">KB${txn.id.slice(-8).toUpperCase()}</span></div>
          </div>
          <button class="kb-btn" onclick="KB.finishSuccess()">DONE</button>
          <button class="kb-btn outline" onclick="KB.finishSuccess(); KB.openDetails('${txn.id}')" style="margin-top:8px;">VIEW DETAILS</button>
        </div>
      `;
      this.save();
    },
    finishSuccess(){ this.closeAllSheets(); this.go('home'); },

    // ---------- TRANSACTIONS LIST ----------
    renderTransactions(){
      const d = this.state.data;
      document.querySelectorAll('#tx-tabs .kb-tab').forEach(t=>{
        t.onclick = ()=>{ this.state.txFilter = t.dataset.v; document.querySelectorAll('#tx-tabs .kb-tab').forEach(x=>x.classList.remove('sel')); t.classList.add('sel'); this.renderTransactions(); };
        t.classList.toggle('sel', t.dataset.v===this.state.txFilter);
      });
      const q = (document.getElementById('tx-search').value || '').toLowerCase();
      let list = [...d.transactions].sort((a,b)=>b.ts-a.ts);
      if(this.state.txFilter!=='ALL') list = list.filter(t=>t.type===this.state.txFilter);
      if(q) list = list.filter(t=> (t.party||'').toLowerCase().includes(q) || (t.category||'').toLowerCase().includes(q));
      const box = document.getElementById('tx-list');
      box.innerHTML = '';
      if(list.length===0){ box.innerHTML = '<div class="kb-empty"><div class="e-ic">'+I('search','lg')+'</div>No transactions found.</div>'; return; }
      list.forEach(t=> box.appendChild(this.txnRow(t)));
    },

    openDetails(id){
      this.state.selectedTxnId = id;
      this.go('details');
    },
    renderDetails(){
      const t = this.state.data.transactions.find(x=>x.id===this.state.selectedTxnId);
      if(!t) return;
      const dt = new Date(t.ts);
      const body = document.getElementById('detail-body');
      body.innerHTML = `
        <div class="kb-detail-row"><span class="k">Amount</span><span class="v">${this.fmt(t.amount)}</span></div>
        <div class="kb-detail-row"><span class="k">Type</span><span class="v">${t.type}</span></div>
        <div class="kb-detail-row"><span class="k">${t.type==='Income'||t.type==='Receive'?'From':'Paid To'}</span><span class="v">${t.party||'-'}</span></div>
        <div class="kb-detail-row"><span class="k">Category</span><span class="v">${t.category||'-'}</span></div>
        <div class="kb-detail-row"><span class="k">Payment Method</span><span class="v">${t.method||'-'}</span></div>
        <div class="kb-detail-row"><span class="k">Date & Time</span><span class="v">${dt.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}, ${dt.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</span></div>
        <div class="kb-detail-row"><span class="k">Note</span><span class="v">${t.notes || '—'}</span></div>
      `;
    },
    deleteTransaction(id){
      const d = this.state.data;
      const idx = d.transactions.findIndex(t=>t.id===id);
      if(idx<0) return;
      const t = d.transactions[idx];
      // reverse balance effect
      if(t.type==='Expense' || t.type==='Payment') d.accounts[t.method] = (d.accounts[t.method]||0) + t.amount;
      if(t.type==='Income' || t.type==='Receive') d.accounts[t.method] = (d.accounts[t.method]||0) - t.amount;
      d.transactions.splice(idx,1);
      this.save();
      this.toast('Transaction deleted');
      this.go('transactions');
    },
    shareReceipt(id){
      this.toast('Receipt ready to share (prototype)');
    },

    // ---------- MEMBERS ----------
    renderMembers(){
      const d = this.state.data;
      const box = document.getElementById('members-list');
      if (!box) return;
      box.innerHTML = '';
      if(!d.members || d.members.length===0){
        box.innerHTML = `<div class="kb-empty"><div class="e-ic">${I('users','lg')}</div>No members added yet.</div>`;
        return;
      }
      d.members.forEach(m => {
        const row = document.createElement('div');
        row.className = 'kb-party-row'; 
        row.innerHTML = `
          <div class="av2">${m.name.charAt(0).toUpperCase()}</div>
          <div class="info">
            <p class="n" style="margin-bottom:2px;">${m.name}</p>
            <p class="d" style="font-size:12px;">${m.designation || 'No Designation'}</p>
            <p class="d" style="font-size:11px; color:var(--muted-2); margin-top:2px;">${m.address || ''}</p>
          </div>
          <div class="side" style="text-align:right;">
            <div style="font-size:11px;color:var(--blue); font-weight:600;">${m.mobile||''}</div>
          </div>
        `;
        box.appendChild(row);
      });
    },

    // ---------- BUDGET ----------
    openBudgetForm(){
      const body = document.getElementById('form-sheet-body');
      const d = this.state.data;
      body.innerHTML = `
        <div class="kb-sheet-handle"></div>
        <div class="kb-form-title"><h2 style="flex:1;">Set Budget</h2></div>
        <div class="kb-field"><label>Monthly Budget Total</label>
          <div class="kb-amount-input"><span class="cur">${d.profile.currency}</span><input type="number" id="bud-total" value="${d.budgets.monthly||''}" placeholder="0"></div>
        </div>
        <div class="kb-sect-head"><h3>Category Limits</h3></div>
        ${CATS.filter(c=>c.n!=='Salary').map(c=>`
          <div class="kb-field"><label style="display:flex;align-items:center;gap:6px;">${I(c.ic,'sm')} ${c.n}</label>
          <input type="number" id="bud-cat-${c.n}" value="${d.budgets.categories[c.n]||''}" placeholder="0"></div>
        `).join('')}
        <button class="kb-btn" onclick="KB.saveBudget()">SAVE BUDGET</button>
      `;
      document.getElementById('form-sheet-overlay').classList.add('active');
    },
    saveBudget(){
      const d = this.state.data;
      d.budgets.monthly = parseFloat(document.getElementById('bud-total').value) || 0;
      CATS.filter(c=>c.n!=='Salary').forEach(c=>{
        const v = parseFloat(document.getElementById('bud-cat-'+c.n).value) || 0;
        if(v>0) d.budgets.categories[c.n] = v; else delete d.budgets.categories[c.n];
      });
      this.save();
      this.closeAllSheets();
      this.toast('Budget saved');
      this.go('budget');
    },
    renderBudget(){
      const d = this.state.data;
      const spentByCat = {};
      let totalSpent = 0;
      d.transactions.forEach(t=>{
        if(t.type==='Expense'){ spentByCat[t.category] = (spentByCat[t.category]||0) + t.amount; totalSpent += t.amount; }
      });
      document.getElementById('bg-total').textContent = this.fmt(d.budgets.monthly);
      document.getElementById('bg-spent').textContent = this.fmt(totalSpent);
      document.getElementById('bg-remaining').textContent = this.fmt(Math.max(d.budgets.monthly - totalSpent,0));
      const pct = d.budgets.monthly>0 ? Math.min((totalSpent/d.budgets.monthly)*100,100) : 0;
      const fill = document.getElementById('bg-progress-fill');
      fill.style.width = pct+'%';
      fill.className = 'fill' + (pct>=100?' over':(pct>=80?' warn':''));

      const box = document.getElementById('bg-categories');
      box.innerHTML = '';
      const catEntries = Object.entries(d.budgets.categories);
      if(catEntries.length===0){ box.innerHTML = '<div class="kb-empty">No category budgets set yet.</div>'; return; }
      catEntries.forEach(([cat,limit])=>{
        const spent = spentByCat[cat]||0;
        const p = Math.min((spent/limit)*100,100);
        const row = document.createElement('div');
        row.className = 'kb-bar-row';
        row.innerHTML = `<div class="top"><span class="c">${this.catIcon(cat)} ${cat}</span><span class="v">${this.fmt(spent)} / ${this.fmt(limit)}</span></div>
          <div class="kb-bar-track"><div class="kb-bar-fill" style="width:${p}%;background:${p>=100?'var(--red)':(p>=80?'var(--amber)':'var(--green)')};"></div></div>`;
        box.appendChild(row);
      });
    },

    // ---------- ACCOUNTS ----------
    renderAccounts(){
      const d = this.state.data;
      const icons = {Cash:I('cash'), Bank:I('bank'), UPI:I('phone'), Wallet:I('wallet')};
      const box = document.getElementById('acc-list');
      box.innerHTML = '';
      Object.entries(d.accounts).forEach(([name,bal])=>{
        const card = document.createElement('div');
        card.className = 'kb-card';
        card.style.display='flex'; card.style.alignItems='center'; card.style.gap='14px';
        card.innerHTML = `<div style="width:44px;height:44px;border-radius:12px;background:var(--bg);display:flex;align-items:center;justify-content:center;color:var(--blue);">${icons[name]||I('wallet')}</div>
          <div style="flex:1;"><p style="font-size:13.5px;font-weight:700;margin:0;">${name}</p></div>
          <p style="font-size:16px;font-weight:800;margin:0;">${this.fmt(bal)}</p>`;
        box.appendChild(card);
      });
    },

    // ---------- REPORTS ----------
    renderReports(){
      const d = this.state.data;
      const totals = this.computeTotals();
      document.getElementById('rp-income').textContent = this.fmt(totals.income);
      document.getElementById('rp-expense').textContent = this.fmt(totals.expense);
      document.getElementById('rp-savings').textContent = this.fmt(totals.income - totals.expense);

      const spentByCat = {};
      d.transactions.forEach(t=>{ if(t.type==='Expense') spentByCat[t.category]=(spentByCat[t.category]||0)+t.amount; });
      const box = document.getElementById('rp-categories');
      box.innerHTML = '';
      const entries = Object.entries(spentByCat).sort((a,b)=>b[1]-a[1]);
      if(entries.length===0){ box.innerHTML = '<div class="kb-empty">No expenses recorded yet.</div>'; }
      else {
        const max = entries[0][1];
        entries.forEach(([cat,amt])=>{
          const row = document.createElement('div');
          row.className = 'kb-bar-row';
          row.innerHTML = `<div class="top"><span class="c">${this.catIcon(cat)} ${cat}</span><span class="v">${this.fmt(amt)}</span></div>
            <div class="kb-bar-track"><div class="kb-bar-fill" style="width:${(amt/max)*100}%;background:var(--blue);"></div></div>`;
          box.appendChild(row);
        });
      }

      const insights = [];
      if(entries.length>0) insights.push(`${entries[0][0]} is your highest expense category at ${this.fmt(entries[0][1])}.`);
      if(totals.income>0) insights.push(`You've saved ${this.fmt(totals.income-totals.expense)} so far (${Math.round(((totals.income-totals.expense)/totals.income)*100)}% of income).`);
      if(insights.length===0) insights.push('Add a few transactions to start seeing personalized insights here.');
      const ibox = document.getElementById('rp-insights');
      ibox.innerHTML = '';
      insights.forEach(i=>{
        const c = document.createElement('div');
        c.className = 'kb-card';
        c.style.padding='12px 14px';
        c.innerHTML = `<div style="display:flex;gap:10px;align-items:flex-start;color:var(--amber);">${I('bulb')}<p style="font-size:12.5px;margin:0;color:var(--ink);">${i}</p></div>`;
        ibox.appendChild(c);
      });
    },

    // ---------- PROFILE ----------
    renderProfile(){
      const d = this.state.data;
      document.getElementById('pf-name').textContent = d.profile.name;
      document.getElementById('pf-mobile').textContent = d.profile.mobile || '—';
      document.getElementById('pf-avatar').textContent = (d.profile.name||'?').charAt(0).toUpperCase();
    },
    async exportData(){
      const blob = JSON.stringify(this.state.data, null, 2);
      try{
        await navigator.clipboard.writeText(blob);
        this.toast('Data copied to clipboard as JSON');
      }catch(e){
        this.toast('Export ready (clipboard unavailable in this view)');
      }
    },
    resetData(){
      if(!confirm('This will erase all Kharch Book data on this device. Continue?')) return;
      this.state.data = null;
      window.storage.delete(STORAGE_KEY, false).catch(()=>{});
      this.showScreenOnly('setup');
      document.getElementById('su-name').value='';
      document.getElementById('su-mobile').value='';
      document.getElementById('su-opening').value='';
    },

    // ---------- NOTIFICATIONS ----------
    renderNotifications(){
      const d = this.state.data;
      const items = [];
      Object.entries(d.budgets.categories).forEach(([cat,limit])=>{
        const spent = d.transactions.filter(t=>t.type==='Expense'&&t.category===cat).reduce((s,t)=>s+t.amount,0);
        const pct = (spent/limit)*100;
        if(pct>=100) items.push({ic:'bell', col:'var(--red)', t:'Budget Exceeded', d:`Your ${cat} budget has exceeded by ${this.fmt(spent-limit)}.`});
        else if(pct>=80) items.push({ic:'bell', col:'var(--amber)', t:'Budget Warning', d:`You've spent ${Math.round(pct)}% of your ${cat} budget.`});
      });
      if(items.length===0) items.push({ic:'check', col:'var(--green)', t:'All caught up', d:'No alerts right now — keep tracking your expenses!'});
      const box = document.getElementById('notif-list');
      box.innerHTML = '';
      items.forEach(i=>{
        const c = document.createElement('div');
        c.className = 'kb-card';
        c.style.display='flex'; c.style.gap='12px'; c.style.alignItems='flex-start';
        c.innerHTML = `<div style="color:${i.col};">${I(i.ic)}</div><div><p style="font-size:13px;font-weight:700;margin:0 0 3px;">${i.t}</p><p style="font-size:12px;color:var(--muted);margin:0;">${i.d}</p></div>`;
        box.appendChild(c);
      });
    },

    // ---------- SEARCH ----------
    globalSearch(){
      const q = document.getElementById('gs-input').value.trim().toLowerCase();
      const box = document.getElementById('gs-results');
      box.innerHTML = '';
      if(!q){ return; }
      const d = this.state.data;
      const txns = d.transactions.filter(t=> (t.party||'').toLowerCase().includes(q) || (t.category||'').toLowerCase().includes(q));
      const members = d.members ? d.members.filter(m=>m.name.toLowerCase().includes(q)) : [];
      if(members.length){
        const h = document.createElement('p'); h.className='kb-link'; h.style.margin='6px 0'; h.textContent='Members'; box.appendChild(h);
        members.forEach(m=>{
          const row = document.createElement('div');
          row.className='kb-party-row';
          row.onclick = ()=>this.go('members');
          row.innerHTML = `<div class="av2">${m.name.charAt(0).toUpperCase()}</div><div class="info"><p class="n">${m.name}</p><p class="d">${m.designation||''}</p></div>`;
          box.appendChild(row);
        });
      }
      if(txns.length){
        const h = document.createElement('p'); h.className='kb-link'; h.style.margin='10px 0 6px'; h.textContent='Transactions'; box.appendChild(h);
        txns.slice(0,15).forEach(t=> box.appendChild(this.txnRow(t)));
      }
      if(!members.length && !txns.length){ box.innerHTML = '<div class="kb-empty">No results found.</div>'; }
    }
  };

  window.KB = KB;

  // hook detail render into go()
  const origGo = KB.go.bind(KB);
  KB.go = function(screen){ origGo(screen); if(screen==='details') this.renderDetails(); };

  KB.init();
  })();

