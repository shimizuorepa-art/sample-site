const checklistMap = {
  quote: {
    title: "見積書",
    items: [
      "宛先・担当者名が最新",
      "品目・数量・単価が最新版価格マスタと一致",
      "見積有効期限を記載",
      "納期・提供条件を確認",
      "旧版帳票との差異がある場合は承認済み",
      "社内メモに参照根拠を残した",
    ],
  },
  order: {
    title: "受発注チェック",
    items: [
      "顧客注文内容と社内受注登録が一致",
      "仕入先または工場への発注状況を確認",
      "数量・単価・納期回答に変更がない",
      "変更履歴を残した",
      "担当営業へ確認済み",
      "受注番号・発注番号を確認",
    ],
  },
  delivery: {
    title: "納品前確認",
    items: [
      "受注番号・納品先・担当者名が最新",
      "納品予定日または納品完了日を確認",
      "品目・数量が受注登録と一致",
      "出荷または納品完了の確認が取れている",
      "請求前確認へ連携する条件を確認",
      "差戻し時の連絡先と保管先を記録",
    ],
  },
  invoice: {
    title: "請求前確認",
    items: [
      "納品または役務提供が完了済み",
      "請求先・締日・支払条件を確認",
      "見積時点から数量・単価に変更がない",
      "変更がある場合は差分理由を備考に記載",
      "添付資料の有無を確認",
    ],
  },
  request: {
    title: "社内申請書",
    items: [
      "申請目的が明確",
      "必要な金額・日付・対象範囲を記載",
      "承認者を確認",
      "添付資料を確認",
      "関連部署への共有要否を確認",
    ],
  },
};

const knowledgeBase = [
  {
    id: "K-001",
    title: "価格確認の正本ルール",
    body:
      "営業所ごとのExcelや旧版帳票は確認資料として扱い、社内の価格確認では承認済みの最新版マスタを正本として参照する。",
    tags: ["価格", "料金", "Excel", "旧版", "見積", "正本", "price", "quote"],
  },
  {
    id: "K-002",
    title: "差異発生時の確認手順",
    body:
      "最新版価格マスタと旧版帳票に差異がある場合は、顧客提示前に営業管理部へ確認し、承認済みになるまで外部提示を保留する。",
    tags: ["差異", "承認", "帳票", "保留", "営業管理", "price", "quote", "invoice"],
  },
  {
    id: "K-003",
    title: "問い合わせ一次返信テンプレート",
    body:
      "確認に時間を要する場合は、受付済みであること、確認対象、回答予定、追加で必要な情報を明記して返信する。",
    tags: ["問い合わせ", "返信", "受付", "確認", "price"],
  },
  {
    id: "K-004",
    title: "手順書作成ルール",
    body:
      "手順書は目的、開始条件、担当、処理手順、確認項目、例外対応、エスカレーション先をそろえて記載する。",
    tags: ["手順書", "マニュアル", "標準化", "引き継ぎ", "manual"],
  },
  {
    id: "K-005",
    title: "豊橋標準化メモ",
    body:
      "各営業所の処理方法は、受付、確認、処理、承認、完了連絡、保管の工程に分け、豊橋で共通手順として整理する。",
    tags: ["シェアード", "標準化", "豊橋", "受付", "承認", "保管", "manual"],
  },
  {
    id: "K-006",
    title: "見積書出力ルール",
    body:
      "見積書は宛先、品目、数量、単価、有効期限、納期、備考、社内承認欄をそろえ、価格根拠を社内メモに残す。",
    tags: ["見積", "有効期限", "納期", "単価", "quote"],
  },
  {
    id: "K-007",
    title: "請求前確認ルール",
    body:
      "請求前確認では、納品完了、請求先、締日、支払条件、数量変更、添付資料を確認する。",
    tags: ["請求", "請求前確認", "締日", "支払条件", "納品", "invoice"],
  },
];

