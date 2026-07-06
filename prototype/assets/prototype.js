const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const money = new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' });

const products = [
  {
    id: 'bolt-a',
    name: 'M8x30 42CrMo 国标一级螺栓',
    merchant: '华东紧固件工厂',
    price: 0.82,
    freight: 120,
    tax: 0.13,
    stock: 98000,
    days: 3,
    quality: 96,
    cert: '国标证书 + 第三方检测',
    location: '苏州仓',
  },
  {
    id: 'bolt-b',
    name: 'M8 30mm 合金钢外六角螺丝',
    merchant: '永固五金批发',
    price: 0.76,
    freight: 180,
    tax: 0.13,
    stock: 42000,
    days: 5,
    quality: 88,
    cert: '质检报告齐全',
    location: '无锡仓',
  },
  {
    id: 'bolt-c',
    name: '42CrMo 高强度螺栓 M8*30',
    merchant: '鑫诚工业配件',
    price: 0.69,
    freight: 260,
    tax: 0.06,
    stock: 120000,
    days: 9,
    quality: 72,
    cert: '基础质检',
    location: '临沂仓',
  },
];

const cart = new Map();

function toast(message) {
  let node = $('.toast');
  if (!node) {
    node = document.createElement('div');
    node.className = 'toast';
    document.body.append(node);
  }
  node.textContent = message;
  node.classList.add('is-show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove('is-show'), 1800);
}

function openModal(id) {
  const modal = document.getElementById(id);
  modal?.classList.add('is-open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal?.classList.remove('is-open');
}

function bindModalClose() {
  $$('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
  });
  $$('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.classList.remove('is-open');
    });
  });
}

function bindTabs(containerSelector, linkSelector, pageSelector) {
  const container = $(containerSelector);
  if (!container) return;
  const links = $$(linkSelector, container);
  const pages = $$(pageSelector);
  links.forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.dataset.target;
      links.forEach((item) => item.classList.toggle('is-active', item === link));
      pages.forEach((page) => page.classList.toggle('is-active', page.id === target));
    });
  });
}

function renderCompare(sort = 'best') {
  const list = $('#compareList');
  if (!list) return;
  const avg = products.reduce((sum, item) => sum + item.price, 0) / products.length;
  const scored = products.map((item) => {
    const unitScore = Math.max(0, (1 - item.price / avg) * 100);
    const score = Math.round(item.quality * 0.6 + unitScore * 0.4);
    return { ...item, score, landed: item.price * (1 + item.tax) + item.freight / Math.max(item.stock, 1) };
  });
  scored.sort((a, b) => {
    if (sort === 'price') return a.landed - b.landed;
    if (sort === 'quality') return b.quality - a.quality;
    if (sort === 'near') return a.days - b.days;
    return b.score - a.score;
  });
  list.innerHTML = scored.map((item, index) => `
    <article class="product-card ${index === 0 ? 'is-best' : ''}">
      <div>
        <h3>${index === 0 ? '最优推荐 · ' : ''}${item.name}</h3>
        <div class="product-meta">
          <span class="tag tag--green">${item.merchant}</span>
          <span class="tag">${item.location}</span>
          <span class="tag">${item.cert}</span>
          <span class="tag">库存 ${item.stock.toLocaleString()} 件</span>
          <span class="tag">交货 ${item.days} 天</span>
        </div>
        <p style="color:var(--ink-2);line-height:1.65;margin:12px 0 0;">
          含税综合单价 ${money.format(item.landed)} / 件，已纳入单价、税费、分摊运费；适配 42CrMo / M8x30 / 国标一级条件。
        </p>
      </div>
      <div class="score">
        <strong>${item.score}</strong>
        <span>综合分</span>
        <button class="btn btn--primary" data-add-cart="${item.id}" style="margin-top:12px;">加入</button>
      </div>
    </article>
  `).join('');
}

function updateCartBar() {
  const count = [...cart.values()].reduce((sum, item) => sum + item.qty, 0);
  const total = [...cart.values()].reduce((sum, item) => sum + item.qty * item.price, 0);
  const text = $('#cartSummary');
  if (text) text.textContent = `${count} 件商品 · 预估货款 ${money.format(total)}`;
}

