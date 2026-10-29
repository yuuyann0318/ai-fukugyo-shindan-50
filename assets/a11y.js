const diagnosisResult=document.querySelector('#result');
const diagnosisTitle=diagnosisResult?.querySelector('.result-head h2');
if(diagnosisTitle){
  diagnosisTitle.id='resultTitle';
  diagnosisTitle.tabIndex=-1;
}
if(diagnosisResult){
  diagnosisResult.setAttribute('aria-labelledby','resultTitle');
  const status=document.createElement('p');
  status.id='resultStatus';
  status.className='sr-only';
  status.setAttribute('role','status');
  status.setAttribute('aria-live','polite');
  diagnosisResult.prepend(status);
}
const diagnosisImage=document.querySelector('.result-head img');
if(diagnosisImage){
  const figure=document.createElement('figure');
  figure.className='result-visual';
  diagnosisImage.replaceWith(figure);
  figure.append(diagnosisImage);
  const caption=document.createElement('figcaption');
  caption.textContent='画像はイメージです';
  figure.append(caption);
}
const baseFinish=finish;
finish=function(){
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(diagnosisImage)diagnosisImage.loading='eager';
  const nativeScroll=window.scrollTo.bind(window);
  if(reduceMotion)window.scrollTo=()=>nativeScroll(0,0);
  try{baseFinish()}finally{if(reduceMotion)window.scrollTo=nativeScroll}
  const names=[...document.querySelectorAll('#ranks h3')].map(node=>node.textContent).join('、');
  const status=document.querySelector('#resultStatus');
  if(status)status.textContent=`診断が終わりました。上位候補は${names}です。`;
  diagnosisTitle?.focus({preventScroll:true});
};