const knowledgePatterns = {
  price: {
    label: "価格差異の問い合わせ回答",
    outputName: "営業所への回答文",
    goal: "価格表と見積金額の差異を、正しい参照元と承認要否つきで回答する。",
    query:
      "価格表と見積金額が違うと営業所から連絡がありました。どの資料を根拠に回答すべきですか？",
    tags: ["price", "価格", "料金", "差異", "見積", "問い合わせ"],
    materials: ["最新版価格マスタ", "価格改定履歴", "旧版帳票", "差異発生時の確認手順", "一次返信テンプレート"],
    checks: ["価格マスタが最新版か", "旧版帳票との混在がないか", "顧客提示前か", "承認待ちの差異がないか"],
    draft:
      "お問い合わせありがとうございます。\n\n価格確認は、営業所ごとのExcelや旧版帳票だけで判断せず、承認済みの最新版価格マスタを正本として確認します。価格マスタと過去資料に差異がある場合は、顧客提示前に営業管理部で承認要否を確認します。\n\n確認結果は、対象資料、金額、差異の有無、承認状況を添えてご連絡します。",
  },
  quote: {
    label: "見積確認メモの作成補助",
    outputName: "見積確認メモ",
    goal: "商品、数量、単価、提出条件を整理し、見積に入れる確認項目をそろえる。",
    query:
      "営業担当から、価格改定後の商品Aを10台で見積作成したいと依頼がありました。有効期限と納期も入れて下書きしたいです。",
    tags: ["quote", "見積", "価格", "単価", "納期", "有効期限"],
    materials: ["見積書フォーマット", "最新版価格マスタ", "納期ルール", "承認ルール"],
    checks: ["宛先と担当者名", "品目・数量・単価", "見積有効期限", "納期・備考"],
    draft:
      "見積確認メモ\n\n宛先: 取引先名、担当者名を入力\n品目: 商品A\n数量: 10台\n単価: 最新版価格マスタを参照\n見積有効期限: 30日を仮設定\n納期: 在庫・製造状況を確認後に確定\n備考: 価格改定後の承認済みマスタを根拠として作成\n\n最終確認: 単価、数量、納期、承認要否を担当営業と営業管理部で確認する。",
  },
  delivery: {
    label: "納品前確認",
    outputName: "納品前確認メモ",
    goal: "受注登録、納品先、納品日、数量、請求連携を確認し、差戻しを減らす。",
    query:
      "営業所から、納品前に受注登録と納品予定日、請求先情報を確認したいと依頼がありました。",
    tags: ["delivery", "納品", "納品前確認", "受注", "請求", "数量"],
    materials: ["受注登録", "納品確認フォーマット", "納品完了記録", "請求先マスタ", "差戻し記録"],
    checks: ["受注番号と納品先", "品目・数量", "納品予定日または納品完了日", "請求前確認への連携条件"],
    draft:
      "納品前確認メモ\n\n対象: 受注番号、営業所名、取引先名を入力\n確認事項: 納品先、品目、数量、納品予定日、納品完了状況\n請求連携: 請求先、締日、支払条件を請求先マスタで確認\n差戻し条件: 受注登録と納品確認内容に差異がある場合は、担当営業へ確認\n\n最終確認: 納品日、数量、納品先、請求連携条件を確認してから処理する。",
  },
  invoice: {
    label: "請求前確認の下書き補助",
    outputName: "請求前確認メモ",
    goal: "請求先、締日、支払条件、数量変更を確認し、請求前の抜け漏れを減らす。",
    query:
      "納品済み案件の請求前確認を進めたいです。見積時から数量が変わっている可能性があり、備考欄に何を残すべきか確認したいです。",
    tags: ["invoice", "請求", "請求前確認", "支払条件", "数量", "備考"],
    materials: ["請求確認フォーマット", "取引先支払条件", "納品完了記録", "数量変更履歴"],
    checks: ["納品完了の確認", "請求先・締日", "支払条件", "数量変更理由", "添付資料"],
    draft:
      "請求前確認メモ\n\n請求先: 取引先情報の登録内容を参照\n件名: 納品済み案件名を入力\n数量・単価: 見積時点との差分を確認\n支払条件: 取引先マスタの締日・支払条件を反映\n備考: 数量変更がある場合は、変更日、変更理由、確認者を記載\n\n最終確認: 納品完了、数量変更、添付資料、請求先情報を確認してから処理する。",
  },
  manual: {
    label: "手順書・FAQ化",
    outputName: "FAQ・手順書下書き",
    goal: "同じ問い合わせが繰り返される業務を、次回から探せる社内ルールに変える。",
    query:
      "価格確認の問い合わせが何度も発生しています。次回から誰でも同じ手順で確認できるようにFAQと手順書にしたいです。",
    tags: ["manual", "手順書", "FAQ", "標準化", "引き継ぎ", "問い合わせ"],
    materials: ["過去問い合わせ履歴", "手順書フォーマット", "承認ルート", "保管ルール"],
    checks: ["開始条件", "標準手順", "例外対応", "確認先", "保管場所"],
    draft:
      "FAQ・手順書下書き\n\n質問: 受注登録、納品、請求前確認の内容が資料ごとに違う場合、どの資料を確認しますか？\n回答: 承認済みの最新版マスタと社内登録内容を優先して確認します。差異がある場合は、営業管理部で承認要否を確認してから顧客へ提示します。\n\n標準手順:\n1. 依頼内容、対象商品、数量、期限を受付表に記録\n2. 最新版マスタと社内登録内容を照合\n3. 差異がある場合は承認者へ確認\n4. 回答文と根拠資料を依頼元へ共有\n5. FAQに追記し、次回検索できる状態にする",
  },
};

