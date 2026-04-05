'use strict';
//https://github.com/dictz 
//https://gitflic.ru/user/dictz 

async function iStorage(sid = 'iStorage_name') {
let istorage = {};

function iSCreate(sid) {///
istorage.id = sid;
istorage.dpfx = 'p__';
return new Promise(function(res, rej) {try{
  let idbRequest = window.indexedDB.open(`iStorage_${istorage.id}`, 1);

  idbRequest.onupgradeneeded = function(e) {try{
    istorage.idb = e.target.result;
    if(!istorage.idb.objectStoreNames.contains(istorage.id)) istorage.idb.createObjectStore(istorage.id);
    }catch(er){rej();}
  };

  idbRequest.onsuccess = function(e) {
    istorage.idb = e.target.result;
    istorage.idb.onversionchange = function() {istorage.idb.close();};
    istorage.idb.onerror = function(e) {};
    res();
  };

  idbRequest.onblocked = function() {try{rej();}catch(er){}};
  idbRequest.onerror = function() {try{rej();}catch(er){}};

  }catch(er){rej();}

}).then(function() {
  istorage.err = false;
  return false;

}, function() {
  istorage.err = true;
  return true;

});
};///

if(await iSCreate(sid)) return true;

istorage.setItem = function(item, x_data) {///
item = String(item);
return new Promise(function(res, rej) {try{
  let th = istorage.idb.transaction(istorage.id, 'readwrite');
  th.oncomplete = function() {res();};
  th.onabort = function() {try{rej();}catch(er){}};

  let obje = {};
  obje[istorage.dpfx + item] = istorage.dpfx + item;
  obje[item] = x_data;

  let treq = th.objectStore(istorage.id).put(obje, istorage.dpfx + item);
  treq.onsuccess = function() {};
  treq.onerror = function() {try{rej();}catch(er){}};

  }catch(er){rej();}

}).then(function() {
  istorage.err = false;
  return false;

}, function() {
  istorage.err = true;
  return true;

});
};///

istorage.getItem = function(item) {///
item = String(item);
let val;
return new Promise(function(res, rej) {try{
  let th = istorage.idb.transaction(istorage.id, 'readonly');
  th.oncomplete = function() {res(val);};
  th.onabort = function() {try{rej();}catch(er){}};

  let treq = th.objectStore(istorage.id).get(istorage.dpfx + item);
  treq.onsuccess = function(e) {
    try {
      val = e.target.result[item];
    } catch(er) {}
  };
  treq.onerror = function() {try{rej();}catch(er){}};

  }catch(er){rej();}

}).then(function(i) {
  istorage.err = false;
  return i;

}, function() {
  istorage.err = true;
  return;

});
};///

istorage.removeItem = function(item) {///
item = String(item);
return new Promise(function(res, rej) {try{
  let th = istorage.idb.transaction(istorage.id, 'readwrite');
  th.oncomplete = function() {res();};
  th.onabort = function() {try{rej();}catch(er){}};

  let treq = th.objectStore(istorage.id).delete(istorage.dpfx + item);
  treq.onsuccess = function() {};
  treq.onerror = function() {try{rej();}catch(er){}};

  }catch(er){rej();}

}).then(function() {
  istorage.err = false;
  return false;

}, function() {
  istorage.err = true;
  return true;

});
};///

istorage.clear = function() {///
return new Promise(function(res, rej) {try{
  let th = istorage.idb.transaction(istorage.id, 'readwrite');
  th.oncomplete = function() {res();};
  th.onabort = function() {try{rej();}catch(er){}};

  let treq = th.objectStore(istorage.id).clear();
  treq.onsuccess = function() {};
  treq.onerror = function() {try{rej();}catch(er){}};

  }catch(er){rej();}

}).then(function() {
  istorage.err = false;
  return false;

}, function() {
  istorage.err = true;
  return true;

});
};///

istorage.delete = function() {///
return new Promise(function(res, rej) {try{
  let idbRequest = window.indexedDB.deleteDatabase(`iStorage_${istorage.id}`);
  idbRequest.onsuccess = function(e) {res();};
  idbRequest.onerror = function() {rej();};
  }catch(er){rej();}

}).finally(function() {
  for(let key in istorage) delete istorage[key];

}).then(function() {
  return false;

}, function() {
  return true;

});
};///

return istorage;
}