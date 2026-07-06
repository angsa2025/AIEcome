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
    category: '五金紧固件',
    visual: 'M8',
    specs: ['1000件/箱', '5000件/托', '20000件/批'],
    desc: '国标一级高强螺栓，含质检报告，适合机械装配和工业维修。',
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
    category: '五金紧固件',
    visual: 'M8',
    specs: ['500件/箱', '2000件/箱', '10000件/批'],
    desc: '合金钢外六角螺丝，库存稳定，可开增值税专票。',
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
    category: '五金紧固件',
    visual: '42',
    specs: ['1000件/包', '10000件/批', '50000件/车'],
    desc: '高强度螺栓大货报价，适合成本优先型采购。',
  },
];

const cart = new Map();
let selectedProductId = products[0].id;
let selectedQty = 1000;
let selectedSpec = products[0].specs[0];

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

function showAdminAction(title, bodyHtml, confirmText = '保存', onConfirm = null) {
  const modal = $('#adminActionModal');
  const titleNode = $('#adminActionTitle');
  const bodyNode = $('#adminActionBody');
  const confirm = $('#adminActionConfirm');
  if (!modal || !titleNode || !bodyNode || !confirm) return;
  titleNode.textContent = title;
  bodyNode.innerHTML = bodyHtml;
  confirm.textContent = confirmText;
  confirm.onclick = () => {
    if (typeof onConfirm === 'function') onConfirm();
    closeModal('adminActionModal');
  };
  openModal('adminActionModal');
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

function showBuyerPage(target) {
  const navTargetMap = {
    'buyer-product-detail': 'buyer-products',
    'buyer-checkout': 'buyer-cart',
    'buyer-aftersale': 'buyer-orders',
    'buyer-compare': 'buyer-products',
  };
  $$('.mobile-page').forEach((page) => page.classList.toggle('is-active', page.id === target));
  $$('.mobile-nav [data-target]').forEach((item) => {
    const activeTarget = navTargetMap[target] || target;
    item.classList.toggle('is-active', item.dataset.target === activeTarget);
  });
  if (target === 'buyer-cart') renderCart();
  if (target === 'buyer-checkout') renderCheckoutPage();
  $('.buyer-screen')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function addToCart(id, qty = 1000) {
  const item = products.find((p) => p.id === id);
  if (!item) return;
  const old = cart.get(item.id) || { ...item, qty: 0, spec: selectedSpec || item.specs[0] };
  old.qty += qty;
  old.spec = selectedSpec || old.spec || item.specs[0];
  cart.set(item.id, old);
  updateCartBar();
  renderCart();
  toast(`${item.merchant} 已加入购物车 ${qty.toLocaleString()} 件`);
}

function renderProductShelf() {
  const shelf = $('#productShelf');
  if (!shelf) return;
  shelf.innerHTML = products.map((item) => `
    <article class="buyer-product-tile">
      <button class="buyer-product-thumb" data-view-product="${item.id}" type="button">${item.visual}</button>
      <div class="buyer-product-info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="product-meta">
          <span class="tag tag--green">${item.category}</span>
          <span class="tag">${item.location}</span>
          <span class="tag">库存 ${item.stock.toLocaleString()} 件</span>
        </div>
        <div class="buyer-product-bottom">
          <strong>${money.format(item.price)} / 件</strong>
          <div>
            <button class="btn" data-add-cart="${item.id}" type="button">加购</button>
            <button class="btn btn--primary" data-buy-now="${item.id}" type="button">购买</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

function openProductDetail(id) {
  const item = products.find((p) => p.id === id) || products[0];
  selectedProductId = item.id;
  selectedQty = 1000;
  selectedSpec = item.specs[0];
  $('#detailVisual').textContent = item.visual;
  $('#detailTitle').textContent = item.name;
  $('#detailPrice').textContent = `${money.format(item.price)} / 件`;
  $('#detailDesc').textContent = item.desc;
  $('#detailQty').textContent = selectedQty.toLocaleString();
  $('#detailMeta').innerHTML = `
    <span class="tag tag--green">${item.merchant}</span>
    <span class="tag">${item.location}</span>
    <span class="tag">${item.cert}</span>
    <span class="tag">交货 ${item.days} 天</span>
  `;
  $('#detailSpecs').innerHTML = item.specs.map((spec, index) => `
    <button class="${index === 0 ? 'is-active' : ''}" data-spec="${spec}" type="button">${spec}</button>
  `).join('');
  showBuyerPage('buyer-product-detail');
}

function renderCart() {
  const lines = $('#cartLines');
  if (!lines) return;
  const items = [...cart.values()];
  if (!items.length) {
    lines.innerHTML = '<div class="buyer-empty">购物车为空，先去商品货架选购或从比价结果加购。</div>';
    return;
  }
  lines.innerHTML = items.map((item) => `
    <div class="buyer-cart-line">
      <div>
        <strong>${item.name}</strong>
        <span>${item.merchant} · ${item.spec || item.specs?.[0] || '标准包装'}</span>
      </div>
      <div>
        <strong>${item.qty.toLocaleString()} 件</strong>
        <span>${money.format(item.qty * item.price)}</span>
      </div>
    </div>
  `).join('');
}

function renderCheckoutPage() {
  const items = [...cart.values()];
  const lines = $('#checkoutPageLines');
  if (!lines) return;
  if (!items.length) {
    lines.innerHTML = '<div class="buyer-empty">暂无待下单商品。</div>';
  } else {
    lines.innerHTML = items.map((item) => `
      <div class="buyer-order-line">
        <div>
          <strong>${item.name}</strong>
          <span>${item.merchant} · ${item.qty.toLocaleString()} 件</span>
        </div>
        <strong>${money.format(item.qty * item.price)}</strong>
      </div>
    `).join('');
  }
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const freight = items.length ? items.reduce((sum, item) => sum + item.freight, 0) : 0;
  $('#checkoutSubtotal').textContent = money.format(subtotal);
  $('#checkoutFreight').textContent = money.format(freight);
  $('#checkoutTotal').textContent = money.format(subtotal + freight);
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
  $$('.mobile-nav [data-target]').forEach((link) => {
    link.addEventListener('click', () => showBuyerPage(link.dataset.target));
  });
  renderCompare();
  renderProductShelf();
  renderCart();
  updateCartBar();

  $$('[data-mobile-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      showBuyerPage(btn.dataset.mobileTarget);
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
    showBuyerPage('buyer-compare');
    renderCompare();
    toast('已从公海池匹配 3 个可比价报价');
  });

  $('#sortMode')?.addEventListener('change', (event) => renderCompare(event.target.value));

  document.addEventListener('click', (event) => {
    const view = event.target.closest('[data-view-product]');
    if (view) {
      openProductDetail(view.dataset.viewProduct);
      return;
    }

    const buy = event.target.closest('[data-buy-now]');
    if (buy) {
      selectedSpec = products.find((p) => p.id === buy.dataset.buyNow)?.specs?.[0] || selectedSpec;
      addToCart(buy.dataset.buyNow, 1000);
      showBuyerPage('buyer-checkout');
      return;
    }

    const add = event.target.closest('[data-add-cart]');
    if (add) {
      addToCart(add.dataset.addCart, 1000);
      return;
    }

    const spec = event.target.closest('[data-spec]');
    if (spec) {
      selectedSpec = spec.dataset.spec;
      $$('#detailSpecs [data-spec]').forEach((btn) => btn.classList.toggle('is-active', btn === spec));
    }
  });

  $('#checkoutBtn')?.addEventListener('click', () => {
    renderCheckoutPage();
    showBuyerPage('buyer-checkout');
  });

  $('#cartCheckoutBtn')?.addEventListener('click', () => {
    renderCheckoutPage();
    showBuyerPage('buyer-checkout');
  });

  $('#qtyMinus')?.addEventListener('click', () => {
    selectedQty = Math.max(1000, selectedQty - 1000);
    $('#detailQty').textContent = selectedQty.toLocaleString();
  });

  $('#qtyPlus')?.addEventListener('click', () => {
    selectedQty += 1000;
    $('#detailQty').textContent = selectedQty.toLocaleString();
  });

  $('#detailAddCart')?.addEventListener('click', () => addToCart(selectedProductId, selectedQty));

  $('#detailBuyNow')?.addEventListener('click', () => {
    addToCart(selectedProductId, selectedQty);
    renderCheckoutPage();
    showBuyerPage('buyer-checkout');
  });

  $('#placeOrderBtn')?.addEventListener('click', () => {
    if (!cart.size) return toast('请先选择商品');
    cart.clear();
    updateCartBar();
    renderCart();
    showBuyerPage('buyer-orders');
    toast('下单支付成功，订单已进入商家履约流程');
  });

  $('#uploadEvidence')?.addEventListener('click', () => {
    $('#evidenceState').textContent = '已上传 3 张照片 + 1 份质检说明';
    toast('售后凭证已上传');
  });

  $('#submitAfterSale')?.addEventListener('click', () => {
    $('#afterSaleTimeline').innerHTML = `
      <div class="is-done"><strong>买家提交申请</strong><span>质量问题退货退款 · 凭证已上传</span></div>
      <div class="is-active"><strong>商家响应</strong><span>华东紧固件工厂需在 24 小时内处理</span></div>
      <div><strong>平台介入</strong><span>超时或争议时自动介入</span></div>
      <div><strong>退款/补发完成</strong><span>待商家确认方案</span></div>
    `;
    toast('售后申请已提交，已同步商家端和平台后台');
  });

  $('#payBtn')?.addEventListener('click', () => {
    closeModal('checkoutModal');
    cart.clear();
    updateCartBar();
    showBuyerPage('buyer-orders');
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

  $$('[data-after-accept]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const status = btn.closest('tr').querySelector('[data-after-status]');
      status.textContent = '已同意补发';
      status.className = 'tag tag--green';
      toast('售后方案已同步买家端，平台后台可追踪');
    });
  });

  $('#withdrawBtn')?.addEventListener('click', () => toast('提现申请已提交，平台财务待审核'));
}

function initAdmin() {
  bindTabs('.sidebar', '[data-target]', '.page');

  const setAdminPage = (target) => {
    const side = $(`.sidebar [data-target="${target}"]`);
    side?.click();
  };
  const rowTitle = (row) => row?.querySelector('strong')?.textContent?.trim() || row?.cells?.[0]?.textContent?.trim() || '当前记录';
  const setStatus = (node, text, className = 'tag tag--green') => {
    if (!node) return;
    node.textContent = text;
    node.className = className;
  };
  const setResultChip = (filter) => {
    let chip = filter.querySelector('.admin-result-chip');
    if (!chip) {
      chip = document.createElement('span');
      chip.className = 'admin-result-chip';
      filter.append(chip);
    }
    chip.textContent = `已筛出 ${Math.floor(Math.random() * 18) + 6} 条`;
  };
  const detailList = (items) => `<div class="admin-modal-list">${items.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>`;

  $$('[data-target]').forEach((btn) => {
    if (btn.closest('.sidebar')) return;
    btn.addEventListener('click', () => {
      setAdminPage(btn.dataset.target);
    });
  });

  $('#publishSelfProduct')?.addEventListener('click', () => {
    const name = $('#selfProductName')?.value?.trim() || '新自营商品';
    const table = $('#selfProductTable');
    if (table) {
      const row = document.createElement('tr');
      row.innerHTML = `<td><div class="admin-product-cell"><span>NEW</span><div><strong>${name}</strong><em>SKU：SELF-NEW-${Date.now().toString().slice(-4)}</em></div></div></td><td>AIEcome 自营<br><span class="text-muted">五金紧固件 / 螺栓</span></td><td>¥0.86</td><td>50,000</td><td>0</td><td><span class="tag tag--green">上架中</span></td><td><button class="btn btn--ghost">编辑</button> <button class="btn">下架</button></td>`;
      table.prepend(row);
    }
    toast('自营商品已发布并进入平台商品池');
  });

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

  $$('[data-open-detail]').forEach((btn) => btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    showAdminAction('商品详情', `
      ${detailList([
        ['商品', escapeHtml(rowTitle(row))],
        ['标准 SPU', 'SPU-BOLT-HIGH'],
        ['规格', 'M8x30 / 42CrMo / 国标一级'],
        ['报价', '3 家商家可比价，最低 ¥0.69'],
      ])}
      <div class="admin-modal-note">可在这里完成品牌、类目、SPU/SKU、质检报告和报价来源的统一校验。</div>
    `, '同步到商品池', () => toast('商品详情已同步展示到商品池'));
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

  $$('[data-admin-order-ship]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.textContent.trim() === '查看物流') {
        showAdminAction('物流进度', `
          ${detailList([
            ['订单', escapeHtml(btn.closest('tr')?.cells?.[0]?.textContent || '当前订单')],
            ['承运商', '顺丰重货'],
            ['物流单号', 'SF2026070608842'],
            ['当前节点', '苏州分拨中心已揽收'],
          ])}
        `, '确认');
        return;
      }
      const status = btn.closest('tr').querySelector('[data-admin-order-status]');
      status.textContent = '已发货';
      status.className = 'tag tag--green';
      btn.textContent = '查看物流';
      btn.classList.remove('btn--primary');
      toast('订单已标记发货，买家端订单状态同步更新');
    });
  });

  $$('[data-admin-after]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.textContent.trim() === '查看进度') {
        showAdminAction('售后履约进度', `
          ${detailList([
            ['工单', escapeHtml(btn.closest('tr')?.cells?.[0]?.textContent || '当前工单')],
            ['平台判定', '商家补发并承担物流费用'],
            ['买家通知', '已同步买家端售后详情'],
            ['履约 SLA', '48 小时内补发出库'],
          ])}
        `, '确认');
        return;
      }
      const status = btn.closest('tr').querySelector('[data-admin-after-status]');
      status.textContent = '平台判定补发';
      status.className = 'tag tag--green';
      btn.textContent = '查看进度';
      btn.classList.remove('btn--primary');
      toast('仲裁结果已通知买家与商家，并进入履约跟踪');
    });
  });

  $$('.admin-upload-grid div').forEach((box) => {
    box.addEventListener('click', () => {
      box.classList.add('is-uploaded');
      box.textContent = `${box.textContent.replace('已上传', '').trim()} 已上传`;
      toast('素材已上传并完成格式校验');
    });
  });

  $$('.admin-brand-list button').forEach((brand) => {
    brand.addEventListener('click', () => {
      $$('.admin-brand-list button').forEach((item) => item.classList.toggle('is-active', item === brand));
      toast(`已切换品牌：${brand.querySelector('strong')?.textContent || '商品品牌'}`);
    });
  });

  $$('.admin-tree-list div').forEach((category) => {
    category.addEventListener('click', () => {
      $$('.admin-tree-list div').forEach((item) => item.classList.toggle('is-active', item === category));
      toast(`已选择类目：${category.querySelector('strong')?.textContent || '商品类目'}`);
    });
  });

  $$('.admin-tabs button').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.admin-tabs button').forEach((item) => item.classList.toggle('is-active', item === tab));
      toast(`${tab.textContent.trim()}列表已刷新`);
    });
  });

  $$('#admin-engine input[type="checkbox"]').forEach((box) => {
    box.addEventListener('change', () => toast(box.checked ? '过滤规则已启用' : '过滤规则已停用'));
  });

  $('.admin-main')?.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn || btn.dataset.target || btn.dataset.approve || btn.dataset.adminOrderShip !== undefined || btn.dataset.adminAfter !== undefined || btn.dataset.openDetail !== undefined) return;
    if (btn.id === 'publishSelfProduct' || btn.id === 'standardizeBtn' || btn.id === 'saveWeights' || btn.id === 'saveAdminSettings') return;

    const text = btn.textContent.trim();
    const row = btn.closest('tr');
    const panel = btn.closest('.admin-panel');
    const promo = btn.closest('.admin-promo-list > div');

    if (text === '刷新') {
      $$('.admin-metric em').forEach((item, index) => {
        if (index === 0) item.textContent = '刚刚刷新 +19.2%';
      });
      toast('运营数据已刷新到最新状态');
      return;
    }

    if (text === '导出日报') {
      showAdminAction('导出日报', `
        ${detailList([
          ['统计范围', '今日 00:00 - 当前时间'],
          ['交易数据', 'GMV、订单、退款、售后、商家履约'],
          ['文件格式', 'Excel + PDF 摘要'],
        ])}
        <div class="admin-modal-note">导出后可直接发送给运营负责人复盘今日交易和履约异常。</div>
      `, '生成日报', () => toast('日报已生成，可在下载中心查看'));
      return;
    }

    if (text === '全部') {
      showAdminAction('全部待办', `
        <div class="admin-modal-timeline">
          <span>12 个自营 SKU 资料待补齐</span>
          <span>27 条商家商品需要标准化归集</span>
          <span>8 单接近发货 SLA</span>
          <span>11 个售后争议等待平台判定</span>
        </div>
      `, '进入订单中心', () => setAdminPage('admin-orders'));
      return;
    }

    if (text === '查看商品池') {
      setAdminPage('admin-pool');
      toast('已进入商品池管理');
      return;
    }

    if (text === '筛选' || text === '查询') {
      const filter = btn.closest('.admin-filter-row');
      if (filter) setResultChip(filter);
      toast(`${text}条件已应用，列表结果已更新`);
      return;
    }

    if (text === '新增品牌') {
      showAdminAction('新增商品品牌', `
        <div class="admin-modal-form">
          <label>品牌名称<input value="新工业品牌"></label>
          <label>品牌归属<select><option>平台自营</option><option>认证商家</option></select></label>
          <label>主营类目<input value="五金紧固件"></label>
          <label>排序权重<input value="80"></label>
        </div>
      `, '新增品牌', () => {
        const list = $('.admin-brand-list');
        const brand = document.createElement('button');
        brand.innerHTML = '<strong>新工业品牌</strong><span>0 SKU</span>';
        list?.append(brand);
        brand.addEventListener('click', () => {
          $$('.admin-brand-list button').forEach((item) => item.classList.toggle('is-active', item === brand));
          toast('已切换品牌：新工业品牌');
        });
        toast('品牌已新增，可继续维护商品列表');
      });
      return;
    }

    if (text === '类目配置') {
      showAdminAction('类目配置', `
        <div class="admin-modal-form">
          <label>一级类目<input value="五金紧固件"></label>
          <label>二级类目<input value="螺栓 / 螺母 / 垫片"></label>
          <label>属性模板<select><option>工业标准件模板</option><option>钢材板材模板</option></select></label>
          <label>比价字段<input value="材质、规格、强度等级、单位"></label>
        </div>
      `, '保存类目', () => toast('类目配置已保存，商品归集字段同步更新'));
      return;
    }

    if (text === '识别' && row) {
      row.classList.add('is-selected');
      const status = row.querySelector('.tag');
      setStatus(status, '可比价', 'tag tag--green');
      btn.textContent = '详情';
      btn.classList.add('btn--primary');
      toast('AI 已识别规格、单位和标准 SPU');
      return;
    }

    if ((text === '上架' || text === '下架') && row) {
      const productName = escapeHtml(rowTitle(row));
      showAdminAction(`${text}确认`, `
        ${detailList([
          ['商品', productName],
          ['影响范围', '买家端商品展示、搜索、比价和下单入口'],
          ['操作说明', text === '上架' ? '上架后立即进入可售状态' : '下架后保留历史订单与售后入口'],
        ])}
      `, `确认${text}`, () => {
        const status = row.querySelector('td:nth-last-child(2) .tag');
        const isUp = text === '上架';
        setStatus(status, isUp ? '上架中' : '已下架', isUp ? 'tag tag--green' : 'tag tag--red');
        btn.textContent = isUp ? '下架' : '上架';
        btn.classList.toggle('btn--primary', !isUp);
        toast(`商品已${text}`);
      });
      return;
    }

    if (text === '编辑' && row) {
      showAdminAction('编辑自营商品', `
        <div class="admin-modal-form">
          <label>商品名称<input value="${escapeHtml(rowTitle(row))}"></label>
          <label>销售价<input value="${escapeHtml(row.cells?.[2]?.textContent || '')}"></label>
          <label>库存<input value="${escapeHtml(row.cells?.[3]?.textContent || '')}"></label>
          <label>售卖状态<select><option>上架中</option><option>草稿</option><option>已下架</option></select></label>
        </div>
      `, '保存商品', () => toast('商品信息已保存，买家端展示同步更新'));
      return;
    }

    if ((text === '详情' || text === '查看') && row) {
      const isOrder = btn.closest('#admin-orders');
      const isAfter = btn.closest('#admin-aftersale');
      showAdminAction(isAfter ? '售后工单详情' : isOrder ? '订单详情' : '商品详情', `
        ${detailList([
          ['编号/名称', escapeHtml(row.cells?.[0]?.textContent || rowTitle(row))],
          ['当前状态', escapeHtml(row.querySelector('.tag')?.textContent || '已同步')],
          ['处理建议', isAfter ? '查看证据、判定责任、同步买家和商家' : isOrder ? '核对支付、发货、子订单和售后记录' : '维护品牌、类目、SPU/SKU 和报价来源'],
        ])}
        <div class="admin-modal-note">详情面板支持查看完整链路，原型中用弹窗模拟后台抽屉。</div>
      `, '确认');
      return;
    }

    if (text === '导出订单' || text === '导出售后报表') {
      showAdminAction(text, `
        ${detailList([
          ['导出范围', text === '导出订单' ? '当前订单筛选结果' : '当前售后工单与赔付记录'],
          ['包含字段', text === '导出订单' ? '订单、买家、商品、金额、履约、退款' : '工单、责任方、证据、处理方案、SLA'],
          ['文件格式', 'Excel 明细 + PDF 摘要'],
        ])}
      `, '开始导出', () => toast(`${text}任务已创建`));
      return;
    }

    if (btn.id === 'publishCampaign') {
      showAdminAction('发布营销活动', `
        <div class="admin-modal-form">
          <label>活动名称<input value="五金紧固件批采节"></label>
          <label>投放端<select><option>移动端 + Web端 + 小程序端</option><option>仅移动端</option><option>仅 Web端</option></select></label>
          <label>生效时间<input value="立即生效"></label>
          <label>预算上限<input value="¥50,000"></label>
        </div>
      `, '确认发布', () => toast('营销活动已发布：首页 Banner、优惠券和商品推荐位已更新'));
      return;
    }

    if (promo) {
      const title = promo.querySelector('strong')?.textContent || '推荐位';
      const status = promo.querySelector('span');
      if (text === '编辑') {
        showAdminAction('首页 Banner 编辑', `
          <div class="admin-modal-form">
            <label>Banner 标题<input value="五金紧固件批采节"></label>
            <label>跳转链接<input value="/buyer.html?campaign=hardware"></label>
            <label>投放位置<select><option>首页首屏</option><option>商品详情页</option></select></label>
            <label>素材状态<select><option>投放中</option><option>待审核</option></select></label>
          </div>
        `, '保存 Banner', () => {
          if (status) status.textContent = '4 张投放中';
          toast('首页 Banner 已保存并同步买家端');
        });
        return;
      }
      if (text === '调整') {
        showAdminAction('热销商品排序', `
          <div class="admin-modal-timeline">
            <span>1. M8x30 高强螺栓 - 曝光优先</span>
            <span>2. Q235 冷轧钢板 - 利润优先</span>
            <span>3. 工业打包带 - 库存优先</span>
          </div>
          <div class="admin-modal-note">确认后会刷新首页、搜索推荐和采购专题中的热销排序。</div>
        `, '应用排序', () => {
          if (status) status.textContent = '12 个 SKU 已排序';
          toast('热销商品排序已应用');
        });
        return;
      }
      if (text === '配置') {
        showAdminAction('企业采购券配置', `
          <div class="admin-modal-form">
            <label>券面额<input value="¥600"></label>
            <label>使用门槛<input value="满 ¥20,000 可用"></label>
            <label>发放数量<input value="500"></label>
            <label>适用类目<input value="五金紧固件、自营商品、认证商家"></label>
          </div>
        `, '保存券配置', () => {
          if (status) status.textContent = '6 张可领';
          toast('企业采购券配置已更新');
        });
        return;
      }
      toast(`${title}已更新`);
    }
  });

  $('#saveAdminSettings')?.addEventListener('click', () => toast('系统设置已保存，交易与售后规则实时生效'));
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