const seedTasks = [
  {
    due: "本日",
    from: "営業所",
    title: "価格改定後の見積確認",
    owner: "営業管理",
    status: "確認待ち",
    next: "最新版価格マスタと旧版帳票の差異を確認",
  },
  {
    due: "明日",
    from: "営業担当",
    title: "受発注内容と納期回答の確認",
    owner: "事務",
    status: "処理中",
    next: "受注登録と発注状況を照合",
  },
  {
    due: "明日",
    from: "営業所",
    title: "納品前確認",
    owner: "事務",
    status: "確認待ち",
    next: "納品日、納品先、請求連携を確認",
  },
  {
    due: "2日後",
    from: "経理",
    title: "請求前確認メモの記載確認",
    owner: "事務",
    status: "差戻し",
    next: "数量変更理由の追記依頼",
  },
  {
    due: "今週",
    from: "営業所",
    title: "価格確認手順のマニュアル化",
    owner: "営業管理",
    status: "処理中",
    next: "例外対応を追記",
  },
  {
    due: "完了",
    from: "顧客",
    title: "見積書再送付",
    owner: "営業担当",
    status: "完了",
    next: "保管済み",
  },
];

const state = {
  tasks: [...seedTasks],
  boardFilter: "all",
  activeView: "triage",
};

const fieldIds = [
  "requestFrom",
  "requestDue",
  "requestImpact",
  "requestType",
  "requestText",
  "documentKind",
  "manualTitle",
  "manualTrigger",
  "manualSteps",
  "manualException",
  "knowledgePattern",
  "knowledgeQuery",
];

const defaultFieldValues = {};

