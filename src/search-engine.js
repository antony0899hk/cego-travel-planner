(() => {
  const norm=s=>(s??'').toString().normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
  const tokenize=s=>norm(s).split(/[\s,，/｜·()（）\-]+/).filter(Boolean);
  function search(items,q='',filters={}){const qs=tokenize(q);return items.map(x=>{const hay=norm([x.name,x.city,x.zone,(x.tags||[]).join(' '),x.period].join(' '));let score=x.tested?15:0;for(const t of qs){if(hay.includes(t))score+=15;else return null;}if(filters.city&&x.city!==filters.city)return null;if(filters.zone&&x.zone!==filters.zone)return null;if(filters.tag&&!(x.tags||[]).includes(filters.tag))return null;if(filters.period&&x.period!==filters.period)return null;return {...x,_score:score};}).filter(Boolean).sort((a,b)=>b._score-a._score||norm(a.name).localeCompare(norm(b.name),'zh-Hant'));}
  window.CEGOSearch={search,norm,tokenize};
})();