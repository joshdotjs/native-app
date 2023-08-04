const qs = (str, root=document) => {
  const elem = root.querySelector(str);
  if (!elem) throw new Error(`qs( ${str} ) not found`);
  return elem;
};

const qsa = (str, root=document) => {
  const elems = root.querySelectorAll(str);
  if (elems.length === 0) throw new Error(`qsa( ${str} ) not found`);
  return elems;
};

try {
  const dropdown = qs('.dropdown#task-bar__dropdown-file');
  const dropdown_trigger = qs('.j-dropdown-trigger', dropdown);
  const dropdown_menu = qs('.j-dropdown-menu', dropdown);
  const dropdown_menu_items = qsa('.j-dropdown-item', dropdown);
  
  let opened = false;

  dropdown_trigger.addEventListener('click', () => {

    const duration = 0.2;

    if (!opened) {
      dropdown_menu.classList.add('show');
      gsap.fromTo(dropdown_menu, { 
        opacity: 0, yPercent: -10, duration
      },
      { 
        opacity: 1, yPercent: 0, duration
      }
      );
    } else {
      gsap.to(dropdown_menu, { opacity: 0, yPercent: -10, duration, onComplete: () => {
        dropdown_menu.classList.remove('show');
      }});
    }
    opened = !opened;
  });

  dropdown_menu_items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();


      const tl = gsap.timeline();
      const duration = 0.075;
      tl.to(item, { background: 'black', color: 'white', duration });
      tl.to(item, { background: 'white', color: 'black', duration });
      tl.to(item, { background: 'black', color: 'whie',  duration });
      tl.to(item, { background: 'white', color: 'black', duration });
      tl.to(item, { background: 'black', color: 'white', duration });
      tl.to(item, { background: 'white', color: 'black', duration, 
        onComplete: () => {
          gsap.to(dropdown_menu, { opacity: 0, yPercent: -10, duration: 0.2, onComplete: () => {
          dropdown_menu.classList.remove('show');
          opened = false;
        }});
      }});
    });
  });

} catch(e) {
  console.log(`%c${e}`, 'padding: 0.5rem 1rem; border: solid hotpink 4px; background: lightgreen; color: darkorchid;');
}