const guideMap = {
  triage: {
    label: "依頼受付",
    title: "案件: 営業所からの受発注・帳票確認",
    scene:
      "状況: 顧客提出前 / 本日中 / 受注登録、納品、請求条件の確認あり。",
    goal:
      "判断: 正本資料、登録内容、承認要否を確認し、回答根拠を記録します。",
    next: "次アクション: 操作エリアで入力内容を確認し、「受付メモを作成」を押します。",
    points: ["受付内容", "優先度", "確認先", "返信文"],
  },
  check: {
    label: "帳票チェック",
    title: "案件: 帳票確認チェック",
    scene:
      "状況: 見積、受発注、納品、請求に関わる外部提示・処理前の抜け漏れ確認。",
    goal:
      "判断: 帳票種別ごとに必須項目を固定し、差戻しや再作成の原因を減らします。",
    next: "次アクション: 操作エリアで帳票種別を選び、確認済みの項目にチェックを入れます。",
    points: ["必須項目", "未確認項目", "処理可否", "差戻し理由"],
  },
  manual: {
    label: "手順書作成",
    title: "案件: 受注から納品・請求前確認までの標準化",
    scene:
      "状況: 営業所ごとに確認手順が違う作業を、引き継ぎ可能な手順に整える。",
    goal:
      "判断: 目的、開始条件、標準手順、例外対応をそろえて標準化します。",
    next: "次アクション: 操作エリアで業務内容を確認し、「手順書を整形」を押します。",
    points: ["開始条件", "標準手順", "例外対応", "確認先"],
  },
  knowledge: {
    label: "社内資料参照",
    title: "案件: 社内資料を根拠にした下書き作成",
    scene:
      "状況: 料金表、帳票フォーマット、承認ルール、過去FAQを整理済み資料として使う。",
    goal:
      "判断: 社内資料を根拠に回答や確認メモの下書きを作り、最終確認は担当者が行う想定です。",
    next: "次アクション: 操作エリアで用途を選び、「根拠つき下書きを作成」を押します。",
    points: ["参照資料", "生成物", "確認項目", "ナレッジ蓄積"],
  },
  board: {
    label: "進捗ボード",
    title: "案件: 受付案件の進捗共有",
    scene:
      "状況: 豊橋で整えた共通手順に沿って、誰が何を確認中か、どの案件が差戻し中かを共有する。",
    goal:
      "判断: 受付、確認待ち、処理中、差戻し、完了を一覧化し、他営業所でも同じ品質で引き継げる形にします。",
    next: "次アクション: 管理エリアで状態を絞り込み、必要なら「サンプル追加」を押します。",
    points: ["期限", "依頼元", "状態", "次アクション"],
  },
};

let toastTimer = 0;

