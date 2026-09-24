document.addEventListener('DOMContentLoaded',()=>{
  const root=document.querySelector('.kobe-tenku-front');
  if(!root)return;
  root.querySelectorAll('[data-destination]').forEach(link=>{
    link.addEventListener('click',()=>{
      const button=root.querySelector('.map-hotspot[data-area="'+link.dataset.destination+'"]');
      if(button){button.focus({preventScroll:true});button.click();}
    });
  });
});