function initBuyer() {
  bindTabs('.mobile-nav', '[data-target]', '.mobile-page');
  renderCompare();
  updateCartBar();

  $$('[data-mobile-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nav = $(`.mobile-nav [data-target="${btn.dataset.mobileTarget}"]`);
      nav?.click();
    });
  });

  $('#voiceBtn')?.addEventListener('click', () => {
    const btn = $('#voiceBtn');
    const output = $('#voiceOutput');
    btn.classList.add('is-recording');
    output.textContent = '正在识别：我要螺栓，材质 42CrMo，国标一级，交货 7 天内，先要 2 万件...';
    setTimeout(() => {
      btn.classList.remove('is-recording');
      output.textContent = '已解析：品类=螺栓；型号=M8x30；材质=42CrMo；质量=国标一级；数量=20000件；交期≤7天。';
      toast('AI 已生成采购参数，可发起公海比价');
    }, 1100);
  });

  $('#ocrBtn')?.addEventListener('click', () => {
    $('#voiceOutput').textContent = 'OCR 识别采购单：M8x30 高强螺栓 20000件，42CrMo，需质检报告，可开票。';
    toast('采购单已识别');
  });

  $('#runCompare')?.addEventListener('click', () => {
    $('.mobile-nav [data-target="buyer-compare"]')?.click();
    renderCompare();
    toast('已从公海池匹配 3 个可比价报价');
  });

  $('#sortMode')?.addEventListener('change', (event) => renderCompare(event.target.value));

  document.addEventListener('click', (event) => {
    const add = event.target.closest('[data-add-cart]');
    if (add) {
      const item = products.find((p) => p.id === add.dataset.addCart);
      const old = cart.get(item.id) || { ...item, qty: 0 };
      old.qty += 1000;
      cart.set(item.id, old);
      updateCartBar();
      toast(`${item.merchant} 已加入购物车 1000 件`);
    }
  });

  $('#checkoutBtn')?.addEventListener('click', () => {
    $('#checkoutLines').innerHTML = [...cart.values()].map((item) => `
      <tr><td>${item.name}<br><span class="tag">${item.merchant}</span></td><td>${item.qty.toLocaleString()} 件</td><td>${money.format(item.qty * item.price)}</td></tr>
    `).join('') || '<tr><td colspan="3">购物车为空，请先加入报价。</td></tr>';
    openModal('checkoutModal');
  });

  $('#payBtn')?.addEventListener('click', () => {
    closeModal('checkoutModal');
    cart.clear();
    updateCartBar();
    $('.mobile-nav [data-target="buyer-orders"]')?.click();
    toast('支付成功，系统已拆分子订单并进入分账队列');
  });
}

function initMerchant() {
  bindTabs('.sidebar', '[data-target]', '.page');

  $('#publishProduct')?.addEventListener('click', () => {
    const name = $('#productName').value.trim();
    if (!name) return toast('请填写商品名称');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${name}<br><span class="tag">待平台审核</span></td><td>${$('#productSpec').value || '待补充'}</td><td>${$('#productPrice').value || '-'} 元</td><td><span class="tag tag--amber">待标准化</span></td><td><button class="btn btn--ghost">编辑</button></td>`;
    $('#merchantProducts tbody').prepend(row);
    toast('商品已提交，待平台审核后进入公海池');
  });

  $$('[id="importExcel"]').forEach((btn) => btn.addEventListener('click', () => {
    toast('已模拟导入 18 条商品，其中 3 条需要补充规格');
  }));

  $$('[data-ship]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('tr').querySelector('[data-status]').textContent = '已发货';
      btn.closest('tr').querySelector('[data-status]').className = 'tag tag--green';
      toast('物流单号已录入，买家端订单状态同步更新');
    });
  });

  $('#withdrawBtn')?.addEventListener('click', () => toast('提现申请已提交，平台财务待审核'));
}

function initAdmin() {
  bindTabs('.sidebar', '[data-target]', '.page');

  $$('[data-approve]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      row.querySelector('[data-review-status]').textContent = btn.dataset.approve === 'yes' ? '已通过' : '已驳回';
      row.querySelector('[data-review-status]').className = btn.dataset.approve === 'yes' ? 'tag tag--green' : 'tag tag--red';
      toast(btn.dataset.approve === 'yes' ? '商家已开通上架权限' : '已发送驳回原因');
    });
  });

  $$('[id="standardizeBtn"]').forEach((btn) => btn.addEventListener('click', () => {
    $('#standardizeResult').innerHTML = `
      <span class="tag tag--green">已匹配 SPU：高强螺栓</span>
      <span class="tag">SKU：M8x30 / 42CrMo / 国标一级</span>
      <span class="tag">单位：件</span>
      <span class="tag">别名：外六角螺丝、六角螺栓</span>
    `;
    toast('标准化规则已应用，可同步到公海池');
  }));

  const quality = $('#qualityWeight');
  const price = $('#priceWeight');
  const qualityText = $('#qualityWeightText');
  const priceText = $('#priceWeightText');
  function syncWeights(changed) {
    if (!quality || !price) return;
    if (changed === 'quality') price.value = 100 - Number(quality.value);
    if (changed === 'price') quality.value = 100 - Number(price.value);
    qualityText.textContent = `${quality.value}%`;
    priceText.textContent = `${price.value}%`;
  }
  quality?.addEventListener('input', () => syncWeights('quality'));
  price?.addEventListener('input', () => syncWeights('price'));
  $('#saveWeights')?.addEventListener('click', () => toast('比价权重已保存，下一次搜索实时生效'));

  $('#exportFinance')?.addEventListener('click', () => toast('已生成分账对账 Excel'));
}

function initIndex() {
  $$('.directory-card[data-open]').forEach((card) => {
    card.addEventListener('click', () => window.open(card.dataset.open, '_blank'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindModalClose();
  const page = document.body.dataset.page;
  if (page === 'buyer') initBuyer();
  if (page === 'merchant') initMerchant();
  if (page === 'admin') initAdmin();
  if (page === 'index') initIndex();
});