function showToast(message) {
  const toast = document.getElementById("toast");
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function captureDefaults() {
  fieldIds.forEach((id) => {
    const field = document.getElementById(id);
    if (field) defaultFieldValues[id] = field.value;
  });
}

function restoreDefaults() {
  fieldIds.forEach((id) => {
    const field = document.getElementById(id);
    if (field && Object.prototype.hasOwnProperty.call(defaultFieldValues, id)) {
      field.value = defaultFieldValues[id];
    }
  });
}

function setResultStatus(id, message, mode = "updated") {
  const status = document.getElementById(id);
  if (!status) return;
  status.textContent = message;
  status.className = `result-status is-${mode}`;
}

function flashResult(statusId) {
  const panel = document.getElementById(statusId)?.closest(".panel");
  if (!panel) return;
  panel.classList.add("is-updated");
  window.setTimeout(() => panel.classList.remove("is-updated"), 1200);
}

function revealResult(statusId) {
  const panel = document.getElementById(statusId)?.closest(".panel");
  if (!panel || !window.matchMedia("(max-width: 680px)").matches) return;
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setEmptyCard(containerId, title, detail) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="empty-card">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(detail)}</p>
    </div>
  `;
}

function setInitialResults() {
  setResultStatus(
    "triageStatus",
    "受付前: 入力内容をもとに、優先度・確認先・返信文を作成します。",
    "idle"
  );
  setEmptyCard(
    "triageResult",
    "処理待ち",
    "受付メモの作成後、優先度・確認先・返信文がここに表示されます。"
  );
  setResultStatus(
    "checkStatus",
    "表示中: 帳票種別やチェックを変更すると、判定欄が更新されます。",
    "idle"
  );
  setResultStatus(
    "manualStatus",
    "整形前: 入力された業務内容を、引き継ぎ用の標準形式に整えます。",
    "idle"
  );
  document.getElementById("manualPreview").innerHTML = `
    <div class="empty-state">
      <strong>処理待ち</strong>
      <p>手順書の整形後、引き継ぎ用のドラフトがここに表示されます。</p>
    </div>
  `;
  setResultStatus(
    "knowledgeStatus",
    "作成前: 用途パターンと入力内容をもとに、参照資料つきの下書きを作成します。",
    "idle"
  );
  setEmptyCard(
    "knowledgeResult",
    "処理待ち",
    "下書き作成後、参照資料、作成結果、人が確認する箇所がここに表示されます。"
  );
}

function switchView(name) {
  const before = state.activeView;
  state.activeView = name;
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-visible", view.id === `view-${name}`);
  });
  document.querySelectorAll(".nav-item").forEach((button) => {
    const active = button.dataset.view === name;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderGuide();
  if (before !== name) {
    showToast(`${guideMap[name].label}に切り替えました。表示中の操作エリアで実際に操作できます。`);
  }
}

function renderGuide() {
  const guide = guideMap[state.activeView];
  if (!guide) return;

  const screenGuide = document.getElementById("screenGuide");
  screenGuide.dataset.view = state.activeView;
  document.getElementById("guideToolLabel").textContent = `${guide.label}の使用場面`;
  document.getElementById("guideTitle").textContent = guide.title;
  document.getElementById("guideScene").textContent = guide.scene;
  document.getElementById("guideGoal").textContent = guide.goal;
  document.getElementById("guideNext").textContent = guide.next;
  document.getElementById("guidePoints").innerHTML = guide.points
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("");
}

function getPriority() {
  const due = document.getElementById("requestDue").value;
  const impact = document.getElementById("requestImpact").value;
  const type = document.getElementById("requestType").value;
  let score = 0;
  if (due === "today") score += 3;
  if (due === "tomorrow") score += 2;
  if (impact === "medium") score += 2;
  if (impact === "high") score += 3;
  if (["価格確認", "受発注確認", "納品前確認", "請求確認"].includes(type)) score += 1;
  if (score >= 5) return { label: "高", className: "priority-high", action: "即時確認" };
  if (score >= 3) return { label: "中", className: "priority-medium", action: "当日中に整理" };
  return { label: "低", className: "priority-low", action: "通常処理" };
}

function renderTriage() {
  const from = document.getElementById("requestFrom").value;
  const type = document.getElementById("requestType").value;
  const text = document.getElementById("requestText").value.trim();
  const priority = getPriority();
  const needsApproval = /価格|差異|請求|顧客提出|改定/.test(text);
  const safeFrom = escapeHtml(from);
  const safeType = escapeHtml(type);

  const checks = [
    "依頼元・回答希望期限を受付表へ記録",
    `${type}に必要な対象情報を確認`,
      "対象資料と正本の最新版を確認",
    needsApproval ? "差異・価格改定が関係するため承認要否を確認" : "通常ルールで処理可否を確認",
    "回答内容と根拠資料を記録",
  ];

  document.getElementById("triageResult").innerHTML = `
    <div class="result-card">
      <div class="result-grid">
        <div class="mini-metric">
          <span>優先度</span>
          <strong class="${priority.className}">${priority.label}</strong>
        </div>
        <div class="mini-metric">
          <span>初動</span>
          <strong>${priority.action}</strong>
        </div>
        <div class="mini-metric">
          <span>確認先</span>
          <strong>${needsApproval ? "営業管理" : safeFrom}</strong>
        </div>
      </div>
      <h3 class="section-title">確認チェック</h3>
      <ul class="plain-list">
        ${checks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <h3 class="section-title">返信文たたき台</h3>
      <div class="mail-box">ご依頼ありがとうございます。

${safeType}の件、受付いたしました。
正確な回答のため、対象資料・数量・提出期限・価格根拠を確認します。
${needsApproval ? "価格改定または差異が関係する可能性があるため、承認要否もあわせて確認します。" : "確認後、通常フローで回答します。"}

確認が取れ次第、根拠とあわせてご連絡いたします。</div>
    </div>
  `;
}

function renderChecklist() {
  const kind = document.getElementById("documentKind").value;
  const config = checklistMap[kind];
  const checklist = document.getElementById("checklist");
  checklist.innerHTML = config.items
    .map(
      (item, index) => `
        <label class="check-item">
          <input type="checkbox" ${index < 3 ? "checked" : ""} />
          <span>${escapeHtml(item)}</span>
        </label>
      `
    )
    .join("");
  checklist.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      renderCheckResult();
      setResultStatus("checkStatus", "更新済み: チェック内容に合わせて判定欄を更新しました。", "updated");
      flashResult("checkStatus");
      showToast(
        input.checked
          ? "チェック済みにしました。判定欄を更新しました。"
          : "未確認に戻しました。判定欄の未確認項目へ反映しました。"
      );
    });
  });
  renderCheckResult();
}

function renderCheckResult() {
  const kind = document.getElementById("documentKind").value;
  const config = checklistMap[kind];
  const inputs = [...document.querySelectorAll("#checklist input")];
  const checked = inputs.filter((input) => input.checked).length;
  const total = inputs.length || 1;
  const percent = Math.round((checked / total) * 100);
  const missing = config.items.filter((_, index) => !inputs[index]?.checked);
  const scoreClass = percent === 100 ? "ok" : percent >= 70 ? "warn" : "bad";

  document.getElementById("checkResult").innerHTML = `
    <div class="check-summary">
      <div class="score ${scoreClass}">${percent}%</div>
      <h3>${escapeHtml(config.title)}の確認判定</h3>
      <p>${percent === 100 ? "確認チェックは完了です。" : "未確認項目があります。差戻しや確認漏れ防止のため、処理前に確認してください。"}</p>
      <h3 class="section-title">未確認項目</h3>
      ${
        missing.length
          ? `<ul class="plain-list">${missing.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
          : `<p>未確認項目はありません。</p>`
      }
    </div>
  `;
}

function renderManual() {
  const title = document.getElementById("manualTitle").value.trim();
  const trigger = document.getElementById("manualTrigger").value.trim();
  const steps = document
    .getElementById("manualSteps")
    .value.split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const exception = document.getElementById("manualException").value.trim();
  const safeTitle = escapeHtml(title || "無題の業務手順");
  const safeTrigger = escapeHtml(trigger || "開始条件を入力してください");
  const safeException = escapeHtml(exception || "例外対応を入力してください");

  document.getElementById("manualPreview").innerHTML = `
    <h3>${safeTitle}</h3>
    <div class="manual-meta">
      <span><strong>目的:</strong> 担当者ごとの判断差を減らし、受付から回答までの処理品質をそろえる。</span>
      <span><strong>開始条件:</strong> ${safeTrigger}</span>
      <span><strong>担当:</strong> 一次受付は事務担当、承認判断は営業管理部。</span>
    </div>
    <h4>標準手順</h4>
    <ol class="plain-list">
      ${
        steps.length
          ? steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
          : "<li>作業手順を入力してください</li>"
      }
    </ol>
    <h4>チェックポイント</h4>
    <ul class="plain-list">
      <li>依頼内容、対象資料、期限、回答先が記録されている</li>
      <li>価格・数量・日付など、ミスが起きやすい項目を確認済み</li>
      <li>回答内容の根拠を後から追える状態にしている</li>
    </ul>
    <h4>例外対応</h4>
    <p>${safeException}</p>
  `;
}

function scoreKnowledge(query, item) {
  const normalized = query.toLowerCase();
  if (!normalized) return 0;

  const tagScore = item.tags.reduce((score, tag) => {
    return normalized.includes(tag.toLowerCase()) ? score + 3 : score;
  }, 0);
  const searchable = `${item.title} ${item.body}`.toLowerCase();
  const phraseScore = normalized
    .split(/[、。,\s]+/)
    .filter((part) => part.length >= 2)
    .reduce((score, part) => (searchable.includes(part) ? score + 1 : score), 0);

  return tagScore + phraseScore;
}

function getSelectedKnowledgePattern() {
  const key = document.getElementById("knowledgePattern").value;
  return knowledgePatterns[key] || knowledgePatterns.price;
}

function renderPatternPreview() {
  const pattern = getSelectedKnowledgePattern();
  const preview = document.getElementById("patternPreview");
  if (!preview) return;

  preview.innerHTML = `
    <div class="pattern-card">
      <strong>${escapeHtml(pattern.label)}</strong>
      <p>${escapeHtml(pattern.goal)}</p>
      <dl>
        <div>
          <dt>作るもの</dt>
          <dd>${escapeHtml(pattern.outputName)}</dd>
        </div>
        <div>
          <dt>参照資料</dt>
          <dd>${pattern.materials.map((item) => escapeHtml(item)).join(" / ")}</dd>
        </div>
      </dl>
    </div>
  `;
}

function renderKnowledge() {
  const query = document.getElementById("knowledgeQuery").value.trim();
  const pattern = getSelectedKnowledgePattern();
  if (!query) {
    setEmptyCard(
      "knowledgeResult",
      "入力内容が空です",
      "まず入力欄に、依頼内容や作りたい帳票の条件を入れてください。"
    );
    setResultStatus("knowledgeStatus", "未作成: 入力内容があると下書きのイメージを作れます。", "idle");
    flashResult("knowledgeStatus");
    return false;
  }

  const searchText = `${query} ${pattern.tags.join(" ")}`;
  const hits = knowledgeBase
    .map((item) => ({ ...item, score: scoreKnowledge(searchText, item) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!hits.length) {
    setEmptyCard(
      "knowledgeResult",
      "関連する過去ルールが見つかりません",
      "問い合わせ内容を少し具体化するか、社内ルールとして新規登録する候補にします。"
    );
    setResultStatus("knowledgeStatus", "確認中: 一致する過去ルールがないため、新規登録候補として扱います。", "idle");
    flashResult("knowledgeStatus");
    return false;
  }

  document.getElementById("knowledgeResult").innerHTML = `
    <div class="result-card">
      <div class="ai-note">
        <strong>説明用の位置づけ</strong>
        <p>いきなり自動判断するのではなく、まず社内資料、最新版、承認者、例外条件を整理し、その根拠に沿って下書きを作る仕組みです。この画面は実情報を含まないサンプルで、社内資料を整えた後にできることをパターン表示しています。</p>
      </div>
      <div class="output-meta">
        <div>
          <span>用途</span>
          <strong>${escapeHtml(pattern.label)}</strong>
        </div>
        <div>
          <span>出力</span>
          <strong>${escapeHtml(pattern.outputName)}</strong>
        </div>
      </div>
      <h3 class="section-title">参照する社内資料</h3>
      <div class="material-grid">
        ${pattern.materials.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
      <div class="answer-box">
        <h3>${escapeHtml(pattern.outputName)}</h3>
${escapeHtml(pattern.draft)}
      </div>
      <h3 class="section-title">人が最後に確認すること</h3>
      <ul class="plain-list">
        ${pattern.checks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <h3 class="section-title">参照した過去ルール</h3>
      ${hits
        .map(
          (item) => `
            <div class="knowledge-hit">
              <strong>${escapeHtml(item.id)} ${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.body)}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
  return true;
}

function statusClass(status) {
  return {
    確認待ち: "status-wait",
    処理中: "status-work",
    差戻し: "status-return",
    完了: "status-done",
  }[status];
}

function renderBoard() {
  const tasks = state.tasks.filter((task) => state.boardFilter === "all" || task.status === state.boardFilter);
  document.getElementById("taskTable").innerHTML = tasks
    .map(
      (task) => `
        <tr>
          <td class="${["本日", "明日"].includes(task.due) && task.status !== "完了" ? "due-soon" : ""}">${escapeHtml(task.due)}</td>
          <td>${escapeHtml(task.from)}</td>
          <td>${escapeHtml(task.title)}</td>
          <td>${escapeHtml(task.owner)}</td>
          <td><span class="status-badge ${statusClass(task.status) || ""}">${escapeHtml(task.status)}</span></td>
          <td>${escapeHtml(task.next)}</td>
        </tr>
      `
    )
    .join("");
}

function addTask() {
  const samples = [
    {
      due: "本日",
      from: "営業担当",
      title: "見積金額の根拠確認",
      owner: "営業管理",
      status: "確認待ち",
      next: "承認履歴を確認",
    },
    {
      due: "今週",
      from: "営業所",
      title: "問い合わせ回答テンプレート整備",
      owner: "事務",
      status: "処理中",
      next: "FAQへ反映",
    },
  ];
  state.tasks.unshift(samples[state.tasks.length % samples.length]);
  renderBoard();
  showToast("完了: サンプル依頼を進捗ボードへ追加しました。");
}

function resetAll() {
  state.tasks = [...seedTasks];
  state.boardFilter = "all";
  restoreDefaults();
  document.querySelectorAll(".chip").forEach((chip) => {
    const active = chip.dataset.boardFilter === "all";
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  renderChecklist();
  renderBoard();
  renderGuide();
  renderPatternPreview();
  setInitialResults();
  showToast("初期状態に戻しました。入力例と結果表示をリセットしました。");
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  document.getElementById("runTriage").addEventListener("click", () => {
    renderTriage();
    setResultStatus("triageStatus", "作成済み: 優先度・確認先・返信文を更新しました。", "updated");
    flashResult("triageStatus");
    revealResult("triageStatus");
    showToast("完了: 依頼内容から優先度・確認先・返信文を作成しました。");
  });

  document.getElementById("documentKind").addEventListener("change", () => {
    renderChecklist();
    const kind = document.getElementById("documentKind").value;
    setResultStatus("checkStatus", `${checklistMap[kind].title}用の確認項目を表示しました。`, "updated");
    flashResult("checkStatus");
    showToast(`${checklistMap[kind].title}用の確認項目を表示しました。`);
  });
  document.getElementById("buildManual").addEventListener("click", () => {
    renderManual();
    setResultStatus("manualStatus", "作成済み: 標準手順・確認項目・例外対応を整形しました。", "updated");
    flashResult("manualStatus");
    revealResult("manualStatus");
    showToast("完了: 入力内容から手順書ドラフトを整形しました。");
  });
  document.getElementById("knowledgePattern").addEventListener("change", () => {
    const pattern = getSelectedKnowledgePattern();
    document.getElementById("knowledgeQuery").value = pattern.query;
    renderPatternPreview();
    setResultStatus(
      "knowledgeStatus",
      `未作成: ${pattern.label}の入力例に切り替えました。青いボタンで下書きを作成できます。`,
      "idle"
    );
    setEmptyCard(
      "knowledgeResult",
      "処理待ち",
      `${pattern.outputName}の出力イメージを確認するには、青いボタンを押してください。`
    );
    showToast(`${pattern.label}の入力例に切り替えました。`);
  });
  document.getElementById("searchKnowledge").addEventListener("click", () => {
    const found = renderKnowledge();
    const pattern = getSelectedKnowledgePattern();
    if (found) {
      setResultStatus(
        "knowledgeStatus",
        `作成済み: ${pattern.outputName}と参照資料、確認ポイントを表示しました。`,
        "updated"
      );
      flashResult("knowledgeStatus");
      revealResult("knowledgeStatus");
      showToast("完了: 社内資料を参照した下書きイメージを作成しました。");
    } else {
      revealResult("knowledgeStatus");
      showToast("確認: 下書きを作るには、入力内容または関連する過去ルールが必要です。");
    }
  });
  document.getElementById("addTask").addEventListener("click", addTask);
  document.getElementById("seedReset").addEventListener("click", resetAll);

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.boardFilter = chip.dataset.boardFilter;
      document.querySelectorAll(".chip").forEach((item) => {
        const active = item === chip;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderBoard();
      showToast(
        state.boardFilter === "all"
          ? "全ての案件を表示しました。"
          : `${state.boardFilter}の案件だけに絞り込みました。`
      );
    });
  });
}

function init() {
  captureDefaults();
  bindEvents();
  renderChecklist();
  renderBoard();
  renderGuide();
  renderPatternPreview();
  setInitialResults();
}

init();
