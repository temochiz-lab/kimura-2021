var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.get().localSave('csv', 'data.csv');
//    jsPsych.data.displayData();
  }
});

// ------------------------------------------------------------------------
// 画像ファイルの用意
// ------------------------------------------------------------------------

var baseURL = './pic/' ;
var examPictures = [
  { label: 'No.01', examA: 'ka01.JPG' },
  { label: 'No.02', examA: 'ka02.JPG' },
  { label: 'No.03', examA: 'ka03.JPG' },
  { label: 'No.04', examA: 'ka11.JPG' },
  { label: 'No.05', examA: 'ka12.JPG' },
  { label: 'No.06', examA: 'ka13.JPG' },
  { label: 'No.07', examA: 'ka21.JPG' },
  { label: 'No.08', examA: 'ka22.JPG' },
  { label: 'No.09', examA: 'ka23.JPG' },
  { label: 'No.10', examA: 'yo01.JPG' },
  { label: 'No.11', examA: 'yo02.JPG' },
  { label: 'No.12', examA: 'yo03.JPG' },
  { label: 'No.13', examA: 'yo11.JPG' },
  { label: 'No.14', examA: 'yo12.JPG' },
  { label: 'No.15', examA: 'yo13.JPG' },
  { label: 'No.16', examA: 'yo21.JPG' },
  { label: 'No.17', examA: 'yo22.JPG' },
  { label: 'No.18', examA: 'yo23.JPG' },
];

// ------------------------------------------------------------------------
// 固定の実験パーツの作成
// ------------------------------------------------------------------------

// 最初の説明と被検者情報の入力
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '<strong>これから大学生におけるLINEの利用と感情についての実験を始めます。</strong><br><br><br>学籍番号を入力してください', columns: 10, required: true, name: 'id'},
    {prompt: 'あなたの性別を男性であれば 1、女性であれば 2、答えたくない場合は 3 を入力してください。', columns: 10, required: true, name: 'sex'},
    {prompt: 'あなたの年齢を入力してください。', columns: 10, required: true, name: 'age'},
  ],
  button_label: '次へ',
};

// 実験の説明
var hello = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '実験を始めます。 メッセージ文の前に1秒凝視点が出ます。<br><br>何かキーを押すと始まります。',
};

// 凝視点
var eyepoint = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
};

// 実験の終了
var bye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'これで実験は終了です。 PCには触れずに実験者の指示に従ってください。',
};

// ------------------------------------------------------------------------
// STAMP問題の作成
// ------------------------------------------------------------------------

var trials = {
  timeline: [],
  timeline_variables: examPictures,
  randomize_order: true,
};

// STAMP問題の選択肢
var myScale = '\
<font size=2>\
<center>\
この文章から読み取れる感情はどのくらい強く伝わりますか。\
<TABLE style=”border:none;">\
<TR>\
  <TD align="center">||━━━━━━━━ 1 ━━━━━━━<BR>弱い</TD>\
  <TD align="center">||━━━━━━━━ 2 ━━━━━━━<BR>やや弱い</TD>\
  <TD align="center">||━━━━━━━━ 3 ━━━━━━━<BR>どちらでもない</TD>\
  <TD align="center">||━━━━━━━━ 4 ━━━━━━━<BR>やや強い</TD>\
  <TD align="center">||━━━━━━━━ 5 ━━━━━━━||<BR>強い</TD>\
</TR>\
</TABLE>\
</center>\
</font>\
' ;

// STAMP問題の本体
var exam1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  '<img src="'+ baseURL + jsPsych.timelineVariable('examA') + '" height=350><br><br>'; },
    prompt: function () {return myScale; },
    choices: ["1","2","3","4","5"],
    data: {
      examindex: jsPsych.timelineVariable('label'),
    },
};

// パターンA
trials.timeline.push(eyepoint) ;
trials.timeline.push(exam1) ;

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

jsPsych.run([par_id,hello,trials,bye]);
